import { Material, Mesh, Object3D, Object3DEventMap } from 'three';
import assert from 'assert';
import { ghostOpacity } from '../constants';

export const makeModelSemiTransparent = (scene: Object3D<Object3DEventMap>) => {
  scene.traverse(e => {
    if(!(e instanceof Mesh)) {
      return;
    }
    assert(e.material instanceof Material, 'Something went wrong. |gma3li|');

    const material = e.material.clone();
    material.transparent = true;
    material.opacity = ghostOpacity;

    e.material = material;
  });
};
