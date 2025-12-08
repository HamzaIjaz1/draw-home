import { create } from 'zustand';
import { CustomModel } from '../../zod';
import { CustomModelCategory } from '../../zod/CustomModelCategory';

export type CatalogDataStore = {
  catalogData: 'idle' | 'loading' | {
    models: CustomModel[];
    categories: CustomModelCategory[];
  };
};

export const useCatalogData = create<CatalogDataStore>(() => ({
  catalogData: 'idle',
}));
