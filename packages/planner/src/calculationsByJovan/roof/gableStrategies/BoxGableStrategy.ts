import type { GableConversionResult, GableStrategy } from './GableStrategy';
import type { Line, RoofParts } from '../../types';

/**
 * Box Gable Strategy
 *
 * Creates box gable ends where the gable wall extends upward vertically
 * beyond the main roof line, with a separate small roof above.
 *
 * Characteristics:
 * - Vertical gable wall extends above the main roof
 * - Small independent roof structure caps the gable
 * - Often seen in colonial and traditional architecture
 *
 * TODO: Implement box gable geometry calculation (future feature)
 */
export const boxGableStrategy: GableStrategy = {
  convert(
    hipRoofParts: RoofParts,
    skeletonLines: Line[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    gableIndices: number[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    offset: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOriginalFromOffset: (offsetX: number, offsetY: number) => { x: number; y: number } | undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    roofHeightFromBase: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    roofSlope: number,
  ): GableConversionResult {
    // TODO: Implement box gable conversion logic
    console.warn('BoxGableStrategy: Feature not yet implemented');

    return {
      gableRoofParts: hipRoofParts,
      wallIntersections: [],
      updatedGableIndices: [],
      updatedSkeletonLines: skeletonLines,
    };
  },
};
