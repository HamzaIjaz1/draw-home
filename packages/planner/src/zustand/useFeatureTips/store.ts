import { create } from 'zustand';
import { FeatureTipsRouteResponse } from '../../zod';

export type FeatureTipsStore = {
  featureTips: 'idle' | 'loading' | FeatureTipsRouteResponse;
};

export const useFeatureTips = create<FeatureTipsStore>(() => ({
  featureTips: 'idle',
}));
