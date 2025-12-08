import { create } from 'zustand';
import { WallId } from '@draw-house/common/dist/brands';

type Store = {
  wallLengthChangeInputData: null | {
    targetWallId: WallId;
    activeWallId: WallId;
    length: number;
  };
};

export const useWallLengthChangeInputData = create<Store>(() => ({
  wallLengthChangeInputData: null,
}));
