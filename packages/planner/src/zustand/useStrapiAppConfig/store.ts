import { create } from 'zustand';
import { StrapiAppConfig } from '../../zod/StrapiAppConfig';
import { StrapiAppConfigTemplateProject } from '../../zod/StrapiAppConfigTemplateProjects';

export type StrapiAppConfigStore = {
  strapiAppConfig: 'idle' | 'loading' | StrapiAppConfig & {
    templateProjects: StrapiAppConfigTemplateProject[];
  };
};

export const useStrapiAppConfig = create<StrapiAppConfigStore>(() => ({
  strapiAppConfig: 'idle',
}));
