import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { Suspense, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box3, Camera, Group, Plane, Raycaster, Vector2, Vector3 } from 'three';
import { useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { clamp } from '@draw-house/common/dist/utils';
import { useLevels, useTempWallFurniture } from '../../../zustand';
import { getClampedViewportPointPlaneIntersection } from '../../PlacementAreaPreview';
import { PreloaderCircle } from '../../PreloaderCircle';
import { floorSquareSize } from '../../../constants';

const getClampedPointerOnPlanePosition = (elevation: number, pointer: Vector2, camera: Camera, floorSquareSize: number) => {
  const raycaster = new Raycaster();
  const normal = new Vector3(0, 1, 0);
  const pointOnPlane = new Vector3(0, elevation, 0);
  const plane = new Plane().setFromNormalAndCoplanarPoint(normal, pointOnPlane);
  raycaster.setFromCamera(pointer, camera);

  const intersection = new Vector3();
  const intersects = raycaster.ray.intersectPlane(plane, intersection);

  if(isNull(intersects)) {
    return null;
  }

  const clampedX = clamp(-floorSquareSize / 2, intersection.x, floorSquareSize / 2);
  const clampedZ = clamp(-floorSquareSize / 2, intersection.z, floorSquareSize / 2);

  return new Vector3(clampedX, intersection.y, clampedZ);
};

type _TempWallFurniturePreviewProps = {
  url: string;
  elevation: number;
  placementAreaPosition: Vector3 | null;
  isSelectedFromCatalog: boolean;
};

const _TempWallFurniturePreview = ({ url, elevation, placementAreaPosition, isSelectedFromCatalog }: _TempWallFurniturePreviewProps) => {
  const { scene } = useGLTF(url);
  const ref = useRef<Group>(null);
  const { camera, pointer } = useThree();
  const isInteractionTriggeredRef = useRef(false);

  const { center, size } = useMemo(() => {
    const clonedScene = clone(scene);
    const box = new Box3().setFromObject(clonedScene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    return { center, size };
  }, [scene]);

  useFrame(() => {
    if(isNull(ref.current)) {
      return;
    }

    const position = getClampedPointerOnPlanePosition(elevation, pointer, camera, floorSquareSize);
    if(isInteractionTriggeredRef.current === true || isSelectedFromCatalog === false) {
      if(isNull(position)) {
        return;
      }
      ref.current.position.set(position.x, elevation, position.z);
    }
  });

  return (
    <group
      ref={ref}
      position={isNull(placementAreaPosition) ? new Vector3(0, elevation, 0) : [placementAreaPosition.x, elevation, placementAreaPosition.z]}
      onPointerEnter={() => {
        isInteractionTriggeredRef.current = true;
      }}
    >
      <group position={new Vector3(-center.x, 0, -center.z)}>
        <primitive object={scene} />
      </group>
      <mesh position={[0, size.y / 2, 0]}>
        <boxGeometry args={[size.x + 0.01, size.y + 0.01, size.z + 0.01]} />
        <meshBasicMaterial color='red' transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

export const TempWallFurniturePreview: React.FC = () => {
  const { camera, pointer } = useThree();
  const { levels } = useLevels();
  const { elevation } = getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |5jrv5o|');
  const placementAreaPosition = getClampedViewportPointPlaneIntersection(camera, elevation, floorSquareSize);
  const { tempWallFurniture } = useTempWallFurniture();

  const position = (
    !isNull(tempWallFurniture) && tempWallFurniture.isSelectedFromCatalog === false
      ? getClampedPointerOnPlanePosition(elevation, pointer, camera, floorSquareSize)
      : placementAreaPosition
  );

  return !isNull(tempWallFurniture) && tempWallFurniture.isOnWall === false && (
    <Suspense fallback={<PreloaderCircle placementAreaPosition={position} elevation={elevation} />}>
      <_TempWallFurniturePreview
        placementAreaPosition={position}
        url={tempWallFurniture.furniture.url}
        elevation={elevation}
        isSelectedFromCatalog={tempWallFurniture.isSelectedFromCatalog}
      />
    </Suspense>
  );
};
