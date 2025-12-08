import { Vector3 } from 'three';
import { IntersectionInfo, Line, RoofParts } from '../types';
import { calculateIntersection2D } from '../Utils/Intersect/mathematicalIntersect';
import { applyOffsetInDirection } from '../Utils/Transform/euclidianTransform';

// Helper Functions

const projectLineToXZPlane = (line: Line): Line => ({
  start: new Vector3(line.start.x, 0, line.start.z),
  end: new Vector3(line.end.x, 0, line.end.z),
});

const calculate3DIntersection = (thirdLine: Line, intersection2D: Vector3): Vector3 => {
  const lineVector = thirdLine.end.clone().sub(thirdLine.start);
  const lineLength = lineVector.length();

  // For very short lines, use simple interpolation to avoid numerical instability
  if(lineLength < 0.02) {
    const midY = (thirdLine.start.y + thirdLine.end.y) / 2;
    return new Vector3(intersection2D.x, midY, intersection2D.z);
  }

  // Use original logic for normal-sized lines
  const thirdLineDir = lineVector.normalize();
  const startToIntersect3D = intersection2D.clone().sub(thirdLine.start);
  const projectionLength3D = startToIntersect3D.dot(thirdLineDir);

  return new Vector3(
    intersection2D.x,
    thirdLine.start.y + thirdLineDir.y * projectionLength3D,
    intersection2D.z,
  );
};

const calculateMidpoint = (line: Line): Vector3 => new Vector3(
  (line.start.x + line.end.x) / 2,
  (line.start.y + line.end.y) / 2,
  (line.start.z + line.end.z) / 2,
);


const removeGableIndex = (gableIndices: number[], indexToRemove: number) => {
  const idx = gableIndices.indexOf(indexToRemove);
  if(idx !== -1) {
    gableIndices.splice(idx, 1);
  }
};

const findHighestVertex = (vertices: Vector3[]): Vector3 => vertices.reduce(
  (maxVertex, vertex) => (vertex.y > maxVertex.y ? vertex : maxVertex),
  vertices[0] || new Vector3(0, 0, 0),
);

const processSingleThirdLine = (
  thirdLine: Line,
  sinkVertices: Vector3[],
  sourceVertex: Vector3,
  offset: number,
  gableIndex: number,
) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const sinkLine: Line = { start: sinkVertices[0]!, end: sinkVertices[1]! };

  if(!sinkLine.start || !sinkLine.end) {
    return null;
  }

  if(!sinkLine.start || !sinkLine.end) {
    return null;
  }

  const intersection2D = calculateIntersection2D(
    projectLineToXZPlane(thirdLine),
    projectLineToXZPlane(sinkLine as Line),
  );

  if(!intersection2D) {
    return null;
  }

  // Check if intersection requires extending the sink line beyond its actual endpoints
  // Project intersection onto sink line to get parametric t value (0 = start, 1 = end)
  const sinkVector = sinkLine.end.clone().sub(sinkLine.start);
  const sinkLength = Math.sqrt(sinkVector.x * sinkVector.x + sinkVector.z * sinkVector.z);

  if(sinkLength > 0.001) {
    const toIntersection = intersection2D.clone().sub(sinkLine.start);
    const t = (toIntersection.x * sinkVector.x + toIntersection.z * sinkVector.z) / (sinkLength * sinkLength);

    // If intersection is outside sink line segment (requires extension), use closest sink point instead
    if(t < 0 || t > 1) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const closestSink = t < 0 ? sinkVertices[0]! : sinkVertices[1]!;
      const wallIntersection = closestSink.clone();

      return {
        intersection: closestSink,
        intersectionInfo: {
          index: gableIndex,
          wallIntersection,
          sinkPoints: sinkVertices,
        },
      };
    }
  }

  const intersection3D = calculate3DIntersection(
    thirdLine,
    intersection2D,
  );

  const recalculatedDir = intersection3D.clone().sub(thirdLine.start).normalize();
  const wallIntersection = applyOffsetInDirection(
    intersection3D,
    thirdLine.end.clone().sub(thirdLine.start),
    recalculatedDir,
    offset,
  );

  return {
    intersection: intersection3D,
    intersectionInfo: {
      index: gableIndex,
      wallIntersection,
      sinkPoints: sinkVertices,
    },
  };
};

const processMultipleThirdLines = (
  sinkVertices: Vector3[],
  sourceVertex: Vector3,
  offset: number,
  gableIndex: number,
) => {
  if(sinkVertices.length < 2) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const sinkLine = { start: sinkVertices[0]!, end: sinkVertices[1]! };
  const intersection = calculateMidpoint(sinkLine);

  const sinkDirection = sinkLine.end.clone().sub(sinkLine.start).normalize();
  const perpendicularDirection = new Vector3(0, 1, 0).cross(sinkDirection).normalize();
  const wallIntersection = intersection.clone().addScaledVector(perpendicularDirection, -offset);
  wallIntersection.y = sourceVertex.y;

  return {
    intersection,
    intersectionInfo: {
      index: gableIndex,
      wallIntersection,
      sinkPoints: sinkVertices,
    },
  };
};


const updateRoofParts = (
  roofParts: RoofParts,
  intersection: Vector3,
  sourceVertex: Vector3,
  sinkVertices: Vector3[],
): RoofParts => roofParts.map(part => {
  if(sinkVertices.some(sinkVertex => part.some(vertex => vertex.equals(sinkVertex)))) {
    return part.map(vertex => (vertex.equals(sourceVertex) ? intersection : vertex)) as RoofParts[number];
  }
  return part;
});

const updateRoofPartsSimetric = (
  roofParts: RoofParts,
  intersection: Vector3,
  sourceVertex: Vector3,
  sinkVertices: Vector3[],
): RoofParts => roofParts.map(part => {
  if(sinkVertices.some(sinkVertex => part.some(vertex => vertex.equals(sinkVertex)))) {
    const sinkIndex = part.findIndex(vertex => sinkVertices.some(sinkVertex => vertex.equals(sinkVertex)));
    const sourceIndex = part.findIndex(vertex => vertex.equals(sourceVertex));

    if(sourceIndex === -1) {
      return part;
    }

    const updatedPart = [...part];

    if(updatedPart[sourceIndex]) {
      if(sinkIndex === 0) {
        updatedPart.splice(sourceIndex + 1, 0, new Vector3(intersection.x, updatedPart[sourceIndex].y, intersection.z));
      } else {
        updatedPart.splice(sourceIndex, 0, new Vector3(intersection.x, updatedPart[sourceIndex].y, intersection.z));
      }
    }

    return updatedPart.length >= 3 ? (updatedPart as [Vector3, Vector3, Vector3, ...Vector3[]]) : part;
  }
  return part;
});


export const hipToGableFace = (
  roofParts: RoofParts,
  skeletonLines: Line[],
  gableIndices: number[],
  offset: number,
): {
  updatedRoofParts: RoofParts;
  intersections: IntersectionInfo[];
  updatedGableIndices: number[];
  updatedSkeletonLines: Line[];
} => {
  if(gableIndices.length === 0) {
    return {
      updatedRoofParts: roofParts,
      intersections: [],
      updatedGableIndices: gableIndices,
      updatedSkeletonLines: skeletonLines,
    };
  }

  let updatedRoofParts = [...roofParts];
  const intersections: IntersectionInfo[] = [];
  const updatedGableIndices = [...gableIndices];
  // Map from old peak vertex to new intersection point
  const peakToIntersectionMap = new Map<Vector3, Vector3>();

  gableIndices.forEach(gableIndex => {
    const targetPart = updatedRoofParts[gableIndex];

    if(!targetPart) {
      return;
    }

    if(targetPart.length > 3) {
      removeGableIndex(updatedGableIndices, gableIndex);
      return;
    }

    const sourceVertex = findHighestVertex(targetPart);
    const sinkVertices = targetPart.filter(vertex => !vertex.equals(sourceVertex));

    const filteredSkeletonLines = skeletonLines.filter(
      line => line.start.equals(sourceVertex) || line.end.equals(sourceVertex),
    );

    if(filteredSkeletonLines.length === 0) {
      return;
    }

    const thirdLines = filteredSkeletonLines.filter(
      line => !sinkVertices.some(sink => line.start.equals(sink) || line.end.equals(sink)),
    );

    if(thirdLines.length === 0) {
      return;
    }

    if(thirdLines.length === 1 && sinkVertices.length >= 2 && thirdLines[0]) {
      const result = processSingleThirdLine(
        thirdLines[0],
        sinkVertices,
        sourceVertex,
        offset,
        gableIndex,
      );
      if(result) {
        updatedRoofParts = updateRoofParts(
          updatedRoofParts,
          result.intersection,
          sourceVertex,
          sinkVertices,
        );
        intersections.push(result.intersectionInfo);
        peakToIntersectionMap.set(sourceVertex, result.intersection);
      }
    } else if(thirdLines.length > 1 && sinkVertices.length >= 2) {
      const result = processMultipleThirdLines(
        sinkVertices,
        sourceVertex,
        offset,
        gableIndex,
      );
      if(result) {
        updatedRoofParts = updateRoofPartsSimetric(
          updatedRoofParts,
          result.intersection,
          sourceVertex,
          sinkVertices,
        );
        intersections.push(result.intersectionInfo);
        peakToIntersectionMap.set(sourceVertex, result.intersection);
      }
    }
  });

  // Update skeleton lines by replacing old peak vertices with new intersection points
  const updatedSkeletonLines = skeletonLines.map(line => {
    let newStart = line.start;
    let newEnd = line.end;

    // Check if start vertex was converted, replace with intersection point
    for(const [oldPeak, newIntersection] of peakToIntersectionMap.entries()) {
      if(line.start.equals(oldPeak)) {
        newStart = newIntersection;
      }
      if(line.end.equals(oldPeak)) {
        newEnd = newIntersection;
      }
    }

    return {
      start: newStart,
      end: newEnd,
    };
  });

  return { updatedRoofParts, intersections, updatedGableIndices, updatedSkeletonLines };
};
