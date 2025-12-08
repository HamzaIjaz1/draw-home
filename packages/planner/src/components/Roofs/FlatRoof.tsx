import { useCallback, useEffect, useMemo, useRef } from 'react';
import { BoxGeometry, ExtrudeGeometry, Group, Matrix4, Mesh, Quaternion, Shape, Vector2, Vector3 } from 'three';
import { GroupProps } from '@react-three/fiber';
import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { CSG } from 'three-csg-ts';
import { setCursor, useCreationMode, useCreationModeConfig, useLevels, usePopUpToolbar, useSlideUpMenuLvl2, useSpaces, useViewMode, useWalls } from '../../zustand';
import { SuspenseHOC } from '../SuspenseHOC';
import { useTextures } from '../../customHooks';
import { getGlobalBoundingBox, getShadowProps, toVector3 } from '../../utils';
import { RoofsStore, useRoofs } from '../../zustand/useRoofs';
import { useAppearanceColor } from '../../zustand/useAppearanceColor';
import { registerSceneObject, unregisterSceneObject } from '../../zustand/useSceneObjects';
import { handleAppearanceSample } from '../../utils/handleAppearanceSample';
import { DEFAULT_TEXTURE_TRANSFORM } from '../../zod/TextureTransform';
import { diffThickness, makeRoofGeometries } from '../../utils/solidRoofGeometryUtils';
import { makeSpaceGeometries } from '../../utils/makeSpaceGeometries';
import { useDollhouseViewMode } from '../../customHooks/useDollhouseViewMode';

export type FlatRoofProps = {
  coords: [Vector2, Vector2, Vector2, ...Vector2[]];
  roofId: RoofsStore['roofs'][number]['id'];
  elevation: number;
  opacity: number;
  thickness: RoofsStore['roofs'][number]['roofData']['thickness'];
  heightFromBase: RoofsStore['roofs'][number]['roofData']['heightFromBase'];
  topTexture: RoofsStore['roofs'][number]['roofData']['topTexture'];
  bottomTexture: RoofsStore['roofs'][number]['roofData']['bottomTexture'];
  edgeTexture: RoofsStore['roofs'][number]['roofData']['edgeTexture'];
  topColorOverlay: RoofsStore['roofs'][number]['roofData']['topColorOverlay'];
  bottomColorOverlay: RoofsStore['roofs'][number]['roofData']['bottomColorOverlay'];
  edgeColorOverlay: RoofsStore['roofs'][number]['roofData']['edgeColorOverlay'];
  topCompositeOperation: RoofsStore['roofs'][number]['roofData']['topCompositeOperation'];
  bottomCompositeOperation: RoofsStore['roofs'][number]['roofData']['bottomCompositeOperation'];
  edgeCompositeOperation: RoofsStore['roofs'][number]['roofData']['edgeCompositeOperation'];
};

export const FlatRoof: React.FC<FlatRoofProps> = SuspenseHOC(({
  roofId,
  coords,
  elevation,
  opacity,
  heightFromBase,
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
  const { viewMode } = useViewMode();
  const { creationMode } = useCreationMode();
  const { appearanceColor } = useAppearanceColor();
  const { roofs } = useRoofs();
  const { walls } = useWalls();
  const { spaces } = useSpaces();
  const { levels } = useLevels();

  const roof = roofs.find(s => s.id === roofId) || null;
  const topXf = roof?.roofData.topTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;
  const bottomXf = roof?.roofData.bottomTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;
  const edgeXf = roof?.roofData.edgeTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;

  const { topColorOverlay, bottomColorOverlay, edgeColorOverlay } = (() => {
    const { slideUpMenuLvl2 } = useSlideUpMenuLvl2.getState();

    if(isNull(appearanceColor) || appearanceColor.type !== 'roofAppearance' || slideUpMenuLvl2.type !== appearanceColor.type || slideUpMenuLvl2.roofId !== roofId) {
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

  const { topGeometries, bottomGeometries, edgeGeometries } = useMemo(() => {
    const shape = new Shape(coords);
    const e = new ExtrudeGeometry(shape, {
      depth: diffThickness,
      bevelEnabled: false,
    });

    e.rotateX(Math.PI / 2);
    e.computeVertexNormals();

    const spaceGeometries = makeSpaceGeometries({ roofId, spaces, walls, levels });

    const topGeometries = makeRoofGeometries({
      geometries: [e],
      diff: -thickness,
      spaceGeometries,
      elevation,
    });
    const bottomGeometries = makeRoofGeometries({
      geometries: [e],
      diff: 0,
      spaceGeometries,
      elevation,
    });
    const edgeGeometries = (() => (
      coords.flatMap((_e2, i, arr) => {
        const _e1 = getNotUndefined(arr.at(i - 1), 'This should never happen. |91j3p0|');
        const e1 = toVector3(_e1);
        const e2 = toVector3(_e2);

        const dir = new Vector3().subVectors(e2, e1);
        const length = dir.length();
        dir.normalize();
        const mid = new Vector3().addVectors(e1, e2).multiplyScalar(0.5);
        const baseGeom = new BoxGeometry(diffThickness, thickness, length);
        const up = new Vector3(0, 0, 1);
        const quat = new Quaternion().setFromUnitVectors(up, dir);
        const mat = new Matrix4().compose(mid, quat, new Vector3(1, 1, 1));
        baseGeom.applyMatrix4(mat);

        const baseMesh = new Mesh(baseGeom);
        const boundingBox = getGlobalBoundingBox(baseMesh);
        const { geometry } = spaceGeometries.reduce<Mesh>((acc, cur) => {
          const mesh = new Mesh(cur.geometry);
          mesh.position.setY(cur.elevation - elevation);
          mesh.updateMatrix();

          const { min, max } = getGlobalBoundingBox(mesh);

          return (
            true
              && boundingBox.min.x < max.x && min.x < boundingBox.max.x
              && boundingBox.min.y < max.y && min.y < boundingBox.max.y
              && boundingBox.min.z < max.z && min.z < boundingBox.max.z
              ? (() => {
                const result = CSG.subtract(acc, mesh);
                if(acc !== baseMesh) {
                  acc.geometry.dispose();
                }

                return result;
              })()
              : acc
          );
        }, baseMesh);

        return { geometry };
      })
    ))();

    return {
      topGeometries,
      bottomGeometries,
      edgeGeometries,
    };
  }, [coords, elevation, levels, roofId, spaces, thickness, walls]);
  useEffect(() => (
    () => {
      for(const { geometry } of [...topGeometries, ...bottomGeometries, ...edgeGeometries]) {
        geometry.dispose();
      }
    }
  ), [topGeometries, bottomGeometries, edgeGeometries]);

  const topRepeat = useMemo(() => ({
    x: 1 / topTexture.attributes.scale / Math.max(0.01, topXf.wScale),
    y: -1 / topTexture.attributes.scale / Math.max(0.01, topXf.lScale),
  }), [topTexture.attributes.scale, topXf.lScale, topXf.wScale]);
  const bottomRepeat = useMemo(() => ({
    x: 1 / bottomTexture.attributes.scale / Math.max(0.01, bottomXf.wScale),
    y: -1 / bottomTexture.attributes.scale / Math.max(0.01, bottomXf.lScale),
  }), [bottomTexture.attributes.scale, bottomXf.lScale, bottomXf.wScale]);
  const edgeRepeat = useMemo(() => ({
    x: 1 / edgeTexture.attributes.scale / Math.max(0.01, edgeXf.wScale),
    y: -1 / edgeTexture.attributes.scale / Math.max(0.01, edgeXf.lScale),
  }), [edgeTexture.attributes.scale, edgeXf.lScale, edgeXf.wScale]);

  const topMapProps = useTextures(
    topTexture.attributes.maps,
    useCallback(e => {
      e.center.set(0.5, 0.5);
      e.repeat.set(topRepeat.x, topRepeat.y);
      e.rotation = topXf.rotateDeg * Math.PI / 180;
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
      e.rotation = bottomXf.rotateDeg * Math.PI / 180;
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
      e.rotation = edgeXf.rotateDeg * Math.PI / 180;
    }, [edgeRepeat.x, edgeRepeat.y, edgeXf.rotateDeg]),
    {
      overlayColor: isNull(edgeColorOverlay) ? null : edgeColorOverlay.value,
      compositeOperation: edgeCompositeOperation,
    },
  );

  const roofGeometriesGroupRef = useRef<Group>(null);
  const dollhouseViewRef = useRef<Group>(null);
  useDollhouseViewMode({ groupRef: dollhouseViewRef, normal: new Vector3(0, -1, 0), threshold: 0.2 });

  useEffect(() => {
    if(viewMode !== '3D' || isNull(roofGeometriesGroupRef.current)) {
      unregisterSceneObject(`roof:${roofId}`);
      return;
    }

    roofGeometriesGroupRef.current.updateMatrixWorld(true);
    registerSceneObject(`roof:${roofId}`, roofGeometriesGroupRef.current);

    return () => {
      unregisterSceneObject(`roof:${roofId}`);
    };
  }, [viewMode, roofId]);

  useEffect(() => {
    roofGeometriesGroupRef.current?.updateMatrixWorld(true);
  }, [coords, elevation, thickness, heightFromBase]);

  return (
    <group ref={dollhouseViewRef}>
      <group
        ref={roofGeometriesGroupRef}
        position-y={elevation + thickness + heightFromBase}
        {
          ...creationMode === 'walls' && {
            onClick(e) {
              const { creationModeConfig } = useCreationModeConfig.getState();

              if(e.button !== 0 || e.delta > 2 || creationModeConfig.mode === 'multipleStraightLines' || handleAppearanceSample(e)) {
                return;
              }
              e.stopPropagation();

              usePopUpToolbar.setState({
                popUpToolbar: {
                  type: 'roof',
                  id: roofId,
                  coords: new Vector2(e.clientX, e.clientY),
                  activeGableIndex: null,
                  isSlanted: false,
                  clickPoint: e.point,
                  subItem: null,
                },
              });
            },
          } satisfies Partial<GroupProps>
        }
        {
          ...creationMode === 'pointer' && viewMode !== '2D' && {
            onPointerEnter(e) {
              e.stopPropagation();
              setCursor('pointer');
            },
            onPointerLeave(e) {
              e.stopPropagation();
              setCursor(null);
            },
            onPointerUp(e) {
              if(e.button !== 0 || handleAppearanceSample(e)) {
                return;
              }
              e.stopPropagation();

              usePopUpToolbar.setState({
                popUpToolbar: {
                  type: 'roof',
                  id: roofId,
                  coords: new Vector2(e.clientX, e.clientY),
                  activeGableIndex: null,
                  isSlanted: false,
                  clickPoint: e.point,
                  subItem: null,
                },
              });
            },
          } satisfies Partial<GroupProps>
        }
      >
        {
          topGeometries.map(({ geometry }, i) => (
            <mesh
              {...getShadowProps()}
              key={i}
              geometry={geometry}
              onPointerUp={handleAppearanceSample}
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
                transparent={opacity !== 1}
                opacity={opacity}
              />
            </mesh>
          ))
        }
        {
          bottomGeometries.map(({ geometry }, i) => (
            <mesh
              {...getShadowProps()}
              key={i}
              geometry={geometry}
              position-y={-thickness}
              onPointerUp={handleAppearanceSample}
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
                transparent={opacity !== 1}
                opacity={opacity}
              />
            </mesh>
          ))
        }
        {
          edgeGeometries.map(({ geometry }, i) => (
            <mesh
              {...getShadowProps()}
              key={i}
              geometry={geometry}
              position-y={-thickness / 2}
              onPointerUp={handleAppearanceSample}
              userData={{
                appearance: {
                  texture: edgeTexture,
                  overlay: edgeColorOverlay,
                },
              }}
            >
              <meshStandardMaterial
                {...edgeMapProps}
                transparent={opacity !== 1}
                opacity={opacity}
              />
            </mesh>
          ))
        }
      </group>
    </group>
  );
});
