import { getNotUndefined } from '@arthurka/ts-utils';
import { PointerLockControls, useKeyboardControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Vector3 } from 'three';
import { useLevels, useViewMode } from '../zustand';
import { useIsFirstPersonView } from '../zustand/useIsFirstPersonView';
import { useIsMouseControlStarted } from '../zustand/useIsMouseControlStarted';

const SPEED = 8;

export const FirstPersonView: React.FC = () => {
  const [, get] = useKeyboardControls();
  const { camera } = useThree();
  const { levels } = useLevels();
  const { elevation } = getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |l0hyv2|');
  const { isMouseControlStarted } = useIsMouseControlStarted();
  const { viewMode } = useViewMode();
  const { isFirstPersonView } = useIsFirstPersonView();

  camera.position.y = elevation + 1.75;

  useEffect(() => () => {
    document.exitPointerLock?.();
    useIsMouseControlStarted.setState({
      isMouseControlStarted: false,
    });
  }, []);

  useFrame(({ camera }, delta) => {
    if(isMouseControlStarted === false) {
      return;
    }

    const {
      forward = false,
      backward = false,
      left = false,
      right = false,
    } = get();

    const direction = (
      new Vector3()
        .subVectors(
          new Vector3(0, 0, Number(backward) - Number(forward)),
          new Vector3(Number(left) - Number(right), 0, 0),
        )
        .normalize()
        .multiplyScalar(SPEED * delta)
        .applyEuler(camera.rotation)
    );

    camera.position.add(new Vector3(direction.x, 0, direction.z));
  });

  return (
    <PointerLockControls
      onUnlock={() => {
        useIsFirstPersonView.setState({
          isFirstPersonView: false,
        });
        useIsMouseControlStarted.setState({
          isMouseControlStarted: false,
        });
      }}
      onLock={() => {
        if(viewMode === '3D' && isFirstPersonView === true) {
          useIsMouseControlStarted.setState({
            isMouseControlStarted: true,
          });
        }
      }}
    />
  );
};
