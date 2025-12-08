// StairFactory.ts

import { StairBuilder } from './Builders/stairBuilder';

export class StairFactory {
  static getBuilder(type: 'straight' | 'curved' | 'spiral' | 'l-shaped' | 'u-shaped'): StairBuilder {
    switch(type) {
      case 'spiral':
        return new StairBuilder().setType(type);
      case 'l-shaped':
        return new StairBuilder().setType(type);
      case 'u-shaped':
        return new StairBuilder().setType(type);
      default:
        return new StairBuilder().setType(type);
    }
  }
}
