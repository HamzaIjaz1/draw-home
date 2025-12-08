import { Vector2, Vector3 } from 'three';
import { getPerpendicularVector } from '../Vector/vector';
import { getIntersection } from '../Intersect/mathematicalIntersect';

/**
 * Detects if two line segments intersect (not just their infinite extensions).
 * Returns the intersection point and the parameter t along the first segment if they intersect.
 */
function segmentIntersection(
  p1: Vector2,
  p2: Vector2,
  p3: Vector2,
  p4: Vector2,
): { point: Vector2; t1: number; t2: number } | null {
  const denom = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);

  if(Math.abs(denom) < 1e-10) {
    return null; // Lines are parallel
  }

  const t1 = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denom;
  const t2 = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denom;

  // Check if intersection occurs within both segments
  const epsilon = 1e-6;
  if(t1 >= -epsilon && t1 <= 1 + epsilon && t2 >= -epsilon && t2 <= 1 + epsilon) {
    const point = new Vector2(
      p1.x + t1 * (p2.x - p1.x),
      p1.y + t1 * (p2.y - p1.y),
    );
    return { point, t1, t2 };
  }

  return null;
}

/**
 * Removes self-intersecting loops from a polygon by detecting edge crossings
 * and keeping only the outer (larger) polygon.
 */
function removeSelfIntersections(coords: Vector2[]): Vector2[] {
  if(coords.length < 4) {
    return coords;
  }

  // Find all self-intersections
  const intersections: Array<{
    edgeIndex1: number;
    edgeIndex2: number;
    point: Vector2;
    t1: number;
    t2: number;
  }> = [];

  for(let i = 0; i < coords.length; i++) {
    const p1 = coords[i];
    const p2 = coords[(i + 1) % coords.length];

    if(!p1 || !p2) {
      continue;
    }

    // Check against non-adjacent edges (skip adjacent and self)
    for(let j = i + 2; j < coords.length; j++) {
      // Don't check the edge that connects back to the start
      if(i === 0 && j === coords.length - 1) {
        continue;
      }

      const p3 = coords[j];
      const p4 = coords[(j + 1) % coords.length];

      if(!p3 || !p4) {
        continue;
      }

      const intersection = segmentIntersection(p1, p2, p3, p4);
      if(intersection) {
        intersections.push({
          edgeIndex1: i,
          edgeIndex2: j,
          point: intersection.point,
          t1: intersection.t1,
          t2: intersection.t2,
        });
      }
    }
  }

  // If no intersections found, return original polygon
  if(intersections.length === 0) {
    return coords;
  }

  // When we have multiple intersections, find the complete region to remove
  if(intersections.length >= 2) {
    // Sort by edge indices
    intersections.sort((a, b) => {
      if(a.edgeIndex1 !== b.edgeIndex1) {
        return a.edgeIndex1 - b.edgeIndex1;
      }
      return a.edgeIndex2 - b.edgeIndex2;
    });

    const firstInt = intersections[0];
    const lastInt = intersections[intersections.length - 1];

    if(!firstInt || !lastInt) {
      return coords;
    }

    // Find the span of all intersections
    const minEdge1 = firstInt.edgeIndex1;
    const maxEdge2 = Math.max(...intersections.map(int => int.edgeIndex2));

    const loopSize = maxEdge2 - minEdge1;
    const remainingSize = coords.length - loopSize;

    const cleaned: Vector2[] = [];

    if(loopSize < remainingSize) {
      // Keep vertices before the first intersection
      for(let i = 0; i <= minEdge1; i++) {
        const vertex = coords[i];
        if(vertex) {
          cleaned.push(vertex.clone());
        }
      }

      // Add first intersection point
      cleaned.push(firstInt.point.clone());

      // Keep vertices after the last intersection
      for(let i = maxEdge2 + 1; i < coords.length; i++) {
        const vertex = coords[i];
        if(vertex) {
          cleaned.push(vertex.clone());
        }
      }
    } else {
      // Keep the loop section
      for(let i = minEdge1 + 1; i <= maxEdge2; i++) {
        const vertex = coords[i];
        if(vertex) {
          cleaned.push(vertex.clone());
        }
      }
    }

    // Recursively clean in case there are more intersections
    if(cleaned.length >= 3 && cleaned.length < coords.length) {
      return removeSelfIntersections(cleaned);
    }
    return cleaned;
  }

  // Single intersection - use original logic
  // Find the first intersection (earliest in the polygon traversal)
  intersections.sort((a, b) => {
    if(a.edgeIndex1 !== b.edgeIndex1) {
      return a.edgeIndex1 - b.edgeIndex1;
    }
    return a.t1 - b.t1;
  });

  const firstIntersection = intersections[0];
  if(!firstIntersection) {
    return coords;
  }

  const loopSize = firstIntersection.edgeIndex2 - firstIntersection.edgeIndex1;
  const remainingSize = coords.length - loopSize;

  // Calculate both intersection points (entrance and exit of the narrow channel)
  const p1 = coords[firstIntersection.edgeIndex1];
  const p2 = coords[(firstIntersection.edgeIndex1 + 1) % coords.length];
  const p3 = coords[firstIntersection.edgeIndex2];
  const p4 = coords[(firstIntersection.edgeIndex2 + 1) % coords.length];

  if(!p1 || !p2 || !p3 || !p4) {
    return coords;
  }

  // Intersection point on edge1 (channel entrance)
  const intersectionPoint1 = new Vector2(
    p1.x + firstIntersection.t1 * (p2.x - p1.x),
    p1.y + firstIntersection.t1 * (p2.y - p1.y),
  );

  // Intersection point on edge2 (channel exit)
  const intersectionPoint2 = new Vector2(
    p3.x + firstIntersection.t2 * (p4.x - p3.x),
    p3.y + firstIntersection.t2 * (p4.y - p3.y),
  );

  // Determine which section to keep based on size
  const cleaned: Vector2[] = [];

  if(loopSize < remainingSize) {
    // The loop is smaller - skip it (this is the narrow channel interior)
    // Keep the outer boundary

    // Add vertices from start to first intersection point
    for(let i = 0; i <= firstIntersection.edgeIndex1; i++) {
      const vertex = coords[i];
      if(vertex) {
        cleaned.push(vertex.clone());
      }
    }

    // Add the intersection point itself
    cleaned.push(firstIntersection.point.clone());

    // Skip all vertices in the self-intersecting loop
    // Continue from the vertex after the second intersecting edge
    for(let i = firstIntersection.edgeIndex2 + 1; i < coords.length; i++) {
      const vertex = coords[i];
      if(vertex) {
        cleaned.push(vertex.clone());
      }
    }
  } else {
    // The loop is larger - keep the loop vertices (main polygon boundary)
    // and bridge with both intersection points

    // Keep the loop section vertices
    for(let i = firstIntersection.edgeIndex1 + 1; i <= firstIntersection.edgeIndex2; i++) {
      const vertex = coords[i];
      if(vertex) {
        cleaned.push(vertex.clone());
      }
    }

    // Add exit intersection point (on edge2)
    cleaned.push(intersectionPoint2.clone());

    // Add entrance intersection point (on edge1) to complete the blend
    cleaned.push(intersectionPoint1.clone());
  }

  // Recursively clean in case there are more intersections
  if(cleaned.length >= 3 && cleaned.length < coords.length) {
    return removeSelfIntersections(cleaned);
  }

  return cleaned;
}

// TODO: Take a look at this examples for offseting the polygon
// https://threejs.org/examples/#webgl_geometry_shapes
// https://discourse.threejs.org/t/need-a-way-to-create-offset-for-any-polygon/16491
// https://threejs.org/docs/#api/en/materials/Material.polygonOffset
export function offsetPolygon(coords: Vector2[], offset: number): Vector2[] {
  if(coords.length === 0) {
    return [];
  }

  const offsetCoords: Vector2[] = [];
  const length = coords.length;

  for(let i = 0; i < length; i++) {
    const current = coords[i];
    const next = coords[(i + 1) % length];

    if(!current || !next) {
      continue;
    }

    // Calculate the edge vector
    const edge = new Vector2().subVectors(next, current);

    // Get the perpendicular vector to the edge
    const offsetVector = getPerpendicularVector(edge, offset);

    // Calculate the offset points
    const offsetCurrent = new Vector2().addVectors(current, offsetVector);
    const offsetNext = new Vector2().addVectors(next, offsetVector);

    offsetCoords.push(offsetCurrent, offsetNext);
  }

  // Calculate intersections of the extended edges
  const finalCoords: Vector2[] = [];
  for(let i = 0; i < offsetCoords.length; i += 2) {
    const p1 = offsetCoords[i];
    const p2 = offsetCoords[(i + 1) % offsetCoords.length];
    const p3 = offsetCoords[(i + 2) % offsetCoords.length];
    const p4 = offsetCoords[(i + 3) % offsetCoords.length];

    if(p1 && p2 && p3 && p4) {
      const intersection = getIntersection(p1, p2, p3, p4);
      if(intersection) {
        finalCoords.push(intersection);
      }
    }
  }

  // Rotate the finalCoords array so the last element becomes the first
  if(finalCoords.length > 1) {
    const lastElement = finalCoords.pop();
    if(lastElement !== undefined) {
      finalCoords.unshift(lastElement);
    }
  }

  // Remove self-intersections caused by offset
  const cleanedCoords = removeSelfIntersections(finalCoords);

  return cleanedCoords;
}


export function offsetPolygon3D(coords: Vector3[], offset: number): Vector3[] {
  if(coords.length === 0) {
    return [];
  }

  const offsetCoords: Vector3[] = [];
  const length = coords.length;

  for(let i = 0; i < length; i++) {
    const current = coords[i];
    const next = coords[(i + 1) % length];

    if(!current || !next) {
      continue;
    }

    // Calculate the edge vector in the xz-plane
    const edge = new Vector2(next.x - current.x, next.z - current.z);

    // Get the perpendicular vector to the edge
    const offsetVector2D = getPerpendicularVector(edge, offset);

    // Calculate the offset points in 3D (only modifying x and z coordinates)
    const offsetCurrent = new Vector3(current.x + offsetVector2D.x, current.y, current.z + offsetVector2D.y);
    const offsetNext = new Vector3(next.x + offsetVector2D.x, next.y, next.z + offsetVector2D.y);

    offsetCoords.push(offsetCurrent, offsetNext);
  }

  // Calculate intersections of the extended edges
  const finalCoords: Vector3[] = [];
  for(let i = 0; i < offsetCoords.length; i += 2) {
    const p1 = offsetCoords[i];
    const p2 = offsetCoords[(i + 1) % offsetCoords.length];
    const p3 = offsetCoords[(i + 2) % offsetCoords.length];
    const p4 = offsetCoords[(i + 3) % offsetCoords.length];

    if(p1 && p2 && p3 && p4) {
      const intersection2D = getIntersection(
        new Vector2(p1.x, p1.z),
        new Vector2(p2.x, p2.z),
        new Vector2(p3.x, p3.z),
        new Vector2(p4.x, p4.z),
      );
      if(intersection2D) {
        const intersection = new Vector3(intersection2D.x, p1.y, intersection2D.y);
        finalCoords.push(intersection);
      }
    }
  }

  // Rotate the finalCoords array so the last element becomes the first
  if(finalCoords.length > 1) {
    const lastElement = finalCoords.pop();
    if(lastElement !== undefined) {
      finalCoords.unshift(lastElement);
    }
  }

  // Remove self-intersections in 2D space (xz-plane)
  const coords2D = finalCoords.map(v => new Vector2(v.x, v.z));
  const cleaned2D = removeSelfIntersections(coords2D);

  // Convert back to 3D, preserving y coordinate
  const cleaned3D = cleaned2D.map(v => new Vector3(v.x, finalCoords[0]?.y ?? 0, v.y));

  return cleaned3D;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function roofSoffitGable(coords: Vector3[], offset: number, width: number, roofHeight: number): Vector3[] {
  if(coords.length === 0) {
    return [];
  }

  const offsetCoords: Vector3[] = [];
  const length = coords.length;

  for(let i = 0; i < length; i++) {
    const current = coords[i];
    const next = coords[(i + 1) % length];

    if(!current || !next) {
      continue;
    }

    // Calculate the edge vector in the xz-plane
    const edge = new Vector2(next.x - current.x, next.z - current.z);

    // Get the perpendicular vector to the edge
    const offsetVector2D = getPerpendicularVector(edge, offset);

    // Calculate the offset points in 3D (only modifying x and z coordinates)
    const offsetCurrent = new Vector3(
      current.x + offsetVector2D.x,
      current.y,
      current.z + offsetVector2D.y,
    );
    const offsetNext = new Vector3(
      next.x + offsetVector2D.x,
      next.y,
      next.z + offsetVector2D.y,
    );

    offsetCoords.push(offsetCurrent, offsetNext);
  }

  // Calculate intersections of the extended edges
  const finalCoords: Vector3[] = [];
  for(let i = 0; i < offsetCoords.length; i += 2) {
    const p1 = offsetCoords[i];
    const p2 = offsetCoords[(i + 1) % offsetCoords.length];
    const p3 = offsetCoords[(i + 2) % offsetCoords.length];
    const p4 = offsetCoords[(i + 3) % offsetCoords.length];

    if(p1 && p2 && p3 && p4) {
      const intersection2D = getIntersection(
        new Vector2(p1.x, p1.z),
        new Vector2(p2.x, p2.z),
        new Vector2(p3.x, p3.z),
        new Vector2(p4.x, p4.z),
      );
      if(intersection2D) {
        const intersection = new Vector3(
          intersection2D.x,
          p1.y,
          intersection2D.y,
        );
        finalCoords.push(intersection);
      }
    }
  }

  // Rotate the finalCoords array so the last element becomes the first
  if(finalCoords.length > 1) {
    const lastElement = finalCoords.pop();
    if(lastElement !== undefined) {
      finalCoords.unshift(lastElement);
    }
  }

  // Move the polygon in the negative y-direction by the offset amount
  for(const coord of finalCoords) {
    coord.y -= (offset / width) * roofHeight * 2;
  }

  return finalCoords;
}


export function roofSoffitHip(coords: Vector3[], offset: number): Vector3[] {
  if(coords.length === 0) {
    return [];
  }

  const offsetCoords: Vector3[] = [];
  const length = coords.length;

  for(let i = 0; i < length; i++) {
    const current = coords[i];
    const next = coords[(i + 1) % length];

    if(!current || !next) {
      continue;
    }

    // Calculate the edge vector in the xz-plane
    const edge = new Vector2(next.x - current.x, next.z - current.z);

    // Get the perpendicular vector to the edge
    const offsetVector2D = getPerpendicularVector(edge, offset);

    // Calculate the offset points in 3D (only modifying x and z coordinates)
    const offsetCurrent = new Vector3(
      current.x + offsetVector2D.x,
      current.y,
      current.z + offsetVector2D.y,
    );
    const offsetNext = new Vector3(
      next.x + offsetVector2D.x,
      next.y,
      next.z + offsetVector2D.y,
    );

    offsetCoords.push(offsetCurrent, offsetNext);
  }

  // Calculate intersections of the extended edges
  const finalCoords: Vector3[] = [];
  for(let i = 0; i < offsetCoords.length; i += 2) {
    const p1 = offsetCoords[i];
    const p2 = offsetCoords[(i + 1) % offsetCoords.length];
    const p3 = offsetCoords[(i + 2) % offsetCoords.length];
    const p4 = offsetCoords[(i + 3) % offsetCoords.length];

    if(p1 && p2 && p3 && p4) {
      const intersection2D = getIntersection(
        new Vector2(p1.x, p1.z),
        new Vector2(p2.x, p2.z),
        new Vector2(p3.x, p3.z),
        new Vector2(p4.x, p4.z),
      );
      if(intersection2D) {
        const intersection = new Vector3(
          intersection2D.x,
          p1.y,
          intersection2D.y,
        );
        finalCoords.push(intersection);
      }
    }
  }

  // Rotate the finalCoords array so the last element becomes the first
  if(finalCoords.length > 1) {
    const lastElement = finalCoords.pop();
    if(lastElement !== undefined) {
      finalCoords.unshift(lastElement);
    }
  }

  // Move the polygon in the negative y-direction by the offset amount
  // for(const coord of finalCoords) {
  //   coord.y -= offset / 2;
  // }

  return finalCoords;
}


export function roofSoffitShed(coords: Vector3[], offset: number): Vector3[] {
  if(coords.length === 0) {
    return [];
  }

  const offsetCoords: Vector3[] = [];
  const length = coords.length;

  for(let i = 0; i < length; i++) {
    const current = coords[i];
    const next = coords[(i + 1) % length];

    if(!current || !next) {
      continue;
    }

    // Calculate the edge vector in the xz-plane
    const edge = new Vector2(next.x - current.x, next.z - current.z);

    // Get the perpendicular vector to the edge
    const offsetVector2D = getPerpendicularVector(edge, offset);

    // Calculate the offset points in 3D (only modifying x and z coordinates)
    const offsetCurrent = new Vector3(
      current.x + offsetVector2D.x,
      current.y,
      current.z + offsetVector2D.y,
    );
    const offsetNext = new Vector3(
      next.x + offsetVector2D.x,
      next.y,
      next.z + offsetVector2D.y,
    );

    offsetCoords.push(offsetCurrent, offsetNext);
  }

  // Calculate intersections of the extended edges
  const finalCoords: Vector3[] = [];
  for(let i = 0; i < offsetCoords.length; i += 2) {
    const p1 = offsetCoords[i];
    const p2 = offsetCoords[(i + 1) % offsetCoords.length];
    const p3 = offsetCoords[(i + 2) % offsetCoords.length];
    const p4 = offsetCoords[(i + 3) % offsetCoords.length];

    if(p1 && p2 && p3 && p4) {
      const intersection2D = getIntersection(
        new Vector2(p1.x, p1.z),
        new Vector2(p2.x, p2.z),
        new Vector2(p3.x, p3.z),
        new Vector2(p4.x, p4.z),
      );
      if(intersection2D) {
        const intersection = new Vector3(
          intersection2D.x,
          p1.y,
          intersection2D.y,
        );
        finalCoords.push(intersection);
      }
    }
  }

  // Rotate the finalCoords array so the last element becomes the first
  if(finalCoords.length > 1) {
    const lastElement = finalCoords.pop();
    if(lastElement !== undefined) {
      finalCoords.unshift(lastElement);
    }
  }

  return finalCoords;
}


export function TranslateNegativeY(coords: Vector3[], translation: number): Vector3[] {
  if(coords.length === 0) {
    return [];
  }

  // Create a new array to hold the translated coordinates
  const translatedCoords: Vector3[] = [];

  // Iterate over each point in the original polygon
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for(let i = 0; i < coords.length; i++) {
    const point = coords[i];

    if(point) {
      // Subtract the translation value from the y-coordinate
      const translatedPoint = new Vector3(point.x, point.y - translation, point.z);
      translatedCoords.push(translatedPoint);
    }
  }

  return translatedCoords;
}
