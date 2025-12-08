import { CeilingParameters } from '../ceilingParameters';
import { CoveCeiling } from '../types/coveCeiling';
import { BaseCeilingBuilder } from './baseCeilingBuilder';

export class CurvedCeilingBuilder extends BaseCeilingBuilder {
  // setCurveRadius(radius: number): this {
  //   this.params.curveRadius = radius;
  //   return this;
  // }

  build() {
    if(!this.params.coords) {
      throw new Error('Coordinates required.');
    }
    const defaultParams: CeilingParameters = {
      coords: this.params.coords,
      depth: this.params.depth || 5.0,
      // curveRadius: this.params.curveRadius || 10.0,
    };
    return new CoveCeiling(defaultParams);
  }
}
