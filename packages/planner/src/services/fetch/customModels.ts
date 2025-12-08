import { StrapiCustomModelId } from '@draw-house/common/dist/brands';
import { apiUrls } from '../apiUrls';
import { fetchHelper } from './fetchHelper';
import { CustomModel, CustomModelCreateRouteResponse, CustomModelsGetAllRouteResponse, CustomModelsGetRouteResponse } from '../../zod/CustomModel';
import { CustomModelCategoriesGetRouteResponse, CustomModelCategory } from '../../zod/CustomModelCategory';

export const createCustomModel = async (formData: FormData): Promise<CustomModelCreateRouteResponse> => {
  const res = await fetchHelper.postFormData(apiUrls.customModels.create, formData);

  const { success, data, error } = CustomModelCreateRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|u61mii|', error.issues);
    throw error;
  }

  return data;
};

export const getCustomModel = async (id: StrapiCustomModelId): Promise<CustomModel> => {
  const res = await fetchHelper.get(apiUrls.customModels.get(id));

  const { success, data, error } = CustomModelsGetRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|re64km|', error.issues);
    throw error;
  }

  return data;
};

export const getAllCustomModels = async (): Promise<CustomModel[]> => {
  const res = await fetchHelper.get(apiUrls.customModels.getAll);

  const { success, data, error } = CustomModelsGetAllRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|fo43yp|', error.issues);
    throw error;
  }

  return data;
};

export const getCustomModelCategories = async (): Promise<CustomModelCategory[]> => {
  const res = await fetchHelper.get(apiUrls.customModels.getCategories);

  const { success, data, error } = CustomModelCategoriesGetRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|31iqy2|', error.issues);
    throw error;
  }

  return data;
};
