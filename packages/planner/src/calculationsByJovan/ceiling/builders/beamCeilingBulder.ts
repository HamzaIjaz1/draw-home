import { Vector3 } from 'three';
import { CeilingParameters, CeilingType } from '../ceilingParameters';
import { BeamCeiling } from '../types/beamCeiling';
import { BaseCeilingBuilder } from './baseCeilingBuilder';

export class BeamCeilingBuilder extends BaseCeilingBuilder {
  // Remove private type property as it's now inherited from BaseCeilingBuilder

  setType(type: CeilingType): this {
    this.type = type;
    this.params.ceilingType = type;
    return this;
  }

  setCoords(coords: Vector3[]): this {
    this.params.coords = coords;
    return this;
  }

  setBeamUcount(beamUcount: number): this {
    this.params.beamUcount = beamUcount;
    return this;
  }

  setBeamUwidth(beamUwidth: number): this {
    this.params.beamUwidth = beamUwidth;
    return this;
  }

  setBeamUheight(beamUheight: number): this {
    this.params.beamUheght = beamUheight;
    return this;
  }

  setBeamVcount(beamVcount: number): this {
    this.params.beamVcount = beamVcount;
    return this;
  }

  setBeamVwidth(beamVwidth: number): this {
    this.params.beamVwidth = beamVwidth;
    return this;
  }

  setBeamVheight(beamVheight: number): this {
    this.params.beamVheight = beamVheight;
    return this;
  }

  build() {
    if(!this.params.coords) {
      throw new Error('Coordinates required.');
    }
    const defaultParams: CeilingParameters = {
      coords: this.params.coords,
      beamUcount: this.params.beamUcount || 2,
      beamUwidth: this.params.beamUwidth || 0.5,
      beamUheght: this.params.beamUheght || 0.3,
      beamVcount: this.params.beamVcount || 2,
      beamVwidth: this.params.beamVwidth || 0.5,
      beamVheight: this.params.beamVheight || 0.3,
    };
    return new BeamCeiling(defaultParams);
  }
}
