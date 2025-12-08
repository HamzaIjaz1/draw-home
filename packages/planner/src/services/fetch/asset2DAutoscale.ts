import { Positive } from '@draw-house/common/dist/brands';
import { isNull, round } from '@arthurka/ts-utils';
import { calculateAutoscaleFromEarlyClassification } from './floorPlanScanner';
import { lang } from '../../lang';
import { CustomModelsStore, openSnackbar, setAsset2DParams } from '../../zustand';

const calculateAutoscaleRatio = async (url: string) => {
  const { success, data } = await calculateAutoscaleFromEarlyClassification({ url, confidence: 0.4 });
  if(success === false) {
    return null;
  }

  return data.scaleRatio;
};

export const applyAsset2DAutoscale = async ({ id, url, scale }: Extract<CustomModelsStore['customModels'][number], { type: 'asset-2d' }>) => {
  const scaleRatio = await calculateAutoscaleRatio(url);
  if(isNull(scaleRatio)) {
    await openSnackbar({
      type: 'warning',
      message: lang.floorPlanAutoscale.error,
    });
    return;
  }

  setAsset2DParams(id, {
    scale: Positive(Math.max(0.01, scale * scaleRatio)),
  });

  await openSnackbar({
    type: 'success',
    message: lang.floorPlanAutoscale.success(round(scaleRatio, 2)),
  });
};
