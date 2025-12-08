import { create } from 'zustand';

type Store = {
  featureMapState: 'hide' | 'show';
};

export const useFeatureMapState = create<Store>(() => ({
  featureMapState: 'hide',
}));
