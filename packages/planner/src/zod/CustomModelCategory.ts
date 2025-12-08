import { z } from 'zod/v4';
import { isArrayIncludes, isNull, isNullish, isUndefined, ObjKeys } from '@arthurka/ts-utils';
import { letIn } from '@draw-house/common/dist/utils';
import { strapiAbsoluteUrl } from '@draw-house/common/dist/zod/strapiMedia';
import { customStrapiCustomModelCategoryId } from './customSchemas';
import { nullableStrapiMedia, zData } from './common';

export const CustomModelCategory = (
  z
    .object({
      id: customStrapiCustomModelCategoryId,
      attributes: z.object({
        name: z.string(),
        appearanceType: z.enum(['walls', 'roofs', 'floors', 'ceilings']).nullable(),
        childrenType: (
          z
            .enum(['windows', 'Windows', 'doors', 'Doors', 'stairs', 'Stairs', 'assets-2d', 'Assets 2D', 'columns', 'Columns'])
            .nullable()
            .transform(e => {
              if(isNull(e)) {
                return null;
              }

              const childrenTypes = {
                Windows: 'windows',
                Doors: 'doors',
                Stairs: 'stairs',
                'Assets 2D': 'assets-2d',
                Columns: 'columns',
              } satisfies Partial<Record<typeof e, typeof e>>;

              return !isArrayIncludes(ObjKeys(childrenTypes), e) ? e : childrenTypes[e];
            })
        ),
        parent: z.object({
          data: z.object({
            id: customStrapiCustomModelCategoryId,
          }).nullable(),
        }),
        image: z.object({
          data: z.object({
            attributes: z.object({
              url: strapiAbsoluteUrl,
            }),
          }).nullable(),
        }),
        // Note: .optional() added to avoid making a project migration
        toolbarImage: nullableStrapiMedia.optional(),
        representation2DImage: z.object({
          data: z.object({
            attributes: z.object({
              url: strapiAbsoluteUrl,
            }),
          }).nullable(),
        // Note: .optional() added to avoid making a project migration
        }).optional(),
        representation2DImageTileSize: z.object({
          top: z.number(),
          bottom: z.number(),
          left: z.number(),
          right: z.number(),
        }).nullable().optional(),
        order: z.number(),
        // Note: .default() added to avoid making a project migration
        userUpload: z.enum(['forbidden', 'allowed', 'allowed-image-upload-tool']).default('forbidden'),
        // Note: undefined in .nullish() added to avoid making a project migration
        isTextures: z.boolean().nullish(),
        // Note: undefined in .nullish() added to avoid making a project migration
        is2DFloorplan: z.boolean().nullish(),
        // Note: .default() added to avoid making a project migration
        tilt: z.number().default(0),
        userAssetMenuTexts: z.object({
          title: z.string(),
          // Note: .optional() added to avoid making a project migration
          popupTitle: z.string().optional(),
          description: z.string(),
          subtitle: z.string(),
          uploadPaneTitle: z.string(),
        // Note: .optional() added to avoid making a project migration
        }).nullable().optional(),
      }),
    })
    .transform(e => ({
      id: e.id,
      name: e.attributes.name,
      childrenType: e.attributes.childrenType,
      image: isNull(e.attributes.image.data) ? null : e.attributes.image.data.attributes.url,
      toolbarImage: isNullish(e.attributes.toolbarImage?.data) ? null : e.attributes.toolbarImage.data.attributes.url,
      representation2DImage: isNullish(e.attributes.representation2DImage?.data) ? null : e.attributes.representation2DImage.data.attributes.url,
      parentId: isNull(e.attributes.parent.data) ? null : e.attributes.parent.data.id,
      appearanceType: e.attributes.appearanceType,
      order: e.attributes.order,
      userUpload: e.attributes.userUpload,
      isTextures: isNullish(e.attributes.isTextures) ? false : e.attributes.isTextures,
      is2DFloorplan: isNullish(e.attributes.is2DFloorplan) ? false : e.attributes.is2DFloorplan,
      tilt: e.attributes.tilt,
      userAssetMenuTexts: letIn(e.attributes.userAssetMenuTexts, e => (
        isNullish(e) ? null : {
          ...e,
          popupTitle: isUndefined(e.popupTitle) ? '' : e.popupTitle,
        }
      )),
      representation2DImageTileSize: !isNullish(e.attributes.representation2DImageTileSize) ? e.attributes.representation2DImageTileSize : {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    }))
);
export type CustomModelCategory = z.infer<typeof CustomModelCategory>;

export const CustomModelCategoriesGetRouteResponse = zData(z.array(CustomModelCategory));
