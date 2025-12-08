// railingFactory.ts

import { RailingType } from './railingParameters';
import { BaseRailingBuilder } from './builders/baseRailingBuilder';
import { StraightRailingBuilder } from './builders/straightRailingBuilder';

/**
 * Factory class to retrieve a RailingBuilder for a given RailingType.
 */
export class RailingFactory {
  static getBuilder(type: RailingType): BaseRailingBuilder {
    switch(type) {
      case 'straight':
        return new StraightRailingBuilder().setType(type);

      default:
        throw new Error(`Unsupported railing type: ${type}`);
    }
  }
}
