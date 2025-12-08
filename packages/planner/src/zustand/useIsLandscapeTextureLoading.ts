import { create } from 'zustand';
import { withComparingSetState } from '../utils/withComparingSetState';

type Store = {
  isLandscapeTextureLoading: boolean;
};

export const useIsLandscapeTextureLoading = create<Store>(() => ({
  isLandscapeTextureLoading: false,
}));

withComparingSetState(useIsLandscapeTextureLoading);
