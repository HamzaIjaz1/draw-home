// Stair.ts

import { Vector3 } from 'three';
import { StairComponent } from './stairComponent';
import { StairParameters } from '../StairParameters';

export abstract class Stair {
  protected components: StairComponent[] = [];
  protected params: StairParameters;
  protected position: Vector3;

  constructor(params: StairParameters) {
    this.params = params;
    this.position = params.position || new Vector3(0, 0, 0);
    this.initialize();
  }

  protected abstract initialize(): void;

  public getComponents(): StairComponent[] {
    return this.components;
  }
}
