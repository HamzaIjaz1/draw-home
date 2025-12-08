import { apiUrls } from '../apiUrls';
import { fetchHelper } from './fetchHelper';
import { StorageUsageRouteResponse } from '../../zod/StorageUsage';

export const getStorageUsage = async () => {
  const res = await fetchHelper.get(apiUrls.storageUsage);

  const { success, data, error } = StorageUsageRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|nul59b|', error.issues);
    throw error;
  }

  return data;
};
