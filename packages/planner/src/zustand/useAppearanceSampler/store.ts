import { create } from 'zustand';
import { ColorOverlay } from '../../utils';
import { TextureAsset } from '../../zod';
import { TextureTransform } from '../../zod/TextureTransform';

export type PickMode = 'overlay' | 'texture';

export type AppearancePick = {
  texture: TextureAsset | null;
  transform: TextureTransform | null;
  overlay: ColorOverlay | null;
};

export type ApplyFns = {
  overlay?: (overlay: ColorOverlay | null) => void;
  appearance?: (appearance: AppearancePick | null) => void;
};

type Store = {
  isActive: boolean;
  mode: PickMode | null;
  apply: ApplyFns | null;
};

export const useAppearanceSampler = create<Store>(() => ({
  isActive: false,
  mode: null,
  apply: null,
}));
