import { isNull } from '@arthurka/ts-utils';
import { useTempWallFurniture, useTempWalls, useWallMover } from '../zustand';
import { useIsMoving3DModel } from '../zustand/useIsMoving3DModel';
import { useTouchScreen } from '../zustand/useTouchScreen';

export const useActiveActionCheck = () => {
  const tempWallsLengthGreaterZero = useTempWalls(s => s.tempWalls.length > 0);
  const wallMoverExists = useWallMover(s => !isNull(s.wallMover));
  const { isTouchScreen } = useTouchScreen();
  const { isMoving3DModel } = useIsMoving3DModel();
  const tempWallFurnitureNotNull = useTempWallFurniture(s => !isNull(s.tempWallFurniture));

  return {
    isActiveActionEnabled: (
      false
        || wallMoverExists === true
        || isMoving3DModel === true
        || isTouchScreen === true && tempWallFurnitureNotNull === true
        || tempWallsLengthGreaterZero === true
    ),
  };
};
