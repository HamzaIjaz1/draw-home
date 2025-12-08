import { RoofId } from '@draw-house/common/dist/brands';
import { Vector3 } from 'three';
import { create } from 'zustand';
import { calculateHipRoofData } from './calculateHipRoofData';
import { isTheSameVectorArrays } from '../utils/helpers';

type Line = {
  start: Vector3;
  end: Vector3;
};

type Store = {
  hipRoofDebugData: Array<{
    roofId: RoofId;
    roofParts: Array<[Vector3, Vector3, Vector3, ...Vector3[]]>;
    boundaryLines: Line[];
    skeletonLines: Line[];
    boundaryBaseLines: Line[];
  }>;
};

export const useHipRoofDebugData = create<Store>(() => ({
  hipRoofDebugData: [],
}));

export const setHipRoofDebugData = (newRoofs: Array<{
  roofId: RoofId;
  roofParts: ReturnType<typeof calculateHipRoofData>['roofParts'];
  boundaryLines: ReturnType<typeof calculateHipRoofData>['boundaryLines'];
  skeletonLines: ReturnType<typeof calculateHipRoofData>['skeletonLines'];
  boundaryBaseLines: ReturnType<typeof calculateHipRoofData>['boundaryBaseLines'];
}>) => {
  const { hipRoofDebugData } = useHipRoofDebugData.getState();

  useHipRoofDebugData.setState({
    hipRoofDebugData: newRoofs.map(({ roofId, roofParts, boundaryBaseLines, boundaryLines, skeletonLines }) => (
      hipRoofDebugData.find(e => isTheSameVectorArrays(e.roofParts.flat(), roofParts.flat())) ?? {
        roofId,
        roofParts,
        boundaryLines,
        skeletonLines,
        boundaryBaseLines,
      }
    )),
  });
};
