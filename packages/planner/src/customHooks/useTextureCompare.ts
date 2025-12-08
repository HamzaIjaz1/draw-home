import { ColorInstance } from 'color';
import { useEffect, useState } from 'react';
import { isNull } from '@arthurka/ts-utils';
import { createOverlayCanvasFromTexture } from '../utils';

export const useTextureCompare = (originalImageSrc: string, colorOverlay: ColorInstance | null, compositeOperation: GlobalCompositeOperation) => {
  const [mixedImageSrc, setMixedImageSrc] = useState(originalImageSrc);

  useEffect(() => {
    if(isNull(colorOverlay)) {
      return;
    }

    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = createOverlayCanvasFromTexture(img, colorOverlay.hexa(), compositeOperation);

      setMixedImageSrc(canvas.toDataURL('image/webp'));
    };

    img.src = originalImageSrc;

    return () => {
      img.onload = null;
    };
  }, [colorOverlay, compositeOperation, originalImageSrc]);

  return {
    originalImageSrc,
    mixedImageSrc,
  };
};
