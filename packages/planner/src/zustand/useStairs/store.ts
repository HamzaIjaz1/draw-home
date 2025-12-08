import { create } from 'zustand';
import { Stair } from '../../zod/Stairs';
import { withComparingSetState } from '../../utils/withComparingSetState';

export type StairsStore = {
  stairs: Stair[];
};

export const useStairs = create<StairsStore>(() => ({
  stairs: [],
}));

withComparingSetState(useStairs);
