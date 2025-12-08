// builders/StraightRailingBuilder.ts

import { BaseRailingBuilder } from './baseRailingBuilder';
import { StraightVerticalRailing } from '../types/straightVerticalRailing';
import { RailingParameters } from '../railingParameters';

/**
 * Concrete builder for a "straight" style railing.
 * Creates a StraightVerticalRailing instance.
 */
export class StraightRailingBuilder extends BaseRailingBuilder {
  build(): StraightVerticalRailing {
    // We can provide defaults or validations before instantiating:
    const defaultParams: RailingParameters = {
      railingType: this.type,
      startPoint: this.params.startPoint,
      endPoint: this.params.endPoint,
      railingSegments: this.params.railingSegments ?? 1,
      railingSegmentDistance: this.params.railingSegmentDistance ?? 0.1,
    };

    // In real usage, you might do more robust validation here:
    if(!defaultParams.startPoint || !defaultParams.endPoint) {
      throw new Error('StraightRailingBuilder: startPoint and endPoint are required.');
    }

    // Instantiate the final Railing
    return new StraightVerticalRailing(defaultParams);
  }
}
