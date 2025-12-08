import { z } from 'zod/v4';
import { zData } from './common';
import { Project } from './Project';

const StrapiAppConfigTemplateProject = Project.omit({
  data: true,
});
export type StrapiAppConfigTemplateProject = z.infer<typeof StrapiAppConfigTemplateProject>;

export const StrapiAppConfigTemplateProjectsRouteResponse = zData(z.array(StrapiAppConfigTemplateProject));
