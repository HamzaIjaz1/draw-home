import { Schema, z, ZodRawShape, ZodType } from 'zod/v4';
import { strapiAbsoluteUrl } from '@draw-house/common/dist/zod/strapiMedia';
import { customStrapiMediaId } from './customSchemas';

export const zData = <Output, Input = Output>(data: ZodType<Output, Input>) => (
  z
    .object({ data })
    .transform(({ data }) => data)
);
export const zDataSuccess = <Output, Input = Output>(data: Schema<Output, Input>) => (
  z
    .object({ data })
    .transform(({ data }) => ({
      success: true as const,
      data,
    }))
);
export const zDataError = <Output, Input = Output>(error: Schema<Output, Input>) => (
  z
    .object({ error })
    .transform(({ error }) => ({
      success: false as const,
      error,
    }))
);

const mediaImageProps = {
  url: strapiAbsoluteUrl,
} satisfies ZodRawShape;

const media = z.strictObject({
  id: customStrapiMediaId,
  attributes: z.object({
    ...mediaImageProps,
    formats: z.object({
      thumbnail: z.object(mediaImageProps),
    // Note: to do not make project migration
    }).nullable().default(null),
  }),
});

export const strapiMedia = zData(media).def.in;

export const nullableStrapiMedia = zData(media.nullable()).def.in;
