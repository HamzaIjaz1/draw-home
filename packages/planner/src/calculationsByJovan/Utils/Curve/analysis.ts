import { Vector2, Vector3 } from 'three';

// 2D point-in-polygon test (Ray Casting algorithm)
function isPointInPolygon2D(point: Vector2, polygon: Vector2[]): boolean {
  let inside = false;
  const x = point.x;
  const y = point.y;

  for(let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i]?.x ?? 0;
    const yi = polygon[i]?.y ?? 0;
    const xj = polygon[j]?.x ?? 0;
    const yj = polygon[j]?.y ?? 0;

    const intersect =
      ((yi > y) !== (yj > y)) &&
      (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);

    if(intersect) {
      inside = !inside;
    }
  }

  return inside;
}

// Function to check if a point lies within a polygon on a plane
export function isPointInPolygonOnPlane(
  point: Vector3,
  polygonVertices: Vector3[],
  planeNormal: Vector3,
  planePoint: Vector3,
): boolean {
  // Step 1: Compute local coordinate system (u, v)
  const arbitraryVector = new Vector3(0, 0, 1);
  if(planeNormal.clone().cross(arbitraryVector).length() < 1e-6) {
    arbitraryVector.set(0, 1, 0);
  }
  const u = planeNormal.clone().cross(arbitraryVector).normalize();
  const v = planeNormal.clone().cross(u).normalize();

  // Step 2: Project polygon vertices and point into 2D plane
  const projectTo2D = (p: Vector3) => {
    const pLocal = p.clone().sub(planePoint);
    return new Vector2(pLocal.dot(u), pLocal.dot(v));
  };

  const polygon2D = polygonVertices.map(projectTo2D);
  const point2D = projectTo2D(point);

  // Step 3: Perform point-in-polygon test
  return isPointInPolygon2D(point2D, polygon2D);
}

export function getClosestPointOnLineSegment(p1: Vector3, p2: Vector3, point: Vector3): Vector3 {
  const lineDir = new Vector3().subVectors(p2, p1);
  const lineLengthSq = lineDir.lengthSq();
  const pointDir = new Vector3().subVectors(point, p1);
  const t = Math.max(0, Math.min(1, pointDir.dot(lineDir) / lineLengthSq));
  return new Vector3(
    p1.x + t * lineDir.x,
    p1.y + t * lineDir.y,
    p1.z + t * lineDir.z,
  );
}
