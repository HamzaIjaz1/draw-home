import { routes } from '@draw-house/common/dist/zod';
import { floorPlanScannerUrls } from '@draw-house/common/dist/commonUrls';
import { FLOOR_PLAN_SCANNER_URL } from '@draw-house/common/dist/envVariables/public';
import { stringifyUrl } from '@draw-house/common/dist/utils/stringifyUrl';
import { fetchHelper } from './fetchHelper';

export const scanFloorPlanImage = async (params: routes.floorPlanImage.scan.ReqQuery) => {
  const res = await fetchHelper.get(stringifyUrl(`${FLOOR_PLAN_SCANNER_URL}${floorPlanScannerUrls.floorPlanImage.scan}`, params));

  const { success, data, error } = routes.floorPlanImage.scan.RouteResponse.safeParse(res);
  if(success === false) {
    console.error('|xf61xn|', error.issues);
    throw error;
  }

  return data;
};

export const calculateAutoscaleFromEarlyClassification = async (params: routes.floorPlanImage.autoscale.ReqQuery) => {
  const res = await fetchHelper.get(stringifyUrl(`${FLOOR_PLAN_SCANNER_URL}${floorPlanScannerUrls.floorPlanImage.autoscale}`, params));

  const { success, data, error } = routes.floorPlanImage.autoscale.RouteResponse.safeParse(res);
  if(success === false) {
    console.error('|3bqb20|', error.issues);
    throw error;
  }

  return data;
};
