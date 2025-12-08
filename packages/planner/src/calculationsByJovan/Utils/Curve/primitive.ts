import { Vector2, Vector3 } from 'three';
import { approximatelySame, Point2 } from '../Vector/point';


const EPSILON = 1e-9; // Small value for floating-point comparison

/**
 * Adaptive rounding that preserves precision while avoiding floating point errors
 * Uses higher precision (6 decimal places) to prevent merging of distinct points
 * while still rounding to avoid accumulation of floating point errors
 */
// function adaptiveRound(point: Point2): Point2 {
//   // Round to 6 decimal places (0.000001 units precision)
//   // This is much more precise than the original 2 decimal places
//   // and should prevent distinct points from merging while still
//   // avoiding floating point accumulation errors
//   // Na kraju sam vratio na round(1), a smanjio u slav.ts epsilon na 0.0000000000000000001
//   return point.round(1);
// }
export class Edge2 {
  p1: Point2;
  p2: Point2;
  norm: Point2;
  i1?: number;
  i2?: number;

  constructor(p1: Point2 | number | undefined, p2: Point2 | number | undefined, norm?: Point2, verts?: Point2[]) {
    let point1: Point2;
    let point2: Point2;

    if(verts) {
      this.i1 = p1 as number;
      this.i2 = p2 as number;

      const vert1 = verts[this.i1];
      const vert2 = verts[this.i2];

      // if(vert1 === undefined || vert2 === undefined) {
      //   throw new Error('Vertex index out of bounds');
      // }

      // point1 = vert1;
      // point2 = vert2;
      if(vert1 === undefined || vert2 === undefined) {
        console.warn('Vertex index out of bounds. Edge2 will be initialized with default points.');
        point1 = new Point2(0, 0); // Default values if index is out of bounds
        point2 = new Point2(0, 0);
      } else {
        point1 = vert1;
        point2 = vert2;
      }
      // } else {
      //   if(p1 === undefined || p2 === undefined) {
      //     throw new Error('Points cannot be undefined');
      //   }

    //   point1 = p1 as Point2;
    //   point2 = p2 as Point2;
    // }
    } else if(p1 === undefined || p2 === undefined) {
      console.warn('Points cannot be undefined. Edge2 will be initialized with default points.');
      point1 = new Point2(0, 0); // Default values if points are undefined
      point2 = new Point2(0, 0);
    } else {
      point1 = p1 as Point2;
      point2 = p2 as Point2;
    }

    this.p1 = new Point2(point1.x, point1.y);
    this.p2 = new Point2(point2.x, point2.y);

    if(norm) {
      this.norm = new Point2(norm.x, norm.y);
    } else {
      const norm = this.p2.subtract(this.p1).normalized();
      this.norm = norm;
    }
  }

  lengthSquared(): number {
    const dx = this.p2.x - this.p1.x;
    const dy = this.p2.y - this.p1.y;
    return dx * dx + dy * dy;
  }
}


export class Line2 {
  private static readonly MAX_DISTANCE = 80;

  constructor(public p1: Point2, public p2: Point2) {}

  get v(): Point2 {
    return this.p2.subtract(this.p1).normalized();
  }

  intersect(line: Line2): Point2 | null {
    const det = this.v.x * line.v.y - this.v.y * line.v.x;

    // Check for parallel or near-parallel lines
    if(Math.abs(det) < EPSILON) {
      return null;
    }

    const dx = line.p1.x - this.p1.x;
    const dy = line.p1.y - this.p1.y;
    const t = (dx * line.v.y - dy * line.v.x) / det;

    // Check if t is negative (intersection behind line origin)
    if(t < -EPSILON) {
      return null;
    }

    // Check if t is within the maximum distance
    const intersectionDistance = t * Math.sqrt(this.v.x * this.v.x + this.v.y * this.v.y);
    if(intersectionDistance > Line2.MAX_DISTANCE) {
      return null;
    }

    const intersection = new Point2(this.p1.x + t * this.v.x, this.p1.y + t * this.v.y);

    // Check if intersection is too close to start point (degenerate case)
    if(intersection.distance(this.p1) < EPSILON || intersection.distance(line.p1) < EPSILON) {
      return null;
    }

    // Use adaptive rounding with higher precision to prevent merging issues
    // return adaptiveRound(intersection);
    return intersection;
  }

  pointOnSegment(point: Point2, maxDistance: number): boolean {
    const epsilon = 1e-5;
    const length1 = this.p1.distance(point);
    const length2 = this.p2.distance(point);
    const lineLength = this.p1.distance(this.p2);
    return Math.abs(length1 + length2 - lineLength) < epsilon && length1 <= maxDistance && length2 <= maxDistance;
  }

  // intersect(line: Line2): Point2 | null {
  //   const det = this.v.x * line.v.y - this.v.y * line.v.x;
  //   if (Math.abs(det) < EPSILON) return null;

  //   const dx = line.p1.x - this.p1.x;
  //   const dy = line.p1.y - this.p1.y;
  //   const t = (dx * line.v.y - dy * line.v.x) / det;

  //   // Remove this condition if we want to consider infinite lines
  //   if (t < 0) return null;

  //   const intersection = new Point2(this.p1.x + t * this.v.x, this.p1.y + t * this.v.y);
  //   return intersection;
  // }

  distance(point: Point2): number {
    const a = this.v.y;
    const b = -this.v.x;
    const c = -(a * this.p1.x + b * this.p1.y);
    return Math.abs(a * point.x + b * point.y + c) / Math.sqrt(a * a + b * b);
  }

  equals(line: Line2): boolean {
    return (
      approximatelySame(this.p1, line.p1) && approximatelySame(this.v, line.v)
    );
  }
}


export class Ray2 {
  constructor(public p: Point2, public v: Point2) {}

  atDistance(distance: number): Point2 {
    return new Point2(this.p.x + this.v.x * distance, this.p.y + this.v.y * distance);
  }

  intersect(line: Line2 | Ray2): Point2 | null {
    const det = this.v.x * line.v.y - this.v.y * line.v.x;

    // Check for parallel or near-parallel rays/lines
    if(Math.abs(det) < EPSILON) {
      return null;
    }

    const dx = line instanceof Ray2 ? line.p.x - this.p.x : line.p1.x - this.p.x;
    const dy = line instanceof Ray2 ? line.p.y - this.p.y : line.p1.y - this.p.y;
    const t = (dx * line.v.y - dy * line.v.x) / det;

    // Ensure the intersection is in the direction of the ray
    // Use epsilon tolerance to handle floating-point errors at boundaries
    if(t < -EPSILON) {
      return null;
    }

    const intersection = new Point2(this.p.x + t * this.v.x, this.p.y + t * this.v.y);

    // Check if intersection is too close to ray origin (degenerate case)
    // if(intersection.distance(this.p) < EPSILON) {
    //   return null;
    // }

    // For Ray2, check if the intersection is in the correct direction for both rays
    if(line instanceof Ray2) {
      const t2 = ((intersection.x - line.p.x) * line.v.x + (intersection.y - line.p.y) * line.v.y) / (line.v.x * line.v.x + line.v.y * line.v.y);
      // Use epsilon tolerance to handle floating-point errors
      if(t2 < 0) {
        return null;
      }
    } else if(intersection.distance(line.p1) < EPSILON) {
      // For Line2, check distance to start point
      return null;
    }

    // Use adaptive rounding with higher precision to prevent merging issues
    // return adaptiveRound(intersection);
    return intersection;
  }
}


// Function to fit a circle through three points
export function fitCircle3Points(points: Vector2[]): { center: Vector2; radius: number } | null {
  if(points.length !== 3) {
    // throw new Error('Exactly 3 points are required to fit a circle.');
    console.warn('fitCircle3Points requires exactly 3 points. Returning null.');
    return null;
  }

  const [p1, p2, p3] = points;

  if(!p1 || !p2 || !p3) {
    return null; // Return null or throw an error if any point is undefined
  }

  // Compute the midpoints of the lines between the points
  const mid1 = new Vector2((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
  const mid2 = new Vector2((p2.x + p3.x) / 2, (p2.y + p3.y) / 2);

  // Slopes of the lines between the points
  const slope1 = (p2.y - p1.y) / (p2.x - p1.x);
  const slope2 = (p3.y - p2.y) / (p3.x - p2.x);

  // Perpendicular slopes
  const perpSlope1 = -1 / slope1;
  const perpSlope2 = -1 / slope2;

  // Intersection of the perpendicular bisectors
  const x = (perpSlope1 * mid1.x - perpSlope2 * mid2.x + mid2.y - mid1.y) / (perpSlope1 - perpSlope2);
  const y = perpSlope1 * (x - mid1.x) + mid1.y;

  // Calculate the radius
  const center = new Vector2(x, y);
  const radius = center.distanceTo(p1); // Assuming you have a method to calculate distance

  return { center, radius };
}

export type Arc = {
  source: Point2;
  sinks: Point2[];
};

export function rectangleMidpointSlopes(
  frontCenter: Vector3,
  backCenter: Vector3,
  slopeDirection: Vector3,
  halfWidth: number,
): Vector3[] {
  const leftFrontCorner = frontCenter.clone().add(slopeDirection.clone().multiplyScalar(-halfWidth));
  const rightFrontCorner = frontCenter.clone().add(slopeDirection.clone().multiplyScalar(halfWidth));
  const leftBackCorner = backCenter.clone().add(slopeDirection.clone().multiplyScalar(-halfWidth));
  const rightBackCorner = backCenter.clone().add(slopeDirection.clone().multiplyScalar(halfWidth));

  return [leftFrontCorner, rightFrontCorner, leftBackCorner, rightBackCorner];
}
