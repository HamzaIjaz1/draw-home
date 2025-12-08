import { z } from 'zod/v4';
import { isNull } from '@arthurka/ts-utils';
import { customPositive, customTextureAssetId } from './customSchemas';
import { nullableStrapiMedia, zData } from './common';
import { TextureAssetCategory } from './TextureAssetCategory';
import { commonTextureAttributes } from './commonTextureAttributes';

export const TextureAsset = (
  z
    .object({
      id: customTextureAssetId,
      attributes: (
        z
          .object({
            name: z.string(),
            preview: nullableStrapiMedia,
            maps: commonTextureAttributes.maps,
            scale: customPositive,
          })
          // Note: to do not make project migration
          .and(
            z.union([
              z.object({
                category: zData(
                  z.union([
                    TextureAssetCategory.nullable(),
                    z.array(TextureAssetCategory),
                  ]),
                ).def.in,
              }),
              z.object({
                categories: zData(z.array(TextureAssetCategory)).def.in,
              }),
            ]),
          )
      ),
    })
    .transform(e => {
      const { data } = 'categories' in e.attributes ? e.attributes.categories : e.attributes.category;
      const categories = isNull(data) ? [] : Array.isArray(data) ? data : [data];

      return {
        ...e,
        attributes: {
          name: e.attributes.name,
          preview: e.attributes.preview,
          maps: e.attributes.maps,
          scale: e.attributes.scale,
          categories: {
            data: categories,
          },
        },
      };
    })
);
export type TextureAsset = z.infer<typeof TextureAsset>;

export const TextureAssetsRouteResponse = zData(z.array(TextureAsset));
