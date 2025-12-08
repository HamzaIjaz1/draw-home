import { Vector2, Vector3 } from 'three';
import type { GableConversionResult, GableStrategy } from './GableStrategy';
import type { Line, RoofParts } from '../../types';
import { convertHipsToGables } from '../gableConvesion';

/**
 * Closed Gable Strategy
 *
 * Creates closed gable ends where the roof extends over the gable wall,
 * creating a small roof overhang on the gable end.
 *
 * Characteristics:
 * - Keeps the roof structure extending past the wall
 * - Creates a small overhang/eave on the gable end
 * - The gable wall sits back from the roof edge
 *
 * Implementation:
 * 1. Apply open gable transformation
 * 2. Add trapezoidal overhang parts for each gable end
 */

/**
 * Creates a trapezoidal overhang roof part for a closed gable end
 *
 * @param ridgePoints - Two points at the gable ridge (from open gable transformation)
 * @param wallPoints - Two original wall polygon points before offset
 * @param roofSlope - Roof slope angle in degrees
 * @param offset - The roof overhang distance
 * @returns A roof part representing the overhang trapezoid
 */
function createOverhangTrapezoid(
  ridgePoints: [Vector3, Vector3],
  wallPoints: [Vector2, Vector2],
  roofSlope: number,
  offset: number,
): [Vector3, Vector3, Vector3, Vector3] {
  // The trapezoid connects:
  // - ridgePoints (at roof height, offset position) - longer edge at ridge height
  // - wallPoints (at slope-calculated height, original position) - shorter edge following roof slope

  // Calculate the average ridge height for slope calculation
  const avgRidgeHeight = (ridgePoints[0].y + ridgePoints[1].y) / 2;

  // Convert roof slope from degrees to radians
  const slopeRadians = (roofSlope * Math.PI) / 180;
  const slopeTangent = Math.tan(slopeRadians);

  // The overhang distance is the offset (how far the roof extends past the wall)
  // Height increases by (offset * tan(slope)) as we move from the gable edge to the wall
  const heightIncrease = offset * slopeTangent;

  // Wall points are at a higher elevation than ridge points by the slope-based height increase
  const wallPointHeight = avgRidgeHeight + heightIncrease;

  // Convert wall points to Vector3 with slope-calculated heights
  const wallPoint1 = new Vector3(wallPoints[0].x, wallPointHeight, wallPoints[0].y);
  const wallPoint2 = new Vector3(wallPoints[1].x, wallPointHeight, wallPoints[1].y);

  // Create trapezoid with proper winding order for outward-facing normal
  // Order: ridge1, ridge2, wall2, wall1 (counterclockwise when viewed from outside)
  return [ridgePoints[0], ridgePoints[1], wallPoint2, wallPoint1];
}

export const closedGableStrategy: GableStrategy = {
  convert(
    hipRoofParts: RoofParts,
    skeletonLines: Line[],
    gableIndices: number[],
    offset: number,
    findOriginalFromOffset: (offsetX: number, offsetY: number) => { x: number; y: number } | undefined,
    roofHeightFromBase: number,
    roofSlope: number,
  ): GableConversionResult {
    // Step 1: Apply open gable transformation
    const openGableResult = convertHipsToGables(
      hipRoofParts,
      skeletonLines,
      gableIndices,
      offset,
      findOriginalFromOffset,
    );

    // Step 2: Create overhang trapezoids for each gable end
    const overhangParts: RoofParts = [];

    for(const intersection of openGableResult.wallIntersections) {
      // The intersection contains:
      // - point: The ridge intersection point (at roof height)
      // - sinkPoints: The two wall points forming the base of the gable (original coordinates)

      // We need to find the two ridge points (the gable ridge edge)
      // These are the points where the hip peak was moved down to in open gable transformation
      const gableFace = openGableResult.gableRoofParts[intersection.index];

      if(!gableFace) {
        continue;
      }

      // Find the ridge edge in the gable face
      // After open gable transformation, the face should have vertices at the ridge height
      // The sink points correspond to the base of the gable triangle
      const ridgePoints = gableFace.filter(vertex =>
        // Ridge points are at a higher Y than the sink points would be at wall level
        // eslint-disable-next-line implicit-arrow-linebreak
        !intersection.sinkPoints.some(sinkPt => Math.abs(vertex.x - sinkPt.x) < 0.001 && Math.abs(vertex.z - sinkPt.y) < 0.001));

      // We need exactly 2 ridge points for the trapezoid
      if(ridgePoints.length >= 2 && ridgePoints[0] && ridgePoints[1]) {
        // Create the overhang trapezoid with slope-based height calculation
        // The wall points will be positioned at heights that follow the roof slope
        const overhangTrapezoid = createOverhangTrapezoid(
          [ridgePoints[0], ridgePoints[1]],
          [intersection.sinkPoints[0], intersection.sinkPoints[1]],
          roofSlope,
          offset,
        );
        overhangParts.push(overhangTrapezoid);
      }
    }

    // Combine the open gable roof parts with the overhang parts
    const closedGableRoofParts: RoofParts = [
      ...openGableResult.gableRoofParts,
      ...overhangParts,
    ];

    return {
      gableRoofParts: closedGableRoofParts,
      wallIntersections: openGableResult.wallIntersections,
      updatedGableIndices: openGableResult.updatedGableIndices,
      updatedSkeletonLines: openGableResult.updatedSkeletonLines,
    };
  },
};
