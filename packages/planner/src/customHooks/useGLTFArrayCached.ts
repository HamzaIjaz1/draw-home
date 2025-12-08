import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { getNotUndefined, isUndefined } from '@arthurka/ts-utils';

const gltfCache = new Map<string, Exclude<ReturnType<typeof useGLTF>, unknown[]>>();

export const useGLTFArrayCached = (urls: string[]) => {
  const resultWithCache = useMemo(() => (
    urls.map(url => ({
      url,
      result: gltfCache.get(url),
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [JSON.stringify(urls)]);

  const newGltfs = useGLTF(resultWithCache.filter(e => isUndefined(e.result)).map(e => e.url));

  return useMemo(() => {
    let i = 0;

    return resultWithCache.map(({ result, url }) => !isUndefined(result) ? result : (() => {
      const result = getNotUndefined(newGltfs[i], 'This should never happen. |7rg3ir|');

      gltfCache.set(url, result);
      i++;

      return result;
    })());
  }, [newGltfs, resultWithCache]);
};
