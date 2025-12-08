import { isNull } from '@arthurka/ts-utils';
import assert from 'assert';
import { useR3FData } from '../../zustand';

export const orbitControlsCameraZoomInOutHotkeyPress = (direction: 'in' | 'out') => {
  const { camera, controls } = useR3FData.getState();
  assert(!isNull(controls) && !isNull(camera), 'Something went wrong. |igo6il|');

  controls.dollyIn(1 + (direction === 'in' ? -1 : 1) * 0.15);
};
