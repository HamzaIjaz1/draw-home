// centralBeam.ts

import { Vector3 } from 'three';
import { StairComponent } from '../Stairs/stairComponent';
import { StairParameters } from '../StairParameters';
import { Step } from './step';
import { Landing } from './landing';

export class CentralBeam extends StairComponent {
  public vertices: Vector3[];
  public indices: number[];

  constructor(components: Array<Step | Landing>, params: StairParameters) {
    super();
    const { vertices, indices } = CentralBeam.generateBeam(components, params);
    this.vertices = vertices;
    this.indices = indices;
  }

  private static generateBeam(
    components: Array<Step | Landing>,
    params: StairParameters,
  ): { vertices: Vector3[]; indices: number[] } {
    const beamHeight = params.beamHeight || 0.2; // Use from params, default to 0.2
    const defaultWidth = params.width || 0.6; // Default width if not provided
    const beamWidth = params.beamWidth || defaultWidth / 3; // Use from params, default to width / 3
    const halfBeamWidth = beamWidth / 2;

    if(!params.width) {
      return { vertices: [], indices: [] };
    }

    const beamVertices: Vector3[] = [];
    const indices: number[] = [];

    // Collect points along the center line of the stairs
    const beamPoints: Vector3[] = [];

    components.forEach(component => {
      if(component instanceof Step || component instanceof Landing) {
        const verts = component.vertices;

        // Calculate the center point between left and right edges
        const v0 = verts[0];
        const v1 = verts[1];

        if(!v0 || !v1) {
          return;
        }

        const midpoint = v0.clone().add(v1).multiplyScalar(0.5);

        beamPoints.push(midpoint);
      }
    });

    if(beamPoints.length < 2) {
      return { vertices: [], indices: [] };
    }

    // Create vertices for the beam at each point
    for(const center of beamPoints) {
      // Top vertices
      const topLeft = new Vector3(center.x - halfBeamWidth, center.y, center.z);
      const topRight = new Vector3(center.x + halfBeamWidth, center.y, center.z);

      // Bottom vertices (extend downward)
      const bottomLeft = new Vector3(topLeft.x, center.y - beamHeight, center.z);
      const bottomRight = new Vector3(topRight.x, center.y - beamHeight, center.z);

      // Add vertices in order: topLeft, bottomLeft, bottomRight, topRight
      beamVertices.push(topLeft, bottomLeft, bottomRight, topRight);
    }

    // Create faces between the vertices to form the beam
    for(let i = 0; i < beamPoints.length - 1; i++) {
      const idx = i * 4;

      // Indices of the eight vertices forming the beam segment
      const v0 = idx; // topLeft at point i
      const v1 = idx + 1; // bottomLeft at point i
      const v2 = idx + 5; // bottomLeft at point i+1
      const v3 = idx + 4; // topLeft at point i+1
      const v4 = idx + 3; // topRight at point i
      const v5 = idx + 2; // bottomRight at point i
      const v6 = idx + 6; // bottomRight at point i+1
      const v7 = idx + 7; // topRight at point i+1

      // Front face
      indices.push(v0, v1, v2);
      indices.push(v0, v2, v3);

      // Back face
      indices.push(v4, v7, v6);
      indices.push(v4, v6, v5);

      // Left face
      indices.push(v0, v3, v7);
      indices.push(v0, v7, v4);

      // Right face
      indices.push(v1, v5, v6);
      indices.push(v1, v6, v2);

      // Top face
      indices.push(v0, v4, v5);
      indices.push(v0, v5, v1);

      // Bottom face
      indices.push(v3, v2, v6);
      indices.push(v3, v6, v7);
    }

    return { vertices: beamVertices, indices };
  }
}
