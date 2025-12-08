import { create } from 'zustand';

type Store = {
  isExportPopupOpened: boolean;
};

export const useIsExportPopupOpened = create<Store>(() => ({
  isExportPopupOpened: false,
}));
