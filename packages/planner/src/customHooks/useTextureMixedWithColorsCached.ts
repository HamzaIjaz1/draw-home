import { getNotUndefined, ObjFromEntries, ObjKeys } from '@arthurka/ts-utils';
import { useEffect, useState } from 'react';
import Color from 'color';
import { mixImageWithColorCached } from '../utils/mixImageWithColorCached';
import { extendedJSON } from '../utils/safeJSONParse';

export const useTextureMixedWithColorsCached = (originalImageSrc: string, overlayColors: string[], compositeOperation: GlobalCompositeOperation) => {
  const [textureMixedWithColors, setTextureMixedWithColors] = useState<Record<string, string>>({});

  useEffect(() => {
    (async (): Promise<void> => {
      const mixedImages = await Promise.all(
        overlayColors.map(e => (
          mixImageWithColorCached(originalImageSrc, new Color(e), compositeOperation)
        )),
      );

      setTextureMixedWithColors(
        ObjFromEntries(overlayColors.map((e, i) => [e, getNotUndefined(mixedImages[i], 'This should never happen. |sm4yzr|')] as const)),
      );
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extendedJSON.stringify({ compositeOperation, originalImageSrc, overlayColors })]);

  const keys = ObjKeys(textureMixedWithColors);

  return (
    keys.length === new Set(overlayColors).size && keys.every(e => overlayColors.includes(e))
      ? textureMixedWithColors
      : ObjFromEntries(overlayColors.map(e => [e, originalImageSrc] as const))
  );
};
