import { create } from 'zustand';
import { ModelTextureOverlay } from '../../zod/ModelTextureOverlay';

export type ModelTextureOverlaysStore = {
  modelTextureOverlays: 'idle' | 'loading' | ModelTextureOverlay[];
};

export const useModelTextureOverlays = create<ModelTextureOverlaysStore>(() => ({
  modelTextureOverlays: 'idle',
}));
