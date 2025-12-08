import { create } from 'zustand';

export type CursorStore = {
  cursor: null | 'pointer' | 'grab' | 'grabbing';
};

export const useCursor = create<CursorStore>(() => ({
  cursor: null,
}));

export const setCursor = (cursor: CursorStore['cursor']) => {
  useCursor.setState({ cursor });
};
