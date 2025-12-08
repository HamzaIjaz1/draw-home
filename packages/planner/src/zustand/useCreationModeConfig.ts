import { create } from 'zustand';

type Store = {
  creationModeConfig: {
    mode: 'straightLine' | 'multipleStraightLines';
    isWallVisible: boolean;
    isFloorVisible: boolean;
    isCeilingVisible: boolean;
  };
};

export const useCreationModeConfig = create<Store>(() => ({
  creationModeConfig: {
    mode: 'straightLine',
    isWallVisible: true,
    isFloorVisible: true,
    isCeilingVisible: true,
  },
}));
