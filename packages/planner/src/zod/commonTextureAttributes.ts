import { z } from 'zod/v4';
import { nullableStrapiMedia, strapiMedia } from './common';
import { customStrapiComponentId } from './customSchemas';
import type { textureMaps } from '../services';

export const commonTextureAttributes = {
  maps: z.object({
    id: customStrapiComponentId,
    colorMap: strapiMedia,
    alphaMap: nullableStrapiMedia,
    aoMap: nullableStrapiMedia,
    bumpMap: nullableStrapiMedia,
    emissiveMap: nullableStrapiMedia,
    metalnessMap: nullableStrapiMedia,
    normalMap: nullableStrapiMedia,
    roughnessMap: nullableStrapiMedia,
  } satisfies Record<typeof textureMaps[number] | 'id', unknown>),
};
export type TextureMaps = z.infer<typeof commonTextureAttributes.maps>;
