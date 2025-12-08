// curvedStairBuilder.ts

import { StairBuilder } from './stairBuilder';

export class CurvedStairBuilder extends StairBuilder {
  setInnerRadius(radius: number): this {
    this.params.innerRadius = radius;
    return this;
  }

  setOuterRadius(radius: number): this {
    this.params.outerRadius = radius;
    return this;
  }

  // Override build method if necessary
}
