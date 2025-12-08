// CentralPole.ts

import { Vector3 } from 'three';
import { StairComponent } from '../Stairs/stairComponent';

export class CentralPole extends StairComponent {
  public vertices: Vector3[] = [];
  public indices: number[] = [];
}
