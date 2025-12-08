import { StrapiCustomModelCategoryId } from '@draw-house/common/dist/brands';
import { create } from 'zustand';

type Store = {
  newCustomModelUploadData: null | {
    file: File;
    name: string;
    category: null | StrapiCustomModelCategoryId;
  };
};

export const useNewCustomModelUploadData = create<Store>(() => ({
  newCustomModelUploadData: null,
}));
