import { Vector2 } from 'three';

export type OrientedBoundingBox = {
  center: Vector2;
  width: number;
  height: number;
  angle: number; // Angle in radians from the x-axis
  corners: Vector2[]; // The 4 corners of the OBB in counter-clockwise order
};


/**
 * Rotates a point around the origin by a given angle.
 * @param point The point to rotate.
 * @param angle Rotation angle in radians.
 * @returns The rotated point.
 */
function rotatePoint(point: Vector2, angle: number): Vector2 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return new Vector2(
    point.x * cos - point.y * sin,
    point.x * sin + point.y * cos,
  );
}

/**
 * Computes the convex hull of a set of 2D points using Graham's scan algorithm.
 * @param points Array of Vector2 points.
 * @returns The convex hull as an array of Vector2 points.
 */
function computeConvexHull(points: Vector2[]): Vector2[] {
  // Sort points by x-coordinate, breaking ties with y-coordinate
  const sortedPoints = [...points].sort((a, b) => (a.x - b.x) || (a.y - b.y));

  const cross = (o: Vector2, a: Vector2, b: Vector2) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

  const lower: Vector2[] = [];
  // for(const point of sortedPoints) {
  //   while(lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
  //     lower.pop();
  //   }
  //   lower.push(point);
  // }
  for(const point of sortedPoints) {
    while(
      lower.length >= 2 &&
      lower[lower.length - 2] !== undefined &&
      lower[lower.length - 1] !== undefined &&
      cross(lower[lower.length - 2] as Vector2, lower[lower.length - 1] as Vector2, point) <= 0
    ) {
      lower.pop();
    }
    lower.push(point);
  }


  const upper: Vector2[] = [];
  for(let i = sortedPoints.length - 1; i >= 0; i--) {
    const point = sortedPoints[i];
    if(point !== undefined) { // Add a check to ensure the point is defined
      while(
        upper.length >= 2 &&
        upper[upper.length - 2] !== undefined &&
        upper[upper.length - 1] !== undefined &&
        cross(upper[upper.length - 2] as Vector2, upper[upper.length - 1] as Vector2, point) <= 0
      ) {
        upper.pop();
      }
      upper.push(point); // Now point is guaranteed to be a Vector2
    }
  }


  // Concatenate lower and upper to get full hull
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

/**
 * Normalizes an angle to be between 0 and 2π.
 * @param angle Angle in radians.
 * @returns Normalized angle.
 */
function normalizeAngle(angle: number): number {
  const twoPi = Math.PI * 2;
  return ((angle % twoPi) + twoPi) % twoPi;
}


/**
 * Computes the oriented bounding box (OBB) for a set of 2D points.
 * @param points Array of Vector2 representing the polygon vertices.
 * @returns The OrientedBoundingBox object.
 */
export function computeOrientedBoundingBox(points: Vector2[]): OrientedBoundingBox {
  if(points.length < 3) {
    // throw new Error('At least 3 points are required to compute an OBB.');
    console.warn('At least 3 points are required to compute an OBB.');
  }

  let minArea = Infinity;
  let bestObb: OrientedBoundingBox | null = null;

  // Compute the convex hull of the points
  const hull = computeConvexHull(points);

  // Iterate over edges of the convex hull
  for(let i = 0; i < hull.length; i++) {
    const p1 = hull[i];
    // const p2 = hull[(i + 1) % hull.length];

    // Edge vector
    // const edge = p2.clone().sub(p1);
    const p2 = hull[(i + 1) % hull.length];
    if(!p2) {
      continue;
    } // Skip iteration if p2 is undefined

    if(!p1) {
      continue;
    } // Skip iteration if p2 is undefined
    const edge = p2.clone().sub(p1);

    const angle = -Math.atan2(edge.y, edge.x);

    // Rotate all points to align edge with x-axis
    const rotatedPoints = points.map(pt => rotatePoint(pt, angle));

    // Compute bounding box in rotated space
    const xs = rotatedPoints.map(pt => pt.x);
    const ys = rotatedPoints.map(pt => pt.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const area = (maxX - minX) * (maxY - minY);

    if(area < minArea) {
      minArea = area;

      // Compute center in original space
      const centerRotated = new Vector2((minX + maxX) / 2, (minY + maxY) / 2);
      const center = rotatePoint(centerRotated, -angle);

      // Compute corners in original space
      const cornersRotated = [
        new Vector2(minX, minY),
        new Vector2(maxX, minY),
        new Vector2(maxX, maxY),
        new Vector2(minX, maxY),
      ];
      const corners = cornersRotated.map(pt => rotatePoint(pt, -angle));

      bestObb = {
        center,
        width: maxX - minX,
        height: maxY - minY,
        angle: normalizeAngle(angle),
        corners,
      };
    }
  }

  // if(!bestObb) {
  //   throw new Error('Failed to compute the oriented bounding box.');
  // }
  if(!bestObb) {
    console.warn('Failed to compute the oriented bounding box. Returning default OBB.');
    return {
      center: new Vector2(),
      width: 0,
      height: 0,
      angle: 0,
      corners: [],
    };
  }

  return bestObb;
}
