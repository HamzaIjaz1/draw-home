import { create } from 'zustand';
import { RoofDormerId, RoofId } from '@draw-house/common/dist/brands';
import { getNotUndefined, isNull, isUndefined } from '@arthurka/ts-utils';
import { generateUUID } from '@draw-house/common/dist/utils';
import { Quaternion, Vector3 } from 'three';
import { RoofsStore, useRoofs } from './useRoofs/store';

type Store = {
  tempRoofDormer: null | {
    targetRoofId: RoofId | null;
    needToStopAfterFirstSet: boolean;
    isSelectedFromCatalog: boolean;
    dormer: RoofsStore['roofs'][number]['roofData']['dormers'][number];
    startPosition: Vector3 | null;
    startRotation: Quaternion | null;
    isOnRoof: boolean;
  };
};

export const useTempRoofDormer = create<Store>(() => ({
  tempRoofDormer: null,
}));

export const setTempRoofDormerTransform = (
  roofId: RoofId,
  position: Vector3,
  rotation: Quaternion,
  isWithinBounds: boolean,
) => {
  const { tempRoofDormer } = useTempRoofDormer.getState();

  if(isNull(tempRoofDormer)) {
    return;
  }

  useTempRoofDormer.setState({
    tempRoofDormer: {
      targetRoofId: roofId,
      needToStopAfterFirstSet: tempRoofDormer.needToStopAfterFirstSet,
      isSelectedFromCatalog: tempRoofDormer.isSelectedFromCatalog,
      isOnRoof: isWithinBounds,
      dormer: {
        ...tempRoofDormer.dormer,
        position: position.clone(),
        rotation: rotation.clone(),
      },
      startPosition: (
        !isNull(tempRoofDormer.startPosition)
          ? tempRoofDormer.startPosition
          : tempRoofDormer.dormer.position
      ),
      startRotation: (
        !isNull(tempRoofDormer.startRotation)
          ? tempRoofDormer.startRotation
          : tempRoofDormer.dormer.rotation
      ),
    },
  });
};

export const setTempRoofDormerIsOnRoof = (isOnRoof: boolean) => {
  const { tempRoofDormer } = useTempRoofDormer.getState();

  if(isNull(tempRoofDormer)) {
    return;
  }

  useTempRoofDormer.setState({
    tempRoofDormer: {
      ...tempRoofDormer,
      isOnRoof,
    },
  });
};

export const startMovingRoofDormer = (dormer: RoofsStore['roofs'][number]['roofData']['dormers'][number]) => {
  const { roofs } = useRoofs.getState();
  const roof = roofs.find(e => e.roofData.dormers.some(e => e.id === dormer.id));

  useTempRoofDormer.setState({
    tempRoofDormer: {
      targetRoofId: isUndefined(roof) ? null : roof.id,
      needToStopAfterFirstSet: false,
      isSelectedFromCatalog: false,
      isOnRoof: true,
      dormer: {
        ...dormer,
        position: dormer.position.clone(),
        rotation: dormer.rotation.clone(),
      },
      startPosition: dormer.position.clone(),
      startRotation: dormer.rotation.clone(),
    },
  });
};

export const duplicateDormer = (dormerId: RoofDormerId, withRemoveOriginalDormer: boolean) => {
  const { roofs } = useRoofs.getState();

  const roof = getNotUndefined(roofs.find(e => e.roofData.dormers.some(e => e.id === dormerId)), 'This should never happen. |mz6jml|');
  const dormer = getNotUndefined(roof.roofData.dormers.find(e => e.id === dormerId), 'This should never happen. |5p9nso|');

  useTempRoofDormer.setState({
    tempRoofDormer: {
      targetRoofId: roof.id,
      needToStopAfterFirstSet: withRemoveOriginalDormer === true,
      isSelectedFromCatalog: false,
      isOnRoof: true,
      dormer: {
        id: withRemoveOriginalDormer === true ? dormer.id : RoofDormerId(generateUUID()),
        type: dormer.type,
        position: dormer.position.clone(),
        rotation: dormer.rotation.clone(),
        width: dormer.width,
        height: dormer.height,
        depth: dormer.depth,
        isHidden: dormer.isHidden,
        wallIds: null,
      },
      startPosition: dormer.position.clone(),
      startRotation: dormer.rotation.clone(),
    },
  });
};
