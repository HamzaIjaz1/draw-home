import { create } from 'zustand';

type Store = {
  isMouseControlStarted: boolean;
};

export const useIsMouseControlStarted = create<Store>(() => ({
  isMouseControlStarted: false,
}));
