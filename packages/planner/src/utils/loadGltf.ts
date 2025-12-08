import { useGLTF } from '@react-three/drei';

/**
 * Loads a gltf file from a non-react environment
 * through useGLTF hook api
 * using the same cache as the hook.
 */

export const loadGltf = async (url: string) => {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useGLTF(url);
  } catch(e) {
    if(!(e instanceof Promise)) {
      throw e;
    }

    await e;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useGLTF(url);
  }
};
