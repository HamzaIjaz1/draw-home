import { TextureAssetsRouteResponse } from '../../zod';
import { apiUrls } from '../apiUrls';
import { fetchHelper } from './fetchHelper';

export const getTextureAssets = async () => {
  const res = await fetchHelper.get(apiUrls.textureAssets);

  const { success, data, error } = TextureAssetsRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|iqb6s0|', error.issues);
    throw error;
  }

  return data;
};
