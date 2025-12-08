/**
 * Gable Strategies Module
 *
 * This module implements the Strategy Pattern for different gable roof types.
 * Each gable type (open, closed, box, dutch) has its own strategy implementation.
 *
 * Usage:
 * ```typescript
 * import { GableStrategyRegistry } from './gableStrategies';
 *
 * const strategy = GableStrategyRegistry.getStrategy('open');
 * const result = strategy.convert(hipRoofParts, skeletonLines, gableIndices, offset, findOriginalFromOffset);
 * ```
 */

export type { GableStrategy, GableConversionResult } from './GableStrategy';
export { openGableStrategy } from './OpenGableStrategy';
export { closedGableStrategy } from './ClosedGableStrategy';
export { GableStrategyRegistry } from './GableStrategyRegistry';

/**
 * Gable roof types
 * - open: Traditional open gable with vertical gable wall
 * - closed: Closed gable with roof overhang extending past the gable wall
 */
export type GableType = 'open' | 'closed';
