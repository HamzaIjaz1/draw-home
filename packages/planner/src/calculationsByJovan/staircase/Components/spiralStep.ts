// SimplifiedSpiralStep.ts

import { Euler, Vector3 } from 'three';
import { StairComponent } from '../Stairs/stairComponent';

export class SpiralStep extends StairComponent {
  public vertices: Vector3[] = [];
  public indices: number[] = [];
  public position: Vector3;
  public rotation: Euler;

  constructor(angle: number, elevation: number) {
    super();

    // All steps are centered at the origin, but elevated by 'elevation'
    this.position = new Vector3(0, elevation, 0);

    // Rotate around Y by 'angle'
    this.rotation = new Euler(0, angle, 0);

    // If you want to track “isFirstStep”, add a boolean param
    // or a computed check: this.isFirstStep = (angle === 0);
  }
}
