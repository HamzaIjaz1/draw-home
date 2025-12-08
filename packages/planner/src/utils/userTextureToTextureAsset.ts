import { isNull } from '@arthurka/ts-utils';
import { SafeOmit } from '@draw-house/common/dist/utils';
import { TextureAsset } from '../zod/TextureAsset';
import { CustomModel } from '../zod/CustomModel';

const toStrapiMedia = (url: string, thumb?: string | null) => ({
  data: {
    id: 1,
    attributes: {
      url,
      formats: thumb ? { thumbnail: { url: thumb } } : null,
    },
  },
});

const toNullableStrapiMedia = (url?: string | null, thumb?: string | null) => url ? toStrapiMedia(url, thumb) : { data: null };

const buildTextureMaps = (imageUrl: string, thumb?: string | null, mapsId = 1) => ({
  id: mapsId,
  colorMap: toStrapiMedia(imageUrl, thumb),
  alphaMap: { data: null },
  aoMap: { data: null },
  bumpMap: { data: null },
  emissiveMap: { data: null },
  metalnessMap: { data: null },
  normalMap: { data: null },
  roughnessMap: { data: null },
});

type FlatItem = SafeOmit<CustomModel, 'category'>;

function userTextureToTextureAssetInput(
  item: FlatItem,
  opts?: {
    scale?: number;
    mapsId?: number;
  },
) {
  if(isNull(item.image)) {
    return null;
  }

  const scale = opts?.scale ?? 1;
  const mapsId = opts?.mapsId ?? 1;

  return {
    id: item.id,
    attributes: {
      name: item.name,
      preview: toNullableStrapiMedia(item.image, item.thumbnail ?? null),
      maps: buildTextureMaps(item.image, item.thumbnail ?? null, mapsId),
      scale,
      categories: { data: [] },
    },
  };
}

export const userTexturesToTextureAssets = (items: FlatItem[], opts?: { scale?: number; mapsId?: number }): TextureAsset[] => {
  const inputs = items.map(e => userTextureToTextureAssetInput(e, opts)).filter(e => !isNull(e));

  return inputs.map(e => TextureAsset.parse(e));
};
