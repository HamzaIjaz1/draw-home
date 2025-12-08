import { Cloud, Clouds, Environment, Sky } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';
import { IS_EASY_GRAPHICS_MODE } from '@draw-house/common/dist/envVariables/public';
import { SuspenseHOC } from './SuspenseHOC';
import { useViewMode } from '../zustand';
import { useIsFloorGridShown } from '../customHooks';

const SkyLandscape: React.FC = SuspenseHOC(() => {
  const { isFloorGridShown } = useIsFloorGridShown();

  return isFloorGridShown === false && (
    <group userData={{ isNotPartOfLevelObjects: true }}>
      <Sky sunPosition={[20, 10, 30]} inclination={0} azimuth={0.56} distance={450000} />
      <Clouds material={MeshStandardMaterial}>
        <Cloud
          seed={3}
          concentrate='outside'
          segments={300}
          bounds={[400, 200, 400]}
          volume={100}
          opacity={0.8}
        />
      </Clouds>
    </group>
  );
});

export const CustomEnvironment: React.FC = () => {
  const { viewMode } = useViewMode();

  return (
    <>
      <Environment files='/env.hdr' />
      <SkyLandscape />
      {
        IS_EASY_GRAPHICS_MODE === false && (
          <directionalLight
            position={[50, 40, 50]}
            intensity={2}
            castShadow={viewMode === '3D'}
            // Shouldn't be bigger because to problems with performance
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.5}
            shadow-camera-far={200}
            shadow-camera-left={-80}
            shadow-camera-right={80}
            shadow-camera-top={120}
            shadow-camera-bottom={-80}
            shadow-bias={-0.00001}
            shadow-normalBias={0.2} // Removes shadow lines from light on roofs
          />
        )
      }
    </>
  );
};
