import { z } from 'zod/v4';
import { isNull, isNullish } from '@arthurka/ts-utils';
import { strapiAbsoluteUrl } from '@draw-house/common/dist/zod/strapiMedia';
import { customStrapiCustomModelId } from './customSchemas';
import { nullableStrapiMedia, zData, zDataError, zDataSuccess } from './common';
import { CustomModelCategory } from './CustomModelCategory';

export const CustomModel = (
  z
    .object({
      id: customStrapiCustomModelId,
      attributes: z.object({
        name: z.string(),
        stairType: z.enum(['straight', 'L-shaped', 'U-shaped', 'spiral']).nullable(),
        appearanceOptionsShown: z.boolean(),
        appearanceOptionsExceptionTextureNames: z.array(
          z.object({
            name: z.string(),
          }),
        ),
        distanceFromFloor: z.number(),
        order: z.number(),
        model: zData(z.object({
          id: customStrapiCustomModelId,
          attributes: z.object({
            name: z.string(),
            url: strapiAbsoluteUrl,
          }),
        })),
        preview: nullableStrapiMedia,
        category: zData(z.object({
          id: CustomModelCategory.def.in.shape.id,
          attributes: CustomModelCategory.def.in.shape.attributes.pick({
            name: true,
            childrenType: true,
            tilt: true,
            image: true,
            toolbarImage: true,
          }),
        })),
      }),
    })
    .transform(e => ({
      strapiId: e.id,
      id: e.attributes.model.id,
      stairType: e.attributes.stairType,
      appearanceOptionsShown: e.attributes.appearanceOptionsShown,
      appearanceOptionsExceptionTextureNames: e.attributes.appearanceOptionsExceptionTextureNames.map(e => e.name),
      distanceToFloor: e.attributes.distanceFromFloor,
      url: e.attributes.model.attributes.url,
      name: e.attributes.name || e.attributes.model.attributes.name,
      image: isNull(e.attributes.preview.data) ? null : e.attributes.preview.data.attributes.url,
      thumbnail: (
        isNull(e.attributes.preview.data) || isNull(e.attributes.preview.data.attributes.formats)
          ? null
          : e.attributes.preview.data.attributes.formats.thumbnail.url
      ),
      order: e.attributes.order,
      category: {
        id: e.attributes.category.id,
        name: e.attributes.category.attributes.name,
        childrenType: e.attributes.category.attributes.childrenType,
        tilt: e.attributes.category.attributes.tilt,
        image: isNull(e.attributes.category.attributes.image.data) ? null : e.attributes.category.attributes.image.data.attributes.url,
        toolbarImage: (
          isNullish(e.attributes.category.attributes.toolbarImage?.data)
            ? null
            : e.attributes.category.attributes.toolbarImage.data.attributes.url
        ),
      },
    }))
);
export type CustomModel = z.infer<typeof CustomModel>;

export const CustomModelCreateRouteResponse = z.union([
  zDataSuccess(CustomModel),
  zDataError(
    z.object({
      status: z.literal(402),
    }),
  ),
]);
export type CustomModelCreateRouteResponse = z.infer<typeof CustomModelCreateRouteResponse>;

export const CustomModelsGetRouteResponse = zData(CustomModel);
export const CustomModelsGetAllRouteResponse = zData(z.array(CustomModel));
