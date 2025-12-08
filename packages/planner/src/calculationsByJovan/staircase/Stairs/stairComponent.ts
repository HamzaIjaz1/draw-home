// StairComponent.ts

import { Vector3 } from 'three';

export abstract class StairComponent {
  public abstract vertices: Vector3[];
  public abstract indices: number[];
}
