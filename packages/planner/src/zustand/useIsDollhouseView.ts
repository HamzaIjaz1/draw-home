import { create } from 'zustand';

export type Store = {
  isDollhouseView: boolean;
};

export const useIsDollhouseView = create<Store>(() => ({
  isDollhouseView: false,
}));
