import { Vector2, Vector3 } from 'three';
import { Point2 } from './point';

export function getPerpendicularVector(v: Vector2, distance: number): Vector2 {
  const perpendicular = new Vector2(-v.y, v.x);
  perpendicular.normalize().multiplyScalar(distance);
  return perpendicular;
}

export function cross(a: Point2, b: Point2): number {
  return a.x * b.y - b.x * a.y;
}

export function computeDirectionVectorXZ(position: Vector3, directionPoint: Vector3): Vector3 {
  return new Vector3(
    directionPoint.x - position.x,
    0,
    directionPoint.z - position.z,
  ).normalize();
}
