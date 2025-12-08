// Step.ts
import { Euler, Vector3 } from 'three';
import { StairComponent } from '../Stairs/stairComponent';

export class Step extends StairComponent {
  public vertices: Vector3[];
  public indices: number[];
  public position: Vector3;
  public rotation: Euler;
  public scale: Vector3;
  public isFirstStep?: boolean;
  public direction: 'x' | 'x-' | 'z' | 'z-';

  constructor(
    width: number,
    depth: number,
    elevation: number,
    positionX: number,
    positionZ: number,
    landingLength?: number, // remove if you no longer need it in Step
    direction: 'x' | 'x-' | 'z' | 'z-' = 'z',
  ) {
    super();

    // Initialize vertices array
    this.vertices = [];
    this.indices = [];

    // 1. Set the center point directly
    this.position = new Vector3(positionX, elevation, positionZ);

    // 2. Store direction so we know how to rotate
    this.direction = direction;

    // 3. Compute rotation about Y based on direction
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

    // 4. Default scale of 1
    this.scale = new Vector3(1, 1, 1);
  }

  // If you still need “side edges” for, e.g., stringers or railings,
  // you can shift them relative to this.position. Or remove if you don't need them:
  public getSideEdgePoints(side: 'left' | 'right'): Vector3[] {
    // Instead of using geometry vertices,
    // you’d compute the left & right offsets from center based on width.
    // Quick example:
    const halfWidth = 0.5; // or (params.width / 2) if you pass that in
    let offsetX = 0;
    let offsetZ = 0;

    if(this.direction === 'z') {
      offsetX = side === 'left' ? -halfWidth : halfWidth;
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
    // Do something more interesting if you want two distinct edge points

    return [p1, p2];
  }
}
