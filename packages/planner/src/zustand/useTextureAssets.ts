import assert from 'assert';
import { create } from 'zustand';
import { getTextureAssets } from '../services';
import { TextureAsset } from '../zod';
import { isResolved } from '../utils/isResolved';

type Store = {
  textureAssets: 'idle' | 'loading' | TextureAsset[];
};

export const useTextureAssets = create<Store>(() => ({
  textureAssets: 'idle',
}));

export const useTextureAssetsResolved = () => {
  const { textureAssets } = useTextureAssets();
  assert(isResolved(textureAssets), 'Something went wrong. |k81ryl|');

  return { textureAssets };
};
useTextureAssetsResolved.getState = () => {
  const { textureAssets } = useTextureAssets.getState();
  assert(isResolved(textureAssets), 'Something went wrong. |xa2cfv|');

  return { textureAssets };
};

export const requestToLoadTextureAssets = async () => {
  const { textureAssets } = useTextureAssets.getState();
  if(textureAssets !== 'idle') {
    return;
  }

  useTextureAssets.setState({ textureAssets: 'loading' });

  useTextureAssets.setState({
    textureAssets: await getTextureAssets(),
  });
};
