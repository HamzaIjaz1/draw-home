import { apiUrls } from '../apiUrls';
import { fetchHelper } from './fetchHelper';
import { StrapiAppConfigRouteResponse } from '../../zod/StrapiAppConfig';

export const getStrapiAppConfig = async () => {
  const res = await fetchHelper.get(apiUrls.strapiAppConfig);

  const { success, data, error } = StrapiAppConfigRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|52cjt1|', error.issues);
    throw error;
  }

  return data;
};
