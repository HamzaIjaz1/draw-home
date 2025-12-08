import { ColorInstance } from 'color';
import { isUndefined } from '@arthurka/ts-utils';
import { createOverlayCanvasFromTexture } from './canvas';
import { extendedJSON } from './safeJSONParse';

export const mixedImagesWithColorsCache = new Map<string, Promise<string>>();

export const mixImageWithColor = (originalImageSrc: string, colorOverlay: ColorInstance, compositeOperation: GlobalCompositeOperation) => (
  new Promise<string>(res => {
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = createOverlayCanvasFromTexture(img, colorOverlay.hexa(), compositeOperation);

      res(canvas.toDataURL('image/webp'));
    };

    img.src = originalImageSrc;
  })
);

export const mixImageWithColorCached = (...params: Parameters<typeof mixImageWithColor>) => {
  const key = extendedJSON.stringify(params);
  const cachedResult = mixedImagesWithColorsCache.get(key);

  if(!isUndefined(cachedResult)) {
    return cachedResult;
  }

  const result = mixImageWithColor(...params);

  mixedImagesWithColorsCache.set(key, result);

  return result;
};
