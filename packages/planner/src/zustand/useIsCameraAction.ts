import { create } from 'zustand';

export type Store = {
  isCameraAction: boolean;
};

export const useIsCameraAction = create<Store>(() => ({
  isCameraAction: false,
}));
