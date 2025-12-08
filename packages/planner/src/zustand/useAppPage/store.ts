import { create } from 'zustand';

export type AppPageStore = {
  appPage: null | 'loading' | 'my-projects' | 'planner' | 'my-team' | 'billing' | 'support' | 'account' | 'initial-settings';
};

export const useAppPage = create<AppPageStore>(() => ({
  appPage: null,
}));
