import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { LoadingManager, RepeatWrapping, Texture, TextureLoader } from 'three';
import { isNull } from '@arthurka/ts-utils';
import assert from 'assert';
import { useIsFloorGridShown } from './useIsFloorGridShown';
import { useGlobalSettings } from '../zustand';
import { useIsLandscapeTextureLoading } from '../zustand/useIsLandscapeTextureLoading';
import { useStrapiAppConfigResolved } from '../zustand/useStrapiAppConfig';

export const useLandscapeTextures = () => {
  const landscapeTexture = useGlobalSettings(s => s.landscapeTexture);
  const withLandscapeTextures = useGlobalSettings(s => s.withLandscapeTextures);
  const { isFloorGridShown } = useIsFloorGridShown();
  const [textureUrl, setTextureUrl] = useState<string | null>(null);
  const [loadedTexture, setLoadedTexture] = useState<Texture | null>(null);

  const isLandscapeTextureNull = isNull(landscapeTexture);
  useLayoutEffect(() => {
    if(isLandscapeTextureNull === false) {
      return;
    }

    const { strapiAppConfig } = useStrapiAppConfigResolved.getState();

    const defaultTextureUrl = strapiAppConfig.defaultTexturePalette.landTextures[0].attributes.maps.colorMap.data.attributes.url;
    assert(defaultTextureUrl !== '', 'Default landscape texture URL missing. |5yd4xm|');

    useGlobalSettings.setState({ landscapeTexture: defaultTextureUrl });
    setTextureUrl(defaultTextureUrl);
  }, [isLandscapeTextureNull]);

  useLayoutEffect(() => {
    if(!isNull(landscapeTexture)) {
      setTextureUrl(landscapeTexture);
    }
  }, [landscapeTexture]);

  const shouldLoad = isFloorGridShown === false && !isNull(textureUrl) && withLandscapeTextures === true;

  useEffect(() => {
    if(shouldLoad === false) {
      setLoadedTexture(null);
      return;
    }

    const manager = new LoadingManager();

    manager.onStart = () => {
      useIsLandscapeTextureLoading.setState({ isLandscapeTextureLoading: true });
    };

    manager.onLoad = () => {
      useIsLandscapeTextureLoading.setState({ isLandscapeTextureLoading: false });
    };

    const loader = new TextureLoader(manager);

    loader.load(textureUrl, tex => {
      const cloned = tex.clone();
      cloned.wrapS = RepeatWrapping;
      cloned.wrapT = RepeatWrapping;
      cloned.repeat.set(10, 10);
      setLoadedTexture(cloned);
    });
  }, [shouldLoad, textureUrl]);

  const map = useMemo(() => {
    if(isNull(loadedTexture) || shouldLoad === false) {
      return null;
    }

    const cloned = loadedTexture.clone();
    cloned.wrapS = RepeatWrapping;
    cloned.wrapT = RepeatWrapping;
    cloned.repeat.set(10, 10);

    return cloned;
  }, [loadedTexture, shouldLoad]);

  return { map };
};
