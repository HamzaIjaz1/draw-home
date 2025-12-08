import { create } from 'zustand';

type Store = {
  isWallDrawToolbarShown: boolean;
};

export const useIsWallDrawToolbarShown = create<Store>(() => ({
  isWallDrawToolbarShown: true,
}));
