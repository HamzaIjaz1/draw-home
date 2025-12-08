import { Vector3 } from 'three';
import { getNotUndefined, isArrayLength } from '@arthurka/ts-utils';
import { RoofParts, Subtree } from '../types';
import { polygonize } from '../roofUtils/polygonize';

export function generateRoofFaces(
  polygonLength: number,
  verticesForFaces: Vector3[],
  skeletonCleaned: Subtree[],
): RoofParts {
  // Make faces from vertices
  const roofIndices = polygonize(polygonLength, verticesForFaces, skeletonCleaned);

  const roof = roofIndices.map(face => face.map(index => getNotUndefined(verticesForFaces[index], 'Invalid vertex index')));

  const roofWithoutNaNs = roof.map(face => face.filter(vertex => !Number.isNaN(vertex.x) && !Number.isNaN(vertex.y) && !Number.isNaN(vertex.z)));

  const hipRoofParts = roofWithoutNaNs.filter(face => isArrayLength(face, '>=', 3));

  return hipRoofParts;
}
