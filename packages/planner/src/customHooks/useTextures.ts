import { useTexture } from '@react-three/drei';
import { isNull, isNullish, isUndefined } from '@arthurka/ts-utils';
import assert from 'assert';
import { useEffect, useMemo } from 'react';
import { CanvasTexture, RepeatWrapping, Texture } from 'three';
import { MeshStandardMaterialProps } from '@react-three/fiber';
import { ColorInstance } from 'color';
import { TextureMaps } from '../zod/commonTextureAttributes';
import { textureMaps } from '../services';
import { createOverlayCanvasFromTexture } from '../utils/canvas';

const canvasTextureCache = new Map<string, CanvasTexture>();

function cloneTexture(src: Texture) {
  const clonedTexture = src.clone();
  clonedTexture.offset.copy(src.offset);
  clonedTexture.repeat.copy(src.repeat);
  clonedTexture.center.copy(src.center);
  clonedTexture.rotation = src.rotation;
  clonedTexture.wrapS = src.wrapS;
  clonedTexture.wrapT = src.wrapT;
  clonedTexture.flipY = src.flipY;
  clonedTexture.needsUpdate = true;
  return clonedTexture;
}

export const useTextures = (
  maps: TextureMaps,
  cb?: (e: Texture) => void,
  options?: {
    overlayColor: ColorInstance | null;
    compositeOperation: GlobalCompositeOperation;
  },
) => {
  const isUndefinedOptions = isUndefined(options);
  const { names, urls } = useMemo(() => {
    const values = textureMaps.map(e => {
      const { data } = maps[e];

      return isNull(data) ? null : [e, data.attributes.url] as const;
    }).filter(e => !isNull(e));

    return {
      names: values.map(e => e[0]),
      urls: values.map(e => e[1]),
    };
  }, [maps]);

  const baseTextures = useTexture(urls);

  assert(names.length === baseTextures.length, 'This should never happen. |cj3mbg|');

  const { materialProps, ownedClones } = useMemo(() => {
    const owned: Texture[] = [];

    const textures = (
      baseTextures
        .map((baseTexture, i) => {
          if(isUndefinedOptions === false && !isNull(options.overlayColor) && names[i] === 'colorMap') {
            const key = `${urls[i]}::${options.overlayColor.hexa()}::${options.compositeOperation}`;
            const cached = canvasTextureCache.get(key);

            if(cached !== undefined) {
              const t = cached.clone();
              t.wrapS = RepeatWrapping;
              t.wrapT = RepeatWrapping;
              cb?.(t);
              t.needsUpdate = true;
              owned.push(t);
              return t;
            }

            assert(baseTexture.image instanceof HTMLImageElement, 'Something went wrong. |4ald0z|');
            const canvas = createOverlayCanvasFromTexture(
              baseTexture.image,
              options.overlayColor.hexa(),
              options.compositeOperation,
            );
            const canvasTex = new CanvasTexture(canvas);
            canvasTextureCache.set(key, canvasTex);

            const clonedTexture = canvasTex.clone();
            clonedTexture.wrapS = RepeatWrapping;
            clonedTexture.wrapT = RepeatWrapping;
            cb?.(clonedTexture);
            clonedTexture.needsUpdate = true;
            owned.push(clonedTexture);
            return clonedTexture;
          }

          const clonedTexture = cloneTexture(baseTexture);
          clonedTexture.wrapS = RepeatWrapping;
          clonedTexture.wrapT = RepeatWrapping;
          cb?.(clonedTexture);
          clonedTexture.needsUpdate = true;

          owned.push(clonedTexture);
          return clonedTexture;
        }));

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
    mapProps.onUpdate = e => {
      e.needsUpdate = true;
    };

    return { materialProps: mapProps, ownedClones: owned };
  }, [baseTextures, isUndefinedOptions, options?.overlayColor, options?.compositeOperation, names, urls, cb]);
  useEffect(() => (
    () => {
      for(const e of ownedClones) {
        e.dispose();
      }
    }
  ), [ownedClones]);

  return materialProps;
};
