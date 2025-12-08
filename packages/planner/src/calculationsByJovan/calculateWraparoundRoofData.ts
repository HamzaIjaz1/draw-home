import { Vector2, Vector3 } from 'three';
import { Line, RoofParts } from './types';
import { findGableBasePoints, generateQuadsFromPairs, hasExactlyTwoGableEnds, pairPointsFromGables, shouldFlipPoints } from './roofUtils/singlePitchRoofUtils';


import { prepareCoordinates } from './roof/inputDataPreparation';
import { generateRoofFaces } from './roof/faceGeneration';
import { generateRoofSkeleton } from './roof/skeletonHandling';
import { generateDebugLines } from './roof/debugLines';


export const calculateWraparoundRoofData = ({
  coords: [...coords],
  offset,
  roofHeightFromBase,
  roofSlope: _roofSlope,
  flipSide,
}: {
  coords: Vector2[];
  offset: number;
  roofHeightFromBase: number;
  roofSlope: number;
  flipSide: boolean;
}): {
  roofParts: RoofParts;
  boundaryLines: Line[];
  skeletonLines: Line[];
  boundaryBaseLines: Line[];
} => {
  // Prepare coordinates
  const { polygon } = prepareCoordinates(coords, offset);

  const adjustedRoofHeight = roofHeightFromBase - (offset / 2);
  // Generate roof skeleton and extract vertices
  const { adjustedSkeletonForHeight, verticesForFaces, skeletonCleaned } = generateRoofSkeleton(
    polygon,
    _roofSlope,
    adjustedRoofHeight,
  );

  // Generate roof faces
  const hipRoofParts = generateRoofFaces(polygon.length, verticesForFaces, skeletonCleaned);

  // Generate debug lines for skeleton visualization
  const { boundaryLines, boundaryBaseLines } = generateDebugLines(
    adjustedSkeletonForHeight,
    polygon,
    adjustedRoofHeight,
  );

  // 1. First condition:
  // Check if the roof has exactly two gable ends
  const isValidWraparound = hasExactlyTwoGableEnds(hipRoofParts);

  // 2. Second condition:
  // The pats are made beetwen two gable walss. Counting the points and determining if the
  // Points are symetric (each point should have a pair).
  // Find base points of gable parts and ensure correct ordering
  const polygonPoints = polygon.map(p => new Vector2(p[0], p[1]));
  const gableBasePoints = hipRoofParts
    .filter(part => part.length === 3)
    .map(findGableBasePoints)
    .filter((points): points is [Vector3, Vector3] => points !== null)
    .map((points, index) => index === 1 && shouldFlipPoints(points, polygonPoints)
      ? [points[1], points[0]] as [Vector3, Vector3]
      : points);


  // Add point pairing logic for wraparound roofs
  // 3. Selecting a side to rise (configurable via flipSide parameter)
  let pointPairs: Array<[Vector3, Vector3]> = [];
  if(isValidWraparound && gableBasePoints.length === 2) {
    const side = flipSide ? 'outside' : 'inside';
    pointPairs = pairPointsFromGables(gableBasePoints, polygonPoints, _roofSlope, side);
  }

  // 4. Making new quads (roof parts) from those points.
  // Generate new quads from point pairs if valid wraparound
  let wraparoundQuads: RoofParts = [];
  if(isValidWraparound && pointPairs.length > 0) {
    wraparoundQuads = generateQuadsFromPairs(pointPairs);
  }

  const combinedRoofParts = [...wraparoundQuads];

  // For wraparound roofs, show the ridge lines by connecting the two points within each pair
  // Skip the first and last pairs (gable ends) and show lines for all interior pairs
  const wraparoundSkeletonLines: Line[] = [];
  if(isValidWraparound && pointPairs.length >= 3) {
    // For each interior pair, connect pair[0] to pair[1]
    for(let i = 1; i < pointPairs.length - 1; i++) {
      const pair = pointPairs[i];

      if(pair) {
        wraparoundSkeletonLines.push({
          start: pair[0], // First point of the pair (elevated)
          end: pair[1], // Second point of the pair (ground)
        });
      }
    }
  }

  return {
    roofParts: combinedRoofParts,
    boundaryLines,
    skeletonLines: wraparoundSkeletonLines, // Use filtered skeleton lines instead of full hip skeleton
    boundaryBaseLines,
  };
};
