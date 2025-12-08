import { z } from 'zod/v4';
import { isArrayLength, isNull, tuple } from '@arthurka/ts-utils';
import assert from 'assert';
import { customStrapiAppConfigId } from './customSchemas';
import { zData } from './common';
import { TextureAsset } from './TextureAsset';
import { CustomModel } from './CustomModel';

const StrapiAppConfig = (
  z
    .strictObject({
      id: customStrapiAppConfigId,
      attributes: (
        z
          .object({
            defaultDoorModel: zData(
              z.union([
                CustomModel,
                z.array(CustomModel).transform(e => {
                  assert(isArrayLength(e, '>=', 1), 'Something went wrong. |974son|');

                  return e;
                }),
              ]),
            ),
            defaultWindowModel: zData(
              z.union([
                CustomModel,
                z.array(CustomModel).transform(e => {
                  assert(isArrayLength(e, '>=', 1), 'Something went wrong. |9o1enp|');

                  return e;
                }),
              ]),
            ),
            enableFloorplanAIFeature: z.boolean().nullable(),
            enableOutlinesFeature: z.boolean().nullable(),
            tutorialsURL: z.string().nullable(),
            defaultTexturePalette: zData(
              z
                .object({
                  attributes: z.object({
                    floorTextureTop: zData(TextureAsset),
                    floorTextureTopOverlayColor: z.string().nullable(),
                    floorTextureEdge: zData(TextureAsset),
                    floorTextureEdgeOverlayColor: z.string().nullable(),
                    floorTextureBottom: zData(TextureAsset),
                    floorTextureBottomOverlayColor: z.string().nullable(),
                    ceilingTextureTop: zData(TextureAsset),
                    ceilingTextureTopOverlayColor: z.string().nullable(),
                    ceilingTextureEdge: zData(TextureAsset),
                    ceilingTextureEdgeOverlayColor: z.string().nullable(),
                    ceilingTextureBottom: zData(TextureAsset),
                    ceilingTextureBottomOverlayColor: z.string().nullable(),
                    roofTextureTop: zData(TextureAsset),
                    roofTextureTopOverlayColor: z.string().nullable(),
                    roofTextureEdge: zData(TextureAsset),
                    roofTextureEdgeOverlayColor: z.string().nullable(),
                    roofTextureBottom: zData(TextureAsset),
                    roofTextureBottomOverlayColor: z.string().nullable(),
                    wallTextureInside: zData(TextureAsset),
                    wallTextureInsideOverlayColor: z.string().nullable(),
                    wallTextureCenter: zData(TextureAsset),
                    wallTextureCenterOverlayColor: z.string().nullable(),
                    wallTextureOutside: zData(TextureAsset),
                    wallTextureOutsideOverlayColor: z.string().nullable(),
                    landTextures: zData(z.array(TextureAsset).transform(e => {
                      assert(isArrayLength(e, '>=', 1), 'Something went wrong. |0qy9n2|');

                      return e;
                    })),
                  }),
                })
                .transform(({
                  attributes: {
                    wallTextureInside,
                    wallTextureOutside,
                    wallTextureInsideOverlayColor,
                    wallTextureOutsideOverlayColor,
                    ...restAttributes
                  },
                }) => ({
                  ...restAttributes,
                  wallTextureFront: wallTextureOutside,
                  wallTextureFrontOverlayColor: wallTextureOutsideOverlayColor,
                  wallTextureBack: wallTextureInside,
                  wallTextureBackOverlayColor: wallTextureInsideOverlayColor,
                })),
            ),
          })
          .transform(({ enableFloorplanAIFeature, defaultDoorModel, defaultWindowModel, ...rest }) => ({
            ...rest,
            enableFloorPlanAIFeature: isNull(enableFloorplanAIFeature) ? false : enableFloorplanAIFeature,
            enableOutlinesFeature: isNull(rest.enableOutlinesFeature) ? false : rest.enableOutlinesFeature,
            defaultDoorModels: Array.isArray(defaultDoorModel) ? defaultDoorModel : tuple(defaultDoorModel),
            defaultWindowModels: Array.isArray(defaultWindowModel) ? defaultWindowModel : tuple(defaultWindowModel),
          }))
      ),
    })
    .transform(({ attributes }) => attributes)
);
export type StrapiAppConfig = z.infer<typeof StrapiAppConfig>;

export const StrapiAppConfigRouteResponse = zData(StrapiAppConfig);
