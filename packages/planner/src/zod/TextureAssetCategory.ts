import { z } from 'zod/v4';
import Color from 'color';
import { isNull } from '@arthurka/ts-utils';
import { customTextureAssetCategoryId } from './customSchemas';
import { nullableStrapiMedia, zData } from './common';
import { CustomModelCategory } from './CustomModelCategory';
import { getHexOrHexa } from '../utils/getHexOrHexa';

export const TextureAssetCategory = z.strictObject({
  id: customTextureAssetCategoryId,
  attributes: z.object({
    name: z.string(),
    image: nullableStrapiMedia,
    overlayColors: (
      z
        .array(
          z.object({
            value: z.string(),
          }),
        )
        // Note: using default here to avoid making a HUGE project migration and now it is also optional in Strapi
        .default([])
        .overwrite(arr => {
          const clearedArr = arr.map(({ value }) => getHexOrHexa(new Color(value)));

          return [...new Set(clearedArr)].map(value => ({ value }));
        })
    ),
    modelCategory: (
      zData(
        z.union([
          CustomModelCategory.def.in.nullable(),
          z.array(CustomModelCategory.def.in),
        ]),
      ).def.in
        // Note: using default here to avoid making a HUGE project migration
        .default({ data: null })
        .transform(({ data }) => ({
          data: (
            isNull(data)
              ? []
              : Array.isArray(data)
                ? data
                : [data]
          ),
        }))
    ),
    parent: z.object({
      data: z.object({
        id: customTextureAssetCategoryId,
      }).nullable(),
    }).optional(),
    // Note: using default here to avoid making a HUGE project migration
    order: z.number().default(0),
    // Note: using default here to avoid making a project migration
    excludeFromAllMaterials: z.boolean().default(false),
  }),
});
export type TextureAssetCategory = z.infer<typeof TextureAssetCategory>;
