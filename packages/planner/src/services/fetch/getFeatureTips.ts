import { apiUrls } from '../apiUrls';
import { fetchHelper } from './fetchHelper';
import { FeatureTipsRouteResponse } from '../../zod/FeatureTip';

export const getFeatureTips = async () => {
  const res = await fetchHelper.get(apiUrls.featureTips);

  const { success, data, error } = FeatureTipsRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|pr2syi|', error.issues);
    throw error;
  }

  return data;
};
