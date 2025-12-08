import { Vector3 } from 'three';
import { Ring, RoofFace, Subtree } from '../types';
import { skeletonize } from '../roofUtils/skeletonize';
import {
  adjustSkeletonHeight,
  cleanSkeleton,
  getVerticesForFaces,
  moveRoofFromBase,
} from '../roofUtils/utilsSkeleton';


export function generateRoofSkeleton(
  polygon: Ring,
  roofSlope: number,
  roofHeightFromBase: number,
): {
    adjustedSkeletonForHeight: RoofFace[];
    verticesForFaces: Vector3[];
    skeletonCleaned: Subtree[];
  } {
  // Create the skeleton of the roof
  const skeleton = skeletonize(polygon);

  // Control the pitch (in degrees)
  const adjustedSkeletonForPitch = adjustSkeletonHeight(skeleton, roofSlope);

  // Remove source points in the sinks as they appear sometimes
  const skeletonCleaned = cleanSkeleton(adjustedSkeletonForPitch);

  // Control the vertical height of the whole roof
  const adjustedSkeletonForHeight = moveRoofFromBase(skeletonCleaned, roofHeightFromBase);

  // Extract the vertices in a suitable order for making faces
  const verticesForFaces = getVerticesForFaces(polygon, roofHeightFromBase, adjustedSkeletonForHeight);

  return { adjustedSkeletonForHeight, verticesForFaces, skeletonCleaned };
}
