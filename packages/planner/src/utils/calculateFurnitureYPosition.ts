import { NonNegative } from '@draw-house/common/dist/brands';
import { isNull } from '@arthurka/ts-utils';
import assert from 'assert';
import { Box3, Vector3 } from 'three';
import { type WallsStore } from '../zustand';
import { useStrapiAppConfigResolved } from '../zustand/useStrapiAppConfig';
import { loadGltf } from './loadGltf';

const getDefaultFurnitureHeight = async (type: WallsStore['walls'][number]['furnitures'][number]['type']) => {
  const { strapiAppConfig } = useStrapiAppConfigResolved.getState();
  const fallbackWindowHeight = 1;
  const fallbackDoorHeight = 2.1;
  const currentFurnitureHeight = await (async () => {
    try {
      const { scene } = await loadGltf(type === 'window' ? strapiAppConfig.defaultWindowModels[0].url : strapiAppConfig.defaultDoorModels[0].url);
      return new Box3().setFromObject(scene).getSize(new Vector3()).y;
    } catch(e) {
      console.warn('Failed to load model |7k8huj|');
      return null;
    }
  })();

  return (
    !isNull(currentFurnitureHeight)
      ? NonNegative(currentFurnitureHeight)
      : type === 'window'
        ? fallbackWindowHeight
        : fallbackDoorHeight
  );
};

export const calculateFurnitureYPosition = async (wallHeight: number, type: WallsStore['walls'][number]['furnitures'][number]['type'], furnitureHeight: number | null) => {
  switch(type) {
    case 'door':
      return NonNegative(0);
    case 'window': {
      const maxWindowTop = Math.min(wallHeight, await getDefaultFurnitureHeight('door'));
      const height = isNull(furnitureHeight) ? await getDefaultFurnitureHeight('window') : furnitureHeight;

      if(maxWindowTop >= height) {
        return NonNegative(Math.max(0, maxWindowTop - height));
      }

      return NonNegative(0);
    }
    default:
      ((e: never) => e)(type);
      throw new Error('This should never happen. |ec7srj|');
  }
};

export const calculateFurnitureReplacementYPosition = (
  currentFurnitureHeight: number | null,
  replacementFurnitureHeight: number,
  currentFurnitureY: number,
  wallHeight: number,
) => {
  assert(!isNull(currentFurnitureHeight), 'Something went wrong. |0ue67h|');

  const currentTopY = currentFurnitureY + currentFurnitureHeight;

  if(currentTopY >= replacementFurnitureHeight) {
    return NonNegative(Math.min(wallHeight, currentTopY - replacementFurnitureHeight));
  }

  return NonNegative(0);
};
