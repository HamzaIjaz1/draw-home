import { MathUtils, Plane, Vector2, Vector3 } from 'three';
import { getNotUndefined, isArrayLength } from '@arthurka/ts-utils';
import { RoofParts } from './types';
import { roundToTwoDecimals } from './Utils/Maths/operators';
import { offsetPolygon } from './Utils/Curve/utils';
import { computeOrientedBoundingBox } from './Utils/Geometry/orientedBoundingBox';
import { isContourClockwise } from '../utils/isContourClockwise';

export const calculateSlantedRoofData = ({
  coords: _coords,
  offset,
  roofHeightFromBase,
  roofSlope: _roofSlope,
  slopeOrientation,
}: {
  coords: Vector2[];
  offset: number;
  roofHeightFromBase: number;
  roofSlope: number;
  slopeOrientation: number;
}): {
  roofParts: RoofParts;
  projectedCoords: Vector3[];
  wallIntersections: Array<{
    index: number;
    sinkPoints: readonly [Vector2, Vector2];
    projectedPoints: readonly [Vector3, Vector3];
  }>;
} => {
  const coords = isContourClockwise(_coords) ? _coords.toReversed() : _coords;

  // Convert coordinates to Vector2 for consistency
  const baseCoords = coords.map(
    ({ x, y }) => new Vector2(roundToTwoDecimals(x), roundToTwoDecimals(y)),
  );

  // Apply the specified offset to the coordinates
  const offsetCoords = offsetPolygon(baseCoords, offset).map(
    ({ x, y }) => ({
      x: roundToTwoDecimals(x),
      y: roundToTwoDecimals(y),
    }),
  );

  // Compute the oriented bounding box (OBB) using the base coordinates
  const obb = computeOrientedBoundingBox(baseCoords);

  // Map slopeOrientation to pivotIndex in OBB corners
  const pivotIndices = [2, 1, 0, 3]; // slopeOrientation 0: North, 1: East, 2: South, 3: West
  const pivotIndex = pivotIndices[slopeOrientation % 4];

  if(pivotIndex === undefined) {
    return { roofParts: [], projectedCoords: [], wallIntersections: [] };
  }

  const pivotPoint2D = obb.corners[pivotIndex];

  if(!pivotPoint2D) {
    return { roofParts: [], projectedCoords: [], wallIntersections: [] };
  }

  // Get the edge vector from pivot point to the next corner (counter-clockwise)
  const nextIndex = (pivotIndex + 1) % 4;

  if(!obb.corners[nextIndex] || !obb.corners[pivotIndex]) {
    return { roofParts: [], projectedCoords: [], wallIntersections: [] };
  }

  const edge = obb.corners[nextIndex].clone().sub(obb.corners[pivotIndex]);

  // Calculate the normal vector (perpendicular to the edge)
  const normal2D = new Vector2(-edge.y, edge.x).normalize();

  const angleRad = MathUtils.degToRad(_roofSlope);

  // Define the plane normal vector in 3D
  const normal = new Vector3(
    normal2D.x * Math.sin(angleRad),
    normal2D.y * Math.sin(angleRad),
    Math.cos(angleRad),
  ).normalize();

  // Define the pivot point in 3D
  const pivotPoint = new Vector3(
    pivotPoint2D.x,
    pivotPoint2D.y,
    -roofHeightFromBase,
  );

  // Define the plane
  const plane = new Plane().setFromNormalAndCoplanarPoint(normal, pivotPoint);

  // Project each offset coordinate onto the plane
  const projectedPolygon = offsetCoords.map(({ x, y: z }) => {
    const y =
      (
        plane.normal.x * x +
        plane.normal.y * z +
        plane.constant
      ) / plane.normal.z;
    return new Vector3(x, y, z);
  });

  // Project the initial coords onto the plane along the z-axis
  const projectedCoords = coords.map(({ x, y: z }) => {
    const y =
      (
        plane.normal.x * x +
        plane.normal.y * z +
        plane.constant
      ) / plane.normal.z;
    return new Vector3(x, y, z);
  });

  // Prepare the wallIntersections array
  const wallIntersections = coords.map((coord, index) => {
    const nextIndex = (index + 1) % coords.length;

    const sinkPoint1 = coord;
    const sinkPoint2 = getNotUndefined(coords[nextIndex], 'This should never happen. |l1ogi8|');

    // Corresponding projected points
    const projectedPoint1 = projectedCoords[index];
    const projectedPoint2 = projectedCoords[nextIndex];

    // Ensure the projected points are defined
    if(!projectedPoint1 || !projectedPoint2) {
      throw new Error(`Projected point at index ${index} is undefined.`);
    }

    return {
      index,
      sinkPoints: [sinkPoint1, sinkPoint2] as const,
      projectedPoints: [projectedPoint1, projectedPoint2] as const,
    };
  });


  return {
    roofParts: [projectedPolygon].filter(e => isArrayLength(e, '>=', 3)),
    projectedCoords,
    wallIntersections,
  };
};
