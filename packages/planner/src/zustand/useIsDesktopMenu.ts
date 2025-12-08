import { create } from 'zustand';

type Store = {
  isDesktopMenu: boolean;
};

export const useIsDesktopMenu = create<Store>(() => ({
  isDesktopMenu: false,
}));
