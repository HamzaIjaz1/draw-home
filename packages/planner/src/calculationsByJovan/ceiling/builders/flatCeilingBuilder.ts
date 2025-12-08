// CeilingBuilder.ts

import { CeilingParameters, CeilingType } from '../ceilingParameters';
import { BaseCeilingBuilder } from './baseCeilingBuilder';
import { RegularCeiling } from '../types/regularCeiling';
import { DroppedCeiling } from '../types/droppedCeiling';
import { CofferedCeiling } from '../types/cofferedCeiling';
import { TrayCeiling } from '../types/trayCeiling';

export class FlatCeilingBuilder extends BaseCeilingBuilder {
  protected params: Partial<CeilingParameters> = {};
  protected type: CeilingType = 'regular';

  setDepth(depth: number): this {
    this.params.depth = depth;
    return this;
  }

  // For dropped ceiling
  setOffsetValue(offsetValue: number): this {
    this.params.offsetValue = offsetValue;
    return this;
  }
  setDepthDropped(depthDropped: number): this {
    this.params.depthDropped = depthDropped;
    return this;
  }

  // For coffered ceiling
  setGridU(gridU: number): this {
    this.params.gridU = gridU;
    return this;
  }
  setGridV(gridV: number): this {
    this.params.gridV = gridV;
    return this;
  }
  setGridOffset(gridOffset: number): this {
    this.params.gridOffset = gridOffset;
    return this;
  }
  setGridDepth(gridDepth: number): this {
    this.params.gridDepth = gridDepth;
    return this;
  }

  // For tray ceiling
  setUndercutOffset(undercutOffset: number): this {
    this.params.undercutOffset = undercutOffset;
    return this;
  }
  setUndercutThickness(undercutThickness: number): this {
    this.params.undercutThickness = undercutThickness;
    return this;
  }

  // For beam ceiling
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

  // For shed ceilings (example setter)
  setSlopeAngle(slopeAngle: number): this {
    this.params.slopeAngle = slopeAngle;
    return this;
  }

  build() {
    if(!this.params.coords) {
      throw new Error('Coordinates are required to build a ceiling.');
    }

    // Set default values if not provided
    const defaultParams: CeilingParameters = {
      ceilingType: this.type,
      coords: this.params.coords,
      depth: this.params.depth || 5.0,
      offsetValue: this.params.offsetValue || 0,
      depthDropped: this.params.depthDropped || 0,
      gridU: this.params.gridU || 0,
      gridV: this.params.gridV || 0,
      gridOffset: this.params.gridOffset || 0,
      gridDepth: this.params.gridDepth || 0,
      undercutOffset: this.params.undercutOffset || 0,
      undercutThickness: this.params.undercutThickness || 0,
      beamUcount: this.params.beamUcount || 0,
      beamUwidth: this.params.beamUwidth || 0,
      beamUheght: this.params.beamUheght || 0,
      beamVcount: this.params.beamVcount || 0,
      beamVwidth: this.params.beamVwidth || 0,
      beamVheight: this.params.beamVheight || 0,
      slopeAngle: this.params.slopeAngle || 0,
    };

    // Create the appropriate Ceiling instance based on type
    switch(this.type) {
      case 'regular':
        return new RegularCeiling(defaultParams);
      case 'dropped':
        return new DroppedCeiling(defaultParams);
      case 'coffered':
        return new CofferedCeiling(defaultParams);
      case 'tray':
        return new TrayCeiling(defaultParams);
      // Add additional cases for other ceiling types as needed
      default:
        throw new Error(`Unsupported ceiling type: ${this.type}`);
    }
  }
}
