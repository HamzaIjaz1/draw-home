import { useEffect, useRef } from 'react';
import { MeshStandardMaterial } from 'three';
import assert from 'assert';
import { isNull } from '@arthurka/ts-utils';
import { useTextures } from './useTextures';

export const useRefWithTextureUpdate = (mapProps: ReturnType<typeof useTextures>) => {
  const ref = useRef<MeshStandardMaterial>(null);

  useEffect(() => {
    assert(!isNull(ref.current), 'Something went wrong. |30rgy5|');

    ref.current.needsUpdate = true;
  }, [mapProps]);

  return ref;
};
