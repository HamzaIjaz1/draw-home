// SpiralRailing.ts

import { Vector3 } from 'three';
import { StairComponent } from '../Stairs/stairComponent';
import { SpiralStep } from './spiralStep';
import { StairParameters } from '../StairParameters';

export class SpiralRailing extends StairComponent {
  public vertices: Vector3[];
  public indices: number[];

  constructor(
    steps: SpiralStep[],
    side: 'left' | 'right',
    params: StairParameters,
  ) {
    super();
    const { vertices, indices } = SpiralRailing.generateGeometry(steps, side, params);
    this.vertices = vertices;
    this.indices = indices;
  }

  private static generateGeometry(
    steps: SpiralStep[],
    side: 'left' | 'right',
    params: StairParameters,
  ): { vertices: Vector3[]; indices: number[] } {
    const { railingHeight } = params;
    if(!railingHeight) {
      return { vertices: [], indices: [] };
    }

    const railingVertices: Vector3[] = [];
    const indices: number[] = [];

    // Collect points along the outer edge of the steps
    steps.forEach((step, index) => {
      const verts = step.vertices;

      // Select the appropriate edge based on the side
      const idxNext = side === 'left' ? 3 : 2;

      const bottomVertex = verts[idxNext]?.clone() ?? new Vector3();
      const topVertex = bottomVertex.clone();
      topVertex.y += railingHeight;

      railingVertices.push(bottomVertex, topVertex);

      // Create faces between the current and previous vertices
      if(index > 0) {
        const baseIdx = (index - 1) * 2;
        indices.push(
          baseIdx,
          baseIdx + 1,
          baseIdx + 3,
          baseIdx,
          baseIdx + 3,
          baseIdx + 2,
        );
      }
    });

    return { vertices: railingVertices, indices };
  }
}
