import { OrbitControls } from '@react-three/drei';
import { MOUSE, PerspectiveCamera, TOUCH, Vector2 } from 'three';
import { NODE_ENV } from '@draw-house/common/dist/envVariables/public';
import { useEffect, useRef } from 'react';
import assert from 'assert';
import type { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { useThree } from '@react-three/fiber';
import { useCreationMode, useLevels, usePopUpToolbar, useR3FData, useViewMode } from '../zustand';
import { useActiveActionCheck } from '../customHooks';
import { useCameraElevationDiff } from '../zustand/useCameraElevationDiff';
import { MousePositionOnWindowStore, useMousePositionOnWindow } from '../zustand/useMousePositionOnWindow';
import { useIsCameraAction } from '../zustand/useIsCameraAction';
import { useTouchScreen } from '../zustand/useTouchScreen';
import { useZoomVisibleSceneObjectsIntoView } from '../customHooks/useZoomVisibleSceneObjectsIntoView';
import { cameraTargetY } from '../constants';

export const Controls: React.FC = () => {
  const { camera } = useThree();
  const { viewMode } = useViewMode();
  const { creationMode } = useCreationMode();
  const { isTouchScreen } = useTouchScreen();
  const { isActiveActionEnabled } = useActiveActionCheck();
  const { levels } = useLevels();
  const { cameraElevationDiff } = useCameraElevationDiff();
  const isTargetWallOpenedInPopUpToolbar = usePopUpToolbar(s => !isNull(s.popUpToolbar) && s.popUpToolbar.type === 'wall');

  useZoomVisibleSceneObjectsIntoView();

  const ref = useRef<ThreeOrbitControls>(null);

  const { elevation } = getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |jc6vgx|');

  useEffect(() => {
    assert(!isNull(ref.current), 'This should never happen. |c3b7m2|');

    if(ref.current.object instanceof PerspectiveCamera) {
      ref.current.object.position.y = elevation + cameraElevationDiff;
    }
  }, [elevation, cameraElevationDiff]);

  useEffect(() => {
    useR3FData.setState({ controls: ref.current });
  }, [camera]);

  const isControlsTurnedOff = (
    false
      || isActiveActionEnabled === true
      || isTouchScreen === true && creationMode === 'walls'
  );

  const cameraInteractionData = useRef<{ counter: number; isStateSet: boolean; startPosition: MousePositionOnWindowStore['mousePositionOnWindow'] }>({
    counter: 0,
    isStateSet: false,
    startPosition: { x: 0, y: 0 },
  });

  return (
    <OrbitControls
      ref={ref}
      zoomToCursor
      makeDefault
      enableDamping={isControlsTurnedOff === false}
      rotateSpeed={isControlsTurnedOff === true ? 0 : 1}
      dampingFactor={isControlsTurnedOff === true ? 0 : 0.2}
      target-y={elevation + cameraTargetY}
      screenSpacePanning={false}
      maxPolarAngle={
        viewMode === '2D'
          ? 0
          : NODE_ENV !== 'production'
            ? undefined
            : Math.PI / 2
      }
      mouseButtons={{
        LEFT: isControlsTurnedOff === true || creationMode === 'walls' || isTargetWallOpenedInPopUpToolbar === true ? undefined : MOUSE.ROTATE,
        RIGHT: MOUSE.PAN,
        MIDDLE: MOUSE.PAN,
      }}
      touches={{
        ONE: isControlsTurnedOff === true || creationMode === 'walls' || isTargetWallOpenedInPopUpToolbar === true ? undefined : TOUCH.PAN,
        TWO: TOUCH.DOLLY_ROTATE,
      }}
      onStart={() => {
        const { mousePositionOnWindow } = useMousePositionOnWindow.getState();

        cameraInteractionData.current.counter++;
        cameraInteractionData.current.startPosition = mousePositionOnWindow;
      }}
      onChange={() => {
        const { mousePositionOnWindow } = useMousePositionOnWindow.getState();

        const mouseMoveDistance = new Vector2().subVectors(cameraInteractionData.current.startPosition, mousePositionOnWindow).length();

        if(cameraInteractionData.current.counter > 0 && cameraInteractionData.current.isStateSet === false && mouseMoveDistance > 5) {
          cameraInteractionData.current.isStateSet = true;
          useIsCameraAction.setState({ isCameraAction: true });
        }
      }}
      onEnd={() => {
        cameraInteractionData.current.counter--;
        if(cameraInteractionData.current.counter <= 0) {
          cameraInteractionData.current = {
            counter: 0,
            isStateSet: false,
            startPosition: { x: 0, y: 0 },
          };
          useIsCameraAction.setState({ isCameraAction: false });
        }
      }}
    />
  );
};
