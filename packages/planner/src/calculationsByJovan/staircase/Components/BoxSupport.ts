// BoxSupport.ts

import { Vector3 } from 'three';
import { StairComponent } from '../Stairs/stairComponent';

export class BoxSupport extends StairComponent {
  public vertices: Vector3[];
  public indices: number[];

  constructor(stepVertices: Vector3[], side: 'left' | 'right') {
    super();
    this.vertices = BoxSupport.generateVertices(stepVertices, side);
    this.indices = [0, 1, 2, 0, 2, 3]; // Two triangles forming a quad
  }

  private static generateVertices(
    stepVertices: Vector3[],
    side: 'left' | 'right',
  ): Vector3[] {
    const [v0, v1, v2, v3] = stepVertices;
    if(!v0 || !v1 || !v2 || !v3) {
      throw new Error('Invalid step vertices');
    }

    let topFront = v0;
    let topBack = v3;

    const idx0 = side === 'left' ? 0 : 1;
    const idx1 = side === 'left' ? 3 : 2;

    const newTopFront = stepVertices[idx0];
    const newTopBack = stepVertices[idx1];

    if(!newTopFront || !newTopBack) {
      throw new Error('Invalid step vertices');
    }

    topFront = newTopFront;
    topBack = newTopBack;

    // Ground level (Y coordinate)
    const groundY = 0;

    const bottomFront = new Vector3(topFront.x, groundY, topFront.z);
    const bottomBack = new Vector3(topBack.x, groundY, topBack.z);

    const vertices = [
      bottomFront, // v0
      topFront, // v1
      topBack, // v2
      bottomBack, // v3
    ];

    return vertices;
  }
}
