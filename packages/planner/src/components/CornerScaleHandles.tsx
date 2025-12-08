import { forwardRef, RefObject, useEffect, useRef, useState } from 'react';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { Camera, DoubleSide, Group, Object3DEventMap, Plane, Raycaster, Vector2, Vector3 } from 'three';
import { CustomModelId, Positive } from '@draw-house/common/dist/brands';
import { isNull } from '@arthurka/ts-utils';
import { useIsMoving3DModel } from '../zustand/useIsMoving3DModel';
import { setAsset2DParams, setCursor } from '../zustand';

const getIntersectionPointOnXZPlane = (clientX: number, clientY: number, camera: Camera, glDomElement: HTMLElement, elevation: number) => {
  const x = (clientX / glDomElement.clientWidth) * 2 - 1;
  const y = -(clientY / glDomElement.clientHeight) * 2 + 1;
  const raycaster = new Raycaster();
  const normal = new Vector3(0, 1, 0); // XZ plane
  const pointOnPlane = new Vector3(0, elevation, 0);

  const dragPlane = new Plane().setFromNormalAndCoplanarPoint(normal, pointOnPlane);
  raycaster.setFromCamera(new Vector2(x, y), camera);
  const intersectionPoint = new Vector3();

  return raycaster.ray.intersectPlane(dragPlane, intersectionPoint);
};

type DraggablePointProps = {
  position: Vector3;
  elevation: number;
  onDrag: (position: Vector3) => void;
  onDragEnd: (position: Vector3) => void;
  onDragStart: (position: Vector3) => void;
  scale: number;
};

const DraggablePoint = forwardRef<Group, DraggablePointProps>(({ position, onDrag, elevation, onDragEnd, onDragStart, scale }, ref) => {
  const [dragging, setDragging] = useState(false);
  const { camera, gl } = useThree();

  const circleRadius = 0.1;
  const centralRingRadius = circleRadius + 0.08;
  const outerRingRadius = centralRingRadius + 0.02;

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();

    setCursor('grabbing');
    useIsMoving3DModel.setState({ isMoving3DModel: true });
    setDragging(true);

    const intersectionPoint = getIntersectionPointOnXZPlane(e.clientX, e.clientY, camera, gl.domElement, elevation);
    if(intersectionPoint) {
      onDragStart(intersectionPoint.clone());
    }
  };

  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if(dragging === false) {
        return;
      }

      const intersectionPoint = getIntersectionPointOnXZPlane(e.clientX, e.clientY, camera, gl.domElement, elevation);
      if(!isNull(intersectionPoint)) {
        onDrag(intersectionPoint.clone());
      }
    };
    const handleGlobalPointerUp = (e: PointerEvent) => {
      setCursor(null);
      useIsMoving3DModel.setState({ isMoving3DModel: false });
      setDragging(false);

      const intersectionPoint = getIntersectionPointOnXZPlane(e.clientX, e.clientY, camera, gl.domElement, elevation);
      if(!isNull(intersectionPoint)) {
        onDragEnd(intersectionPoint.clone());
      }
    };

    if(dragging === true) {
      gl.domElement.addEventListener('pointermove', handleGlobalPointerMove);
      gl.domElement.addEventListener('pointerup', handleGlobalPointerUp);
    }

    return () => {
      gl.domElement.removeEventListener('pointermove', handleGlobalPointerMove);
      gl.domElement.removeEventListener('pointerup', handleGlobalPointerUp);
    };
  }, [dragging, gl, camera, onDrag, elevation, onDragEnd]);

  const cameraBasedGap = 0.001 * camera.position.distanceTo(position);

  return (
    <group
      ref={ref}
      position={[position.x, position.y + cameraBasedGap, position.z]}
      onPointerDown={handlePointerDown}
      onPointerOver={() => {
        setCursor('grab');
      }}
    >
      <group scale={[1, Math.max(1, scale), 1]}>
        <mesh rotation-x={Math.PI / 2}>
          <ringGeometry args={[centralRingRadius, outerRingRadius, 32]} />
          <meshBasicMaterial color='#fd5631' side={DoubleSide} />
        </mesh>
        <mesh rotation-x={Math.PI / 2}>
          <ringGeometry args={[circleRadius, centralRingRadius, 32]} />
          <meshBasicMaterial color='white' transparent opacity={0.4} side={DoubleSide} />
        </mesh>
        <mesh rotation-x={Math.PI / 2}>
          <circleGeometry args={[circleRadius, 32]} />
          <meshBasicMaterial color='#fd5631' side={DoubleSide} />
        </mesh>
      </group>
    </group>
  );
});

type CornerScaleHandlesProps = {
  id: CustomModelId;
  scale: number;
  scaleGroupRef: RefObject<Group<Object3DEventMap>>;
  textureRatio: number;
  assets2DDefaultSize: number;
  elevation: number;
};

export const CornerScaleHandles = ({
  id,
  scale,
  scaleGroupRef,
  textureRatio,
  assets2DDefaultSize,
  elevation,
}: CornerScaleHandlesProps) => {
  const groupRef = useRef<Group>(null);
  const calculatedScale = useRef(scale);
  const startDistRef = useRef(0);
  const startScaleRef = useRef(scale);

  const halfWidth = assets2DDefaultSize / 2;
  const halfHeight = (assets2DDefaultSize / textureRatio) / 2;
  const scaleOrigin = new Vector3(0, 0, 0);

  const initialCorners = {
    topLeft: new Vector3(-halfWidth, 0, -halfHeight),
    topRight: new Vector3(halfWidth, 0, -halfHeight),
    bottomLeft: new Vector3(-halfWidth, 0, halfHeight),
    bottomRight: new Vector3(halfWidth, 0, halfHeight),
  };
  const [cornerPositions, setCornerPositions] = useState(initialCorners);
  const cornerPositionsRef = useRef(initialCorners);

  useFrame(() => {
    if(isNull(groupRef.current) || isNull(scaleGroupRef.current)) {
      return;
    }

    const worldTL = scaleGroupRef.current.localToWorld(initialCorners.topLeft.clone());
    const worldTR = scaleGroupRef.current.localToWorld(initialCorners.topRight.clone());
    const worldBL = scaleGroupRef.current.localToWorld(initialCorners.bottomLeft.clone());
    const worldBR = scaleGroupRef.current.localToWorld(initialCorners.bottomRight.clone());

    const localTL = groupRef.current.worldToLocal(worldTL.clone());
    const localTR = groupRef.current.worldToLocal(worldTR.clone());
    const localBL = groupRef.current.worldToLocal(worldBL.clone());
    const localBR = groupRef.current.worldToLocal(worldBR.clone());

    const prev = cornerPositionsRef.current;
    const isChanged =
      localTL.equals(prev.topLeft) === false ||
      localTR.equals(prev.topRight) === false ||
      localBL.equals(prev.bottomLeft) === false ||
      localBR.equals(prev.bottomRight) === false;

    if(isChanged) {
      const newPositions = {
        topLeft: localTL,
        topRight: localTR,
        bottomLeft: localBL,
        bottomRight: localBR,
      };
      cornerPositionsRef.current = newPositions;
      setCornerPositions(newPositions);
    }
  });

  const handleCornerDrag = (corner: Vector3) => (position: Vector3) => {
    if(isNull(groupRef.current) || isNull(scaleGroupRef.current)) {
      return;
    }

    const originWorld = groupRef.current.localToWorld(scaleOrigin.clone());
    const cornerWorld = groupRef.current.localToWorld(corner.clone());
    const diagonalDir = cornerWorld.clone().sub(originWorld).normalize();
    const dragVec = position.clone().sub(originWorld);
    const projectedLength = dragVec.dot(diagonalDir);

    const startDist = startDistRef.current;
    const minLength = startDist * 0.1;
    const clampedLength = Math.max(projectedLength, minLength);
    const newScale = (clampedLength / startDist) * startScaleRef.current;

    scaleGroupRef.current.scale.set(newScale, 1, newScale);
    calculatedScale.current = newScale;
  };

  const handleCornerDragStart = (corner: Vector3) => () => {
    if(isNull(groupRef.current) || isNull(scaleGroupRef.current)) {
      return;
    }

    const originWorld = groupRef.current.localToWorld(scaleOrigin.clone());
    const cornerWorld = groupRef.current.localToWorld(corner.clone());
    startDistRef.current = cornerWorld.distanceTo(originWorld);
    startScaleRef.current = scale;
  };

  const handleCornerDragEnd = () => {
    if(!isNull(scaleGroupRef.current)) {
      setAsset2DParams(id, { scale: Positive(calculatedScale.current) });
    }
  };

  return (
    <group ref={groupRef}>
      <DraggablePoint
        position={cornerPositions.topLeft}
        elevation={elevation}
        onDragStart={handleCornerDragStart(initialCorners.topLeft)}
        onDrag={handleCornerDrag(initialCorners.topLeft)}
        onDragEnd={handleCornerDragEnd}
        scale={scale}
      />
      <DraggablePoint
        position={cornerPositions.topRight}
        elevation={elevation}
        onDragStart={handleCornerDragStart(initialCorners.topRight)}
        onDrag={handleCornerDrag(initialCorners.topRight)}
        onDragEnd={handleCornerDragEnd}
        scale={scale}
      />
      <DraggablePoint
        position={cornerPositions.bottomLeft}
        elevation={elevation}
        onDragStart={handleCornerDragStart(initialCorners.bottomLeft)}
        onDrag={handleCornerDrag(initialCorners.bottomLeft)}
        onDragEnd={handleCornerDragEnd}
        scale={scale}
      />
      <DraggablePoint
        position={cornerPositions.bottomRight}
        elevation={elevation}
        onDragStart={handleCornerDragStart(initialCorners.bottomRight)}
        onDrag={handleCornerDrag(initialCorners.bottomRight)}
        onDragEnd={handleCornerDragEnd}
        scale={scale}
      />
    </group>
  );
};
