import { apiUrls } from '../apiUrls';
import { fetchHelper } from './fetchHelper';
import { StrapiMedia, StrapiMediaRouteResponse } from '../../zod';

export const uploadStrapiMedia = async (formData: FormData): Promise<StrapiMedia> => {
  const res = await fetchHelper.postFormData(apiUrls.strapiMedia, formData);

  const { success, data, error } = StrapiMediaRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|d09lsa|', error.issues);
    throw error;
  }

  return data;
};
