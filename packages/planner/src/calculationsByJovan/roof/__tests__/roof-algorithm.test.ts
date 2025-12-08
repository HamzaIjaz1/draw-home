/**
 * Roof Algorithm Snapshot Tests
 *
 * This test suite captures the behavior of the entire roof generation pipeline.
 * It tests three critical stages:
 * 1. Point Preparation (cleaning, offsetting, rotating to optimal start)
 * 2. Skeletonization (generating the roof skeleton with pitch)
 * 3. Polygonization (creating the final roof faces)
 *
 * HOW TO USE:
 *
 * 1. First run (create snapshots):
 *    npm run test:run -w packages/planner
 *    This will create snapshot files in __snapshots__/ directory
 *
 * 2. After making changes to the roof algorithm:
 *    npm run test:run -w packages/planner
 *    - If tests PASS: Your changes didn't break any existing roofs ✓
 *    - If tests FAIL: Review the diff to see what changed
 *
 * 3. If the changes are intentional:
 *    npm run test:update -w packages/planner
 *    This updates the snapshots with the new expected output
 *
 * 4. To run tests in watch mode during development:
 *    npm run test -w packages/planner
 */

import { describe, expect, it } from 'vitest';
import { Vector2 } from 'three';
import { getPolygonPoints } from '../../roofUtils/pointsTest';
import { prepareCoordinates } from '../inputDataPreparation';
import { generateRoofSkeleton } from '../skeletonHandling';
import { generateRoofFaces } from '../faceGeneration';

// Test configuration
const TEST_CONFIG = {
  offset: 0.1,
  roofSlope: 30, // degrees
  roofHeightFromBase: 3, // meters
};

// Helper function to convert 2D points to Vector2
function toVector2Array(points: Array<[number, number]>): Vector2[] {
  return points.map(([x, z]) => new Vector2(x, z));
}

// Helper to serialize Vector3 for snapshots (avoids NaN issues)
function serializeVector3(v: any) {
  return {
    x: Number.isNaN(v.x) ? 'NaN' : v.x,
    y: Number.isNaN(v.y) ? 'NaN' : v.y,
    z: Number.isNaN(v.z) ? 'NaN' : v.z,
  };
}

// VERIFIED WORKING polygons (visually inspected on 2025-10-15)
const workingPolygons = [
  'rectangle',
  't_shape_1',
  't_shape_2', // Added 2025-10-16 - skeletonization bugs fixed
  't_shape_3', // Added 2025-10-16 - skeletonization bugs fixed
  't_shape_4',
  't_shape_5_tier2', // Added 2025-10-15 - verified working
  't_shape_6_tier2', // Added 2025-10-15 - verified working (bugs fixed)
  't_shape_7_tier2', // Added 2025-10-15 - verified working
  't_shape_8_tier2', // Added 2025-10-16 - verified working
  't_shape_9_tier2', // Added 2025-10-16 - verified working
  't_shape_10_tier2', // Added 2025-10-16 - verified working
  't_shape_11_tier2', // Added 2025-10-22 - verified working
  'l_shape_1',
  'l_shape_2',
  'l_shape_3',
  'u_shape',
  'u_shape_2_tier2', // Added 2025-10-21 - verified working
  'u_shape_3_tier2', // Added 2025-10-21 - verified working
  'd_square_1',
  'd_square_2',
  'd_square_3',
  'd_square_4_tier2', // Added 2025-10-15 - verified working
  'complex_1', // Added 2025-10-16 - skeletonization bugs fixed
  'complex_2', // Added 2025-10-15 - verified working (was in polygonizationBugs)
  'complex_3',
  'complex_4_tier2', // Added 2025-10-15 - verified working
  'complex_5_tier2', // Added 2025-10-15 - verified working (bugs fixed)
  'complex_6_tier2', // Added 2025-10-17 - verified working (bugs fixed)
  'complex_7_tier2', // Added 2025-10-16 - verified working
  'complex_8_tier2', // Added 2025-10-16 - verified working
  'complex_9_tier2', // Added 2025-10-16 - verified working
  'complex_10_tier2', // Added 2025-10-17 - verified working (bugs fixed)
  'complex_11_tier2', // Added 2025-10-18 - verified working (bugs fixed)
  'complex_12_tier2', // Added 2025-10-18 - verified working (bugs fixed)
  'complex_13_tier3', // Added 2025-10-29 - verified working (ghost edge removal fixed)
  'straight_cross', // Added 2025-10-16 - verified working (Ray2 intersection bug fixed)
  'simple_1',
  'simple_2',
  'half_iron_cross', // Added 2025-10-15 - verified working (was in polygonizationBugs)
  'bug_concave', // Added 2025-10-16 - polygonization bugs fixed
  'the_sacred_polygon',
] as const;

describe('Roof Algorithm - Complete Pipeline Tests', () => {
  describe('Stage 1: Point Preparation', () => {
    workingPolygons.forEach(polygonName => {
      it(`should prepare points correctly for: ${polygonName}`, () => {
        const points = getPolygonPoints(polygonName);
        const coords = toVector2Array(points);

        const result = prepareCoordinates(coords, TEST_CONFIG.offset);

        // Snapshot the prepared data
        expect(result).toMatchSnapshot();

        // Additional assertions to catch obvious bugs
        expect(result.polygon.length).toBeGreaterThan(2);
        expect(result.offsetCoordsOriginalCoordsMatched.length).toBe(result.polygon.length);
      });
    });
  });

  describe('Stage 2: Skeletonization', () => {
    workingPolygons.forEach(polygonName => {
      it(`should generate skeleton correctly for: ${polygonName}`, () => {
        const points = getPolygonPoints(polygonName);
        const coords = toVector2Array(points);
        const { polygon } = prepareCoordinates(coords, TEST_CONFIG.offset);

        const result = generateRoofSkeleton(
          polygon,
          TEST_CONFIG.roofSlope,
          TEST_CONFIG.roofHeightFromBase,
        );

        // Serialize Vector3 arrays for snapshot
        const serializedResult = {
          adjustedSkeletonForHeight: result.adjustedSkeletonForHeight,
          verticesForFaces: result.verticesForFaces.map(serializeVector3),
          skeletonCleaned: result.skeletonCleaned,
        };

        expect(serializedResult).toMatchSnapshot();

        // Additional assertions
        expect(result.verticesForFaces.length).toBeGreaterThan(0);
        expect(result.skeletonCleaned.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Stage 3: Polygonization', () => {
    workingPolygons.forEach(polygonName => {
      it(`should generate roof faces correctly for: ${polygonName}`, () => {
        const points = getPolygonPoints(polygonName);
        const coords = toVector2Array(points);
        const { polygon } = prepareCoordinates(coords, TEST_CONFIG.offset);

        const { verticesForFaces, skeletonCleaned } = generateRoofSkeleton(
          polygon,
          TEST_CONFIG.roofSlope,
          TEST_CONFIG.roofHeightFromBase,
        );

        const result = generateRoofFaces(
          polygon.length,
          verticesForFaces,
          skeletonCleaned,
        );

        // Serialize the roof faces
        const serializedResult = result.map(face => face.map(serializeVector3));

        expect(serializedResult).toMatchSnapshot();

        // Additional assertions
        expect(result.length).toBeGreaterThan(0);
        result.forEach((face, faceIndex) => {
          expect(face.length, `Face ${faceIndex} should have at least 3 vertices`).toBeGreaterThanOrEqual(3);
        });
      });
    });
  });

  describe('Stage 4: Full Pipeline Integration', () => {
    workingPolygons.forEach(polygonName => {
      it(`should complete full pipeline for: ${polygonName}`, () => {
        const points = getPolygonPoints(polygonName);
        const coords = toVector2Array(points);

        // Stage 1: Prepare
        const { polygon, offsetCoordsOriginalCoordsMatched } = prepareCoordinates(
          coords,
          TEST_CONFIG.offset,
        );

        // Stage 2: Skeletonize
        const { adjustedSkeletonForHeight, verticesForFaces, skeletonCleaned } =
          generateRoofSkeleton(
            polygon,
            TEST_CONFIG.roofSlope,
            TEST_CONFIG.roofHeightFromBase,
          );

        // Stage 3: Polygonize
        const roofFaces = generateRoofFaces(
          polygon.length,
          verticesForFaces,
          skeletonCleaned,
        );

        // Capture the complete pipeline output
        const fullResult = {
          inputPolygonVertexCount: points.length,
          preparedPolygonVertexCount: polygon.length,
          skeletonNodeCount: skeletonCleaned.length,
          vertexCount: verticesForFaces.length,
          faceCount: roofFaces.length,
          // Include all stage outputs
          offsetCoordsMapping: offsetCoordsOriginalCoordsMatched,
          skeleton: adjustedSkeletonForHeight,
          vertices: verticesForFaces.map(serializeVector3),
          faces: roofFaces.map(face => face.map(serializeVector3)),
        };

        expect(fullResult).toMatchSnapshot();

        // High-level sanity checks
        expect(fullResult.faceCount).toBeGreaterThan(0);
        expect(fullResult.vertexCount).toBeGreaterThan(fullResult.preparedPolygonVertexCount);
      });
    });
  });
});

describe('Roof Algorithm - Known Bug Cases', () => {
  // BROKEN: Skeletonization issues (verified 2025-10-15)
  const skeletonizationBugs = [
    // All skeletonization bugs have been fixed as of 2025-10-16
  ] as const;

  // BROKEN: Polygonization issues (verified 2025-10-15)
  const polygonizationBugs = [
    // 'complex_2',      // MOVED TO WORKING - verified 2025-10-15
    'misshapen', // Extra lines in polygonization
    // 'half_iron_cross', // MOVED TO WORKING - verified 2025-10-15
    // 'bug_concave',    // MOVED TO WORKING - verified 2025-10-16
    // 'complex_6_tier2', // MOVED TO WORKING - verified 2025-10-17
  ] as const;

  describe('Skeletonization Bugs', () => {
    skeletonizationBugs.forEach(polygonName => {
      it.skip(`should fix skeletonization for: ${polygonName}`, () => {
        const points = getPolygonPoints(polygonName);
        const coords = toVector2Array(points);
        const { polygon } = prepareCoordinates(coords, TEST_CONFIG.offset);

        const { skeletonCleaned } = generateRoofSkeleton(
          polygon,
          TEST_CONFIG.roofSlope,
          TEST_CONFIG.roofHeightFromBase,
        );

        // TODO: Add specific assertions about what the skeleton should look like
        // When fixed, move this polygon to workingPolygons array above
        expect(skeletonCleaned.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Polygonization Bugs', () => {
    polygonizationBugs.forEach(polygonName => {
      it.skip(`should fix polygonization for: ${polygonName}`, () => {
        const points = getPolygonPoints(polygonName);
        const coords = toVector2Array(points);
        const { polygon } = prepareCoordinates(coords, TEST_CONFIG.offset);

        const { verticesForFaces, skeletonCleaned } = generateRoofSkeleton(
          polygon,
          TEST_CONFIG.roofSlope,
          TEST_CONFIG.roofHeightFromBase,
        );

        const result = generateRoofFaces(
          polygon.length,
          verticesForFaces,
          skeletonCleaned,
        );

        // TODO: Add specific assertions about what faces should be generated
        // When fixed, move this polygon to workingPolygons array above
        expect(result.length).toBeGreaterThan(0);
      });
    });
  });
});
