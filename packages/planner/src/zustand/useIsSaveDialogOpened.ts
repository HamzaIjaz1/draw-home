import { create } from 'zustand';

type Store = {
  isSaveDialogOpened: boolean;
};

export const useIsSaveDialogOpened = create<Store>(() => ({
  isSaveDialogOpened: false,
}));
