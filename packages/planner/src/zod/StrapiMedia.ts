import { z } from 'zod/v4';
import { isArrayLength } from '@arthurka/ts-utils';
import { strapiAbsoluteUrl } from '@draw-house/common/dist/zod/strapiMedia';
import assert from 'assert';
import { customStrapiMediaId } from './customSchemas';

export const StrapiMedia = z.object({
  id: customStrapiMediaId,
  url: strapiAbsoluteUrl,
});
export type StrapiMedia = z.infer<typeof StrapiMedia>;

export const StrapiMediaRouteResponse = (
  z
    .array(StrapiMedia)
    .transform(e => {
      assert(isArrayLength(e, '===', 1), 'Something went wrong. |ils0c8|');

      return e[0];
    })
);
