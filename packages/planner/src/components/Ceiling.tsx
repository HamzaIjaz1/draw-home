import { Box3, BufferAttribute, BufferGeometry, DoubleSide, Float32BufferAttribute, FrontSide, Group, Shape, ShapeGeometry, Vector2, Vector3 } from 'three';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { GroupProps } from '@react-three/fiber';
import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import assert from 'assert';
import { SuspenseHOC } from './SuspenseHOC';
import { setCursor, SpacesStore, useCreationMode, useCreationModeConfig, usePopUpToolbar, useSlideUpMenuLvl2, useSpaces, useViewMode } from '../zustand';
import { useRefWithUV2, useTextures } from '../customHooks';
import { getShadowProps, toVector3 } from '../utils';
import { useAppearanceColor } from '../zustand/useAppearanceColor';
import { enableOutlineLayer } from '../utils/enableOutlineLayer';
import { registerSceneObject, unregisterSceneObject } from '../zustand/useSceneObjects';
import { handleAppearanceSample } from '../utils/handleAppearanceSample';
import { DEFAULT_TEXTURE_TRANSFORM } from '../zod/TextureTransform';
import { useDollhouseViewMode } from '../customHooks/useDollhouseViewMode';

export type CeilingProps = {
  spaceId: SpacesStore['spaces'][number]['id'];
  coords: [Vector2, Vector2, Vector2, ...Vector2[]];
  elevation: number;
  opacity: number;
  thickness: SpacesStore['spaces'][number]['ceilingData']['thickness'];
  topTexture: SpacesStore['spaces'][number]['ceilingData']['topTexture'];
  bottomTexture: SpacesStore['spaces'][number]['ceilingData']['bottomTexture'];
  edgeTexture: SpacesStore['spaces'][number]['ceilingData']['edgeTexture'];
  topColorOverlay: SpacesStore['spaces'][number]['ceilingData']['topColorOverlay'];
  bottomColorOverlay: SpacesStore['spaces'][number]['ceilingData']['bottomColorOverlay'];
  edgeColorOverlay: SpacesStore['spaces'][number]['ceilingData']['edgeColorOverlay'];
  topCompositeOperation: SpacesStore['spaces'][number]['ceilingData']['topCompositeOperation'];
  bottomCompositeOperation: SpacesStore['spaces'][number]['ceilingData']['bottomCompositeOperation'];
  edgeCompositeOperation: SpacesStore['spaces'][number]['ceilingData']['edgeCompositeOperation'];
};

export const Ceiling: React.FC<CeilingProps> = SuspenseHOC(({
  spaceId,
  coords,
  elevation,
  opacity,
  thickness,
  topTexture,
  bottomTexture,
  edgeTexture,
  topCompositeOperation,
  bottomCompositeOperation,
  edgeCompositeOperation,
  topColorOverlay: _topColorOverlay,
  bottomColorOverlay: _bottomColorOverlay,
  edgeColorOverlay: _edgeColorOverlay,
}) => {
  const { creationMode } = useCreationMode();
  const { appearanceColor } = useAppearanceColor();
  const { viewMode } = useViewMode();
  const { spaces } = useSpaces();
  const ceiling = spaces.find(s => s.id === spaceId) || null;
  const topXf = ceiling?.ceilingData.topTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;
  const bottomXf = ceiling?.ceilingData.bottomTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;
  const edgeXf = ceiling?.ceilingData.edgeTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;

  const { topColorOverlay, bottomColorOverlay, edgeColorOverlay } = (() => {
    const { slideUpMenuLvl2 } = useSlideUpMenuLvl2.getState();

    if(isNull(appearanceColor) || appearanceColor.type !== 'ceilingAppearance' || slideUpMenuLvl2.type !== appearanceColor.type || slideUpMenuLvl2.spaceId !== spaceId) {
      return {
        topColorOverlay: _topColorOverlay,
        bottomColorOverlay: _bottomColorOverlay,
        edgeColorOverlay: _edgeColorOverlay,
      };
    }

    return {
      topColorOverlay: slideUpMenuLvl2.textureType === 'top' ? appearanceColor.color : _topColorOverlay,
      bottomColorOverlay: slideUpMenuLvl2.textureType === 'bottom' ? appearanceColor.color : _bottomColorOverlay,
      edgeColorOverlay: slideUpMenuLvl2.textureType === 'edge' ? appearanceColor.color : _edgeColorOverlay,
    };
  })();

  const geometry = useMemo(() => {
    const shape = new Shape(coords);
    const geometry = new ShapeGeometry(shape);

    geometry.rotateX(Math.PI / 2);
    geometry.computeVertexNormals();

    return geometry;
  }, [coords]);
  useEffect(() => (
    () => {
      geometry.dispose();
    }
  ), [geometry]);

  const topRepeat = useMemo(() => ({
    x: (1 / topTexture.attributes.scale) / Math.max(0.01, topXf.wScale),
    y: (-1 / topTexture.attributes.scale) / Math.max(0.01, topXf.lScale),
  }), [topTexture.attributes.scale, topXf.lScale, topXf.wScale]);
  const bottomRepeat = useMemo(() => ({
    x: (1 / bottomTexture.attributes.scale) / Math.max(0.01, bottomXf.wScale),
    y: (-1 / bottomTexture.attributes.scale) / Math.max(0.01, bottomXf.lScale),
  }), [bottomTexture.attributes.scale, bottomXf.lScale, bottomXf.wScale]);
  const edgeRepeat = useMemo(() => ({
    x: (1 / edgeTexture.attributes.scale) / Math.max(0.01, edgeXf.wScale),
    y: (-1 / edgeTexture.attributes.scale) / Math.max(0.01, edgeXf.lScale),
  }), [edgeTexture.attributes.scale, edgeXf.lScale, edgeXf.wScale]);

  const topMapProps = useTextures(
    topTexture.attributes.maps,
    useCallback(e => {
      e.center.set(0.5, 0.5);
      e.repeat.set(topRepeat.x, topRepeat.y);
      e.rotation = (topXf.rotateDeg * Math.PI) / 180;
    }, [topRepeat.x, topRepeat.y, topXf.rotateDeg]),
    {
      overlayColor: isNull(topColorOverlay) ? null : topColorOverlay.value,
      compositeOperation: topCompositeOperation,
    },
  );
  const bottomMapProps = useTextures(
    bottomTexture.attributes.maps,
    useCallback(e => {
      e.center.set(0.5, 0.5);
      e.repeat.set(bottomRepeat.x, bottomRepeat.y);
      e.rotation = (bottomXf.rotateDeg * Math.PI) / 180;
    }, [bottomRepeat.x, bottomRepeat.y, bottomXf.rotateDeg]),
    {
      overlayColor: isNull(bottomColorOverlay) ? null : bottomColorOverlay.value,
      compositeOperation: bottomCompositeOperation,
    },
  );
  const edgeMapProps = useTextures(
    edgeTexture.attributes.maps,
    useCallback(e => {
      e.center.set(0.5, 0.5);
      e.repeat.set(edgeRepeat.x, edgeRepeat.y);
      e.rotation = (edgeXf.rotateDeg * Math.PI) / 180;
    }, [edgeRepeat.x, edgeRepeat.y, edgeXf.rotateDeg]),
    {
      overlayColor: isNull(edgeColorOverlay) ? null : edgeColorOverlay.value,
      compositeOperation: edgeCompositeOperation,
    },
  );

  const bbox = new Box3().setFromPoints(coords.map(toVector3));
  const approxW = bbox.max.x - bbox.min.x;
  const approxL = bbox.max.z - bbox.min.z;
  const centerX = (bbox.min.x + bbox.max.x) * 0.5;
  const centerZ = (bbox.min.z + bbox.max.z) * 0.5;

  const safeThickness = Math.max(thickness, 0.01);

  const sideGeometries = useMemo(() => (
    coords.flatMap((_e2, i, arr) => {
      const _e1 = getNotUndefined(arr.at(i - 1), 'This should never happen. |20x0fc|');
      const e1 = toVector3(_e1);
      const e2 = toVector3(_e2);

      const points = [
        e1,
        e2,
        new Vector3().addVectors(e2, new Vector3(0, thickness, 0)),
        new Vector3().addVectors(e1, new Vector3(0, thickness, 0)),
      ];

      const geometry = new BufferGeometry();
      const vertices = new Float32Array(points.flatMap(e => e.toArray()));
      const uvArray = new Float32BufferAttribute(points.flatMap(e => [e.x, -e.y]), 2);

      const indicesArray = [];
      for(let i = 1; i < points.length - 1; i++) {
        indicesArray.push(0, i, i + 1);
      }

      geometry.setAttribute('position', new BufferAttribute(vertices, 3));
      geometry.setAttribute('uv', uvArray);
      geometry.setIndex(indicesArray);
      geometry.computeVertexNormals();

      return { geometry };
    })
  ), [coords, thickness]);
  useEffect(() => (
    () => {
      for(const { geometry } of sideGeometries) {
        geometry.dispose();
      }
    }
  ), [sideGeometries]);

  const ref = useRef<Group>(null);
  const snapCandidateRef = useRef<Group>(null);
  const dollhouseViewRef = useRef<Group>(null);
  useDollhouseViewMode({ groupRef: dollhouseViewRef, normal: new Vector3(0, -1, 0), threshold: 0.2 });

  useEffect(() => {
    if(viewMode !== '3D' || isNull(ref.current)) {
      return;
    }

    registerSceneObject(`ceiling:${spaceId}`, ref.current);

    return () => {
      unregisterSceneObject(`ceiling:${spaceId}`);
    };
  }, [viewMode, spaceId]);

  useEffect(() => {
    assert(!isNull(ref.current), 'Something went wrong. |ga2i2p|');

    enableOutlineLayer(ref.current);
  }, []);

  useEffect(() => {
    if(isNull(snapCandidateRef.current)) {
      return;
    }

    snapCandidateRef.current.userData.__isCeilingSnapRoot = true;
    snapCandidateRef.current.userData.__isSnapRoot = true;
  }, [elevation, thickness]);

  return (
    <group ref={dollhouseViewRef}>
      <group
        ref={ref}
        position-y={elevation}
        {
          ...creationMode === 'walls' && {
            onClick(e) {
              const { creationModeConfig } = useCreationModeConfig.getState();

              if(e.button !== 0 || e.delta > 2 || creationModeConfig.mode === 'multipleStraightLines') {
                return;
              }
              e.stopPropagation();

              usePopUpToolbar.setState({
                popUpToolbar: {
                  type: 'ceiling',
                  id: spaceId,
                  coords: new Vector2(e.clientX, e.clientY),
                },
              });
            },
          } satisfies Partial<GroupProps>
        }
        {
          ...opacity === 1 && creationMode === 'pointer' && {
            onPointerEnter(e) {
              e.stopPropagation();
              setCursor('pointer');
            },
            onPointerLeave(e) {
              e.stopPropagation();
              setCursor(null);
            },
            onPointerUp(e) {
              if(e.button !== 0) {
                return;
              }

              if(handleAppearanceSample(e)) {
                return;
              }
              e.stopPropagation();

              usePopUpToolbar.setState({
                popUpToolbar: {
                  type: 'ceiling',
                  id: spaceId,
                  coords: new Vector2(e.clientX, e.clientY),
                },
              });
            },
          } satisfies Partial<GroupProps>
        }
      >
        <mesh
          {...getShadowProps()}
          ref={useRefWithUV2(topMapProps)}
          geometry={geometry}
          position-y={thickness}
          userData={{
            appearance: {
              texture: topTexture,
              transform: topXf,
              overlay: topColorOverlay,
            },
          }}
        >
          <meshStandardMaterial
            {...topMapProps}
            // Note: DoubleSide instead of BackSide for correct shadows
            side={DoubleSide}
            transparent={opacity !== 1}
            opacity={opacity}
          />
        </mesh>
        <mesh
          {...getShadowProps()}
          ref={useRefWithUV2(bottomMapProps)}
          geometry={geometry}
          userData={{
            appearance: {
              texture: bottomTexture,
              transform: bottomXf,
              overlay: bottomColorOverlay,
            },
          }}
        >
          <meshStandardMaterial
            {...bottomMapProps}
            side={FrontSide}
            transparent={opacity !== 1}
            opacity={opacity}
          />
        </mesh>
        {
          sideGeometries.map(({ geometry }, i) => (
            <mesh
              {...getShadowProps()}
              key={i}
              geometry={geometry}
              userData={{
                appearance: {
                  texture: edgeTexture,
                  transform: edgeXf,
                  overlay: edgeColorOverlay,
                },
              }}
            >
              <meshStandardMaterial
                {...edgeMapProps}
                side={DoubleSide}
                transparent={opacity !== 1}
                opacity={opacity}
                polygonOffset
                polygonOffsetFactor={-1}
                polygonOffsetUnits={-1}
              />
            </mesh>
          ))
        }
        <group ref={snapCandidateRef} position={[centerX, safeThickness / 2, centerZ]}>
          <mesh layers={31} raycast={() => null}>
            <boxGeometry args={[approxW, safeThickness, approxL]} />
            <meshBasicMaterial
              color='red'
              wireframe
              transparent
              opacity={0.9}
              depthTest={false}
              depthWrite={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
});
