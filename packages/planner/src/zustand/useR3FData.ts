import { isNull } from '@arthurka/ts-utils';
import { RootState } from '@react-three/fiber';
import { OrbitControls } from 'three-stdlib';
import assert from 'assert';
import { create } from 'zustand';

type Store = {
  camera: null | RootState['camera'];
  scene: null | RootState['scene'];
  gl: null | RootState['gl'];
  controls: null | OrbitControls;
};

export const useR3FData = create<Store>(() => ({
  camera: null,
  scene: null,
  gl: null,
  controls: null,
}));

export const useR3FDataResolved = () => {
  const { camera, scene, gl } = useR3FData();
  assert(!isNull(camera) && !isNull(scene) && !isNull(gl), 'Something went wrong. |ft86nd|');

  return { camera, scene, gl };
};
useR3FDataResolved.getState = () => {
  const { camera, scene, gl } = useR3FData.getState();
  assert(!isNull(camera) && !isNull(scene) && !isNull(gl), 'Something went wrong. |99j13e|');

  return { camera, scene, gl };
};
