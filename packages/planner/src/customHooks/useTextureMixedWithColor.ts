import { isNull, isUndefined } from '@arthurka/ts-utils';
import { useEffect, useState } from 'react';
import Color from 'color';
import { extendedJSON } from '../utils/safeJSONParse';
import { mixedImagesWithColorsCache, mixImageWithColor } from '../utils/mixImageWithColorCached';

type Params = {
  originalImageSrc: string;
  overlayColor: string | null;
  compositeOperation: GlobalCompositeOperation;
};
export const useTexturesMixedWithColor = <const T extends Params[]>(params: T): {
  readonly [K in keyof T]: string
} => {
  const [texture, setTexture] = useState(params.map(e => e.originalImageSrc));

  useEffect(() => {
    let isEnded = false;

    (async (): Promise<void> => {
      const result = await Promise.all(
        params.map(async ({ originalImageSrc, overlayColor, compositeOperation }): Promise<string> => {
          if(isNull(overlayColor)) {
            return originalImageSrc;
          }

          const colorOverlay = new Color(overlayColor);

          const key = extendedJSON.stringify([originalImageSrc, colorOverlay, compositeOperation]);
          const cachedResult = mixedImagesWithColorsCache.get(key);

          const result = await (
            !isUndefined(cachedResult)
              ? cachedResult
              : mixImageWithColor(originalImageSrc, colorOverlay, compositeOperation)
          );

          return result;
        }),
      );

      if(isEnded === false) {
        setTexture(result);
      }
    })();

    return () => {
      isEnded = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extendedJSON.stringify(params)]);

  return texture;
};
