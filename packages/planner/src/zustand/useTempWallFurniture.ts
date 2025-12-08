import { create } from 'zustand';
import { NonNegative, WallId } from '@draw-house/common/dist/brands';
import { clamp, fixIEEE } from '@draw-house/common/dist/utils';
import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { Box3, Vector3 } from 'three';
import { useWalls, WallsStore } from './useWalls';
import { getVector2Distance } from '../utils/helpers';
import { useLevels } from './useLevels/store';
import { loadGltf } from '../utils/loadGltf';
import { calculateFurnitureYPosition } from '../utils/calculateFurnitureYPosition';
import { useSelectedItem } from './useSelectedItem';

type Store = {
  tempWallFurniture: null | {
    targetWallId: WallId;
    needToStopAfterFirstSet: boolean;
    isSelectedFromCatalog: boolean;
    furniture: WallsStore['walls'][number]['furnitures'][number];
    startOnWallCoordinateX: number | null;
    startOnWallCoordinateY: NonNegative | null;
    isOnWall: boolean;
  };
};

export const useTempWallFurniture = create<Store>(() => ({
  tempWallFurniture: null,
}));

export const setTempWallFurnitureCoordinate = async (id: WallId, x: number, y: number | null) => {
  const { tempWallFurniture } = useTempWallFurniture.getState();
  const { walls } = useWalls.getState();
  const { levels } = useLevels.getState();
  const { selectedItem } = useSelectedItem.getState();

  if(isNull(tempWallFurniture)) {
    return;
  }

  const { position, levelId } = getNotUndefined(walls.find(e => e.id === id), 'This should never happen. |y2k9pk|');
  const wallLength = getVector2Distance(position.start, position.end);
  const { height } = getNotUndefined(levels.find(e => e.id === levelId), 'Something went wrong. |vtq369|');

  let modelHeight: number | null = null;

  const needsAutoYCoordinate = (
    false
      || isNull(selectedItem)
      || selectedItem.type !== 'wallFurniture'
      || selectedItem.id !== tempWallFurniture.furniture.id
      || selectedItem.mode !== 'move'
  );

  if(isNull(y) && needsAutoYCoordinate === true) {
    if(tempWallFurniture.furniture.type === 'window') {
      try {
        const { scene } = await loadGltf(tempWallFurniture.furniture.url);
        modelHeight = new Box3().setFromObject(scene).getSize(new Vector3()).y;
      } catch(e) {
        console.warn('Failed to load model |fc87ld|');
      }
    }
  }

  const calculatedWallY = (
    isNull(y) && needsAutoYCoordinate === true
      ? await calculateFurnitureYPosition(height, tempWallFurniture.furniture.type, modelHeight)
      : isNull(y)
        ? tempWallFurniture.furniture.onWallCoordinateY
        : y + height / 2
  );

  useTempWallFurniture.setState({
    tempWallFurniture: {
      targetWallId: id,
      needToStopAfterFirstSet: tempWallFurniture.needToStopAfterFirstSet,
      isSelectedFromCatalog: tempWallFurniture.isSelectedFromCatalog,
      isOnWall: true,
      furniture: {
        ...tempWallFurniture.furniture,
        onWallCoordinateX: fixIEEE(clamp(-wallLength / 2, x, wallLength / 2)),
        onWallCoordinateY: NonNegative(fixIEEE(clamp(0, calculatedWallY, height))),
      },
      startOnWallCoordinateX: (
        !isNull(tempWallFurniture.startOnWallCoordinateX)
          ? tempWallFurniture.startOnWallCoordinateX
          : tempWallFurniture.furniture.onWallCoordinateX
      ),
      startOnWallCoordinateY: (
        !isNull(tempWallFurniture.startOnWallCoordinateY)
          ? tempWallFurniture.startOnWallCoordinateY
          : tempWallFurniture.furniture.onWallCoordinateY
      ),
    },
  });
};

export const setTempWallFurnitureIsOnWall = (isOnWall: boolean) => {
  const { tempWallFurniture } = useTempWallFurniture.getState();

  if(isNull(tempWallFurniture)) {
    return;
  }

  useTempWallFurniture.setState({
    tempWallFurniture: {
      ...tempWallFurniture,
      isOnWall,
    },
  });
};
