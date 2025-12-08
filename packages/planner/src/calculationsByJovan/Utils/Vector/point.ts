import { Vector3 } from 'three';

const EPSILON = 1e-9; // Small value for floating-point comparison


export class Point2 {
  constructor(public x: number, public y: number) {}

  normalized(): Point2 {
    const length = Math.sqrt(this.x * this.x + this.y * this.y);
    return new Point2(this.x / length, this.y / length);
  }

  negate(): Point2 {
    return new Point2(-this.x, -this.y);
  }

  add(point: Point2): Point2 {
    return new Point2(this.x + point.x, this.y + point.y);
  }

  dot(point: Point2): number {
    return this.x * point.x + this.y * point.y;
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  flipY(): Point2 {
    return new Point2(this.x, -this.y);
  }

  distance(other: Point2): number {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }


  subtract(other: Point2): Point2 {
    return new Point2(this.x - other.x, this.y - other.y);
  }

  equals(v: Point2, epsilon = EPSILON): boolean {
    return Math.abs(this.x - v.x) < epsilon && Math.abs(this.y - v.y) < epsilon;
  }

  round(precision = 2): Point2 {
    const factor = 10 ** precision;
    return new Point2(Math.round(this.x * factor) / factor, Math.round(this.y * factor) / factor);
  }
}


export function approximatelyEquals(a: number, b: number): boolean {
  return (
    a === b || Math.abs(a - b) <= Math.max(Math.abs(a), Math.abs(b)) * 0.001
  );
}

export function approximatelySame(pointA: Point2, pointB: Point2): boolean {
  return (
    approximatelyEquals(pointA.x, pointB.x) &&
    approximatelyEquals(pointA.y, pointB.y)
  );
}

export function normalizeContour(contour: Array<[number, number]>): Array<[number, number]> {
  const points = contour.map(([x, y]) => new Point2(x, y));

  return points
    .filter((point, index) => {
      const prev = points[(index - 1 + points.length) % points.length];
      const next = points[(index + 1) % points.length];
      return !!prev && !!next && !approximatelySame(point, next) && !approximatelySame(point, prev);
    })
    .map(point => [point.x, point.y] as [number, number]);
}

export function projectPointOntoPlaneAlongDirection(
  point: Vector3,
  direction: Vector3,
  planeNormal: Vector3,
  planePoint: Vector3,
): Vector3 {
  const numerator = planeNormal.dot(point.clone().sub(planePoint));
  const denominator = planeNormal.dot(direction);

  if(denominator === 0) {
    // throw new Error('Direction is parallel to the plane; cannot project.');
    console.warn('Direction is parallel to the plane; cannot project.');
  }

  const t = -numerator / denominator;
  return point.clone().add(direction.clone().multiplyScalar(t));
}
