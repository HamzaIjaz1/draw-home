import { TextureAssetId } from '@draw-house/common/dist/brands';
import assert from 'assert';
import { isUndefined } from '@arthurka/ts-utils';
import { useTextureAssets } from '../zustand/useTextureAssets';
import { isResolved } from './isResolved';
import { extractTextureAssetCategories } from './helpers';

export const getDefaultColorForTexture = (textureAssetId: TextureAssetId) => {
  const { textureAssets } = useTextureAssets.getState();
  assert(isResolved(textureAssets), 'Something went wrong. |vub8aj|');

  const foundTextureAsset = textureAssets.find(e => e.id === textureAssetId);
  if(isUndefined(foundTextureAsset)) {
    return null;
  }

  const textureAssetCategory = extractTextureAssetCategories([foundTextureAsset])[0];
  if(isUndefined(textureAssetCategory)) {
    return null;
  }

  return textureAssetCategory[1].overlayColors[0]?.value ?? null;
};
