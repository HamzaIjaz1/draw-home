import { Vector3 } from 'three';
import { CeilingParameters, CeilingType } from '../ceilingParameters';

export abstract class BaseCeilingBuilder {
  protected params: Partial<CeilingParameters> = {};
  protected type: CeilingType = 'regular';

  setType(type: CeilingType): this {
    this.type = type;
    this.params.ceilingType = type;
    return this;
  }

  setCoords(coords: Vector3[]): this {
    this.params.coords = coords;
    return this;
  }

  setDepth(depth: number): this {
    this.params.depth = depth;
    return this;
  }

  abstract build(): any;
}
