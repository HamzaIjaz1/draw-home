import { create } from 'zustand';
import { getNotUndefined } from '@arthurka/ts-utils';
import { useR3FDataResolved } from './useR3FData';
import { useLevels } from './useLevels/store';

type Store = {
  cameraElevationDiff: number;
};

export const useCameraElevationDiff = create<Store>(() => ({
  cameraElevationDiff: 10,
}));

export const updateCameraElevationDiff = () => {
  const { levels } = useLevels.getState();
  const { camera } = useR3FDataResolved.getState();

  const { elevation } = getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |k75j0l|');

  useCameraElevationDiff.setState({
    cameraElevationDiff: camera.position.y - elevation,
  });
};
