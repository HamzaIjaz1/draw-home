import { create } from 'zustand';
import { Union } from '@arthurka/ts-utils';
import { CustomModelId } from '@draw-house/common/dist/brands';
import { CustomModelsStore } from './useCustomModels';

type Store = {
  objectClipboard: null | Union<
    | {
      type: 'door' | 'window';
      url: string;
    }
    | {
      type: 'customModel';
      id: CustomModelId;
      customModels: CustomModelsStore['customModels'];
    }
  >;
};

export const useObjectClipboard = create<Store>(() => ({
  objectClipboard: null,
}));
