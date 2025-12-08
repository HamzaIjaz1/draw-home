import { Vector2, Vector3 } from 'three';
import { RoofParts } from '../types';

export const hasExactlyTwoGableEnds = (roofParts: RoofParts): boolean => roofParts.filter(part => part.length === 3).length === 2;

export const findGableBasePoints = (part: Vector3[]): [Vector3, Vector3] | null => {
  if(part.length !== 3) {
    return null;
  }

  // Sort points by Y value
  const sortedPoints = [...part].sort((a, b) => a.y - b.y);

  if(sortedPoints.length < 2) {
    return null;
  }

  // First two points should have the same or very close Y values (base points)
  const point0 = sortedPoints[0];
  const point1 = sortedPoints[1];

  if(!point0 || !point1) {
    return null;
  }

  const yDifference = Math.abs(point0.y - point1.y);
  if(yDifference > 0.001) {
    return null;
  }

  return [point0, point1];
};

export const shouldFlipPoints = (
  points: [Vector3, Vector3],
  polygon: Vector2[],
): boolean => {
  // Convert points to 2D for polygon comparison
  const point1 = new Vector2(points[0].x, points[0].z);
  const point2 = new Vector2(points[1].x, points[1].z);

  // Find indices of these points in the polygon
  const index1 = polygon.findIndex(p => p.x === point1.x && p.y === point1.y);
  const index2 = polygon.findIndex(p => p.x === point2.x && p.y === point2.y);

  if(index1 === -1 || index2 === -1) {
    return false;
  }

  // Calculate the direction of traversal
  const polygonLength = polygon.length;
  const forward = (index1 + 1) % polygonLength === index2;
  const backward = (index2 + 1) % polygonLength === index1;

  // If points are not adjacent in either direction, use the shorter path
  if(!forward && !backward) {
    const dist1 = (index2 - index1 + polygonLength) % polygonLength;
    const dist2 = (index1 - index2 + polygonLength) % polygonLength;
    return dist2 < dist1; // Changed direction comparison
  }

  // Flip if going backward
  return backward;
};


const findNextPointInPolygon = (
  currentPoint: Vector2,
  avoidPoint: Vector2,
  polygon: Vector2[],
  visitedPoints: Set<string>,
): Vector2 => {
  const currentIndex = polygon.findIndex(p => p.x === currentPoint.x && p.y === currentPoint.y);
  if(currentIndex === -1) {
    return currentPoint;
  }

  const nextIndex = (currentIndex + 1) % polygon.length;
  const prevIndex = (currentIndex - 1 + polygon.length) % polygon.length;

  const nextPoint = polygon[nextIndex];
  const prevPoint = polygon[prevIndex];

  if(!nextPoint || !prevPoint) {
    return currentPoint;
  }

  // Create point keys for checking visited status
  const nextPointKey = `${nextPoint.x},${nextPoint.y}`;
  const prevPointKey = `${prevPoint.x},${prevPoint.y}`;

  // First try the next point if it's not visited and not the avoid point
  if(
    !visitedPoints.has(nextPointKey) &&
    !(nextPoint.x === avoidPoint.x && nextPoint.y === avoidPoint.y)
  ) {
    return nextPoint;
  }

  // Then try the previous point if it's not visited and not the avoid point
  if(
    !visitedPoints.has(prevPointKey) &&
    !(prevPoint.x === avoidPoint.x && prevPoint.y === avoidPoint.y)
  ) {
    return prevPoint;
  }

  // If both points are visited or should be avoided, return the next unvisited point in the polygon
  for(const point of polygon) {
    const pointKey = `${point.x},${point.y}`;
    if(
      !visitedPoints.has(pointKey) &&
      !(point.x === avoidPoint.x && point.y === avoidPoint.y)
    ) {
      return point;
    }
  }

  // Fallback to current point if no valid next point is found
  return currentPoint;
};

const countPointsBetween = (
  startPoint: Vector2,
  endPoint: Vector2,
  polygon: Vector2[],
): number => {
  const startIndex = polygon.findIndex(p => p.x === startPoint.x && p.y === startPoint.y);
  const endIndex = polygon.findIndex(p => p.x === endPoint.x && p.y === endPoint.y);

  if(startIndex === -1 || endIndex === -1) {
    return 0;
  }

  // Count points in both directions and return the smaller count
  const forwardCount = (endIndex - startIndex + polygon.length) % polygon.length;
  const backwardCount = (startIndex - endIndex + polygon.length) % polygon.length;

  // -1 because we don't count the endpoint itself
  return Math.min(forwardCount, backwardCount) - 1;
};

const validatePathLengths = (
  firstGablePair: [Vector2, Vector2],
  secondGablePair: [Vector2, Vector2],
  polygon: Vector2[],
): boolean => {
  // Count points between first gable points to second gable points in both paths
  const path1Points = countPointsBetween(firstGablePair[0], secondGablePair[0], polygon);
  const path2Points = countPointsBetween(firstGablePair[1], secondGablePair[1], polygon);

  return path1Points === path2Points;
};

export const pairPointsFromGables = (
  gablePoints: Array<[Vector3, Vector3]>,
  polygon: Vector2[],
  slopeAngle: number,
  heightSide: 'inside' | 'outside',
): Array<[Vector3, Vector3]> => {
  const pairs: Array<[Vector3, Vector3]> = [];
  const visitedPoints = new Set<string>();

  if(gablePoints.length < 2) {
    return pairs;
  }

  // Extract the two gable ends
  const [firstGable, secondGable] = gablePoints;

  if(!firstGable || !secondGable) {
    return pairs;
  }

  // Convert Vector3 gable points to Vector2
  const firstGablePair: [Vector2, Vector2] = [
    new Vector2(firstGable[0].x, firstGable[0].z),
    new Vector2(firstGable[1].x, firstGable[1].z),
  ];

  const secondGablePair: [Vector2, Vector2] = [
    new Vector2(secondGable[0].x, secondGable[0].z),
    new Vector2(secondGable[1].x, secondGable[1].z),
  ];

  // Find the maximum width between any pair of gable points (to compute constant height)
  const width1 = firstGablePair[0].distanceTo(firstGablePair[1]);
  const width2 = secondGablePair[0].distanceTo(secondGablePair[1]);
  const maxWidth = Math.max(width1, width2);

  // Convert slopeAngle to radians and calculate the roof height
  const constantHeight = Math.tan((slopeAngle * Math.PI) / 180) * maxWidth;

  // Validate path lengths before proceeding
  if(!validatePathLengths(firstGablePair, secondGablePair, polygon)) {
    return pairs;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 1) Add the first pair, mark them as visited
  // ──────────────────────────────────────────────────────────────────────────
  pairs.push([
    new Vector3(
      firstGablePair[0].x,
      heightSide === 'inside' ? constantHeight : 0,
      firstGablePair[0].y,
    ),
    new Vector3(
      firstGablePair[1].x,
      heightSide === 'outside' ? constantHeight : 0,
      firstGablePair[1].y,
    ),
  ]);

  // Mark these original points as visited right away
  visitedPoints.add(`${firstGablePair[0].x},${firstGablePair[0].y}`);
  visitedPoints.add(`${firstGablePair[1].x},${firstGablePair[1].y}`);

  // ──────────────────────────────────────────────────────────────────────────
  // 2) Find the next pair of points around the polygon
  // ──────────────────────────────────────────────────────────────────────────
  let current2DPair: [Vector2, Vector2] = [
    findNextPointInPolygon(firstGablePair[0], firstGablePair[1], polygon, visitedPoints),
    findNextPointInPolygon(firstGablePair[1], firstGablePair[0], polygon, visitedPoints),
  ];

  // Add these new points to visited set
  visitedPoints.add(`${current2DPair[0].x},${current2DPair[0].y}`);
  visitedPoints.add(`${current2DPair[1].x},${current2DPair[1].y}`);

  // Function to check if we hit the second gable
  const isSecondGablePoint = (p: Vector2) => secondGablePair[0].equals(p) || secondGablePair[1].equals(p);

  // ──────────────────────────────────────────────────────────────────────────
  // 3) Walk around the polygon, collecting pairs until we reach the second gable
  // ──────────────────────────────────────────────────────────────────────────
  while(!isSecondGablePoint(current2DPair[0]) && !isSecondGablePoint(current2DPair[1])) {
    const current3DPair: [Vector3, Vector3] = [
      new Vector3(
        current2DPair[0].x,
        heightSide === 'inside' ? constantHeight : 0,
        current2DPair[0].y,
      ),
      new Vector3(
        current2DPair[1].x,
        heightSide === 'outside' ? constantHeight : 0,
        current2DPair[1].y,
      ),
    ];
    pairs.push(current3DPair);

    const lastPair = pairs[pairs.length - 1];
    if(!lastPair) {
      break;
    }

    // Prepare for the next iteration
    const nextPair: [Vector2, Vector2] = [
      findNextPointInPolygon(
        current2DPair[0],
        new Vector2(lastPair[0].x, lastPair[0].z),
        polygon,
        visitedPoints,
      ),
      findNextPointInPolygon(
        current2DPair[1],
        new Vector2(lastPair[1].x, lastPair[1].z),
        polygon,
        visitedPoints,
      ),
    ];

    // Safety check: if we cannot find any new points, or if it circles back
    if(
      (nextPair[0].equals(current2DPair[0]) && nextPair[1].equals(current2DPair[1])) ||
      nextPair[0].equals(firstGablePair[0]) ||
      nextPair[1].equals(firstGablePair[1])
    ) {
      break;
    }

    // Update current2DPair and mark them visited
    current2DPair = nextPair;
    visitedPoints.add(`${current2DPair[0].x},${current2DPair[0].y}`);
    visitedPoints.add(`${current2DPair[1].x},${current2DPair[1].y}`);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 4) Finally, add the second gable pair with the constant height
  // ──────────────────────────────────────────────────────────────────────────
  pairs.push([
    new Vector3(
      secondGablePair[0].x,
      heightSide === 'inside' ? constantHeight : 0,
      secondGablePair[0].y,
    ),
    new Vector3(
      secondGablePair[1].x,
      heightSide === 'outside' ? constantHeight : 0,
      secondGablePair[1].y,
    ),
  ]);

  return pairs;
};


export const generateQuadsFromPairs = (pairs: Array<[Vector3, Vector3]>): RoofParts => {
  const quads: RoofParts = [];

  for(let i = 0; i < pairs.length - 1; i++) {
    const currentPair = pairs[i];
    const nextPair = pairs[i + 1];

    if(!currentPair || !nextPair) {
      continue;
    }

    // Create quad using the already elevated points
    const quad = [
      currentPair[0], // Already elevated
      currentPair[1], // Ground level
      nextPair[1], // Ground level
      nextPair[0], // Already elevated
    ] as [Vector3, Vector3, Vector3, ...Vector3[]];

    quads.push(quad);
  }

  return quads;
};
