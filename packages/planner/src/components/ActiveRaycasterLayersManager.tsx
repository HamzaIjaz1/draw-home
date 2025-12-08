import { isNull } from '@arthurka/ts-utils';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { useCreationMode, useIsFirstPersonView } from '../zustand';
import { useNewCustomModel } from '../zustand/useNewCustomModel';
import { useIsCameraAction } from '../zustand/useIsCameraAction';

export const DEFAULT_LAYER = 0;
export const GHOST_MODE_LAYER = 1;
export const OUTLINE_LAYER = 2;

export const ActiveRaycasterLayersManager = () => {
  const { creationMode } = useCreationMode();
  const { newCustomModel } = useNewCustomModel();
  const { isCameraAction } = useIsCameraAction();
  const { isFirstPersonView } = useIsFirstPersonView();
  const { raycaster } = useThree();

  const isGhost = !isNull(newCustomModel) || creationMode === 'stairs';

  useEffect(() => {
    raycaster.layers.disableAll();

    if(isFirstPersonView === true || isCameraAction === true) {
      return;
    }

    if(isGhost === true) {
      raycaster.layers.enable(GHOST_MODE_LAYER);
    } else {
      raycaster.layers.enable(DEFAULT_LAYER);
    }
  }, [isFirstPersonView, isCameraAction, isGhost, raycaster]);

  return null;
};
