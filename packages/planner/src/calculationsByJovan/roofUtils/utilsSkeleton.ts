import * as THREE from 'three';
import { Vector3 } from 'three';
import { Line, RoofFace, Subtree } from '../types';

export const cleanSkeleton = (skeleton: Subtree[]): Subtree[] => skeleton.map(subtree => ({
  ...subtree,
  sinks: subtree.sinks.filter(
    sink => !(sink.x === subtree.source.x && sink.y === subtree.source.y),
  ),
}));

export const adjustSkeletonHeight = (skeleton: Subtree[], roofSlope: number): Subtree[] => {
  const roofSlopeCoef = Math.tan(THREE.MathUtils.degToRad(roofSlope));
  return skeleton.map(subtree => ({
    source: subtree.source,
    height: subtree.height * roofSlopeCoef,
    sinks: subtree.sinks.map(sink => sink),
  }));
};

export const populateSkeletonLines = (updatedSkeleton: RoofFace[]): Line[] => {
  const skeletonLines: Line[] = [];

  updatedSkeleton.forEach(({ source, sinks }) => {
    const sourceVec = new Vector3(source.x, source.z, source.y);

    sinks.forEach(sink => {
      const sinkVec = new Vector3(sink.x, sink.z, sink.y);

      skeletonLines.push({
        start: sourceVec,
        end: sinkVec,
      });
    });
  });

  return skeletonLines;
};

// The polygon is comming as [number, number] but when height is added it needs to be vec3 for later usage
export const getVerticesForFaces = (
  polygon: Array<[number, number]>,
  roofHeightFromBase: number,
  skeleton_positionControl: RoofFace[],
): Vector3[] => {
  const verticesForFaces: Vector3[] = [];

  // Populate vertices from the polygon
  for(const current of polygon) {
    if(!current) {
      continue;
    }

    // Create start point for the roof at the current vertex
    const startRoof = new Vector3(current[0], roofHeightFromBase, current[1]);
    verticesForFaces.push(startRoof);
  }

  // Add vertices from the skeleton position control
  skeleton_positionControl.forEach(({ source }) => {
    const sourceVec = new Vector3(source.x, source.z, source.y); // Use roofHeightFromBase for z
    verticesForFaces.push(sourceVec);
  });

  return verticesForFaces;
};

// eslint-disable-next-line max-len
export function populateBoundaryLines(polygon: Array<[number, number]>, roofHeightFromBase: number): { boundaryLines: Line[]; boundaryBaseLines: Line[] } {
  const boundaryLines: Line[] = [];
  const boundaryBaseLines: Line[] = [];

  for(let i = 0; i < polygon.length; i++) {
    const current = polygon[i];
    const next = polygon[(i + 1) % polygon.length];

    if(!current || !next) {
      continue;
    }

    // Create start and end points for both boundaryLines and boundaryBaseLines
    const startRoof = new Vector3(current[0], roofHeightFromBase, current[1]);
    const endRoof = new Vector3(next[0], roofHeightFromBase, next[1]);
    const startBase = new Vector3(current[0], 0, current[1]);
    const endBase = new Vector3(next[0], 0, next[1]);

    boundaryLines.push({ start: startRoof, end: endRoof });
    boundaryBaseLines.push({ start: startBase, end: endBase });
  }

  return { boundaryLines, boundaryBaseLines };
}


export const moveRoofFromBase = (skeleton: Subtree[], roofHeightFromBase: number): RoofFace[] => {
  // Create a map of updated source heights by adding roofHeightFromBase to each source's z coordinate
  const sourceMap = new Map(
    skeleton.map(({ source, height }) => [`${source.x},${source.y}`, height + roofHeightFromBase] as const),
  );

  // Update both sources and sinks with the new heights and return as Roof objects
  return skeleton.map(({ source, sinks }) => ({
    source: new Vector3(source.x, source.y, sourceMap.get(`${source.x},${source.y}`) ?? roofHeightFromBase),
    sinks: sinks.map(sink => new Vector3(sink.x, sink.y, sourceMap.get(`${sink.x},${sink.y}`) ?? roofHeightFromBase)),
  }));
};
