import { Vector2, Vector3 } from 'three';
import { isArrayLength, ObjFromEntries } from '@arthurka/ts-utils';
import { Line, RoofParts } from './types';

import { findOriginalFromOffset } from './Utils/Maths/operators';

import { prepareCoordinates } from './roof/inputDataPreparation';
import { generateRoofFaces } from './roof/faceGeneration';
import { handleDormers } from './roof/dormersHandling';
import { generateRoofSkeleton } from './roof/skeletonHandling';
import { generateDebugLines } from './roof/debugLines';
import { GableStrategyRegistry } from './roof/gableStrategies';
import type { GableType } from './roof/gableStrategies';
import type { RoofsStore } from '../zustand/useRoofs';

// ============================================
// TEST MODE: Import test polygon points
// ============================================
import { pointsData } from './roofUtils/pointsTest';

// TEST CONFIGURATION
// Change this to test different polygons from pointsTest.ts
const TEST_POLYGON_NAME = 'complex_6_tier2'; // Options: 'rectangle', 't_shape_1', 'l_shape_1', etc.
const USE_TEST_DATA = false; // Set to false to use real app data
// ============================================

export const calculateHipRoofData = ({
  coords: [...coords],
  offset,
  roofHeightFromBase,
  roofSlope: _roofSlope,
  gableIndices,
  isClosedGable,
}: {
  coords: Vector2[];
  offset: number;
  roofHeightFromBase: number;
  roofSlope: number;
  gableIndices: number[];
  isClosedGable: boolean;
}): {
  roofParts: RoofParts;
  dormerBody: RoofParts;
  transformableGableToHipRoofParts: RoofsStore['roofs'][number]['roofData']['transformableGableToHipRoofParts'];
  boundaryLines: Line[];
  skeletonLines: Line[];
  boundaryBaseLines: Line[];
  updatedGableIndices: number[];
  wallIntersections: Array<{
    index: number;
    point: Vector3;
    sinkPoints: [Vector2, Vector2];
  }>;
} => {
  const gableConfigurations = ObjFromEntries(gableIndices.map(e => [e, { type: isClosedGable === true ? 'closed' : 'open' }] as const));

  const dormerPositions: Vector3[] = [];
  const dormerMainRoofPartIndices: number[] = [];
  const dormerTypes: string[] = [];

  // ============================================
  // TEST MODE: Override coords with test data
  // ============================================
  let finalCoords = coords;

  if(USE_TEST_DATA) {
    const testPoints = pointsData[TEST_POLYGON_NAME];
    if(testPoints) {
      // Convert [x, y, z] to Vector2(x, z) - ignoring the y coordinate
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      finalCoords = testPoints.map(([x, _y, z]) => new Vector2(x, z));
    } else {
      console.warn(`⚠️ Test polygon "${TEST_POLYGON_NAME}" not found, using app data`);
    }
  }
  // ============================================

  // Prepare coordinates
  const { offsetCoordsOriginalCoordsMatched, polygon } = prepareCoordinates(finalCoords, offset);

  const adjustedRoofHeight = roofHeightFromBase - (offset / 2);
  // Generate roof skeleton and extract vertices
  const { adjustedSkeletonForHeight, verticesForFaces, skeletonCleaned } = generateRoofSkeleton(polygon, _roofSlope, adjustedRoofHeight);

  // Generate roof faces
  const hipRoofParts = generateRoofFaces(polygon.length, verticesForFaces, skeletonCleaned);


  // eslint-disable-next-line @typescript-eslint/array-type
  // const dormerPlacements: ('roof' | 'inset' | 'wall')[] = dormerPositions.map(() => 'inset' as 'inset');
  // eslint-disable-next-line @typescript-eslint/array-type, @typescript-eslint/prefer-as-const
  // const dormerPlacements: ('roof' | 'inset' | 'wall')[] = dormerPositions.map(() => 'wall' as 'wall');
  // eslint-disable-next-line @typescript-eslint/prefer-as-const, @typescript-eslint/array-type
  const dormerPlacements: ('roof' | 'inset' | 'wall')[] = dormerPositions.map(() => 'roof' as 'roof');
  const dormerSoffits = dormerPositions.map(() => 0.1);

  // Generate debug lines
  const { skeletonLines, boundaryLines, boundaryBaseLines } = generateDebugLines(adjustedSkeletonForHeight, polygon, adjustedRoofHeight);

  // Convert hips to gables using strategy pattern
  // Group gable indices by their configured type
  const gablesByType = gableIndices.reduce((acc, index) => {
    const config = gableConfigurations[index] || { type: 'open' as const };
    if(!acc[config.type]) {
      acc[config.type] = [];
    }
    acc[config.type].push(index);
    return acc;
  }, {} as Record<GableType, number[]>);

  // Apply each strategy to its respective gable indices
  let currentRoofParts = hipRoofParts;
  let currentSkeletonLines = skeletonLines;
  const allWallIntersections: Array<{ index: number; point: Vector3; sinkPoints: [Vector2, Vector2] }> = [];
  const allUpdatedGableIndices: number[] = [];

  for(const [gableType, indices] of Object.entries(gablesByType) as Array<[GableType, number[]]>) {
    if(indices.length === 0) {
      continue;
    }

    const strategy = GableStrategyRegistry.getStrategy(gableType);
    const result = strategy.convert(
      currentRoofParts,
      currentSkeletonLines,
      indices,
      offset,
      (offsetX, offsetY) => findOriginalFromOffset(offsetCoordsOriginalCoordsMatched, offsetX, offsetY),
      roofHeightFromBase,
      _roofSlope,
    );

    currentRoofParts = result.gableRoofParts;
    currentSkeletonLines = result.updatedSkeletonLines;
    allWallIntersections.push(...result.wallIntersections);
    allUpdatedGableIndices.push(...result.updatedGableIndices);
  }

  const gableRoofParts = currentRoofParts;
  const wallIntersections = allWallIntersections;
  const updatedGableIndices = allUpdatedGableIndices;
  const updatedSkeletonLines = currentSkeletonLines;

  // Handle dormers
  const { dormerBodyParts, dormerRoofParts } = handleDormers(
    gableRoofParts,
    dormerTypes,
    dormerPositions,
    dormerMainRoofPartIndices,
    dormerPlacements,
    offset,
    dormerSoffits,
    gableIndices,
    adjustedRoofHeight,
  );

  // Combine the main roof parts with the dormer roof parts
  const combinedRoofParts = [...gableRoofParts, ...dormerRoofParts];


  // Adding normals

  return {
    roofParts: combinedRoofParts,
    dormerBody: dormerBodyParts || [],
    transformableGableToHipRoofParts: hipRoofParts
      .map((e, i) => ({
        index: i,
        part: e,
      }))
      .filter(
        (e): e is typeof e & { part: [typeof e.part[number], typeof e.part[number], typeof e.part[number]] } => isArrayLength(e.part, '===', 3),
      ),
    updatedGableIndices,
    wallIntersections,
    boundaryLines,
    skeletonLines: updatedSkeletonLines, // Use updated skeleton lines after gable conversion
    boundaryBaseLines,
  };
};
