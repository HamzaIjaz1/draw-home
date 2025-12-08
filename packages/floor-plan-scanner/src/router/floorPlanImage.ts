import { Express } from 'express';
import { routes } from '@draw-house/common/dist/zod';
import { readFile } from '@draw-house/common/dist/utils/readFile';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { downloadFile } from '@arthurka/ts-utils/dist/backend';
import { floorPlanScannerUrls } from '@draw-house/common/dist/commonUrls';
import { generateUUID } from '@draw-house/common/dist/utils';
import path from 'path';
import { spawn } from 'child_process';
import { mkdir, rm } from 'fs/promises';
import assert from 'assert';
import { floorPlanRecognitionTimeoutInMinutes } from '@draw-house/common/dist/constants';
import { readFileSync } from 'fs';
import { FloorPlanRecognitionResult } from '../zod/FloorPlanRecognitionResult';

// Helper function to get image width using built-in Node.js modules
const getImageWidth = (buffer: Buffer): number | null => {
  try {
    // Check for PNG signature
    if(buffer.length >= 24 && buffer.toString('hex', 0, 8) === '89504e470d0a1a0a') {
      // PNG: width is at bytes 16-19 (big endian)
      return buffer.readUInt32BE(16);
    }

    // Check for JPEG signature
    if(buffer.length >= 4 && buffer.toString('hex', 0, 4) === 'ffd8ffe0') {
      // JPEG: scan for SOF markers to find dimensions
      let offset = 2;
      while(offset < buffer.length - 8) {
        const marker = buffer.readUInt16BE(offset);

        // SOF0, SOF1, SOF2 markers contain dimensions
        if(marker === 0xffc0 || marker === 0xffc1 || marker === 0xffc2) {
          // Width is at offset + 7 (big endian, 2 bytes)
          return buffer.readUInt16BE(offset + 7);
        }

        // Skip to next marker
        const segmentLength = buffer.readUInt16BE(offset + 2);
        offset += 2 + segmentLength;
      }
    }

    // Check for WebP signature
    if(buffer.length >= 30 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
      // WebP VP8 format
      if(buffer.toString('ascii', 12, 16) === 'VP8 ') {
        // Simple VP8 format: width at offset 26-27 (little endian, 14 bits)
        const widthAndHeight = buffer.readUInt32LE(26);
        // eslint-disable-next-line no-bitwise
        return (widthAndHeight & 0x3fff) + 1;
      }
      // WebP VP8L format
      if(buffer.toString('ascii', 12, 16) === 'VP8L') {
        // VP8L format: width in bits 0-13 of 4-byte value at offset 21
        const widthAndHeight = buffer.readUInt32LE(21);
        // eslint-disable-next-line no-bitwise
        return ((widthAndHeight & 0x3fff) + 1);
      }
    }

    return null;
  } catch(e) {
    return null;
  }
};

const runCommand = (command: string) => (
  new Promise<true | 'fail' | 'timeout'>(res => {
    const [program, ...args] = command.split(' ');
    assert(!isUndefined(program), 'Something went wrong. |cxl666|');

    const childProcess = spawn(program, args, {
      env: {
        // eslint-disable-next-line no-process-env
        ...process.env,
        PYTHONIOENCODING: 'utf-8',
      },
    });
    let buffer = '';

    const timeout = global.setTimeout(() => {
      childProcess.kill('SIGKILL');
      res('timeout');
    }, floorPlanRecognitionTimeoutInMinutes * 60 * 1000);

    childProcess.stdout.on('data', e => {
      buffer += e.toString();

      if(buffer.includes('Warning: Checkpoint not found at')) {
        global.clearTimeout(timeout);
        childProcess.kill('SIGKILL');
        res('fail');
      }
    });

    childProcess.stderr.on('data', () => {
      global.clearTimeout(timeout);
      childProcess.kill('SIGKILL');
      res('fail');
    });

    childProcess.on('close', code => {
      global.clearTimeout(timeout);
      res(code === 0 ? true : 'fail');
    });

    childProcess.on('error', () => {
      global.clearTimeout(timeout);
      res('fail');
    });
  })
);

// Helper function to extract doors from classification JSON
const extractDoorsFromClassificationJson = (classificationData: any, confidenceThreshold: number) => {
  const doors: Array<{ confidence: number; width: number; boundingBox: { x1: number; y1: number; x2: number; y2: number } }> = [];

  if(!classificationData.detections || !Array.isArray(classificationData.detections)) {
    return doors;
  }

  for(const detection of classificationData.detections) {
    if(detection.class === 'Door' && detection.confidence >= confidenceThreshold) {
      const { x1, y1, x2, y2, confidence } = detection;

      // Calculate door width from bounding box (use longer dimension for floor plans)
      // In floor plans, doors are shown closed, so the longer edge represents the actual door width
      const boxWidth = Math.abs(x2 - x1);
      const boxHeight = Math.abs(y2 - y1);
      const doorWidth = Math.max(boxWidth, boxHeight);

      doors.push({
        confidence,
        width: doorWidth,
        boundingBox: { x1, y1, x2, y2 },
      });
    }
  }

  return doors;
};

// Helper function to find the most common door width using clustering approach
const findMostCommonDoorWidth = (doorWidths: number[]): number => {
  if(doorWidths.length === 0) {
    throw new Error('No door widths provided');
  }

  if(doorWidths.length === 1) {
    const singleWidth = doorWidths[0];
    if(singleWidth === undefined) {
      throw new Error('Door width array contains undefined value');
    }
    return singleWidth;
  }

  // Sort the widths to make clustering easier
  const sortedWidths = [...doorWidths].sort((a, b) => a - b);

  // Define tolerance as a percentage of the median width (typically 10-15%)
  const medianWidth = sortedWidths[Math.floor(sortedWidths.length / 2)];
  if(medianWidth === undefined) {
    throw new Error('Unable to calculate median width from sorted widths');
  }
  const tolerance = medianWidth * 0.12; // 12% tolerance for grouping similar widths

  // Group similar widths together
  const clusters: Array<{ representativeWidth: number; count: number; widths: number[] }> = [];

  for(const width of sortedWidths) {
    // Find if this width belongs to an existing cluster
    let belongsToCluster = false;

    for(const cluster of clusters) {
      if(Math.abs(width - cluster.representativeWidth) <= tolerance) {
        cluster.widths.push(width);
        cluster.count++;
        // Update representative width to be the average of the cluster
        cluster.representativeWidth = cluster.widths.reduce((sum, w) => sum + w, 0) / cluster.widths.length;
        belongsToCluster = true;
        break;
      }
    }

    // If it doesn't belong to any cluster, create a new one
    if(!belongsToCluster) {
      clusters.push({
        representativeWidth: width,
        count: 1,
        widths: [width],
      });
    }
  }

  // Sort clusters by count (most common first)
  clusters.sort((a, b) => b.count - a.count);

  // Return the representative width of the most common cluster
  const mostCommonCluster = clusters[0];
  if(!mostCommonCluster) {
    throw new Error('No clusters found for door widths');
  }

  const mostCommonWidth = mostCommonCluster.representativeWidth;

  return mostCommonWidth;
};

export const mountFrontPlanImage = (app: Express) => {
  app.get<unknown, routes.floorPlanImage.autoscale.RouteResponse>(floorPlanScannerUrls.floorPlanImage.autoscale, async (req, res) => {
    const queryParams = routes.floorPlanImage.autoscale.ReqQuery.safeParse(req.query);
    if(queryParams.success === false) {
      res.json({
        success: false,
        error: {
          type: 'WrongQueryParams',
          __WARNING_DO_NOT_USE__zodIssues: queryParams.error.issues,
        },
      });
      return;
    }
    const { url, confidence } = queryParams.data;

    const floorPlanNameUUID = generateUUID();
    const floorPlanFilePath = `public/uploaded-floor-plans/${floorPlanNameUUID}${path.parse(url).ext}`;
    const outputDir = path.resolve('results', floorPlanNameUUID);

    try {
      await downloadFile(url, path.resolve(floorPlanFilePath));
    } catch(e) {
      res.json({
        success: false,
        error: { type: 'FileDownloadError' },
      });
      return;
    }

    try {
      const imageBuffer = readFileSync(path.resolve(floorPlanFilePath));
      const originalImageWidth = getImageWidth(imageBuffer);

      if(isNull(originalImageWidth)) {
        throw new Error('Could not get image width');
      }

      await mkdir(outputDir, { recursive: true });

      const classificationProcess = spawn('python', [
        '-u',
        './classification/detect.py',
        path.resolve(floorPlanFilePath),
        '--doors',
        '--confidence', confidence.toString(),
        '--output-json', path.resolve(outputDir, 'classification_details.json'),
        '--quiet',
      ], {
        env: {
          // eslint-disable-next-line no-process-env
          ...process.env,
          PYTHONIOENCODING: 'utf-8',
        },
        cwd: path.resolve('.'),
      });

      const classificationResult = await new Promise<{ success: boolean; stdout: string; stderr: string }>(resolve => {
        let stdout = '';
        let stderr = '';

        classificationProcess.stdout.on('data', data => {
          stdout += data.toString();
        });

        classificationProcess.stderr.on('data', data => {
          stderr += data.toString();
        });

        classificationProcess.on('close', code => {
          resolve({
            success: code === 0,
            stdout,
            stderr,
          });
        });

        global.setTimeout(() => {
          classificationProcess.kill('SIGKILL');
          resolve({
            success: false,
            stdout,
            stderr: `${stderr}\nTimeout: Classification took too long`,
          });
        }, 60_000);
      });

      if(classificationResult.success === false) {
        console.error('Classification failed:', classificationResult.stderr);
        res.json({
          success: false,
          error: { type: 'ClassificationFailed' },
        });
        return;
      }

      const classificationJsonPath = path.resolve(outputDir, 'classification_details.json');
      let classificationData;

      try {
        const jsonContent = await readFile(classificationJsonPath);
        if(isNull(jsonContent)) {
          throw new Error('Classification JSON file not found');
        }
        classificationData = JSON.parse(jsonContent);
      } catch(e) {
        res.json({
          success: false,
          error: { type: 'ClassificationParsingFailed' },
        });
        return;
      }

      const doors = extractDoorsFromClassificationJson(classificationData, parseFloat(confidence.toString()));

      if(doors.length === 0) {
        res.json({
          success: false,
          error: { type: 'NoDoorsFound' },
        });
        return;
      }

      const doorWidths = doors.map(e => e.width);
      const mostCommonDoorWidth = findMostCommonDoorWidth(doorWidths);

      // Calculate the scale ratio accounting for app's normalization to assets2DDefaultSize (5 meters)
      // The app normalizes all images to 5 meters width, regardless of original pixel dimensions
      const assets2DDefaultSize = 5; // meters - same as the app constant
      const standardDoorWidthMeters = 0.9; // 90cm standard door width in meters

      // Calculate how many meters each pixel represents in the normalized display
      const metersPerPixel = assets2DDefaultSize / originalImageWidth;

      // Convert the detected door width from pixels to meters in the normalized display
      const mostCommonDoorWidthMeters = mostCommonDoorWidth * metersPerPixel;

      // Calculate scale ratio to make the detected door match the standard door size
      const scaleRatio = standardDoorWidthMeters / mostCommonDoorWidthMeters;

      res.json({
        success: true,
        data: {
          scaleRatio,
          smallestDoorWidth: mostCommonDoorWidth, // Keep the same field name for compatibility
          totalDoorsFound: doors.length,
        },
      });
    } catch(e) {
      console.error('Autoscale calculation error:', e);
      res.json({
        success: false,
        error: { type: 'AutoscaleCalculationFail' },
      });
    } finally {
      // Clean up files - keep classification results in results directory for debugging
      try {
        await rm(path.resolve(floorPlanFilePath), { force: true });
        // Note: Not cleaning up outputDir to preserve classification_details.json for debugging
      } catch(e) {
        // Ignore cleanup errors
      }
    }
  });

  app.get<unknown, routes.floorPlanImage.scan.RouteResponse>(floorPlanScannerUrls.floorPlanImage.scan, async (req, res) => {
    const queryParams = routes.floorPlanImage.scan.ReqQuery.safeParse(req.query);
    if(queryParams.success === false) {
      res.json({
        success: false,
        error: {
          type: 'WrongQueryParams',
          __WARNING_DO_NOT_USE__zodIssues: queryParams.error.issues,
        },
      });
      return;
    }

    const floorPlanNameUUID = generateUUID();
    const floorPlanFilePath = `public/uploaded-floor-plans/${floorPlanNameUUID}${path.parse(queryParams.data.url).ext}`;

    try {
      await downloadFile(queryParams.data.url, path.resolve(floorPlanFilePath));
    } catch(e) {
      res.json({
        success: false,
        error: {
          type: 'FileDownloadError',
        },
      });
      return;
    }

    try {
      const command = `python -u ./test_inference.py ./${floorPlanFilePath} --wall-threshold ${queryParams.data.wallThreshold} --door-threshold ${queryParams.data.wallFurnitureThreshold}`;

      const recognitionResult = await runCommand(command);

      if(recognitionResult !== true) {
        switch(recognitionResult) {
          case 'fail':
            res.json({
              success: false,
              error: {
                type: 'FloorPlanRecognitionFail',
              },
            });
            return;
          case 'timeout':
            res.json({
              success: false,
              error: {
                type: 'FloorPlanRecognitionTimeoutReached',
              },
            });
            return;
          default:
            ((e: never) => e)(recognitionResult);
            throw new Error('This should never happen. |xq42xi|');
        }
      }

      const floorPlanDataPath = path.resolve('results', floorPlanNameUUID, 'floorplan.txt');

      const floorPlanData = await readFile(floorPlanDataPath);
      if(isNull(floorPlanData)) {
        res.json({
          success: false,
          error: {
            type: 'FloorPlanRecognitionFail',
          },
        });
        return;
      }

      const { success, data } = FloorPlanRecognitionResult.safeParse(floorPlanData);
      if(success === false) {
        res.json({
          success: false,
          error: {
            type: 'FloorPlanRecognitionFail',
          },
        });
        return;
      }

      res.json({
        success: true,
        data,
      });
    } finally {
      rm(path.resolve('results', floorPlanNameUUID), { recursive: true, force: true });
      rm(path.resolve(floorPlanFilePath), { recursive: true, force: true });
    }
  });
};
