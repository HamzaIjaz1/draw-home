import { create } from 'zustand';
import { withComparingSetState } from '../utils/withComparingSetState';

type Store = {
  isHotkeysShown: boolean;
};

export const useIsHotkeysShown = create<Store>(() => ({
  isHotkeysShown: false,
}));

withComparingSetState(useIsHotkeysShown);
