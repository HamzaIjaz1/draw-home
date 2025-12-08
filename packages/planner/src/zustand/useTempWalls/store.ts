import { create } from 'zustand';
import { WallsStore } from '../useWalls/store';
import { withComparingSetState } from '../../utils/withComparingSetState';

export type TempWallsStore = {
  tempWalls: WallsStore['walls'];
};

export const useTempWalls = create<TempWallsStore>(() => ({
  tempWalls: [],
}));

withComparingSetState(useTempWalls);
