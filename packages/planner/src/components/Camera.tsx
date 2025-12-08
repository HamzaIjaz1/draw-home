import { OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { OrthographicCamera as ThreeOrthographicCamera, PerspectiveCamera as ThreePerspectiveCamera, Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from 'three-stdlib';
import { isNull } from '@arthurka/ts-utils';
import { clamp } from '@draw-house/common/dist/utils';
import { Controls } from './Controls';
import { useGlobalSettings, useViewMode, ViewModeStore } from '../zustand';
import { floorSquareSize, perspectiveCameraY } from '../constants';
import { useIsFirstPersonView } from '../zustand/useIsFirstPersonView';
import { FirstPersonView } from './FirstPersonView';
import { useStrapiAppConfigResolved } from '../zustand/useStrapiAppConfig';

export const Camera: React.FC = () => {
  const { viewMode } = useViewMode();
  const { isFirstPersonView } = useIsFirstPersonView();
  const isOutlinesTurnedOn = useGlobalSettings(s => s.isOutlinesTurnedOn);
  const { strapiAppConfig } = useStrapiAppConfigResolved();
  const { controls } = useThree();

  const perspectiveCameraRef = useRef<ThreePerspectiveCamera>(null);
  const orthographicCameraRef = useRef<ThreeOrthographicCamera>(null);
  const dataBeforeSwitchRef = useRef<null | {
    target: Vector3;
    azimuthAngle: number;
    polarAngle: number;
    distance: number;
    zoom: number;
    sourceViewMode: ViewModeStore['viewMode'];
    previousViewMode: ViewModeStore['viewMode'];
  }>(null);

  useEffect(() => {
    if(!isNull(controls) && controls instanceof OrbitControls) {
      const unsubscribe = useViewMode.subscribe((state, prevState) => {
        controls.update();

        const azimuthAngle = controls.getAzimuthalAngle();
        let polarAngle = controls.getPolarAngle();
        const distance = controls.object.position.distanceTo(controls.target);
        const zoom = controls.object instanceof ThreeOrthographicCamera ? controls.object.zoom : 50;

        if(Number.isNaN(azimuthAngle) || Number.isNaN(polarAngle) || Number.isNaN(distance) || Number.isNaN(zoom)) {
          console.warn('Something went wrong. NaN in controls |z3kr0u|');
          return;
        }
        if(prevState.viewMode === '2D') {
          polarAngle = isNull(dataBeforeSwitchRef.current) ? Math.PI / 4 : dataBeforeSwitchRef.current.polarAngle;
        }

        dataBeforeSwitchRef.current = {
          target: controls.target.clone(),
          azimuthAngle,
          polarAngle,
          distance,
          zoom,
          sourceViewMode: state.viewMode,
          previousViewMode: prevState.viewMode,
        };
      });

      return () => {
        unsubscribe();
      };
    }
  }, [controls]);

  useEffect(() => {
    if(!isNull(controls) && controls instanceof OrbitControls) {
      if(isNull(orthographicCameraRef.current) || isNull(perspectiveCameraRef.current) || isNull(dataBeforeSwitchRef.current)) {
        return;
      }

      const originalEnableDamping = controls.enableDamping;
      controls.enableDamping = false;

      const savedData = dataBeforeSwitchRef.current;
      const target = savedData.target;
      const azimuthAngle = savedData.azimuthAngle;
      const polarAngle = savedData.polarAngle;

      controls.target.copy(target);

      if(savedData.sourceViewMode === '3D') {
        let restoredDistance: number;

        if(savedData.previousViewMode === '2D') {
          const zoom = savedData.zoom;
          const orthoFrustumHeight = orthographicCameraRef.current.top - orthographicCameraRef.current.bottom;
          const fovRad = perspectiveCameraRef.current.fov * Math.PI / 180;

          restoredDistance = orthoFrustumHeight / (2 * zoom * Math.tan(fovRad / 2));
          restoredDistance = Math.max(0.1, Math.min(restoredDistance, 10000));
        } else {
          restoredDistance = savedData.distance;
        }

        const horizontalDistance = restoredDistance * Math.sin(polarAngle);
        const x = target.x + horizontalDistance * Math.sin(azimuthAngle);
        const z = target.z + horizontalDistance * Math.cos(azimuthAngle);
        const y = target.y + restoredDistance * Math.cos(polarAngle);

        perspectiveCameraRef.current.position.set(x, y, z);

        controls.update();
        controls.setAzimuthalAngle(azimuthAngle);
        controls.setPolarAngle(polarAngle);
      }

      if(savedData.sourceViewMode === '2D') {
        const distance = savedData.distance;

        orthographicCameraRef.current.position.set(target.x, perspectiveCameraY, target.z);

        const fovRad = perspectiveCameraRef.current.fov * Math.PI / 180;
        const visibleHeight = 2 * distance * Math.tan(fovRad / 2);
        const orthoFrustumHeight = orthographicCameraRef.current.top - orthographicCameraRef.current.bottom;

        const zoom = clamp(0.0001, orthoFrustumHeight / visibleHeight, 10000);
        orthographicCameraRef.current.zoom = zoom;

        controls.update();
        controls.setAzimuthalAngle(azimuthAngle);
      }

      controls.update();
      controls.enableDamping = originalEnableDamping;
    }
  }, [controls]);

  return (
    <>
      <OrthographicCamera
        ref={orthographicCameraRef}
        makeDefault={viewMode === '2D'}
        visible={viewMode === '2D'}
        position={[0, floorSquareSize, 0]}
        zoom={50}
        far={isOutlinesTurnedOn === true && strapiAppConfig.enableOutlinesFeature === true ? 200 : 2000}
        near={isOutlinesTurnedOn === true && strapiAppConfig.enableOutlinesFeature === true ? 10 : 0.1}
      />
      <PerspectiveCamera
        ref={perspectiveCameraRef}
        makeDefault={viewMode !== '2D'}
        visible={viewMode !== '2D'}
        position={[5, perspectiveCameraY, 15]}
        far={isOutlinesTurnedOn === true && strapiAppConfig.enableOutlinesFeature === true ? 200 : 2000}
      />
      {isFirstPersonView === false && <Controls />}
      {isFirstPersonView === true && viewMode !== '2D' && <FirstPersonView />}
    </>
  );
};
