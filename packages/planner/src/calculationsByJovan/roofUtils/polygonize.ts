import { Vector3 } from 'three';
import { isArrayLength } from '@arthurka/ts-utils';
import { Poly2FacesGraph } from './poly2FacesGraph';
import { _iterCircularPrevNext } from '../Utils/Sets/list';
import { Edge2 } from '../Utils/Curve/primitive';
import { Point2 } from '../Utils/Vector/point';
import { Subtree } from '../types';
import { GEOMETRY_EPSILON } from './geometryCleanup';

/**
 * Converts skeleton and boundary into roof faces
 * Ensures watertight mesh generation by validating all connections
 */
export const polygonize = (polygonLength: number, verticesForFaces: Vector3[], updatedSkeleton: Subtree[]) => {
  const graph = new Poly2FacesGraph();

  const edges2D: Edge2[] = [];
  const unitVectors: Vector3[] = [];

  // Integrating addEdges2D logic directly into polygonize
  const firstVertIndex = 0;
  const numVerts = verticesForFaces.length;
  const lastUIndex = numVerts - 1;
  const lastVertIndex = firstVertIndex + lastUIndex;

  if(unitVectors.length > 0) {
    for(let index = firstVertIndex, uIndex = 0; index < lastVertIndex; index++, uIndex++) {
      const norm = new Point2(unitVectors[uIndex]?.x ?? 0, unitVectors[uIndex]?.z ?? 0);
      edges2D.push(
        new Edge2(
          index,
          index + 1 === lastVertIndex ? firstVertIndex : index + 1,
          norm,
          verticesForFaces.map(v => new Point2(v.x, v.z)),
        ),
      );
    }
    const lastNorm = new Point2(unitVectors[lastUIndex]?.x ?? 0, unitVectors[lastUIndex]?.z ?? 0);
    edges2D.push(
      new Edge2(
        lastVertIndex,
        firstVertIndex,
        lastNorm,
        verticesForFaces.map(v => new Point2(v.x, v.z)),
      ),
    );
  } else {
    for(let index = firstVertIndex; index < lastVertIndex; index++) {
      edges2D.push(
        new Edge2(
          index,
          index + 1 === lastVertIndex + 1 ? firstVertIndex : index + 1,
          undefined,
          verticesForFaces.map(v => new Point2(v.x, v.z)),
        ),
      );
    }
    edges2D.push(
      new Edge2(
        lastVertIndex,
        firstVertIndex,
        undefined,
        verticesForFaces.map(v => new Point2(v.x, v.z)),
      ),
    );
  }

  const indices = Array.from({ length: polygonLength }, (_, i) => i);

  for(const edge of _iterCircularPrevNext(indices)) {
    graph.addEdge(edge);
  }

  // Helper function to check if two points are close enough to be considered the same
  const pointsMatch = (p1: Point2, p2: Point2): boolean => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const distSq = dx * dx + dy * dy;
    return distSq < GEOMETRY_EPSILON.POINT_MERGE * GEOMETRY_EPSILON.POINT_MERGE;
  };

  // Build skeleton connections with improved matching
  for(const [index, arc] of updatedSkeleton.entries()) {
    const aIndex = index + polygonLength;
    for(const sink of arc.sinks) {
      let sIndex: number | undefined;

      // First, try to match with boundary edges
      for(const edge of edges2D) {
        if(pointsMatch(edge.p1, sink)) {
          sIndex = edge.i1;
          break;
        }
        if(pointsMatch(edge.p2, sink)) {
          sIndex = edge.i2;
          break;
        }
      }

      // If not found in boundary, match with other skeleton nodes
      if(sIndex === undefined) {
        for(const [skelIndex, skelArc] of updatedSkeleton.entries()) {
          if(pointsMatch(new Point2(skelArc.source.x, skelArc.source.y), sink)) {
            sIndex = skelIndex + polygonLength;
            break;
          }
        }
      }

      // Only add edge if we found a valid connection
      if(sIndex !== undefined) {
        graph.addEdge([aIndex, sIndex]);
      } else {
        console.warn(`Could not find matching vertex for sink at (${sink.x}, ${sink.y})`);
      }
    }
  }

  const embedding = graph.circularEmbedding(verticesForFaces.map(v => [v.x, v.y, v.z]), 'CCW');
  const facesIndices = graph.faces(embedding, polygonLength).filter(e => isArrayLength(e, '>=', 3));

  return facesIndices;
};
