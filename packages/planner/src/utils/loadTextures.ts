import { RepeatWrapping, Texture, TextureLoader } from 'three';
import { isNull, isNullish } from '@arthurka/ts-utils';
import assert from 'assert';
import { MeshStandardMaterialProps } from '@react-three/fiber';
import { TextureMaps } from '../zod/commonTextureAttributes';
import { textureMaps } from '../services';

export const loadTextures = async (maps: TextureMaps): Promise<MeshStandardMaterialProps> => {
  const { names, urls } = (() => {
    const values = textureMaps.map(e => {
      const { data } = maps[e];

      return isNull(data) ? null : [e, data.attributes.url] as const;
    }).filter(e => !isNull(e));

    return {
      names: values.map(e => e[0]),
      urls: values.map(e => e[1]),
    };
  })();

  const baseTextures = await Promise.all(
    urls.map(url => (
      new Promise<Texture>(res => {
        new TextureLoader().load(url, res);
      })
    )),
  );
  assert(names.length === baseTextures.length, 'This should never happen. |gq4fd0|');

  const textures = baseTextures.map(texture => {
    const clonedTexture = texture.clone();

    clonedTexture.wrapS = RepeatWrapping;
    clonedTexture.wrapT = RepeatWrapping;

    return clonedTexture;
  });

  const mapProps: MeshStandardMaterialProps = {};

  for(const [i, name] of names.entries()) {
    // Note: temporarily skip all maps except color
    if(name !== 'colorMap') {
      continue;
    }

    mapProps[name === 'colorMap' ? 'map' : name] = textures[i];
  }

  if(!isNullish(mapProps.alphaMap)) {
    mapProps.alphaTest = 0.01;
  }

  return mapProps;
};
