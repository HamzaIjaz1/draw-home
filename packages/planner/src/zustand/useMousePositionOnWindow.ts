import { create } from 'zustand';

export type MousePositionOnWindowStore = {
  mousePositionOnWindow: {
    x: number;
    y: number;
  };
};

export const useMousePositionOnWindow = create<MousePositionOnWindowStore>(() => ({
  mousePositionOnWindow: {
    x: 0,
    y: 0,
  },
}));
