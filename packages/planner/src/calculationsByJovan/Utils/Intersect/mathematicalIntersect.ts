import { Vector2, Vector3 } from 'three';


// TODO:The function should also have a plane as an argument
export const calculateIntersection2D = (
  line1: { start: Vector3; end: Vector3 },
  line2: { start: Vector3; end: Vector3 },
): Vector3 | null => {
  const x1 = line1.start.x;
  const z1 = line1.start.z;
  const x2 = line1.end.x;
  const z2 = line1.end.z;
  const x3 = line2.start.x;
  const z3 = line2.start.z;
  const x4 = line2.end.x;
  const z4 = line2.end.z;

  const denom = (x1 - x2) * (z3 - z4) - (z1 - z2) * (x3 - x4);

  if(denom === 0) {
    return null;
  }

  const intersectX = ((x1 * z2 - z1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * z4 - z3 * x4)) / denom;
  const intersectZ = ((x1 * z2 - z1 * x2) * (z3 - z4) - (z1 - z2) * (x3 * z4 - z3 * x4)) / denom;

  return new Vector3(intersectX, 0, intersectZ);
};


export function getIntersection(p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2): Vector2 | null {
  const denom = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
  if(denom === 0) {
    return null; // Lines are parallel
  }

  const ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denom;

  return new Vector2(
    p1.x + ua * (p2.x - p1.x),
    p1.y + ua * (p2.y - p1.y),
  );
}
