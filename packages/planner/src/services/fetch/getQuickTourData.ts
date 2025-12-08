import { apiUrls } from '../apiUrls';
import { fetchHelper } from './fetchHelper';
import { QuickTourRouteResponse } from '../../zod/QuickTourData';

export const getQuickTourData = async () => {
  const res = await fetchHelper.get(apiUrls.quickTour);

  const { success, data, error } = QuickTourRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|fw3bnp|', error.issues);
    throw error;
  }

  return data;
};
