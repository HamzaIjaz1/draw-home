import { create } from 'zustand';
import { withComparingSetState } from '../utils/withComparingSetState';

type Store = {
  isMoving3DModel: boolean;
};

export const useIsMoving3DModel = create<Store>(() => ({
  isMoving3DModel: false,
}));

withComparingSetState(useIsMoving3DModel);
