import type { GableConversionResult, GableStrategy } from './GableStrategy';
import type { Line, RoofParts } from '../../types';

/**
 * Dutch Gable Strategy
 *
 * Creates dutch gable (or gablet) ends which combine hip and gable features.
 * The lower portion is a hip, while the upper portion transitions to a gable.
 *
 * Characteristics:
 * - Lower section has hip roof slope
 * - Upper section has vertical gable wall
 * - Creates a distinctive two-part profile
 * - Common in Dutch and some Victorian architecture
 *
 * TODO: Implement dutch gable geometry calculation (future feature)
 */
export const dutchGableStrategy: GableStrategy = {
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
    // TODO: Implement dutch gable conversion logic
    console.warn('DutchGableStrategy: Feature not yet implemented');

    return {
      gableRoofParts: hipRoofParts,
      wallIntersections: [],
      updatedGableIndices: [],
      updatedSkeletonLines: skeletonLines,
    };
  },
};
