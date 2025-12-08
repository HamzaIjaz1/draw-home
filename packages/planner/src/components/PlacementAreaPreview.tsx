import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { Camera, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { DoubleSide, Group, Plane, Raycaster, Vector2, Vector3 } from 'three';
import { clamp } from '@draw-house/common/dist/utils';
import { useIsFirstPersonView, useLevels, useSlideUpMenuLvl1, useSlideUpMenuLvl2 } from '../zustand';
import { floorSquareSize } from '../constants';

export const getClampedViewportPointPlaneIntersection = (camera: Camera, elevation: number, floorSquareSize: number) => {
  const raycaster = new Raycaster();
  const normal = new Vector3(0, 1, 0);
  const pointOnPlane = new Vector3(0, elevation, 0);
  const plane = new Plane().setFromNormalAndCoplanarPoint(normal, pointOnPlane);
  const viewportPoint = new Vector2(0, -0.7); // center of the screen, bottom
  raycaster.setFromCamera(viewportPoint, camera);

  const intersection = new Vector3();
  const intersects = raycaster.ray.intersectPlane(plane, intersection);

  if(isNull(intersects)) {
    return null;
  }

  const clampedX = clamp(-floorSquareSize / 2, intersection.x, floorSquareSize / 2);
  const clampedZ = clamp(-floorSquareSize / 2, intersection.z, floorSquareSize / 2);

  return new Vector3(clampedX, intersection.y, clampedZ);
};

export const PlacementAreaPreview: React.FC = () => {
  const { levels } = useLevels();
  const { camera } = useThree();
  const { elevation } = getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |v32cms|');
  const { slideUpMenuLvl1 } = useSlideUpMenuLvl1();
  const { slideUpMenuLvl2 } = useSlideUpMenuLvl2();
  const { isFirstPersonView } = useIsFirstPersonView();

  const groupRef = useRef<Group>(null);
  const circleRadius = 0.32;

  useFrame(() => {
    const cameraIntersectionWithPlane = getClampedViewportPointPlaneIntersection(camera, elevation, floorSquareSize);
    if(!isNull(cameraIntersectionWithPlane) && !isNull(groupRef.current)) {
      groupRef.current.position.set(cameraIntersectionWithPlane.x, elevation, cameraIntersectionWithPlane.z);
    }
  });

  return (
    true
      && isFirstPersonView === false
      && (
        false
          || slideUpMenuLvl1.type === 'catalog' && slideUpMenuLvl1.isOpened === true
          || slideUpMenuLvl2.type === 'myAssets' && slideUpMenuLvl2.isOpened === true
      )
  ) && (
    <group ref={groupRef} userData={{ isNotPartOfLevelObjects: true }}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[circleRadius, circleRadius + 0.02, 32]} />
        <meshBasicMaterial color='#fd5631' depthTest={false} transparent side={DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.03, 32]} />
        <meshBasicMaterial color='#fd5631' depthTest={false} transparent side={DoubleSide} />
      </mesh>
    </group>
  );
};
