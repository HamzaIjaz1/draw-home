import { create } from 'zustand';

export type IsFirstPersonViewStore = {
  isFirstPersonView: boolean;
};

export const useIsFirstPersonView = create<IsFirstPersonViewStore>(() => ({
  isFirstPersonView: false,
}));
