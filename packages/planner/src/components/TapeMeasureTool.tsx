import { forwardRef, RefObject, Suspense, useEffect, useRef, useState } from 'react';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { Camera, DoubleSide, Group, Object3DEventMap, Plane, Raycaster, Vector2, Vector3 } from 'three';
import { Line, Text } from '@react-three/drei';
import { isNull } from '@arthurka/ts-utils';
import { CustomModelId, Positive } from '@draw-house/common/dist/brands';
import { setCursor, useGlobalSettings } from '../zustand';
import { useIsMoving3DModel } from '../zustand/useIsMoving3DModel';
import { measurements } from '../utils';
import { TextBorderBox } from './TextBorderBox';
import { RulerVisual3D } from './RulerVisual3D';
import { SelectedItemStore, useSelectedItem } from '../zustand/useSelectedItem';

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
  onDrag: (position: Vector3) => void;
  elevation: number;
  scale: number;
};

const DraggablePoint = forwardRef<Group, DraggablePointProps >(({ position, onDrag, elevation, scale }, ref) => {
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
    const handleGlobalPointerUp = () => {
      setCursor(null);
      useIsMoving3DModel.setState({ isMoving3DModel: false });
      setDragging(false);
    };

    if(dragging === true) {
      gl.domElement.addEventListener('pointermove', handleGlobalPointerMove);
      gl.domElement.addEventListener('pointerup', handleGlobalPointerUp);
    }

    return () => {
      gl.domElement.removeEventListener('pointermove', handleGlobalPointerMove);
      gl.domElement.removeEventListener('pointerup', handleGlobalPointerUp);
    };
  }, [dragging, gl, camera, onDrag, elevation]);

  return (
    <group
      ref={ref}
      position={position}
      onPointerDown={handlePointerDown}
      onPointerOver={() => {
        setCursor('grab');
      }}
    >
      {
        dragging === false && (
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
        )
      }
    </group>
  );
});

const distanceToSegment = (point: Vector3, segA: Vector3, segB: Vector3): number => {
  const ab = segB.clone().sub(segA);
  const ap = point.clone().sub(segA);
  const abLenSq = ab.lengthSq();
  const t = abLenSq === 0 ? 0 : ab.dot(ap) / abLenSq;
  if(t < 0) {
    return ap.length();
  }
  if(t > 1) {
    return point.clone().sub(segB).length();
  }
  const proj = segA.clone().add(ab.multiplyScalar(t));
  return point.distanceTo(proj);
};
type CloseButtonProps = {
  p1: Vector3;
  dir: Vector3;
  closeBtnRadius: number;
  crossLength: number;
  onClose: () => void;
};

const CloseButton = ({ p1, dir, closeBtnRadius, crossLength, onClose }: CloseButtonProps) => (
  <group
    position={p1.clone().addScaledVector(dir.normalize(), -0.5)}
    rotation={[-Math.PI / 2, 0, 0]}
  >
    <mesh
      position={[0, 0, -0.001]}
      onPointerOver={() => setCursor('pointer')}
      onPointerOut={() => setCursor(null)}
      onPointerDown={e => {
        e.stopPropagation();
        onClose();
      }}
    >
      <circleGeometry args={[closeBtnRadius, 32]} />
      <meshBasicMaterial
        color='#e9e9e9'
        side={DoubleSide}
      />
    </mesh>
    <Line
      points={[
        [-crossLength, -crossLength, 0],
        [crossLength, crossLength, 0],
        [crossLength, -crossLength, 0],
        [-crossLength, crossLength, 0],
      ]}
      color='#19172c'
      lineWidth={1}
      segments
    />
  </group>
);
type TapeMeasureToolProps = {
  posP1: Vector3;
  posP2: Vector3;
  onClose: () => void;
  onPositionChange: (posP1: Vector3, posP2: Vector3) => void;
  elevation: number;
  mode: Extract<NonNullable<SelectedItemStore['selectedItem']>, { type: 'asset2D' }>['mode'];
  scaleGroupRef: RefObject<Group<Object3DEventMap>>;
  id: CustomModelId;
};

export const TapeMeasureTool = ({ posP1, posP2, onClose, onPositionChange, elevation, mode, scaleGroupRef, id }: TapeMeasureToolProps) => {
  const { camera } = useThree();
  const [p1, setP1] = useState(posP1);
  const [p2, setP2] = useState(posP2);
  const [worldScaleX, setWorldScaleX] = useState(1);
  const [textSize, setTextSize] = useState({ width: 0.5, height: 0.3 });
  const [showSmallestTicks, setShowSmallestTicks] = useState(true);
  const groupRef = useRef<Group>(null);
  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const { selectedItem } = useSelectedItem();

  useFrame(() => {
    if(!isNull(groupRef.current)) {
      const scale = new Vector3();
      groupRef.current.getWorldScale(scale);
      setWorldScaleX(scale.x);

      let nextShowSmallestTicks = showSmallestTicks;
      if(camera.type === 'OrthographicCamera') {
        nextShowSmallestTicks = camera.zoom > 50;
      } else {
        const cameraLocal = groupRef.current.worldToLocal(camera.position.clone());
        const minDist = distanceToSegment(cameraLocal, p1, p2);
        nextShowSmallestTicks = minDist < 20;
      }
      if(showSmallestTicks !== nextShowSmallestTicks) {
        setShowSmallestTicks(nextShowSmallestTicks);
      }
    }
  });

  useEffect(() => {
    if(!isNull(selectedItem) && selectedItem.type === 'asset2D') {
      const worldDistance = p1.distanceTo(p2);
      useSelectedItem.setState({
        selectedItem: {
          ...selectedItem,
          measuredDistanceWorld: Positive(worldDistance * worldScaleX),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, p1, p2, worldScaleX]);

  const mid = new Vector3().lerpVectors(p1, p2, 0.5);
  const dir = p2.clone().sub(p1);

  const perpendicular = new Vector3(-dir.z, 0, dir.x).normalize();
  const labelPos = mid.clone().add(perpendicular.multiplyScalar(0.3));

  const realDistance = p1.distanceTo(p2) * worldScaleX;

  const distanceToCamera = camera.position.distanceTo(mid);
  const cameraBasedGap = 0.001 * distanceToCamera * 2;

  const updateP1 = (newP1: Vector3) => {
    setP1(newP1);
    onPositionChange?.(newP1, p2);
  };

  const updateP2 = (newP2: Vector3) => {
    setP2(newP2);
    onPositionChange?.(p1, newP2);
  };

  return (
    <group ref={groupRef} position-y={cameraBasedGap}>
      <CloseButton
        p1={p1}
        dir={dir}
        closeBtnRadius={0.1}
        crossLength={0.1 / 2}
        onClose={onClose}
      />
      <group>
        <DraggablePoint
          position={p1}
          onDrag={p => {
            const local = !isNull(groupRef.current) ? groupRef.current.worldToLocal(p.clone()) : p.clone();
            const newP1 = new Vector3(local.x, 0.01, local.z);
            updateP1(newP1);
          }}
          elevation={elevation}
          scale={isNull(scaleGroupRef.current) ? 1 : scaleGroupRef.current.scale.x}
        />
        <DraggablePoint
          position={p2}
          onDrag={p => {
            const local = !isNull(groupRef.current) ? groupRef.current.worldToLocal(p.clone()) : p.clone();
            const newP2 = new Vector3(local.x, 0.01, local.z);
            updateP2(newP2);
          }}
          elevation={elevation}
          scale={isNull(scaleGroupRef.current) ? 1 : scaleGroupRef.current.scale.x}
        />
        <RulerVisual3D
          p1={p1}
          p2={p2}
          measurementSystem={measurementSystem}
          worldScaleX={worldScaleX}
          showSmallestTicks={showSmallestTicks}
        />
      </group>
      <group
        position={[labelPos.x, labelPos.y + cameraBasedGap / 2, labelPos.z]}
        onClick={e => {
          e.stopPropagation();

          if(!isNull(selectedItem) && selectedItem.type === 'asset2D') {
            useSelectedItem.setState({
              selectedItem: {
                ...selectedItem,
                id,
                mode: 'measure-scale-mode',
                measuredDistanceWorld: Positive(realDistance),
              },
            });
          }
        }}
      >
        <Suspense fallback={null}>
          <Text
            position={[0, cameraBasedGap / 4, 0]}
            rotation={[-Math.PI / 2, 0, -Math.atan2(p2.z - p1.z, p2.x - p1.x)]}
            fontSize={0.24}
            lineHeight={0}
            color='#fd5631'
            font='/fonts/sofia-pro/regular.otf'
            onSync={mesh => {
              if(Array.isArray(mesh.textRenderInfo.visibleBounds)) {
                const [minX, minY, maxX, maxY] = mesh.textRenderInfo.visibleBounds;
                const width = maxX - minX;
                const height = maxY - minY;

                setTextSize({ width, height });
              }
              if(mesh.isMesh === true) {
                // eslint-disable-next-line no-param-reassign
                mesh.material.toneMapped = false;
              }
            }}
          >
            {measurements.pretty.mFtIn(realDistance, measurementSystem)}
          </Text>
        </Suspense>
        <TextBorderBox
          height={textSize.height + 0.18}
          width={textSize.width + 0.18}
          borderWidth={0.015}
          borderRadius={0.1}
          borderColor='#fd5631'
          rotation={[-Math.PI / 2, 0, -Math.atan2(p2.z - p1.z, p2.x - p1.x)]}
        />
      </group>
    </group>
  );
};
