/**
 * Geometry cleanup utilities for robust straight skeleton algorithm
 * Handles edge cases like parallel edges, close points, and degenerate geometry
 */

import { Point2 } from '../Utils/Vector/point';
import { Subtree } from '../types';

// Unified epsilon configuration for consistent geometric operations
export const GEOMETRY_EPSILON = {
  // Distance threshold for considering points as identical
  // NEKI SU DOBRI NA 0.7 A NEKI TEK NA 0.01
  // NE MOGU DA ZAKLJUCAM
  POINT_MERGE: 0.01,
  // Distance threshold for snapping close points
  POINT_SNAP: 0.05,
  // Angular threshold for parallel edges (in radians)
  PARALLEL_ANGLE: 0.001, // ~0.057 degrees
  // Minimum edge length to consider valid
  MIN_EDGE_LENGTH: 0.001,
  // Maximum distance for skeleton intersection validation
  MAX_INTERSECTION_DISTANCE: 80,
  // Threshold for cluster merging
  // ZAKLJUCANO 0.25
  CLUSTER_THRESHOLD: 0.25,
  // For orientation tests (cross product sign checks)
  // ZAKLJUCANO 0.04
  ORIENTATION: 0.04,
  // Minimum magnitude for valid bisector
  MIN_BISECTOR_MAGNITUDE: 1e-10,
};

/**
 * Snaps a point to grid for numerical stability
 */
export function snapToGrid(point: Point2, gridSize = GEOMETRY_EPSILON.POINT_SNAP): Point2 {
  return new Point2(
    Math.round(point.x / gridSize) * gridSize,
    Math.round(point.y / gridSize) * gridSize,
  );
}

/**
 * Checks if two points are within merge threshold
 */
export function shouldMergePoints(p1: Point2, p2: Point2): boolean {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const distSq = dx * dx + dy * dy;
  return distSq < GEOMETRY_EPSILON.POINT_MERGE * GEOMETRY_EPSILON.POINT_MERGE;
}

/**
 * Merges duplicate or very close points in a point array
 */
export function mergeClosePoints(points: Point2[]): Point2[] {
  if(points.length === 0) {
    return [];
  }

  const merged: Point2[] = [];
  const used = new Set<number>();

  for(let i = 0; i < points.length; i++) {
    if(used.has(i)) {
      continue;
    }

    const point = points[i];
    if(!point) {
      continue;
    }

    // Find all points close to this one
    const cluster: Point2[] = [point];
    for(let j = i + 1; j < points.length; j++) {
      const other = points[j];
      if(!other || used.has(j)) {
        continue;
      }

      if(shouldMergePoints(point, other)) {
        cluster.push(other);
        used.add(j);
      }
    }

    // Average the cluster positions for stability
    if(cluster.length > 0) {
      const avgX = cluster.reduce((sum, p) => sum + p.x, 0) / cluster.length;
      const avgY = cluster.reduce((sum, p) => sum + p.y, 0) / cluster.length;
      merged.push(new Point2(avgX, avgY));
    }
  }

  return merged;
}

/**
 * Cleans a polygon by removing duplicate points, collinear points, and short edges
 */
export function cleanPolygon(polygon: Array<[number, number]>): Array<[number, number]> {
  if(polygon.length < 3) {
    return polygon;
  }

  const points = polygon.map(([x, y]) => new Point2(x, y));
  const cleaned: Point2[] = [];

  for(let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    const prev = points[(i - 1 + points.length) % points.length];

    if(!current || !next || !prev) {
      continue;
    }

    // Skip if too close to next point
    if(shouldMergePoints(current, next)) {
      continue;
    }

    // Skip if collinear with neighbors (creates degenerate edge)
    // Use vectors from prev->current and current->next instead of normalizing from current
    const v1 = current.subtract(prev);
    const v2 = next.subtract(current);

    // Calculate lengths to avoid division by zero
    const len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

    if(len1 < GEOMETRY_EPSILON.MIN_EDGE_LENGTH || len2 < GEOMETRY_EPSILON.MIN_EDGE_LENGTH) {
      continue; // Edge too short
    }

    // Cross product (non-normalized) - if collinear, this will be near zero
    const cross = Math.abs(v1.x * v2.y - v1.y * v2.x);

    // Normalize by the product of lengths for scale-independent check
    const normalizedCross = cross / (len1 * len2);

    if(normalizedCross < GEOMETRY_EPSILON.PARALLEL_ANGLE) {
      continue; // Collinear point
    }

    cleaned.push(current);
  }

  // Need at least 3 points for valid polygon
  if(cleaned.length < 3) {
    return polygon;
  }

  return cleaned.map(p => [p.x, p.y] as [number, number]);
}

/**
 * Manhattan distance for faster cluster detection
 */
function manhattanDistance(p1: Point2, p2: Point2): number {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

/**
 * Finds clusters of skeleton nodes that are very close together
 */
function findSkeletonClusters(skeleton: Subtree[]): number[][] {
  const clusters: number[][] = [];
  const processed = new Set<number>();

  for(let i = 0; i < skeleton.length; i++) {
    if(processed.has(i)) {
      continue;
    }

    const node = skeleton[i];
    if(!node) {
      continue;
    }

    const cluster = [i];
    processed.add(i);

    // Find all nearby nodes
    for(let j = i + 1; j < skeleton.length; j++) {
      if(processed.has(j)) {
        continue;
      }

      const other = skeleton[j];
      if(!other) {
        continue;
      }

      const dist = manhattanDistance(node.source, other.source);
      if(dist < GEOMETRY_EPSILON.CLUSTER_THRESHOLD) {
        cluster.push(j);
        processed.add(j);
      }
    }

    // Only add if we found a cluster (more than 1 node)
    if(cluster.length > 1) {
      clusters.push(cluster);
    }
  }

  return clusters;
}

/**
 * Creates a unique string key for a point (for Map/Set usage)
 */
function pointKey(p: Point2): string {
  // Round to avoid floating point issues in key generation
  const x = Math.round(p.x * 1000) / 1000;
  const y = Math.round(p.y * 1000) / 1000;
  return `${x},${y}`;
}

/**
 * Merges a cluster of skeleton nodes into a single averaged node
 */
function mergeCluster(skeleton: Subtree[], clusterIndices: number[]): void {
  if(clusterIndices.length === 0) {
    return;
  }

  let totalX = 0;
  let totalY = 0;
  let totalHeight = 0;
  const allSinks = new Map<string, Point2>();
  const mergedSources = new Set<string>();

  // Collect data from all nodes in cluster
  for(const idx of clusterIndices) {
    const node = skeleton[idx];
    if(!node) {
      continue;
    }

    totalX += node.source.x;
    totalY += node.source.y;
    totalHeight += node.height;
    mergedSources.add(pointKey(node.source));

    // Collect unique sinks
    for(const sink of node.sinks) {
      const key = pointKey(sink);
      if(!allSinks.has(key) && !mergedSources.has(key)) {
        allSinks.set(key, sink);
      }
    }
  }

  const count = clusterIndices.length;
  const newSource = new Point2(totalX / count, totalY / count);
  const newHeight = totalHeight / count;
  const newSinks = Array.from(allSinks.values());

  // Update references in other nodes
  for(let i = 0; i < skeleton.length; i++) {
    const node = skeleton[i];
    if(!node || clusterIndices.includes(i)) {
      continue;
    }

    node.sinks = node.sinks.map(sink => {
      const key = pointKey(sink);
      return mergedSources.has(key) ? newSource : sink;
    });
  }

  // Remove old nodes (in reverse order to maintain indices)
  const sortedIndices = [...clusterIndices].sort((a, b) => b - a);
  for(const idx of sortedIndices) {
    skeleton.splice(idx, 1);
  }

  // Add merged node
  skeleton.push({
    source: newSource,
    height: newHeight,
    sinks: newSinks,
  });
}

/**
 * Detects and merges skeleton node clusters
 * This prevents issues with multiple nodes at nearly the same location
 */
export function mergeSkeletonClusters(skeleton: Subtree[]): Subtree[] {
  if(skeleton.length === 0) {
    return skeleton;
  }

  const result = [...skeleton];
  let hasChanges = true;

  while(hasChanges) {
    hasChanges = false;
    const clusters = findSkeletonClusters(result);

    if(clusters.length > 0) {
      hasChanges = true;
      // Merge the largest cluster first for stability
      const largestCluster = clusters.reduce((max, cluster) => cluster.length > max.length ? cluster : max);
      mergeCluster(result, largestCluster);
    }
  }

  return result;
}

/**
 * Removes degenerate arcs (where source equals sink)
 */
export function removeDegenerateArcs(skeleton: Subtree[]): Subtree[] {
  return skeleton.map(arc => ({
    ...arc,
    sinks: arc.sinks.filter(sink => !shouldMergePoints(sink, arc.source)),
  })).filter(arc => arc.sinks.length > 0);
}

/**
 * Validates skeleton connectivity and removes orphaned nodes
 */
export function validateSkeletonConnectivity(
  skeleton: Subtree[],
  polygonPoints: Array<[number, number]>,
): Subtree[] {
  if(skeleton.length === 0) {
    return skeleton;
  }

  // Build connectivity map
  const sourceMap = new Map<string, number>();
  skeleton.forEach((arc, idx) => {
    sourceMap.set(pointKey(arc.source), idx);
  });

  // Create polygon point keys
  const polygonKeys = new Set(
    polygonPoints.map(([x, y]) => pointKey(new Point2(x, y))),
  );

  // Mark nodes as valid if they connect to polygon or other valid nodes
  const valid = Array.from({ length: skeleton.length }, () => false);
  let hasChanges = true;

  // Initial pass: mark nodes connected to polygon boundary
  for(let i = 0; i < skeleton.length; i++) {
    const arc = skeleton[i];
    if(!arc) {
      continue;
    }

    for(const sink of arc.sinks) {
      if(polygonKeys.has(pointKey(sink))) {
        valid[i] = true;
        break;
      }
    }
  }

  // Iteratively mark nodes connected to valid nodes
  while(hasChanges) {
    hasChanges = false;

    for(let i = 0; i < skeleton.length; i++) {
      if(valid[i]) {
        continue;
      }

      const arc = skeleton[i];
      if(!arc) {
        continue;
      }

      // Check if any sink connects to a valid node
      for(const sink of arc.sinks) {
        const sinkIdx = sourceMap.get(pointKey(sink));
        if(sinkIdx !== undefined && valid[sinkIdx]) {
          valid[i] = true;
          hasChanges = true;
          break;
        }
      }
    }
  }

  // Return only valid nodes
  return skeleton.filter((_, idx) => valid[idx] === true);
}

/**
 * Removes ghost edges from skeleton
 * Ghost edges are very short, highly parallel edges that are artifacts of the algorithm
 */
export function removeGhostEdges(skeleton: Subtree[]): Subtree[] {
  const PARALLEL = 0.01; // 1-cos(alpha), where alpha is the largest angle to accept as parallel
  const EPSILON = 0.00001; // Threshold for highly parallel edges

  const result = skeleton.map(arc => ({ ...arc, sinks: [...arc.sinks] }));

  // Step 1: Remove self-loops (source in sinks)
  for(const arc of result) {
    arc.sinks = arc.sinks.filter(sink => !shouldMergePoints(sink, arc.source));
  }

  // Step 2: Find and resolve parallel skeleton edges (bpypolyskel algorithm)
  for(const arc of result) {
    const source = arc.source;

    // Keep trying to find parallel edges until no more changes
    let sinksAltered = true;
    while(sinksAltered) {
      sinksAltered = false;

      // Check all pairs of sinks from this source
      for(let i = 0; i < arc.sinks.length; i++) {
        for(let j = i + 1; j < arc.sinks.length; j++) {
          const sink1 = arc.sinks[i];
          const sink2 = arc.sinks[j];

          if(!sink1 || !sink2) {
            continue;
          }

          // Calculate vectors from source to each sink (s0 and s1 in Python)
          const s0 = new Point2(sink1.x - source.x, sink1.y - source.y);
          const s1 = new Point2(sink2.x - source.x, sink2.y - source.y);

          // Calculate magnitudes (s0m and s1m in Python)
          const s0m = Math.sqrt(s0.x * s0.x + s0.y * s0.y);
          const s1m = Math.sqrt(s1.x * s1.x + s1.y * s1.y);

          if(s0m !== 0.0 && s1m !== 0.0) {
            // Check if this pair of edges is parallel
            const dotCosineAbs = Math.abs((s0.x * s1.x + s0.y * s1.y) / (s0m * s1m) - 1.0);

            if(dotCosineAbs < PARALLEL) {
              // Determine near and far sinks
              let farSink: Point2;
              let nearSink: Point2;

              if(s0m < s1m) {
                farSink = sink2;
                nearSink = sink1;
              } else {
                farSink = sink1;
                nearSink = sink2;
              }

              // Find the skeleton node that has nearSink as its source
              const nodeIndex = result.findIndex(node => pointKey(node.source) === pointKey(nearSink));

              if(nodeIndex === -1) {
                break;
              }

              // If highly parallel, remove both sinks and redirect through nearSink
              if(dotCosineAbs < EPSILON) {
                const nearSinkNode = result[nodeIndex];
                if(nearSinkNode) {
                  nearSinkNode.sinks.push(farSink);
                  arc.sinks = arc.sinks.filter(s => s !== farSink && s !== nearSink);
                  sinksAltered = true;
                  break;
                }
              }
            }
          }
        }

        if(sinksAltered) {
          break;
        }
      }
    }
  }

  // Remove arcs with no sinks
  return result.filter(arc => arc.sinks.length > 0);
}

/**
 * Comprehensive cleanup pipeline for skeleton
 */
export function cleanupSkeleton(
  skeleton: Subtree[],
  polygon: Array<[number, number]>,
): Subtree[] {
  let cleaned = skeleton;

  // Step 1: Remove degenerate arcs
  cleaned = removeDegenerateArcs(cleaned);

  // Step 2: Merge close skeleton clusters
  cleaned = mergeSkeletonClusters(cleaned);

  // Step 3: Remove degenerate arcs again (after merging)
  cleaned = removeDegenerateArcs(cleaned);

  // Step 4: Remove ghost edges (parallel edges from same source)
  cleaned = removeGhostEdges(cleaned);

  // Step 5: Validate connectivity
  cleaned = validateSkeletonConnectivity(cleaned, polygon);

  return cleaned;
}
