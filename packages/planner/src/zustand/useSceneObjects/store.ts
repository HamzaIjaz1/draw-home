import { create } from 'zustand';
import type { Object3D } from 'three';

type Key = (
  | 'wall'
  | 'door'
  | 'window'
  | 'floor'
  | 'ceiling'
  | 'roof'
  | 'customModel'
  | 'asset2D'
  | 'space'
  | 'stair'
);

export type SceneObjectsStore = {
  sceneObjects: Map<`${Key}:${string}`, Object3D>;
};

export const useSceneObjects = create<SceneObjectsStore>(() => ({
  sceneObjects: new Map<`${Key}:${string}`, Object3D>(),
}));
