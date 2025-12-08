import { useEffect, useState } from 'react';
import { Box3, Vector3 } from 'three';
import { isNull } from '@arthurka/ts-utils';
import { loadGltf } from '../utils/loadGltf';

export const useLoadModelSize = (url: string | null) => {
  const [modelSize, setModelSize] = useState<Vector3 | null>(null);

  useEffect(() => {
    if(isNull(url)) {
      setModelSize(null);
      return;
    }

    let isCanceled = false;

    (async (): Promise<void> => {
      try {
        const { scene } = await loadGltf(url);
        const box = new Box3().setFromObject(scene);
        const size = box.getSize(new Vector3());

        if(isCanceled === false) {
          setModelSize(size);
        }
      } catch(e) {
        console.error('Error loading model:', e);

        if(isCanceled === false) {
          setModelSize(null);
        }
      }
    })();

    return () => {
      isCanceled = true;
    };
  }, [url]);

  return modelSize;
};
