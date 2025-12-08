import { create } from 'zustand';
import { withComparingSetState } from '../utils/withComparingSetState';

type Store = {
  isInfoPanelOpened: boolean;
};

export const useIsInfoPanelOpened = create<Store>(() => ({
  isInfoPanelOpened: false,
}));

withComparingSetState(useIsInfoPanelOpened);
