import { BufferGeometry } from 'three';
import { create } from 'zustand';

type Store = {
  subtraction: Record<string, BufferGeometry>;
  roofHeights: Record<string, number>;
};

export const useRoofsWallSubtraction = create<Store>(() => ({
  subtraction: {},
  roofHeights: {},
}));
