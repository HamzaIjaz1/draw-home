import { NonNegative, Positive } from '@draw-house/common/dist/brands';
import type { WallsStore } from '../zustand';

export const getFurnitureWallY = (wallHeight: Positive) => ({
  door: NonNegative(0),
  window: NonNegative(wallHeight / 2),
} satisfies Record<WallsStore['walls'][number]['furnitures'][number]['type'], number>);
