import { apiUrls } from '../apiUrls';
import { fetchHelper } from './fetchHelper';
import { StrapiAppConfigTemplateProjectsRouteResponse } from '../../zod/StrapiAppConfigTemplateProjects';

export const getStrapiAppConfigTemplateProjects = async () => {
  const res = await fetchHelper.get(apiUrls.strapiAppConfigTemplateProjects);

  const { success, data, error } = StrapiAppConfigTemplateProjectsRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|tuf04s|', error.issues);
    throw error;
  }

  return data;
};
