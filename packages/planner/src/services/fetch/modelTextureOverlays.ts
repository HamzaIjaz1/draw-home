import { apiUrls } from '../apiUrls';
import { fetchHelper } from './fetchHelper';
import { ModelTextureOverlay, ModelTextureOverlayRouteResponse } from '../../zod/ModelTextureOverlay';

export const getModelTextureOverlays = async (): Promise<ModelTextureOverlay[]> => {
  const res = await fetchHelper.get(apiUrls.modelTextureOverlays);

  const { success, data, error } = ModelTextureOverlayRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|po553x|', error.issues);
    throw error;
  }

  return data;
};
