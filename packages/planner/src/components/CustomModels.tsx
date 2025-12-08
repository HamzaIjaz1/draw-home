import { getNotNull, getNotUndefined, isNull, isUndefined, tuple } from '@arthurka/ts-utils';
import { DragControls, PivotControls, Plane, useGLTF, useTexture } from '@react-three/drei';
import assert from 'assert';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box3, DoubleSide, Group, Quaternion, Vector2, Vector3 } from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { GroupProps } from '@react-three/fiber';
import Color from 'color';
import { isPositive, Positive } from '@draw-house/common/dist/brands';
import { useOptimizationForCustomModel } from '../customHooks';
import { CustomModelsStore, setCursor, setCustomModelOverrideMaterialParams, setCustomModelParams, useCreationMode, useCreationModeConfig, useCustomModels, useGlobalSettings, useLevels, usePopUpToolbar, useViewMode } from '../zustand';
import { SuspenseHOC } from './SuspenseHOC';
import { useIsMoving3DModel } from '../zustand/useIsMoving3DModel';
import { assignMaterialsToScene } from '../utils/assignMaterialsToScene';
import { useModelMaterials } from '../zustand/useModelMaterials/store';
import { assignTextureMapsToScene } from '../utils/assignTextureMapsToScene';
import { SelectionOutline } from './SelectionOutline';
import { enableOutlineLayer } from '../utils/enableOutlineLayer';
import { compositeOperations } from '../constants';
import { getModelCategoriesChain } from '../utils/getModelCategoriesChain';
import { useModelTextureOverlaysResolved } from '../zustand/useModelTextureOverlays';
import { makeModelSemiTransparent } from '../utils/makeModelSemiTransparent';
import { useNewCustomModel } from '../zustand/useNewCustomModel';
import { useSelectedItem } from '../zustand/useSelectedItem';
import { Asset2D } from './Asset2D';
import { buildDragSphere, collectNearbyCandidatesFast, filterCandidatesByFaceSize, snapAgainstBoxes } from '../utils/customModelSnapSphere';
import { handleAppearanceSample } from '../utils/handleAppearanceSample';
import { InstancedSlot } from './Instancing/InstancedSlot';
import { clearNewCustomModelSnapWorldPosition, commitNewCustomModelSnapPosition, useNewCustomModelPosition } from '../zustand/useNewCustomModelPosition';
import { useIsCurrentItemSettingsOpened } from '../customHooks/useIsCurrentItemSettingsOpened';
import { useTouchScreen } from '../zustand/useTouchScreen';

const SNAP_INTERVAL_MS = 8;

export type CustomModelProps = (
  & Extract<CustomModelsStore['customModels'][number], { type: 'regular' | 'column' }>
  & {
    isSemiTransparent?: boolean;
  }
);

export const CustomModel: React.FC<CustomModelProps> = memo(SuspenseHOC(({
  id,
  type,
  url,
  position: _position,
  quaternion,
  width,
  height: _height,
  depth,
  overrideMaterials,
  isFlippedHorizontal,
  isMirrored,
  levelId,
  isSemiTransparent = false,
}) => {
  const ref = useRef<Group>(null);
  const lastSnapRef = useRef(0);
  const containerRef = useRef<Group>(null);
  const dragGhostRef = useRef<Group>(null);
  const pivotEndingRef = useRef(false);
  const lastDidYSnapRef = useRef(false);
  const lastSnapWasFromPivotRef = useRef(false);
  const snapNodeRef = useRef<Group>(null);
  const isSnappedRef = useRef(false);
  const snapAnchorWorldPosRef = useRef<Vector3 | null>(null);
  const ghostPos = useRef(new Vector3());
  const snapPos = useRef(new Vector3());
  const snapLocalPos = useRef(new Vector3());
  const [isPivotActive, setPivotActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const { creationMode } = useCreationMode();
  const { selectedItem } = useSelectedItem();
  const { modelTextureOverlays } = useModelTextureOverlaysResolved();
  const { isMoving3DModel } = useIsMoving3DModel();
  const { levels } = useLevels();
  const { viewMode } = useViewMode();
  const { scene } = useGLTF(url);
  const { modelMaterials } = useModelMaterials();
  const { isTouchScreen } = useTouchScreen();
  const isCurrentItemSettingsOpened = useIsCurrentItemSettingsOpened({ type: 'customModel', id });

  const isSelected = !isNull(selectedItem) && selectedItem.type === 'customModel' && selectedItem.id === id;

  useEffect(() => {
    if(isSelected === false) {
      setIsHovered(false);
    }
  }, [isSelected]);

  const modelCategoriesChain = useMemo(() => getModelCategoriesChain(url), [url]);
  const representation2DImage = (() => {
    const modelCategory = modelCategoriesChain.find(e => !isNull(e.representation2DImage));
    if(isUndefined(modelCategory)) {
      return null;
    }

    return getNotNull(modelCategory.representation2DImage, 'This should never happen. |t73nt7|');
  })();
  const representation2DImageTexture = useTexture(isNull(representation2DImage) ? [] : [representation2DImage]);

  const targetLevel = getNotUndefined(levels.find(e => e.id === levelId), 'This should never happen. |b4m936|');
  const { clonedScene, w, h, d, center } = useMemo(() => {
    const clonedScene = clone(scene);
    const box = new Box3().setFromObject(clonedScene);

    const { x, y, z } = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());

    clonedScene.position.sub(new Vector3(x, y - size.y / 2, z));

    return {
      clonedScene,
      w: size.x,
      h: size.y,
      d: size.z,
      center,
    };
  }, [scene]);

  useEffect(() => {
    const container = containerRef.current;
    const snapNode = snapNodeRef.current;

    if(isNull(container)) {
      return;
    }

    container.userData.__isSnapRoot = true;
    container.userData.__snapToCenter = true;

    if(!isNull(snapNode)) {
      container.userData.__snapNode = snapNode;
    }

    return () => {
      delete container.userData.__isSnapRoot;
      delete container.userData.__snapToCenter;
      delete container.userData.__snapNode;
    };
  }, [id]);

  const height = type === 'column' && isNull(_height) ? targetLevel.height : _height;

  useOptimizationForCustomModel(clonedScene);
  if(isSemiTransparent === true) {
    makeModelSemiTransparent(clonedScene);
  }

  const snapDynamically = useCallback((self: Group | null, allowY: boolean) => {
    if(isNull(self)) {
      return;
    }

    const { snapDistanceFactor } = useGlobalSettings.getState();

    const snapDistance = snapDistanceFactor / 10;
    const t = performance.now ? performance.now() : Date.now();
    if(t - lastSnapRef.current < SNAP_INTERVAL_MS) {
      return;
    }
    lastSnapRef.current = t;

    const isGhostSnap = isSemiTransparent === true && self === snapNodeRef.current;
    const sphere = buildDragSphere(self, snapDistance);
    const rawCandidates = collectNearbyCandidatesFast(self, sphere);
    const candidates = filterCandidatesByFaceSize(self, rawCandidates);

    if(candidates.length === 0) {
      lastDidYSnapRef.current = false;
      isSnappedRef.current = false;
      setIsSnapping(false);
      snapAnchorWorldPosRef.current = null;

      if(isGhostSnap === true) {
        clearNewCustomModelSnapWorldPosition();
        self.position.set(0, 0, 0);
        self.quaternion.identity();
        self.updateMatrixWorld();
      }
      return;
    }

    if(isGhostSnap === true && isSnappedRef.current === true && !isNull(snapAnchorWorldPosRef.current)) {
      const { newCustomModelPosition } = useNewCustomModelPosition.getState();

      const anchor = snapAnchorWorldPosRef.current;
      const planarDistFromAnchor = Math.hypot(newCustomModelPosition.x - anchor.x, newCustomModelPosition.z - anchor.z);

      if(planarDistFromAnchor > snapDistance) {
        isSnappedRef.current = false;
        setIsSnapping(false);
        lastDidYSnapRef.current = false;
        snapAnchorWorldPosRef.current = null;

        self.position.set(0, 0, 0);
        self.quaternion.identity();
        self.updateMatrixWorld();

        clearNewCustomModelSnapWorldPosition();
      } else if(!isNull(self.parent)) {
        const localPos = anchor.clone();

        self.parent.updateWorldMatrix(true, true);
        self.parent.worldToLocal(localPos);
        self.position.copy(localPos);
        self.updateMatrixWorld();
      }
      return;
    }

    const ORIG_WORLD_POS = new Vector3();
    const NEW_WORLD_POS = new Vector3();
    const ORIG_LOCAL_POS = new Vector3();
    const ORIG_LOCAL_QUAT = new Quaternion();

    self.getWorldPosition(ORIG_WORLD_POS);
    ORIG_LOCAL_POS.copy(self.position);
    ORIG_LOCAL_QUAT.copy(self.quaternion);

    const { didYSnap, didHorizontalSnap } = snapAgainstBoxes(
      self,
      candidates,
      snapDistance,
      true,
      Infinity,
      allowY,
    );

    self.getWorldPosition(NEW_WORLD_POS);
    const dx = NEW_WORLD_POS.x - ORIG_WORLD_POS.x;
    const dy = NEW_WORLD_POS.y - ORIG_WORLD_POS.y;
    const dz = NEW_WORLD_POS.z - ORIG_WORLD_POS.z;

    const snappedByBoxes = allowY === true && didYSnap === true || didHorizontalSnap === true;

    if(isGhostSnap === true) {
      if(snappedByBoxes === false) {
        isSnappedRef.current = false;
        lastDidYSnapRef.current = false;
        snapAnchorWorldPosRef.current = null;
        setIsSnapping(false);

        self.position.set(0, 0, 0);
        self.quaternion.identity();
        self.updateMatrixWorld();

        clearNewCustomModelSnapWorldPosition();
        return;
      }

      const anchor = NEW_WORLD_POS.clone();
      snapAnchorWorldPosRef.current = anchor;
      isSnappedRef.current = true;
      setIsSnapping(true);
      lastDidYSnapRef.current = allowY === true && didYSnap === true;

      if(!isNull(self.parent)) {
        const localPos = anchor.clone();

        self.parent.updateWorldMatrix(true, true);
        self.parent.worldToLocal(localPos);
        self.position.copy(localPos);
        self.updateMatrixWorld();
      }

      commitNewCustomModelSnapPosition(self, anchor.y);
      return;
    }

    const moveDist = allowY ? Math.hypot(dx, dy, dz) : Math.hypot(dx, dz);
    let snappedNow = snappedByBoxes;

    if(snappedNow === true && moveDist > snapDistance) {
      snappedNow = false;
    }

    if(snappedNow === false) {
      self.position.copy(ORIG_LOCAL_POS);
      self.quaternion.copy(ORIG_LOCAL_QUAT);
      self.updateMatrixWorld();
    }

    lastDidYSnapRef.current = allowY === true && didYSnap === true && snappedNow;
    isSnappedRef.current = snappedNow;
    setIsSnapping(snappedNow);
  }, [isSemiTransparent]);

  const resetSnapNode = (node: Group | null) => {
    if(isNull(node)) {
      return;
    }

    node.position.set(0, 0, 0);
    node.quaternion.identity();
    node.updateMatrixWorld();
  };

  const posKey = JSON.stringify(_position.toArray());
  const quatKey = JSON.stringify(quaternion.toArray());

  useEffect(() => {
    if(isSemiTransparent === false) {
      return;
    }

    const ghost = dragGhostRef.current;
    const snap = snapNodeRef.current;
    if(isNull(ghost) || isNull(snap)) {
      return;
    }

    const { snapDistanceFactor } = useGlobalSettings.getState();

    const snapDistance = snapDistanceFactor / 10;
    ghost.getWorldPosition(ghostPos.current);

    if(isSnappedRef.current === true) {
      const anchor = snapAnchorWorldPosRef.current;

      if(!isNull(anchor)) {
        const dx = ghostPos.current.x - anchor.x;
        const dz = ghostPos.current.z - anchor.z;
        const planarDistToAnchor = Math.hypot(dx, dz);

        if(planarDistToAnchor > snapDistance) {
          isSnappedRef.current = false;
          snapAnchorWorldPosRef.current = null;

          snap.position.set(0, 0, 0);
          snap.quaternion.identity();
          snap.updateMatrixWorld();

          clearNewCustomModelSnapWorldPosition();
        } else {
          const parent = snap.parent;
          snapLocalPos.current.copy(anchor);

          if(!isNull(parent)) {
            parent.updateWorldMatrix(true, true);
            parent.worldToLocal(snapLocalPos.current);
          }

          snap.position.copy(snapLocalPos.current);
          snap.updateMatrixWorld();

          commitNewCustomModelSnapPosition(snap, anchor.y);
          return;
        }
      }
    }

    snapDynamically(snap, false);

    if(isSnappedRef.current === true) {
      const isWallAfterSnap = snap.userData.__lastSnapIsWall === true;

      if(isWallAfterSnap === false) {
        snap.getWorldPosition(snapPos.current);
        snapAnchorWorldPosRef.current = snapPos.current.clone();
      } else {
        snapAnchorWorldPosRef.current = null;
      }
    } else {
      clearNewCustomModelSnapWorldPosition();
    }
  }, [ghostPos, snapLocalPos, snapPos, isSemiTransparent, posKey, quatKey, snapDynamically]);

  useEffect(() => {
    const { newCustomModel } = useNewCustomModel.getState();
    if(!isNull(newCustomModel) && newCustomModel.id === id) {
      return;
    }

    if(isNull(overrideMaterials)) {
      assignMaterialsToScene(clonedScene, modelMaterials);
      setCustomModelParams(id, { overrideMaterials: {} });

      for(const { textureName, modelCategory, texture, overlayColor } of modelTextureOverlays) {
        if(!isUndefined(modelCategoriesChain.find(e => e.id === modelCategory.id))) {
          setCustomModelOverrideMaterialParams(id, textureName, null, {
            texture,
            compositeOperation: compositeOperations[0],
            commentTextureAppearance: '',
            commentTextureOverlayColor: '',
            colorOverlay: isNull(overlayColor) ? null : {
              type: 'predefined',
              value: new Color(overlayColor),
            },
          });
        }
      }
    } else {
      assignTextureMapsToScene(clonedScene, overrideMaterials);
    }
  }, [overrideMaterials, clonedScene, url, id, modelTextureOverlays, modelCategoriesChain, modelMaterials]);

  const flipHorizontal = isFlippedHorizontal === true ? -1 : 1;
  const mirror = isMirrored === true ? -1 : 1;

  const customModelPrimitiveGroupRef = useRef<Group>(null);
  useEffect(() => {
    if(isNull(customModelPrimitiveGroupRef.current)) {
      return;
    }

    enableOutlineLayer(customModelPrimitiveGroupRef.current);
  }, [viewMode]);

  const is2DRepresentationImageShown = viewMode === '2D' && !isNull(representation2DImage);
  const position = (
    is2DRepresentationImageShown === false
      ? _position
      : new Vector3(
        _position.x,
        Math.max(_position.y, targetLevel.elevation + targetLevel.height + 0.01),
        _position.z,
      )
  );

  const finalWidth = isNull(width) ? w : width;
  const finalHeight = isNull(height) ? h : height;
  const finalDepth = isNull(depth) ? d : depth;
  const scaleXYZ = tuple(finalWidth / w, finalHeight / h, finalDepth / d);

  const fallbackModelNode = (
    <group
      ref={customModelPrimitiveGroupRef}
      scale={scaleXYZ}
      position={
        new Vector3(
          center.x * (1 - flipHorizontal) * scaleXYZ[0],
          0,
          center.z * (1 - mirror) * scaleXYZ[2],
        )
      }
    >
      <primitive object={clonedScene} scale={[flipHorizontal, 1, mirror]} />
    </group>
  );

  const modelBody = (
    <InstancedSlot
      id={id}
      url={url}
      basePosition={position}
      quaternion={quaternion}
      scaleXYZ={scaleXYZ}
      flip={flipHorizontal}
      mirror={mirror}
      center={center}
      isSemiTransparent={isSemiTransparent}
      is2DRepresentationImageShown={is2DRepresentationImageShown}
      overrideMaterials={overrideMaterials}
      fallback={fallbackModelNode}
      hitBoxSize={[finalWidth, finalHeight, finalDepth]}
    />
  );

  return (
    <group
      ref={containerRef}
      {
        ...creationMode === 'pointer' && {
          onPointerUp(e) {
            e.stopPropagation();
          },
        }
      }
      {
        ...creationMode === 'walls' && {
          onClick(e) {
            const { creationModeConfig } = useCreationModeConfig.getState();

            if(e.button !== 0 || e.delta > 2 || creationModeConfig.mode === 'multipleStraightLines') {
              return;
            }
            e.stopPropagation();

            useCreationMode.setState({ creationMode: 'pointer' });
            useSelectedItem.setState({
              selectedItem: {
                type: 'customModel',
                id,
                mode: 'selected',
              },
            });
            usePopUpToolbar.setState({
              popUpToolbar: {
                type: 'customModel',
                id,
                coords: new Vector2(e.clientX, e.clientY),
              },
            });
          },
        } satisfies Partial<GroupProps>
      }
      {
        ...creationMode === 'pointer' && isMoving3DModel === false && {
          onPointerEnter(e) {
            e.stopPropagation();

            if(isTouchScreen === false) {
              setIsHovered(true);
            }
            setCursor(isSelected === true && selectedItem.mode === 'selected' ? 'grab' : 'pointer');
          },
          onPointerLeave(e) {
            e.stopPropagation();

            if(isTouchScreen === false) {
              setIsHovered(false);
            }
            setCursor(null);
          },
          onPointerUp(e) {
            if(e.button !== 0) {
              return;
            }
            e.stopPropagation();

            if(handleAppearanceSample(e)) {
              return;
            }

            setCursor('grab');
            useSelectedItem.setState({
              selectedItem: {
                type: 'customModel',
                id,
                mode: 'selected',
              },
            });
            usePopUpToolbar.setState({
              popUpToolbar: {
                type: 'customModel',
                id,
                coords: new Vector2(e.clientX, e.clientY),
              },
            });
          },
        } satisfies Partial<GroupProps>
      }
    >
      {
        isSelected === true
          ? (
            <DragControls
              // Note: key here is needed to remount PivotControls on global new position
              key={JSON.stringify([_position.toArray()])}
              autoTransform={isMoving3DModel === true && selectedItem.mode === 'selected'}
              axisLock='y'
              onDragStart={() => {
                if(isPivotActive === true) {
                  return;
                }

                setCursor('grabbing');
                useIsMoving3DModel.setState({ isMoving3DModel: true });

                isSnappedRef.current = false;
                setIsSnapping(false);
                snapAnchorWorldPosRef.current = null;

                const snap = snapNodeRef.current;
                if(!isNull(snap)) {
                  snap.position.set(0, 0, 0);
                  snap.quaternion.identity();
                  snap.updateMatrixWorld();
                }

                snapDynamically(snapNodeRef.current, false);
              }}
              onDrag={() => {
                if(isTouchScreen === false) {
                  setIsHovered(false);
                }
                if(isPivotActive === true) {
                  return;
                }

                const { snapDistanceFactor } = useGlobalSettings.getState();

                const snapDistance = snapDistanceFactor / 10;
                const ghost = dragGhostRef.current;
                const snap = snapNodeRef.current;
                if(isNull(ghost) || isNull(snap)) {
                  return;
                }

                ghost.getWorldPosition(ghostPos.current);
                snap.getWorldPosition(snapPos.current);

                const isWallSnap = snap.userData.__lastSnapIsWall === true;

                if(isSnappedRef.current === true) {
                  const dx = ghostPos.current.x - snapPos.current.x;
                  const dz = ghostPos.current.z - snapPos.current.z;
                  const planarDistToSnap = Math.hypot(dx, dz);

                  if(isWallSnap === true) {
                    if(planarDistToSnap > snapDistance) {
                      isSnappedRef.current = false;
                      setIsSnapping(false);
                      snapAnchorWorldPosRef.current = null;

                      snap.position.set(0, 0, 0);
                      snap.quaternion.identity();
                      snap.updateMatrixWorld();
                    } else {
                      snapDynamically(snapNodeRef.current, false);
                      return;
                    }
                  } else {
                    const anchor = snapAnchorWorldPosRef.current;

                    if(!isNull(anchor)) {
                      const distToAnchor = planarDistToSnap;

                      if(distToAnchor > snapDistance) {
                        isSnappedRef.current = false;
                        setIsSnapping(false);
                        snapAnchorWorldPosRef.current = null;

                        snap.position.set(0, 0, 0);
                        snap.quaternion.identity();
                        snap.updateMatrixWorld();
                      } else {
                        const parent = snap.parent;
                        snapLocalPos.current.copy(anchor);

                        if(!isNull(parent)) {
                          parent.updateWorldMatrix(true, true);
                          parent.worldToLocal(snapLocalPos.current);
                        }

                        snap.position.copy(snapLocalPos.current);
                        snap.updateMatrixWorld();
                        return;
                      }
                    }
                  }
                }

                snapDynamically(snapNodeRef.current, false);

                if(isSnappedRef.current === true && !isNull(snapNodeRef.current)) {
                  const isWallAfterSnap = snapNodeRef.current.userData.__lastSnapIsWall === true;

                  if(isWallAfterSnap === false) {
                    snapNodeRef.current.getWorldPosition(snapPos.current);
                    snapAnchorWorldPosRef.current = snapPos.current.clone();
                  } else {
                    snapAnchorWorldPosRef.current = null;
                  }
                }
              }}
              onDragEnd={() => {
                assert(!isNull(ref.current), 'This should never happen. |ga4if8|');
                if(isPivotActive === true) {
                  return;
                }

                const ghost = dragGhostRef.current;
                const snapNode = snapNodeRef.current;

                const position = new Vector3();
                const q = new Quaternion();

                let shouldUseSnapNode = false;

                if(isSnappedRef.current === true && !isNull(ghost) && !isNull(snapNode)) {
                  ghost.getWorldPosition(ghostPos.current);
                  snapNode.getWorldPosition(snapPos.current);

                  const { snapDistanceFactor } = useGlobalSettings.getState();

                  const snapDistance = snapDistanceFactor / 10;
                  const dx = ghostPos.current.x - snapPos.current.x;
                  const dz = ghostPos.current.z - snapPos.current.z;
                  const planarDistToSnap = Math.hypot(dx, dz);

                  shouldUseSnapNode = planarDistToSnap <= snapDistance;
                }

                if(shouldUseSnapNode === true && !isNull(snapNode)) {
                  snapNode.getWorldPosition(position);
                  snapNode.getWorldQuaternion(q);
                } else if(!isNull(ghost)) {
                  ghost.getWorldPosition(position);
                  ghost.getWorldQuaternion(q);
                  resetSnapNode(snapNode);
                } else {
                  position.copy(_position);
                  q.copy(quaternion);
                  resetSnapNode(snapNode);
                }

                position.y = _position.y;

                setCursor(null);
                setCustomModelParams(id, { position, quaternion: q });
                useIsMoving3DModel.setState({ isMoving3DModel: false });
                isSnappedRef.current = false;
                setIsSnapping(false);
                snapAnchorWorldPosRef.current = null;
              }}
            >
              <group ref={dragGhostRef} position={position} quaternion={quaternion}>
                <PivotControls
                  key={JSON.stringify([_position.toArray(), width, height, depth])}
                  ref={ref}
                  depthTest={false}
                  annotations
                  autoTransform
                  scale={selectedItem.mode === 'scale' ? 1 : 2}
                  axisColors={selectedItem.mode === 'scale' ? ['#ff2060', '#20df80', '#2080ff'] : ['red', '#fd5631', 'blue']}
                  activeAxes={[
                    selectedItem.mode === 'scale',
                    selectedItem.mode === 'scale' && viewMode !== '2D',
                    selectedItem.mode === 'scale',
                  ]}
                  disableAxes={selectedItem.mode !== 'scale'}
                  disableScaling={selectedItem.mode !== 'scale'}
                  disableSliders={selectedItem.mode !== 'scale'}
                  onDragStart={() => {
                    setPivotActive(true);
                    pivotEndingRef.current = false;
                    setCursor('grabbing');
                    useIsMoving3DModel.setState({ isMoving3DModel: true });
                    lastSnapWasFromPivotRef.current = true;

                    isSnappedRef.current = false;
                    setIsSnapping(false);
                    snapAnchorWorldPosRef.current = null;

                    const snapNode = snapNodeRef.current;
                    if(!isNull(snapNode)) {
                      snapNode.position.set(0, 0, 0);
                      snapNode.updateMatrixWorld();
                      snapDynamically(snapNode, true);
                    }
                  }}
                  onDrag={() => {
                    const pivot = ref.current;
                    const snapNode = snapNodeRef.current;
                    if(isNull(pivot) || isNull(snapNode)) {
                      return;
                    }

                    const { snapDistanceFactor } = useGlobalSettings.getState();

                    const snapDistance = snapDistanceFactor / 10;
                    pivot.getWorldPosition(ghostPos.current);

                    const isWallSnap = snapNode.userData.__lastSnapIsWall === true;

                    if(isSnappedRef.current === true) {
                      snapNode.getWorldPosition(snapPos.current);
                      const dx = ghostPos.current.x - snapPos.current.x;
                      const dy = ghostPos.current.y - snapPos.current.y;
                      const dz = ghostPos.current.z - snapPos.current.z;
                      const distToSnap = Math.hypot(dx, dy, dz);

                      if(isWallSnap === true) {
                        if(distToSnap > snapDistance) {
                          isSnappedRef.current = false;
                          setIsSnapping(false);
                          snapAnchorWorldPosRef.current = null;

                          snapNode.position.set(0, 0, 0);
                          snapNode.quaternion.identity();
                          snapNode.updateMatrixWorld();
                        } else {
                          snapDynamically(snapNode, true);
                          return;
                        }
                      } else {
                        const anchor = snapAnchorWorldPosRef.current;

                        if(!isNull(anchor)) {
                          const dxA = ghostPos.current.x - anchor.x;
                          const dyA = ghostPos.current.y - anchor.y;
                          const dzA = ghostPos.current.z - anchor.z;
                          const distToAnchor = Math.hypot(dxA, dyA, dzA);

                          if(distToAnchor > snapDistance) {
                            isSnappedRef.current = false;
                            setIsSnapping(false);
                            snapAnchorWorldPosRef.current = null;

                            snapNode.position.set(0, 0, 0);
                            snapNode.quaternion.identity();
                            snapNode.updateMatrixWorld();
                          } else {
                            const parent = snapNode.parent;
                            snapLocalPos.current.copy(anchor);

                            if(!isNull(parent)) {
                              parent.updateWorldMatrix(true, true);
                              parent.worldToLocal(snapLocalPos.current);
                            }

                            snapNode.position.copy(snapLocalPos.current);
                            snapNode.updateMatrixWorld();
                            return;
                          }
                        }
                      }
                    }

                    snapDynamically(snapNode, true);

                    if(isSnappedRef.current === true) {
                      const isWallAfterSnap = snapNode.userData.__lastSnapIsWall === true;

                      if(isWallAfterSnap === false) {
                        snapNode.getWorldPosition(snapPos.current);
                        snapAnchorWorldPosRef.current = snapPos.current.clone();
                      } else {
                        snapAnchorWorldPosRef.current = null;
                      }
                    }
                  }}
                  onDragEnd={() => {
                    assert(!isNull(ref.current), 'This should never happen. |w6r0rs|');

                    const pivot = ref.current;
                    const snapNode = snapNodeRef.current;

                    const base = (() => {
                      if(isSnappedRef.current === true && !isNull(snapNode)) {
                        pivot.getWorldPosition(ghostPos.current);
                        snapNode.getWorldPosition(snapPos.current);

                        const { snapDistanceFactor } = useGlobalSettings.getState();

                        const snapDistance = snapDistanceFactor / 10;
                        const dx = ghostPos.current.x - snapPos.current.x;
                        const dy = ghostPos.current.y - snapPos.current.y;
                        const dz = ghostPos.current.z - snapPos.current.z;
                        const distToSnap = Math.hypot(dx, dy, dz);

                        if(distToSnap <= snapDistance) {
                          return snapNode;
                        }

                        resetSnapNode(snapNode);
                      }

                      return pivot;
                    })();

                    const position = new Vector3();
                    const quaternion = new Quaternion();
                    const scale = new Vector3();

                    base.getWorldPosition(position);
                    base.getWorldQuaternion(quaternion);
                    pivot.getWorldScale(scale);

                    const newWidth = finalWidth * scale.x;
                    const newHeight = finalHeight * scale.y;
                    const newDepth = finalDepth * scale.z;

                    setCursor(null);
                    setCustomModelParams(
                      id,
                      {
                        position,
                        quaternion,
                        width: isPositive(newWidth) ? newWidth : Positive(0.01),
                        height: isPositive(newHeight) ? newHeight : Positive(0.01),
                        depth: isPositive(newDepth) ? newDepth : Positive(0.01),
                      },
                    );
                    useIsMoving3DModel.setState({ isMoving3DModel: false });

                    if(selectedItem.mode === 'scale') {
                      useSelectedItem.setState({
                        selectedItem: {
                          type: 'customModel',
                          id,
                          mode: 'scale',
                        },
                      });
                    }

                    setPivotActive(false);
                    isSnappedRef.current = false;
                    setIsSnapping(false);
                    snapAnchorWorldPosRef.current = null;
                  }}
                >
                  <group ref={snapNodeRef}>
                    <SelectionOutline
                      w={finalWidth}
                      h={finalHeight}
                      d={finalDepth}
                      isSelected={isSelected}
                      isSnapping={isSnapping}
                      position={new Vector3(0, isNull(height) ? h / 2 : height / 2, 0)}
                      isCurrentItemSettingsOpened={isCurrentItemSettingsOpened}
                    />
                    {
                      is2DRepresentationImageShown === true && Math.abs(quaternion.x) <= 0.01 && Math.abs(quaternion.z) <= 0.01
                        ? (
                          <Plane args={[finalWidth, finalDepth]} rotation-x={-Math.PI / 2}>
                            <meshBasicMaterial
                              map={getNotUndefined(representation2DImageTexture[0], 'This should never happen. |pp3v9r|')}
                              side={DoubleSide}
                              polygonOffset
                              polygonOffsetFactor={-1}
                              polygonOffsetUnits={-1}
                              toneMapped={false}
                              transparent
                            />
                          </Plane>
                        )
                        : modelBody
                    }
                  </group>
                </PivotControls>
              </group>
            </DragControls>
          )
          : (
            <group ref={dragGhostRef} position={position} quaternion={quaternion}>
              <group ref={snapNodeRef}>
                {
                  isHovered === true && (
                    <SelectionOutline
                      w={finalWidth}
                      h={finalHeight}
                      d={finalDepth}
                      isSelected={isSelected}
                      isSnapping={isSnapping}
                      position={new Vector3(0, isNull(height) ? h / 2 : height / 2, 0)}
                      isCurrentItemSettingsOpened={isCurrentItemSettingsOpened}
                    />
                  )
                }
                {
                  is2DRepresentationImageShown === true && Math.abs(quaternion.x) <= 0.01 && Math.abs(quaternion.z) <= 0.01
                    ? (
                      <Plane args={[finalWidth, finalDepth]} rotation-x={-Math.PI / 2}>
                        <meshBasicMaterial
                          map={getNotUndefined(representation2DImageTexture[0], 'This should never happen. |8u4oz5|')}
                          side={DoubleSide}
                          polygonOffset
                          polygonOffsetFactor={-1}
                          polygonOffsetUnits={-1}
                          toneMapped={false}
                          transparent
                        />
                      </Plane>
                    )
                    : modelBody
                }
              </group>
            </group>
          )
      }
    </group>
  );
}));

export const CustomModels: React.FC = () => {
  const isCustomModelsShown = useGlobalSettings(s => s.isCustomModelsShown);
  const isColumnsShown = useGlobalSettings(s => s.isColumnsShown);
  const isAssets2DShown = useGlobalSettings(s => s.isAssets2DShown);
  const { customModels } = useCustomModels();
  const { levels } = useLevels();

  return (
    customModels
      .filter(e => getNotUndefined(levels.find(({ id }) => id === e.levelId), 'This should never happen. |73w0tj|').isLevelVisible)
      .filter(e => (
        false
          || isCustomModelsShown === true && e.type === 'regular'
          || isColumnsShown === true && e.type === 'column'
          || isAssets2DShown === true && e.type === 'asset-2d'
      ))
      .filter(e => e.isHidden === false || e.type === 'asset-2d')
      .map(e => (
        e.type === 'asset-2d'
          ? <Asset2D key={e.id} {...e} />
          : <CustomModel key={e.id} {...e} />
      ))
  );
};
