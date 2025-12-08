import type { GableConversionResult, GableStrategy } from './GableStrategy';
import type { Line, RoofParts } from '../../types';
import { convertHipsToGables } from '../gableConvesion';

/**
 * Open Gable Strategy
 *
 * Creates traditional open gable ends where the hip ridge is removed
 * and replaced with a vertical gable wall. This is the current implementation.
 *
 * Characteristics:
 * - Removes the hip ridge at the gable end
 * - Creates a vertical triangular wall face
 * - Maintains the roof slope on adjacent faces
 */
export const openGableStrategy: GableStrategy = {
  convert(
    hipRoofParts: RoofParts,
    skeletonLines: Line[],
    gableIndices: number[],
    offset: number,
    findOriginalFromOffset: (offsetX: number, offsetY: number) => { x: number; y: number } | undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    roofHeightFromBase: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    roofSlope: number,
  ): GableConversionResult {
    // Use the existing convertHipsToGables function for open gables
    // roofHeightFromBase and roofSlope are not needed for open gable (no overhang parts)
    return convertHipsToGables(
      hipRoofParts,
      skeletonLines,
      gableIndices,
      offset,
      findOriginalFromOffset,
    );
  },
};
