// landing.ts
import { Euler, Vector3 } from 'three';
import { StairComponent } from '../Stairs/stairComponent';
import { StairParameters } from '../StairParameters';

export class Landing extends StairComponent {
  public vertices: Vector3[];
  public indices: number[];
  public position: Vector3;
  public rotation: Euler;
  public scale: Vector3;
  public direction: 'x' | 'x-' | 'z' | 'z-';
  public params: StairParameters;

  public width: number;
  public length: number;

  constructor(
    width: number,
    length: number,
    elevation: number,
    positionX: number,
    positionZ: number,
    params: StairParameters,
    direction: 'x' | 'x-' | 'z' | 'z-' = 'z',
  ) {
    super();

    this.width = width;
    this.length = length;

    this.params = params;
    // We no longer store/compute actual geometry vertices and indices
    this.vertices = [];
    this.indices = [];

    // Store the center
    this.position = new Vector3(positionX, elevation, positionZ);

    // Determine rotation based on direction
    let rotationY = 0;
    switch(direction) {
      case 'z':
        rotationY = 0;
        break;
      case 'z-':
        rotationY = Math.PI;
        break;
      case 'x':
        rotationY = Math.PI / 2;
        break;
      case 'x-':
        rotationY = -Math.PI / 2;
        break;
      default:
        rotationY = 0;
        break;
    }
    this.rotation = new Euler(0, rotationY, 0);

    // Default scale
    this.scale = new Vector3(1, 1, 1);

    // Store direction
    this.direction = direction;
  }

  // Example: side edges for stringers/railings, offset from the landing center
  public getSideEdgePoints(side: 'left' | 'right'): Vector3[] {
    // Adjust these half-width/half-length values as needed,
    // or compute them from the constructor’s “width” and “length”.
    const halfWidth = 0.5;
    // const halfLength = 0.5;

    let offsetX = 0;
    let offsetZ = 0;

    // Example approach:
    // - For 'z', forward is +Z, left is –X
    // - For 'z-', forward is –Z, left is +X
    // - And so on
    // Tweak as needed for your coordinate conventions

    if(this.direction === 'z') {
      offsetX = side === 'left' ? -halfWidth : halfWidth / 2;
      // If you want distinct endpoints across the length, offsetZ might be ± halfLength
    } else if(this.direction === 'z-') {
      offsetX = side === 'left' ? halfWidth : -halfWidth;
    } else if(this.direction === 'x') {
      offsetZ = side === 'left' ? halfWidth : -halfWidth;
    } else if(this.direction === 'x-') {
      offsetZ = side === 'left' ? -halfWidth : halfWidth;
    }

    const center = this.position.clone();
    const p1 = center.clone().add(new Vector3(offsetX, 0, offsetZ));
    const p2 = center.clone().add(new Vector3(offsetX, 0, offsetZ));

    // Return two points (identical here, but you can offset one more if needed)
    return [p1, p2];
  }

  // Example: if you need a stringer path or other wrap logic
  public getStringerPath(side: 'left' | 'right'): Vector3[] {
    const points = this.getSideEdgePoints(side);
    return points;
  }

  // If you rely on the stairType from params for special logic:
  public sideNeedsToWrapAround(side: 'left' | 'right', mirror: boolean): boolean {
    const stairType = this.params.stairType;

    // For straight stairs, no wrapping
    if(stairType === 'straight') {
      return false;
    }

    // For L- or U-shaped, do your logic
    if(stairType === 'l-shaped' || stairType === 'u-shaped') {
      return (!mirror && side === 'left') || (mirror && side === 'left');
    }

    return false;
  }
}
