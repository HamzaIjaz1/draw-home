import { isNull } from '@arthurka/ts-utils';
import assert from 'assert';
import { Spherical } from 'three';
import { useR3FData } from '../../zustand';

export const rotateCameraHotkeyPress = (direction: 'up' | 'down' | 'left' | 'right') => {
  const { camera, controls } = useR3FData.getState();
  assert(!isNull(controls) && !isNull(camera), 'Something went wrong. |941ec6|');

  const [dTheta, dPhi] = ({
    left: [-1, 0],
    right: [1, 0],
    up: [0, -1],
    down: [0, 1],
  } satisfies Record<typeof direction, [number, number]>)[direction];

  const offset = camera.position.clone().sub(controls.target);
  const spherical = new Spherical().setFromVector3(offset);

  spherical.theta += dTheta * 0.3;
  spherical.phi += dPhi * 0.1;

  spherical.makeSafe();

  offset.setFromSpherical(spherical);
  camera.position.copy(controls.target).add(offset);

  camera.lookAt(controls.target);
};
