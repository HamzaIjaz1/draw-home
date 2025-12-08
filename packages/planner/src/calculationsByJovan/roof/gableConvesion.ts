import { Vector2, Vector3 } from 'three';
import { getNotUndefined, isArrayLength } from '@arthurka/ts-utils';
import { Line, RoofParts } from '../types';
import { hipToGableFace } from '../roofUtils/hipToGablePoints';

export function convertHipsToGables(
  hipRoofParts: RoofParts,
  skeletonLines: Line[],
  gableIndices: number[],
  offset: number,
  findOriginalFromOffset: (offsetX: number, offsetY: number) => { x: number; y: number } | undefined,
): {
    gableRoofParts: RoofParts;
    wallIntersections: Array<{
    index: number;
    point: Vector3;
    sinkPoints: [Vector2, Vector2];
    }>;
    updatedGableIndices: number[];
    updatedSkeletonLines: Line[];
  } {
  // Filter out pyramidal faces from gable conversion
  // In pyramidal roofs, multiple skeleton lines meet at one central point (thirdLines.length > 1)
  // These faces should not be converted to gables - they should remain as hip faces
  const filteredGableIndices = gableIndices.filter(gableIndex => {
    const targetPart = hipRoofParts[gableIndex];

    if(!targetPart || targetPart.length !== 3) {
      return true; // Keep non-triangular faces in the list
    }

    // Find the highest vertex (peak)
    const sourceVertex = targetPart.reduce(
      (maxVertex, vertex) => (vertex.y > maxVertex.y ? vertex : maxVertex),
      targetPart[0],
    );

    const sinkVertices = targetPart.filter(vertex => !vertex.equals(sourceVertex));

    // Find skeleton lines connected to the peak
    const filteredSkeletonLines = skeletonLines.filter(
      line => line.start.equals(sourceVertex) || line.end.equals(sourceVertex),
    );

    // Find the "third lines" - skeleton lines that don't connect to this face's sink vertices
    const thirdLines = filteredSkeletonLines.filter(
      line => !sinkVertices.some(sink => line.start.equals(sink) || line.end.equals(sink)),
    );

    // Pyramidal roof has multiple third lines converging at peak
    // Filter OUT these faces (return false to exclude from gable conversion)
    return thirdLines.length <= 1;
  });

  const { updatedRoofParts: gableRoofParts, intersections: wallIntersectionPt, updatedGableIndices, updatedSkeletonLines } =
    hipToGableFace(hipRoofParts, skeletonLines, filteredGableIndices, offset);

  const wallIntersections = wallIntersectionPt
    .map(({ index, wallIntersection, sinkPoints }) => ({
      index,
      point: wallIntersection,
      sinkPoints: sinkPoints.map(sinkPoint => {
        const originalPoint = getNotUndefined(
          findOriginalFromOffset(sinkPoint.x, sinkPoint.z),
          'Could not find original point for offset',
        );
        return new Vector2(originalPoint.x, originalPoint.y);
      }),
    }))
    .filter((e): e is typeof e & { sinkPoints: [Vector2, Vector2] } => isArrayLength(e.sinkPoints, '===', 2));

  return { gableRoofParts, wallIntersections, updatedGableIndices, updatedSkeletonLines };
}
