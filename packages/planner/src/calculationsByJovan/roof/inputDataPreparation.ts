import { Vector2 } from 'three';
import { Point, Ring } from '../types';
import { offsetPolygon } from '../Utils/Curve/utils';
import { roundToTwoDecimals } from '../Utils/Maths/operators';
import { isContourClockwise } from '../../utils/isContourClockwise';
import { cleanPolygon } from '../roofUtils/geometryCleanup';

/**
 * Checks if a vertex is convex (not reflex) in a counter-clockwise polygon.
 * For CCW polygons, convex vertices have interior angle < 180°.
 */
function isConvexVertex(prev: Vector2, current: Vector2, next: Vector2): boolean {
  // Edge vectors: from prev to current, and from current to next
  const edge1x = current.x - prev.x;
  const edge1y = current.y - prev.y;
  const edge2x = next.x - current.x;
  const edge2y = next.y - current.y;

  // Cross product: positive = left turn (convex), negative = right turn (reflex)
  // For a CCW polygon traversal, convex corners turn left
  const cross = edge1x * edge2y - edge1y * edge2x;

  // Add debug logging
  const isConvex = cross > 0;

  return isConvex;
}

/**
 * Finds the shortest edge where both endpoints are convex vertices.
 * Returns the index of the starting vertex of that edge.
 * If no such edge exists, returns 0.
 */
function findShortestConvexEdge(coords: Vector2[]): number {
  if(coords.length < 3) {
    return 0;
  }

  let shortestLength = Infinity;
  let shortestIndex = 0;
  const debugInfo: any[] = [];

  for(let i = 0; i < coords.length; i++) {
    const prevPrev = coords[(i - 2 + coords.length) % coords.length];
    const prev = coords[(i - 1 + coords.length) % coords.length];
    const current = coords[i];
    const next = coords[(i + 1) % coords.length];
    const nextNext = coords[(i + 2) % coords.length];

    if(!prevPrev || !prev || !current || !next || !nextNext) {
      continue;
    }

    // Check if current vertex (start of edge) is convex
    const currentIsConvex = isConvexVertex(prev, current, next);

    // Check if next vertex (end of edge) is convex
    const nextIsConvex = isConvexVertex(current, next, nextNext);

    // Calculate edge length
    const dx = next.x - current.x;
    const dy = next.y - current.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    debugInfo.push({
      edgeIndex: i,
      currentVertex: [current.x.toFixed(2), current.y.toFixed(2)],
      nextVertex: [next.x.toFixed(2), next.y.toFixed(2)],
      currentConvex: currentIsConvex,
      nextConvex: nextIsConvex,
      edgeLength: length.toFixed(2),
      bothConvex: currentIsConvex && nextIsConvex,
    });

    // Accept edges where at least the START is convex (most important for bisector calculation)
    if(currentIsConvex) {
      if(length < shortestLength) {
        shortestLength = length;
        shortestIndex = i;
      }
    }
  }

  // console.log('Edge analysis (showing first 3):', debugInfo.slice(0, 3));

  // console.log(`Found ${convexEdgeCount} edges with convex start vertex`);
  // if(convexEdgeCount > 0) {
  //   console.log(`Starting at shortest edge with convex start: length=${shortestLength.toFixed(2)}, startIndex=${shortestIndex}`);
  // } else {
  //   console.log('No convex start vertices found, using default start position');
  // }

  return shortestIndex;
}

/**
 * Rotates the point array to start at the optimal vertex.
 * Optimal = start of shortest edge where both endpoints are convex.
 */
function rotateToOptimalStart(coords: Vector2[]): Vector2[] {
  if(coords.length < 3) {
    return coords;
  }

  const optimalStartIndex = findShortestConvexEdge(coords);

  // if(optimalStartIndex === 0) {
  //   console.log('Already starting at optimal vertex');
  //   return coords;
  // }

  // console.log(`Rotating to start at vertex ${optimalStartIndex} (shortest convex edge)`);
  return [...coords.slice(optimalStartIndex), ...coords.slice(0, optimalStartIndex)];
}

/**
 * Removes collinear points that lie on edges between other vertices.
 * These points don't affect the overall shape but can break algorithms.
 */
function removeCollinearPoints(coords: Vector2[]): Vector2[] {
  if(coords.length < 3) {
    return coords;
  }

  const filtered: Vector2[] = [];
  const epsilon = 0.001; // More tolerant threshold for collinearity detection

  for(let i = 0; i < coords.length; i++) {
    const prev = coords[(i - 1 + coords.length) % coords.length];
    const current = coords[i];
    const next = coords[(i + 1) % coords.length];

    if(!prev || !current || !next) {
      continue;
    }

    // Calculate vectors from previous to current and current to next
    const dx1 = current.x - prev.x;
    const dy1 = current.y - prev.y;
    const dx2 = next.x - current.x;
    const dy2 = next.y - current.y;

    // Calculate vector lengths
    const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

    // Skip if either edge is degenerate (too short)
    if(len1 < 1e-10 || len2 < 1e-10) {
      continue;
    }

    // Calculate cross product to check if points are collinear
    // Normalize by edge lengths for scale-independent comparison
    const crossProduct = Math.abs((dx1 * dy2 - dy1 * dx2) / (len1 * len2));

    // Keep the point if it's not collinear (cross product is significant)
    if(crossProduct > epsilon) {
      filtered.push(current);
    }
  }

  return filtered.length >= 3 ? filtered : coords; // Return original if filtering resulted in < 3 points
}

export function prepareCoordinates(coords: Vector2[], offset: number): {
  offsetCoordsOriginalCoordsMatched: Array<{ original: { x: number; y: number }; offset: { x: number; y: number } }>;
  polygon: Ring;
} {
  // Remove collinear points first
  let cleanedCoords = removeCollinearPoints(coords);

  cleanedCoords = isContourClockwise(cleanedCoords) ? cleanedCoords.toReversed() : cleanedCoords;

  // Rotate to start at optimal position (shortest convex edge)
  // Do this BEFORE offsetting to maintain the coordinate mapping
  cleanedCoords = rotateToOptimalStart(cleanedCoords);

  // Offset the coordinates
  const offsetCoords = offsetPolygon(cleanedCoords, offset).map(({ x, y }) => ({
    x: roundToTwoDecimals(x),
    y: roundToTwoDecimals(y),
  }));

  // Create the roof polygon (Ring) and clean it for skeleton generation
  const polygonBeforeCleaning: Ring = offsetCoords.map(({ x, y }) => [x, y] as Point);
  const polygon: Ring = cleanPolygon(polygonBeforeCleaning);

  // Create a mapping between offset coordinates and original coordinates
  const offsetCoordsOriginalCoordsMatched = offsetCoords.map(({ x, y }, index) => ({
    original: {
      x: roundToTwoDecimals(cleanedCoords[index]?.x ?? 0),
      y: roundToTwoDecimals(cleanedCoords[index]?.y ?? 0),
    },
    offset: { x, y },
  }));


  return { offsetCoordsOriginalCoordsMatched, polygon };
}
