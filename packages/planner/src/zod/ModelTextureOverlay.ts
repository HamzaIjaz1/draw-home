import { z } from 'zod/v4';
import { zData } from './common';
import { TextureAsset } from './TextureAsset';
import { CustomModelCategory } from './CustomModelCategory';

export const ModelTextureOverlay = (
  z
    .object({
      attributes: z.object({
        textureName: z.string(),
        texture: zData(TextureAsset),
        overlayColor: z.string().nullable(),
        modelCategory: zData(CustomModelCategory),
      }),
    })
    .transform(({ attributes }) => attributes)
);
export type ModelTextureOverlay = z.infer<typeof ModelTextureOverlay>;

export const ModelTextureOverlayRouteResponse = zData(z.array(ModelTextureOverlay));
