import { Object3D, Quaternion, Vector3 } from 'three';
import { create } from 'zustand';
import { isNull } from '@arthurka/ts-utils';
import { useNewCustomModel } from './useNewCustomModel';
import { useGlobalSettings } from './useGlobalSettings';

type Store = {
  newCustomModelPosition: Vector3;
  lastSnapWorldPosition: Vector3 | null;
};

export const useNewCustomModelPosition = create<Store>(() => ({
  newCustomModelPosition: new Vector3(),
  lastSnapWorldPosition: null,
}));

export const commitNewCustomModelSnapPosition = (drag: Object3D, keepY: number) => {
  const snapWorldPos = new Vector3();
  const quaternion = new Quaternion();
  const committingEps = 1e-4;

  drag.getWorldPosition(snapWorldPos);
  drag.getWorldQuaternion(quaternion);

  snapWorldPos.y = keepY;

  const { lastSnapWorldPosition, newCustomModelPosition } = useNewCustomModelPosition.getState();
  const { snapDistanceFactor } = useGlobalSettings.getState();

  const snapDistance = snapDistanceFactor / 10;

  if(!isNull(lastSnapWorldPosition)) {
    const dx = newCustomModelPosition.x - lastSnapWorldPosition.x;
    const dz = newCustomModelPosition.z - lastSnapWorldPosition.z;
    const planarDist = Math.hypot(dx, dz);

    if(planarDist > snapDistance) {
      useNewCustomModelPosition.setState({
        lastSnapWorldPosition: null,
      });
      return;
    }
  }

  const samePos = (
    true
      && !isNull(lastSnapWorldPosition)
      && Math.abs(lastSnapWorldPosition.x - snapWorldPos.x) < committingEps
      && Math.abs(lastSnapWorldPosition.y - snapWorldPos.y) < committingEps
      && Math.abs(lastSnapWorldPosition.z - snapWorldPos.z) < committingEps
  );

  if(samePos === false) {
    useNewCustomModelPosition.setState({
      lastSnapWorldPosition: snapWorldPos.clone(),
    });
  }

  const { newCustomModel } = useNewCustomModel.getState();

  if(!isNull(newCustomModel)) {
    const sameQuat = (
      true
        && Math.abs(newCustomModel.quaternion.x - quaternion.x) < committingEps
        && Math.abs(newCustomModel.quaternion.y - quaternion.y) < committingEps
        && Math.abs(newCustomModel.quaternion.z - quaternion.z) < committingEps
        && Math.abs(newCustomModel.quaternion.w - quaternion.w) < committingEps
    );

    if(sameQuat === false) {
      useNewCustomModel.setState({
        newCustomModel: {
          ...newCustomModel,
          quaternion,
        },
      });
    }
  }
};

export const clearNewCustomModelSnapWorldPosition = () => {
  const { lastSnapWorldPosition } = useNewCustomModelPosition.getState();

  if(!isNull(lastSnapWorldPosition)) {
    useNewCustomModelPosition.setState({
      lastSnapWorldPosition: null,
    });
  }
};
