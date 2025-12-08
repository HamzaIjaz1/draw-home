// Winder.ts

import { Vector3 } from 'three';
import { StairComponent } from '../Stairs/stairComponent';

export class Winder extends StairComponent {
  public vertices: Vector3[];
  public indices: number[];

  constructor(vertices: Vector3[]) {
    super();
    this.vertices = vertices;
    this.indices = [0, 1, 2, 0, 2, 3];
  }
}
