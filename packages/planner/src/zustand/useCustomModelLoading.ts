import { create } from 'zustand';

type Store = {
  customModelLoading: boolean;
};

export const useCustomModelLoading = create<Store>(() => ({
  customModelLoading: false,
}));
