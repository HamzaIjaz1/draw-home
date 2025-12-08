import { create } from 'zustand';
import { ProjectWithoutData } from '../../zod';

export type MyProjectsStore = {
  myProjects: 'idle' | 'loading' | ProjectWithoutData[];
};

export const useMyProjects = create<MyProjectsStore>(() => ({
  myProjects: 'idle',
}));
