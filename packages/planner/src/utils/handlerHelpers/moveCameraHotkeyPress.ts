import { isNull } from '@arthurka/ts-utils';
import assert from 'assert';
import { Vector3 } from 'three';
import { useR3FData } from '../../zustand';

export const moveCameraHotkeyPress = (direction: 'forward' | 'backward' | 'left' | 'right') => {
  const { camera, controls } = useR3FData.getState();
  assert(!isNull(controls) && !isNull(camera), 'Something went wrong. |r2i8k0|');

  const [dx, dz] = ({
    left: [-1, 0],
    right: [1, 0],
    forward: [0, 1],
    backward: [0, -1],
  } satisfies Record<typeof direction, [number, number]>)[direction];

  const right = new Vector3();
  const dir = new Vector3();

  camera.getWorldDirection(dir);
  dir.y = 0;
  dir.normalize();
  right.crossVectors(dir, new Vector3(0, 1, 0)).normalize();

  const moveVec = new Vector3().addScaledVector(right, dx * 1.5).addScaledVector(dir, dz * 1.5);

  camera.position.add(moveVec);
  controls.target.add(moveVec);
};
