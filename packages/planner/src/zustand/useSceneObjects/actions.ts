import type { Object3D } from 'three';
import { KeyOf } from '@arthurka/ts-utils';
import { SceneObjectsStore, useSceneObjects } from './store';

export function registerSceneObject(key: KeyOf<SceneObjectsStore['sceneObjects']>, obj: Object3D): void {
  const { sceneObjects } = useSceneObjects.getState();

  const newSceneObjects = new Map(sceneObjects);
  newSceneObjects.set(key, obj);

  useSceneObjects.setState({ sceneObjects: newSceneObjects });
}

export function unregisterSceneObject(key: KeyOf<SceneObjectsStore['sceneObjects']>): void {
  const { sceneObjects } = useSceneObjects.getState();
  if(sceneObjects.has(key) === false) {
    return;
  }

  const newSceneObjects = new Map(sceneObjects);
  newSceneObjects.delete(key);

  useSceneObjects.setState({ sceneObjects: newSceneObjects });
}
