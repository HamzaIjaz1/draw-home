import { Vector2, Vector3 } from 'three';
import type { Line, RoofParts } from '../../types';

/**
 * Result returned by a gable conversion strategy
 */
export type GableConversionResult = {
  /** Roof parts after gable conversion */
  gableRoofParts: RoofParts;

  /** Wall intersection points for gable ends */
  wallIntersections: Array<{
    index: number;
    point: Vector3;
    sinkPoints: [Vector2, Vector2];
  }>;

  /** Indices of faces that were successfully converted to gables */
  updatedGableIndices: number[];

  /** Skeleton lines after gable conversion (may be modified) */
  updatedSkeletonLines: Line[];
};

/**
 * Base interface for gable conversion strategies.
 * Each gable type (open, closed, box, dutch) implements this interface.
 */
export type GableStrategy = {
  /**
   * Convert hip roof faces to gable ends
   *
   * @param hipRoofParts - The original hip roof face parts
   * @param skeletonLines - The roof skeleton lines for visualization
   * @param gableIndices - Indices of faces to convert to this gable type
   * @param offset - Roof overhang/offset value
   * @param findOriginalFromOffset - Function to map offset coordinates back to original wall coordinates
   * @param roofHeightFromBase - Height from base level (before adjustment for skeleton)
   * @param roofSlope - Roof slope angle in degrees
   * @returns Result containing modified roof parts, intersections, and updated data
   */
  convert(
    hipRoofParts: RoofParts,
    skeletonLines: Line[],
    gableIndices: number[],
    offset: number,
    findOriginalFromOffset: (offsetX: number, offsetY: number) => { x: number; y: number } | undefined,
    roofHeightFromBase: number,
    roofSlope: number,
  ): GableConversionResult;
};
