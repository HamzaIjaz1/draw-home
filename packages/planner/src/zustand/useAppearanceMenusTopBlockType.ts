import { create } from 'zustand';

type Store = {
  appearanceMenusTopBlockType: 'none' | 'textures' | 'upload';
};

export const useAppearanceMenusTopBlockType = create<Store>(() => ({
  appearanceMenusTopBlockType: 'none',
}));
