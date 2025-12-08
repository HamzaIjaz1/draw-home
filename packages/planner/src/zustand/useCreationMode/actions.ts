import { getNotUndefined, isArrayIncludes, isNull } from '@arthurka/ts-utils';
import assert from 'assert';
import { cutOffLastLetter, generateUUID } from '@draw-house/common/dist/utils';
import { NonNegative, WallFurnitureId, WallId } from '@draw-house/common/dist/brands';
import { Box3, Vector3 } from 'three';
import { usePopUpToolbar } from '../usePopUpToolbar';
import { useTempWallFurniture } from '../useTempWallFurniture';
import { addWallFurniture, useWalls } from '../useWalls';
import { furnitureCreationModes, useCreationMode } from './store';
import { getFurnitureWallY } from '../../utils/furnitureHelpers';
import { useLevels } from '../useLevels/store';
import { dispatchInfoPanelEvent } from '../../utils/dispatchInfoPanelEvent';
import { loadGltf } from '../../utils/loadGltf';
import { calculateFurnitureYPosition } from '../../utils/calculateFurnitureYPosition';
import { useIsMoving3DModel } from '../useIsMoving3DModel';
import { useSelectedItem } from '../useSelectedItem';

export const createWallFurnitureFromTempWallFurniture = () => {
  const { tempWallFurniture } = useTempWallFurniture.getState();
  assert(!isNull(tempWallFurniture), 'This should never happen. |wlw2tr|');

  addWallFurniture(tempWallFurniture);
  useTempWallFurniture.setState({
    tempWallFurniture: {
      ...tempWallFurniture,
      furniture: {
        ...tempWallFurniture.furniture,
        id: WallFurnitureId(generateUUID()),
      },
    },
  });

  if(tempWallFurniture.needToStopAfterFirstSet === true) {
    useCreationMode.setState({ creationMode: 'pointer' });
  }

  dispatchInfoPanelEvent('first-wall-furniture-added');
};

export const setWallFurnitureCreationMode = async (
  creationMode: typeof furnitureCreationModes[number],
  isSelectedFromCatalog: boolean,
  url: string,
) => {
  const type = cutOffLastLetter(creationMode);
  const { popUpToolbar } = usePopUpToolbar.getState();
  const { levels } = useLevels.getState();
  const { walls } = useWalls.getState();

  let modelHeight: number | null = null;
  if(creationMode === 'windows') {
    try {
      const { scene } = await loadGltf(url);

      modelHeight = new Box3().setFromObject(scene).getSize(new Vector3()).y;
    } catch(e) {
      console.warn('Failed to load model |hh0l1w|');
    }
  }

  const height = (() => {
    if(isNull(popUpToolbar)) {
      return null;
    }
    assert(popUpToolbar.type === 'wall', 'This should never happen. |yk4is7|');

    const { levelId } = getNotUndefined(walls.find(e => e.id === popUpToolbar.id), 'Something went wrong. |9be45v|');
    const { height } = getNotUndefined(levels.find(e => e.id === levelId), 'Something went wrong. |fv8l2g|');

    return height;
  })();
  const id = WallFurnitureId(generateUUID());

  useTempWallFurniture.setState({
    tempWallFurniture: {
      targetWallId: !isNull(popUpToolbar) ? popUpToolbar.id : WallId(generateUUID()),
      needToStopAfterFirstSet: true,
      isSelectedFromCatalog,
      isOnWall: false,
      furniture: {
        id,
        isFlippedHorizontal: false,
        isMirrored: false,
        isHidden: false,
        onWallCoordinateX: !isNull(popUpToolbar) ? popUpToolbar.onWallCoordinateX : 0,
        onWallCoordinateY: (
          isNull(height)
            ? NonNegative(0)
            : creationMode === 'windows'
              ? await calculateFurnitureYPosition(height, type, modelHeight)
              : getFurnitureWallY(height)[type]
        ),
        type,
        url,
        width: null,
        height: null,
        depth: null,
        overrideMaterials: null,
      },
      startOnWallCoordinateX: null,
      startOnWallCoordinateY: null,
    },
  });
  useCreationMode.setState({ creationMode });
  if(!isNull(popUpToolbar)) {
    createWallFurnitureFromTempWallFurniture();
  }
  useSelectedItem.setState({
    selectedItem: {
      type: 'wallFurniture',
      id,
      mode: 'selected',
    },
  });
};

export const duplicateWallFurniture = (withRemoveOriginalFurniture: boolean) => {
  const { popUpToolbar } = usePopUpToolbar.getState();
  const { walls } = useWalls.getState();

  assert(!isNull(popUpToolbar), 'This should never happen. |pe2x18|');
  const { type } = popUpToolbar;
  assert(isArrayIncludes(furnitureCreationModes.map(cutOffLastLetter), type), 'This should never happen. |s5s7p7|');

  const { targetWallId, furniture } = getNotUndefined(
    walls
      .flatMap(({ id, furnitures }) => (
        furnitures.map(e => ({
          targetWallId: id,
          furniture: e,
        }))
      ))
      .find(e => e.furniture.id === popUpToolbar.id),
    'This should never happen. |9q3a06|',
  );

  useTempWallFurniture.setState({
    tempWallFurniture: {
      targetWallId,
      needToStopAfterFirstSet: withRemoveOriginalFurniture === true,
      isSelectedFromCatalog: false,
      isOnWall: true,
      furniture: {
        id: withRemoveOriginalFurniture === true ? furniture.id : WallFurnitureId(generateUUID()),
        onWallCoordinateX: furniture.onWallCoordinateX,
        onWallCoordinateY: furniture.onWallCoordinateY,
        isFlippedHorizontal: furniture.isFlippedHorizontal,
        isMirrored: furniture.isMirrored,
        isHidden: furniture.isHidden,
        type,
        url: furniture.url,
        width: furniture.width,
        height: furniture.height,
        depth: furniture.depth,
        overrideMaterials: furniture.overrideMaterials,
      },
      startOnWallCoordinateX: null,
      startOnWallCoordinateY: null,
    },
  });
  useCreationMode.setState({ creationMode: `${type}s` });
};

export const finishFurnitureCreationMode = () => {
  const { creationMode } = useCreationMode.getState();

  if(isArrayIncludes(furnitureCreationModes, creationMode)) {
    useCreationMode.setState({ creationMode: 'pointer' });
  }
  useIsMoving3DModel.setState({ isMoving3DModel: false });
};
