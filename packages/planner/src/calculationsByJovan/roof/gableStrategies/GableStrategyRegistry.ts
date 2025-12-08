import type { GableStrategy } from './GableStrategy';
import { openGableStrategy } from './OpenGableStrategy';
import { closedGableStrategy } from './ClosedGableStrategy';

type GableType = 'open' | 'closed';

/**
 * Registry for gable conversion strategies.
 * Provides a centralized way to access different gable type implementations.
 */
export class GableStrategyRegistry {
  private static strategies: Record<GableType, GableStrategy> = {
    open: openGableStrategy,
    closed: closedGableStrategy,
  };

  /**
   * Get the strategy for a specific gable type
   * @param type - The gable type (open or closed)
   * @returns The strategy instance for the given type
   */
  static getStrategy(type: GableType): GableStrategy {
    const strategy = this.strategies[type];
    if(!strategy) {
      throw new Error(`Unknown gable type: ${type}`);
    }
    return strategy;
  }
}
