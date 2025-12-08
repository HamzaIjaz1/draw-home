import { z } from 'zod/v4';
import { isArrayIncludes, isNull, ObjKeys } from '@arthurka/ts-utils';
import { zData } from './common';
import { customFeatureTipId } from './customSchemas';
import { infoPanelFeatures } from '../constants';

const FeatureTip = (
  z
    .object({
      id: customFeatureTipId,
      attributes: z.object({
        feature: z.string(),
        title: z.string(),
        description: z.string(),
        order: z.number(),
      }),
    })
    .transform(e => ({
      ...e.attributes,
      id: e.id,
    }))
);

export const FeatureTipsRouteResponse = zData(
  z
    .array(FeatureTip)
    .transform(e => (
      e
        .map(({ feature, ...rest }) => (
          !isArrayIncludes(ObjKeys(infoPanelFeatures), feature) ? null : {
            feature,
            ...rest,
          }
        ))
        .filter(e => !isNull(e))
    )),
);
export type FeatureTipsRouteResponse = z.infer<typeof FeatureTipsRouteResponse>;
