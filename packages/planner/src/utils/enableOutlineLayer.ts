import { Group, Mesh } from 'three';
import { OUTLINE_LAYER } from '../components/ActiveRaycasterLayersManager';

export const enableOutlineLayer = (group: Group) => {
  group.traverse(e => {
    if(e instanceof Mesh) {
      e.layers.enable(OUTLINE_LAYER);
    }
  });
};
