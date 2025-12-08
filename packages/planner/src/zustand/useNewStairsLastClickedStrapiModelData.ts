import { create } from 'zustand';
import { StrapiCustomModelId } from '@draw-house/common/dist/brands';
import { CustomModel } from '../zod';

export type NewStairsLastClickedStrapiModelDataStore = {
  newStairsLastClickedStrapiModelData: {
    id: StrapiCustomModelId;
    type: NonNullable<CustomModel['stairType']>;
  };
};

export const useNewStairsLastClickedStrapiModelData = create<NewStairsLastClickedStrapiModelDataStore>(() => ({
  newStairsLastClickedStrapiModelData: {
    id: StrapiCustomModelId(Number.MAX_SAFE_INTEGER),
    type: 'straight',
  },
}));
