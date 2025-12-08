import { useEffect, useRef } from 'react';
import { BufferAttribute, Mesh } from 'three';
import assert from 'assert';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { useTextures } from './useTextures';

export const useRefWithUV2 = (mapProps: ReturnType<typeof useTextures>) => {
  const ref = useRef<Mesh>(null);

  useEffect(() => {
    assert(!isNull(ref.current), 'Something went wrong. |8v9s05|');

    if(isUndefined(ref.current.geometry.attributes.uv)) {
      return;
    }

    ref.current.geometry.setAttribute('uv2', new BufferAttribute(ref.current.geometry.attributes.uv.array, 2));
  }, [mapProps]);

  return ref;
};
