import { Positive } from '@draw-house/common/dist/brands';
import { BackSide, Box3, BufferGeometry, DoubleSide, Euler, Group, Mesh, Vector2, Vector3 } from 'three';
import { fixIEEE } from '@draw-house/common/dist/utils';
import { useEffect, useMemo, useRef } from 'react';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { GroupProps } from '@react-three/fiber';
import { getNotNull, getNotUndefined, isNull, isUndefined } from '@arthurka/ts-utils';
import Color from 'color';
import { Plane, useTexture } from '@react-three/drei';
import assert from 'assert';
import { duplicateWallFurniture, setCursor, setWallFurnitureOverrideMaterialParams, setWallFurnitureParams, useCreationMode, useCreationModeConfig, useLevels, usePopUpToolbar, useTempWallFurniture, useViewMode, WallsStore } from '../../../zustand';
import { compositeOperations, semiTransparentElementsOpacity, semiTransparentElementsOpacity2, twoDFurnitureColor } from '../../../constants';
import { BorderedPlane, DoorTrajectory } from './TwoDView';
import { SuspenseHOC } from '../../SuspenseHOC';
import { makeModelSemiTransparent } from '../../../utils/makeModelSemiTransparent';
import { assignTextureMapsToScene } from '../../../utils/assignTextureMapsToScene';
import { useModelMaterials } from '../../../zustand/useModelMaterials/store';
import { assignMaterialsToScene } from '../../../utils/assignMaterialsToScene';
import { enableOutlineLayer } from '../../../utils/enableOutlineLayer';
import { useModelTextureOverlaysResolved } from '../../../zustand/useModelTextureOverlays';
import { getModelCategoriesChain } from '../../../utils/getModelCategoriesChain';
import { useGLTFWithAutoUV } from '../../../utils/useGLTFWithAutoUV';
import { useCanMoveWall } from '../../../zustand/useCanMoveWall';
import { registerSceneObject, unregisterSceneObject } from '../../../zustand/useSceneObjects';
import { SelectionOutline } from '../../SelectionOutline';
import { useIsMoving3DModel } from '../../../zustand/useIsMoving3DModel';
import { useSelectedItem } from '../../../zustand/useSelectedItem';
import { handleAppearanceSample } from '../../../utils/handleAppearanceSample';
import { useIsCurrentItemSettingsOpened } from '../../../customHooks/useIsCurrentItemSettingsOpened';

export type WallFurnitureProps = {
  furniture: WallsStore['walls'][number]['furnitures'][number];
  wallLength: number;
  wallHeight: Positive;
  wallThickness: Positive;
  isOverFloorPlan: boolean;
  levelId: WallsStore['walls'][number]['levelId'];
};

export const WallFurniture: React.FC<WallFurnitureProps> = SuspenseHOC(({
  wallLength,
  wallHeight,
  wallThickness,
  isOverFloorPlan,
  levelId,
  furniture: {
    id,
    type,
    onWallCoordinateX,
    onWallCoordinateY,
    isFlippedHorizontal,
    isMirrored,
    url,
    width,
    height,
    depth,
    overrideMaterials,
  },
}) => {
  const { creationMode } = useCreationMode();
  const { viewMode } = useViewMode();
  const { tempWallFurniture } = useTempWallFurniture();
  const { modelTextureOverlays } = useModelTextureOverlaysResolved();
  const { selectedItem } = useSelectedItem();
  const { levels } = useLevels();
  const isCurrentItemSettingsOpened = useIsCurrentItemSettingsOpened({ type, id });

  const flipHorizontal = isFlippedHorizontal === true ? -1 : 1;
  const mirror = isMirrored === true ? -1 : 1;
  const badPosition = Math.abs(onWallCoordinateX) > fixIEEE(wallLength / 2);
  const isSemiTransparent = isNull(tempWallFurniture) ? false : id === tempWallFurniture.furniture.id;

  const targetLevel = getNotUndefined(levels.find(e => e.id === levelId), 'This should never happen. |mzj23r|');
  const modelCategoriesChain = useMemo(() => getModelCategoriesChain(url), [url]);
  const modelCategoryData = (() => {
    const modelCategory = modelCategoriesChain.find(e => !isNull(e.representation2DImage));
    if(isUndefined(modelCategory)) {
      return null;
    }

    return {
      representation2DImage: getNotNull(modelCategory.representation2DImage, 'This should never happen. |jh7n9s|'),
      tileSize: modelCategory.representation2DImageTileSize,
    };
  })();
  const representation2DImageTexture = useTexture(isNull(modelCategoryData) ? [] : [modelCategoryData.representation2DImage]);

  const { scene } = useGLTFWithAutoUV(url);
  const { clonedScene, w, h, d } = useMemo(() => {
    const clonedScene = clone(scene);
    const box = new Box3().setFromObject(clonedScene);

    const { x, y, z } = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());

    clonedScene.position.sub(new Vector3(x, y - size.y / 2, z));

    if(isSemiTransparent === true || isOverFloorPlan === true) {
      makeModelSemiTransparent(clonedScene);
    }

    return {
      clonedScene,
      w: size.x,
      h: size.y,
      d: size.z,
    };
  }, [isOverFloorPlan, isSemiTransparent, scene]);

  useEffect(() => {
    clonedScene.traverse(obj => {
      if(obj instanceof Mesh) {
        assert(obj.geometry instanceof BufferGeometry, 'Something went wrong. |m4k7aj|');

        if(isNull(obj.geometry.boundingBox)) {
          obj.geometry.computeBoundingBox();
        }
      }
    });

    clonedScene.updateMatrixWorld(true);
  }, [clonedScene]);

  useEffect(() => {
    if(isNull(overrideMaterials)) {
      const { modelMaterials } = useModelMaterials.getState();
      const modelCategoriesChain = getModelCategoriesChain(url);

      assignMaterialsToScene(clonedScene, modelMaterials);
      setWallFurnitureParams(id, null, { overrideMaterials: {} });

      for(const { textureName, modelCategory, texture, overlayColor } of modelTextureOverlays) {
        if(!isUndefined(modelCategoriesChain.find(e => e.id === modelCategory.id))) {
          setWallFurnitureOverrideMaterialParams(id, textureName, null, {
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
  }, [overrideMaterials, clonedScene, modelTextureOverlays, id, url]);

  const twoDProjectionWidth = isNull(width) ? w : width;
  const outlineWidth = 0.03;

  const wallFurnitureModelPrimitiveRef = useRef<Group>(null);

  useEffect(() => {
    if(viewMode !== '3D' || isNull(wallFurnitureModelPrimitiveRef.current)) {
      unregisterSceneObject(`${type}:${id}`);
      return;
    }

    wallFurnitureModelPrimitiveRef.current.updateMatrixWorld(true);
    registerSceneObject(`${type}:${id}`, wallFurnitureModelPrimitiveRef.current);

    return () => {
      unregisterSceneObject(`${type}:${id}`);
    };
  }, [viewMode, id, type]);

  useEffect(() => {
    wallFurnitureModelPrimitiveRef.current?.updateMatrixWorld(true);
  }, [onWallCoordinateX, onWallCoordinateY, width, height, depth, isFlippedHorizontal, isMirrored, w, h, d]);

  useEffect(() => {
    if(isNull(wallFurnitureModelPrimitiveRef.current)) {
      return;
    }

    enableOutlineLayer(wallFurnitureModelPrimitiveRef.current);
  }, [url, isSemiTransparent, viewMode]);

  return (
    <group
      {
        ...creationMode === 'walls' && {
          onClick(e) {
            const { creationModeConfig } = useCreationModeConfig.getState();
            const { canMoveWall } = useCanMoveWall.getState();

            if(e.button !== 0 || e.delta > 2 || creationModeConfig.mode === 'multipleStraightLines' || canMoveWall === true) {
              return;
            }
            e.stopPropagation();

            usePopUpToolbar.setState({
              popUpToolbar: {
                type,
                id,
                coords: new Vector2(e.clientX, e.clientY),
              },
            });
          },
        } satisfies Partial<GroupProps>
      }
      visible={wallLength > wallThickness}
      {
        ...creationMode === 'pointer' && targetLevel.isActive === true && {
          onPointerEnter(e) {
            e.stopPropagation();

            const { isMoving3DModel } = useIsMoving3DModel.getState();

            if(isMoving3DModel === false) {
              setCursor('pointer');
            }
          },
          onPointerLeave(e) {
            e.stopPropagation();

            const { isMoving3DModel } = useIsMoving3DModel.getState();

            if(isMoving3DModel === false) {
              setCursor(null);
            }
          },
          onPointerDown(e) {
            if(e.button !== 0) {
              return;
            }
            e.stopPropagation();

            if(!isNull(selectedItem) && selectedItem.id === id && selectedItem.type === 'wallFurniture' && selectedItem.mode === 'selected') {
              useSelectedItem.setState({
                selectedItem: {
                  type: 'wallFurniture',
                  id,
                  mode: 'move',
                },
              });
              useIsMoving3DModel.setState({ isMoving3DModel: true });
              usePopUpToolbar.setState({
                popUpToolbar: {
                  type,
                  id,
                  coords: new Vector2(e.clientX, e.clientY),
                },
              });
              duplicateWallFurniture(true);
              setCursor('grabbing');
            }
          },
          onPointerUp(e) {
            if(e.button !== 0) {
              return;
            }
            e.stopPropagation();

            if(handleAppearanceSample(e)) {
              return;
            }

            useSelectedItem.setState({
              selectedItem: {
                type: 'wallFurniture',
                id,
                mode: 'selected',
              },
            });
            usePopUpToolbar.setState({
              popUpToolbar: {
                type,
                id,
                coords: new Vector2(e.clientX, e.clientY),
              },
            });
          },
        } satisfies Partial<GroupProps>
      }
    >
      {
        viewMode === '3D'
          ? (
            <group>
              <group
                userData={{ furnitureId: id }}
                ref={wallFurnitureModelPrimitiveRef}
                position={new Vector3(onWallCoordinateX, onWallCoordinateY - wallHeight / 2, 0)}
                scale={[
                  flipHorizontal * (isNull(width) ? 1 : width / w),
                  isNull(height) ? 1 : height / h,
                  mirror * (isNull(depth) ? 1 : depth / d),
                ]}
              >
                <primitive renderOrder={1} object={clonedScene} />
              </group>
              {
                !isNull(selectedItem) && selectedItem.id === id && selectedItem.type === 'wallFurniture' && (
                  <SelectionOutline
                    w={isNull(width) ? w : width}
                    h={isNull(height) ? h : height}
                    d={(isNull(depth) ? d : depth) + ((isNull(depth) ? d : depth) <= wallThickness ? wallThickness - (isNull(depth) ? d : depth) : 0)}
                    isSelected={selectedItem.mode === 'selected'}
                    isSnapping={selectedItem.mode !== 'selected'}
                    position={new Vector3(onWallCoordinateX, onWallCoordinateY - wallHeight / 2 + (isNull(height) ? h : height) / 2, 0)}
                    isCurrentItemSettingsOpened={isCurrentItemSettingsOpened}
                  />
                )
              }
            </group>
          )
          : !isNull(modelCategoryData)
            ? (
              <group>
                <Plane
                  userData={{ furnitureId: id }}
                  args={[
                    flipHorizontal * (isNull(width) ? w : width) * (1 + modelCategoryData.tileSize.right + modelCategoryData.tileSize.left),
                    mirror * (wallThickness + outlineWidth * 2) * (1 + modelCategoryData.tileSize.bottom + modelCategoryData.tileSize.top),
                  ]}
                  rotation-x={-Math.PI / 2}
                  position={
                    new Vector3(
                      // eslint-disable-next-line max-len
                      onWallCoordinateX + (isNull(width) ? w : width) * flipHorizontal * (modelCategoryData.tileSize.right - modelCategoryData.tileSize.left) / 2,
                      wallHeight / 2 + 0.01,
                      (wallThickness + outlineWidth * 2) * mirror * (modelCategoryData.tileSize.bottom - modelCategoryData.tileSize.top) / 2,
                    )
                  }
                >
                  <meshBasicMaterial
                    map={getNotUndefined(representation2DImageTexture[0], 'This should never happen. |a5we2m|')}
                    side={DoubleSide}
                    polygonOffset
                    polygonOffsetFactor={-1}
                    polygonOffsetUnits={-1}
                    toneMapped={false}
                    transparent
                    opacity={
                      targetLevel.isActive === false
                        ? semiTransparentElementsOpacity
                        : isOverFloorPlan === true
                          ? semiTransparentElementsOpacity2
                          : 1
                    }
                  />
                </Plane>
                {
                  !isNull(selectedItem) && selectedItem.id === id && selectedItem.type === 'wallFurniture' && (
                    <SelectionOutline
                      w={twoDProjectionWidth * (1 + modelCategoryData.tileSize.right + modelCategoryData.tileSize.left)}
                      h={wallThickness + outlineWidth * 2}
                      d={wallThickness}
                      isSelected={selectedItem.mode === 'selected'}
                      isSnapping={selectedItem.mode !== 'selected'}
                      position={new Vector3(onWallCoordinateX, wallHeight / 2 + 0.01, 0)}
                      isCurrentItemSettingsOpened={isCurrentItemSettingsOpened}
                    />
                  )
                }
              </group>
            )
            : (
              <group>
                <BorderedPlane
                  furnitureId={id}
                  width={twoDProjectionWidth}
                  height={wallThickness}
                  color={badPosition === true ? 'red' : 'white'}
                  lineColor={twoDFurnitureColor}
                  outlineWidth={outlineWidth}
                  rotation={new Euler(Math.PI / 2, 0, 0)}
                  position={new Vector3(onWallCoordinateX, wallHeight / 2 + 0.01, 0)}
                  side={BackSide}
                  opacity={
                    targetLevel.isActive === false
                      ? semiTransparentElementsOpacity
                      : isOverFloorPlan === true
                        ? semiTransparentElementsOpacity2
                        : 1
                  }
                />
                {
                  type === 'door' && (
                    <DoorTrajectory
                      furnitureId={id}
                      radius={twoDProjectionWidth + 2 * outlineWidth}
                      position={[
                        onWallCoordinateX - flipHorizontal * (twoDProjectionWidth + outlineWidth * 2) / 2,
                        wallHeight / 2,
                        mirror * (wallThickness / 2 + outlineWidth),
                      ]}
                      outlineWidth={outlineWidth}
                      isFlippedHorizontal={isFlippedHorizontal}
                      isMirrored={isMirrored}
                      color={badPosition === true ? 'red' : twoDFurnitureColor}
                      opacity={
                        targetLevel.isActive === false
                          ? semiTransparentElementsOpacity
                          : isOverFloorPlan === true
                            ? semiTransparentElementsOpacity2
                            : 1
                      }
                    />
                  )
                }
                {
                  !isNull(selectedItem) && selectedItem.id === id && selectedItem.type === 'wallFurniture' && (
                    <SelectionOutline
                      w={twoDProjectionWidth}
                      h={wallThickness}
                      d={wallThickness}
                      isSelected={selectedItem.mode === 'selected'}
                      isSnapping={selectedItem.mode !== 'selected'}
                      position={new Vector3(onWallCoordinateX, wallHeight / 2 + 0.01, 0)}
                      isCurrentItemSettingsOpened={isCurrentItemSettingsOpened}
                    />
                  )
                }
              </group>
            )
      }
    </group>
  );
});
