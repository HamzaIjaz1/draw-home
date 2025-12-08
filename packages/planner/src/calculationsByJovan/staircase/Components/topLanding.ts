/* eslint-disable default-case */
import { Vector3 } from 'three';
import { Landing } from './landing';
import { StairParameters } from '../StairParameters';

export class TopLanding extends Landing {
  public railingOrientation: 'outerLeft' | 'middle' | 'outerRight';

  constructor(
    width: number,
    length: number,
    elevation: number,
    positionX: number,
    positionZ: number,
    params: StairParameters,
    direction: 'x' | 'x-' | 'z' | 'z-' = 'z',
    railingOrientation: 'outerLeft' | 'middle' | 'outerRight' = 'middle',
  ) {
    super(width, length, elevation, positionX, positionZ, params, direction);

    this.railingOrientation = railingOrientation;
  }

  // Override to provide specific corner points for top landing railing
  public getTopLandingCornerPoints(): Vector3[] {
    const halfWidth = this.width / 2;
    const halfLength = this.length / 2;

    // Define corners in local space relative to landing center
    const corners: Vector3[] = [];

    // Based on the railing orientation, we'll create different corner configurations
    switch(this.railingOrientation) {
      case 'outerLeft':
        // Outer left edge - corners for the left outer edge of the landing
        corners.push(
          new Vector3(halfWidth - 0.05, 0, -halfLength + halfLength + 0.05), // front-right
          new Vector3(halfWidth - 0.05, 0, halfLength + halfLength - 0.05), // back-right
          new Vector3(-halfWidth + 0.05, 0, halfLength + halfLength - 0.05),
        );
        break;

      case 'outerRight':
        // Outer right edge - corners for the right outer edge of the landing


        corners.push(
          new Vector3(-halfWidth + 0.05, 0, -halfLength + halfLength + 0.05), // front-left
          new Vector3(-halfWidth + 0.05, 0, halfLength + halfLength - 0.05), // back-left
          new Vector3(halfWidth - 0.05, 0, halfLength + halfLength - 0.05), // back-right
        );
        break;

      case 'middle':
        // For middle configuration, create corner points for the two separate fills
        // Left fill points
        corners.push(
          new Vector3(-halfWidth + 0.05, 0, -halfLength + halfLength + 0.05), // left-front
          new Vector3(-halfWidth + 0.05, 0, halfLength + halfLength - 0.05), // left-back
        );
        // Right fill points
        corners.push(
          new Vector3(halfWidth - 0.05, 0, -halfLength + halfLength + 0.05), // right-front
          new Vector3(halfWidth - 0.05, 0, halfLength + halfLength - 0.05), // right-back
        );
        break;
    }

    // Transform corners to world space
    const worldCorners = corners.map(corner => {
      const worldCorner = corner.clone();
      worldCorner.applyEuler(this.rotation);
      worldCorner.add(this.position);
      return worldCorner;
    });

    return worldCorners;
  }

  // Get the edges that should have fill bars based on railing orientation
  public getTopLandingFillEdges(): Array<{ start: Vector3; end: Vector3 }> {
    const corners = this.getTopLandingCornerPoints();
    const edges: Array<{ start: Vector3; end: Vector3 }> = [];

    switch(this.railingOrientation) {
      case 'outerLeft':
        // Two edges for outer left: left edge and back edge
        if(corners.length >= 3 && corners[0] && corners[1] && corners[2]) {
          // Left edge: from front-left to back-left
          edges.push({ start: corners[0], end: corners[1] });
          // Back edge: from back-left to back-right
          edges.push({ start: corners[1], end: corners[2] });
        }
        break;

      case 'outerRight':
        // Two edges for outer right: right edge and back edge
        if(corners.length >= 3 && corners[0] && corners[1] && corners[2]) {
          // Right edge: from front-right to back-right
          edges.push({ start: corners[0], end: corners[1] });
          // Back edge: from back-right to back-left
          edges.push({ start: corners[1], end: corners[2] });
        }
        break;

      case 'middle': {
        // Two separate fills - left side and right side
        // Calculate points directly to avoid polygon connections
        const halfWidth = this.width / 2;
        const halfLength = this.length / 2;

        // Left fill points
        const leftFront = new Vector3(-halfWidth + 0.05, 0, -halfLength + halfLength + 0.05);
        const leftBack = new Vector3(-halfWidth + 0.05, 0, halfLength + halfLength - 0.05);

        // Right fill points
        const rightFront = new Vector3(halfWidth - 0.05, 0, -halfLength + halfLength + 0.05);
        const rightBack = new Vector3(halfWidth - 0.05, 0, halfLength + halfLength - 0.05);

        // Transform to world space
        const transformPoint = (point: Vector3) => {
          const worldPoint = point.clone();
          worldPoint.applyEuler(this.rotation);
          worldPoint.add(this.position);
          return worldPoint;
        };

        // Left fill (from left-front to left-back)
        edges.push({
          start: transformPoint(leftFront),
          end: transformPoint(leftBack),
        });

        // Right fill (from right-front to right-back)
        edges.push({
          start: transformPoint(rightFront),
          end: transformPoint(rightBack),
        });
        break;
      }
    }

    return edges;
  }
}
