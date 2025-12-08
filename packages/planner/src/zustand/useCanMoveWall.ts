import { create } from 'zustand';
import { withComparingSetState } from '../utils/withComparingSetState';

export type CanMoveWallStore = {
  canMoveWall: boolean;
};

export const useCanMoveWall = create<CanMoveWallStore>(() => ({
  canMoveWall: false,
}));

withComparingSetState(useCanMoveWall);
