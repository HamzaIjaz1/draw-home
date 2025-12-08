import { CeilingParameters } from '../ceilingParameters';
import { ShedCeiling } from '../types/shedCeiling';
import { BaseCeilingBuilder } from './baseCeilingBuilder';

export class ShedCeilingBuilder extends BaseCeilingBuilder {
  setSlopeAngle(slopeAngle: number): this {
    this.params.slopeAngle = slopeAngle;
    return this;
  }

  build() {
    if(!this.params.coords) {
      throw new Error('Coordinates required.');
    }
    const defaultParams: CeilingParameters = {
      coords: this.params.coords,
      depth: this.params.depth || 5.0,
      slopeAngle: this.params.slopeAngle || 15.0,
    };
    return new ShedCeiling(defaultParams);
  }
}
