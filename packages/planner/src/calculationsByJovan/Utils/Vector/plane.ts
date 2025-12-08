import { Vector3 } from 'three';

export function computePlaneNormal(p0: Vector3, p1: Vector3, p2: Vector3): Vector3 {
  const v1 = p1.clone().sub(p0);
  const v2 = p2.clone().sub(p0);
  return v1.clone().cross(v2).normalize();
}
