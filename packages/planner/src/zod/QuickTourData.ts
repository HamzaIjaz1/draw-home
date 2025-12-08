import { z } from 'zod/v4';
import { isArrayIncludes, isNull, ObjKeys } from '@arthurka/ts-utils';
import { strapiAbsoluteUrl } from '@draw-house/common/dist/zod/strapiMedia';
import { zData } from './common';
import { quickTourClassNames } from '../constants';

const QuickTourData = (
  z
    .object({
      attributes: z.object({
        title: z.string(),
        description: z.string(),
        connectTo: z.string().nullable(),
        order: z.number(),
        video: zData(
          z.object({
            attributes: z.object({
              url: strapiAbsoluteUrl,
            }),
          }).nullable(),
        ),
        image: zData(
          z.object({
            attributes: z.object({
              url: strapiAbsoluteUrl,
            }),
          }).nullable(),
        ),
      }),
    })
    .transform(({ attributes: { video, image, ...rest } }) => ({
      ...rest,
      video: isNull(video) ? null : video.attributes.url,
      image: isNull(image) ? null : image.attributes.url,
    }))
);

export const QuickTourRouteResponse = zData(
  z
    .array(QuickTourData)
    .transform(e => (
      e
        .map(({ connectTo, ...rest }) => !isArrayIncludes(ObjKeys(quickTourClassNames), connectTo) ? null : {
          ...rest,
          connectTo,
        })
        .filter(e => !isNull(e))
        .toSorted((a, b) => a.order - b.order)
    )),
);
export type QuickTourRouteResponse = z.infer<typeof QuickTourRouteResponse>;
