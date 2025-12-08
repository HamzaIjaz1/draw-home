import { Line, Ring, RoofFace } from '../types';
import {
  populateBoundaryLines,
  populateSkeletonLines,
} from '../roofUtils/utilsSkeleton';


export function generateDebugLines(
  adjustedSkeletonForHeight: RoofFace[],
  polygon: Ring,
  roofHeightFromBase: number,
): {
    skeletonLines: Line[];
    boundaryLines: Line[];
    boundaryBaseLines: Line[];
  } {
  const skeletonLines = populateSkeletonLines(adjustedSkeletonForHeight);
  const { boundaryLines, boundaryBaseLines } = populateBoundaryLines(polygon, roofHeightFromBase);
  return { skeletonLines, boundaryLines, boundaryBaseLines };
}
