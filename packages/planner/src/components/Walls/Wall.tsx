import { getNotUndefined, isArrayIncludes, isNull, isUndefined } from '@arthurka/ts-utils';
import { Positive } from '@draw-house/common/dist/brands';
import { GroupProps, ThreeEvent } from '@react-three/fiber';
import assert from 'assert';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Group, Vector2, Vector3 } from 'three';
import { calculateWallCornersDiff, getVector2Distance, snapPosition } from '../../utils';
import { createWallFurnitureFromTempWallFurniture, furnitureCreationModes, GlobalSettingsStore, LevelsStore, setCursor, setTempWallFurnitureCoordinate, setTempWallFurnitureIsOnWall, showSlideUpMenuLvl1, useCreationMode, useCreationModeConfig, useIsDesktopMenu, useLevels, usePopUpToolbar, useSlideUpMenuLvl1, useSpaces, useViewMode, useWallMover, WallsStore } from '../../zustand';
import { WallFurnitures } from './WallFurnitures';
import { WallSides } from './WallSides';
import { WallSize } from './WallSize';
import { WallOutline2D } from './WallOutline2D';
import { useCanMoveWall } from '../../zustand/useCanMoveWall';
import { registerSceneObject, unregisterSceneObject } from '../../zustand/useSceneObjects';
import { useIsMoving3DModel } from '../../zustand/useIsMoving3DModel';
import { useSelectedItem } from '../../zustand/useSelectedItem';
import { useDollhouseViewMode } from '../../customHooks/useDollhouseViewMode';
import { WallSidesSpaceRelations } from '../../utils/getWallSidesSpaceRelations';
import { semiTransparentElementsOpacity2 } from '../../constants';

export type WallProps = {
  position: WallsStore['walls'][number]['position'];
  frontTexture: WallsStore['walls'][number]['frontTexture'];
  backTexture: WallsStore['walls'][number]['backTexture'];
  id: WallsStore['walls'][number]['id'];
  levelId: WallsStore['walls'][number]['levelId'];
  isActiveLevel: LevelsStore['levels'][number]['isActive'];
  thickness: WallsStore['walls'][number]['thickness'];
  furnitures: WallsStore['walls'][number]['furnitures'];
  wallHeight: Positive;
  elevation: number;
  opacity: number;
  isOverFloorPlan: boolean;
  isMeasurementsShown1: GlobalSettingsStore['isMeasurementsShown1'];
  isMeasurementsShown2: GlobalSettingsStore['isMeasurementsShown2'];
  cornersDiff: ReturnType<typeof calculateWallCornersDiff>[number]['cornersDiff'];
  frontColorOverlay: WallsStore['walls'][number]['frontColorOverlay'];
  backColorOverlay: WallsStore['walls'][number]['backColorOverlay'];
  frontCompositeOperation: WallsStore['walls'][number]['frontCompositeOperation'];
  backCompositeOperation: WallsStore['walls'][number]['backCompositeOperation'];
  polygonOffset: number;
  wallSidesRelations: WallSidesSpaceRelations | undefined;
  excludeFromRoofCutting: WallsStore['walls'][number]['excludeFromRoofCutting'];
  dormerRoofId: WallsStore['walls'][number]['dormerRoofId'];
};

export const Wall: React.FC<WallProps> = ({
  id,
  levelId,
  isActiveLevel,
  frontTexture,
  backTexture,
  furnitures,
  wallHeight,
  elevation,
  opacity,
  isOverFloorPlan,
  thickness,
  cornersDiff,
  isMeasurementsShown1,
  isMeasurementsShown2,
  frontColorOverlay,
  backColorOverlay,
  frontCompositeOperation,
  backCompositeOperation,
  position,
  polygonOffset,
  position: {
    start,
    end,
  },
  wallSidesRelations,
  excludeFromRoofCutting,
  dormerRoofId,
}) => {
  const { creationMode } = useCreationMode();
  const { viewMode } = useViewMode();
  const { wallMover } = useWallMover();
  const { spaces } = useSpaces();
  const { levels } = useLevels();
  const { canMoveWall } = useCanMoveWall();
  const isTargetWallOpenedInPopUpToolbar = usePopUpToolbar(s => !isNull(s.popUpToolbar) && s.popUpToolbar.type === 'wall' && s.popUpToolbar.id === id);

  const targetSpace = spaces.find(e => e.walls.includes(id));
  const roofId = isUndefined(targetSpace) ? null : targetSpace.roofId;
  const { w, center, wallDirection, lookDirection, streetNormal } = useMemo(() => {
    const startPoint = new Vector3(start.x, elevation + wallHeight / 2, start.y);
    const endPoint = new Vector3(end.x, elevation + wallHeight / 2, end.y);
    const wallDirection = new Vector3().subVectors(endPoint, startPoint);
    const lookDirection = new Vector3(-wallDirection.z, wallDirection.y, wallDirection.x);

    const x = end.x - start.x;
    const y = end.y - start.y;
    const wallNormal = new Vector3(-y, 0, x).normalize();

    const streetNormal = isUndefined(wallSidesRelations) ? null : (
      isNull(wallSidesRelations.backSide) && !isNull(wallSidesRelations.frontSide)
        ? wallNormal
        : !isNull(wallSidesRelations.backSide) && isNull(wallSidesRelations.frontSide)
          ? wallNormal.clone().negate()
          : null
    );

    return {
      wallDirection,
      w: getVector2Distance(start, end),
      center: new Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5),
      lookDirection,
      streetNormal,
    };
  }, [elevation, end, start, wallHeight, wallSidesRelations]);
  const targetLevel = getNotUndefined(levels.find(e => e.id === levelId), 'This should never happen. |hb0waa|');

  const ref = useRef<Group>(null);
  const snapCandidate = useRef<Group>(null);
  const dollhouseViewRef = useRef<Group>(null);
  useDollhouseViewMode({ groupRef: dollhouseViewRef, normal: streetNormal, threshold: 0 });

  useEffect(() => {
    if(viewMode !== '3D' || isNull(ref.current)) {
      unregisterSceneObject(`wall:${id}`);
      return;
    }

    ref.current.updateMatrixWorld(true);
    registerSceneObject(`wall:${id}`, ref.current);

    return () => {
      unregisterSceneObject(`wall:${id}`);
    };
  }, [viewMode, id]);

  useEffect(() => {
    assert(!isNull(ref.current), 'This should never happen. |d64341|');
    ref.current.lookAt(new Vector3().addVectors(lookDirection, center));
    ref.current.updateMatrixWorld(true);
  }, [center, lookDirection]);

  useEffect(() => {
    assert(!isNull(ref.current), 'This should never happen. |9lyf9e|');

    ref.current.lookAt(new Vector3().addVectors(lookDirection, center));
  }, [center, lookDirection]);

  useEffect(() => {
    if(isNull(snapCandidate.current)) {
      return;
    }

    snapCandidate.current.userData.__isWallSnapRoot = true;
    snapCandidate.current.userData.__isSnapRoot = true;
  }, [levelId]);

  const frontStartWallSize = useMemo(() => -(wallDirection.length() / 2 + cornersDiff.frontStart), [cornersDiff.frontStart, wallDirection]);
  const frontEndWallSize = useMemo(() => wallDirection.length() / 2 + cornersDiff.frontEnd, [cornersDiff.frontEnd, wallDirection]);
  const backStartWallSize = useMemo(() => -(wallDirection.length() / 2 + cornersDiff.backStart), [cornersDiff.backStart, wallDirection]);
  const backEndWallSize = useMemo(() => wallDirection.length() / 2 + cornersDiff.backEnd, [cornersDiff.backEnd, wallDirection]);

  const frontWallStart = useMemo(() => (
    new Vector3(frontStartWallSize, -wallHeight / 2 + 0.02, thickness / 2)
  ), [frontStartWallSize, thickness, wallHeight]);
  const frontWallEnd = useMemo(() => new Vector3(frontEndWallSize, -wallHeight / 2 + 0.02, thickness / 2), [frontEndWallSize, thickness, wallHeight]);
  const lengthFront = new Vector3().subVectors(frontWallStart, frontWallEnd).length();

  const backWallStart = useMemo(() => (
    new Vector3(backStartWallSize, -wallHeight / 2 + 0.02, -thickness / 2)
  ), [backStartWallSize, thickness, wallHeight]);
  const backWallEnd = useMemo(() => new Vector3(backEndWallSize, -wallHeight / 2 + 0.02, -thickness / 2), [backEndWallSize, thickness, wallHeight]);
  const lengthBack = new Vector3().subVectors(backWallStart, backWallEnd).length();

  const isFrontWallInsideSize = lengthFront <= lengthBack;

  const handleWallSizeClick = useCallback((e: ThreeEvent<PointerEvent>) => {
    if(e.button !== 0 || creationMode !== 'pointer') {
      return;
    }
    e.stopPropagation();

    const { isDesktopMenu } = useIsDesktopMenu.getState();
    const { slideUpMenuLvl1 } = useSlideUpMenuLvl1.getState();

    if(isDesktopMenu === false && slideUpMenuLvl1.type === 'catalog') {
      showSlideUpMenuLvl1();
    }

    assert(!isNull(ref.current), 'This should never happen. |iy061u|');

    const { x } = e.point.clone().applyMatrix4(ref.current.matrixWorld.clone().invert());

    usePopUpToolbar.setState({
      popUpToolbar: {
        type: 'wall',
        id,
        subItem: null,
        coords: new Vector2(e.clientX, e.clientY),
        onWallCoordinateX: x,
      },
    });
  }, [creationMode, id]);

  return (
    <group
      ref={ref}
      position={center}
      {
        ...creationMode === 'walls' && {
          onClick(e) {
            const { creationModeConfig } = useCreationModeConfig.getState();

            if(e.button !== 0 || e.delta > 2 || creationModeConfig.mode === 'multipleStraightLines') {
              return;
            }
            e.stopPropagation();

            const { isDesktopMenu } = useIsDesktopMenu.getState();
            const { slideUpMenuLvl1 } = useSlideUpMenuLvl1.getState();

            if(isDesktopMenu === false && slideUpMenuLvl1.type === 'catalog') {
              showSlideUpMenuLvl1();
            }

            assert(!isNull(ref.current), 'This should never happen. |37yko8|');

            const { x } = e.point.clone().applyMatrix4(ref.current.matrixWorld.clone().invert());

            usePopUpToolbar.setState({
              popUpToolbar: {
                type: 'wall',
                id,
                subItem: null,
                coords: new Vector2(e.clientX, e.clientY),
                onWallCoordinateX: x,
              },
            });
          },
        } satisfies Partial<GroupProps>
      }
    >
      {
        (!isNull(wallMover) || isMeasurementsShown1 === true) && (
          <WallSize
            wallId={id}
            lookDirection={lookDirection}
            takeoutType='inside'
            start={isFrontWallInsideSize === true ? frontWallStart : backWallStart}
            end={isFrontWallInsideSize === true ? frontWallEnd : backWallEnd}
            isOtherDirection={isFrontWallInsideSize === false}
            onPointerUp={handleWallSizeClick}
          />
        )
      }
      {
        (!isNull(wallMover) || isMeasurementsShown2 === true) && (
          <WallSize
            wallId={id}
            lookDirection={lookDirection}
            takeoutType='outside'
            start={isFrontWallInsideSize === false ? frontWallStart : backWallStart}
            end={isFrontWallInsideSize === false ? frontWallEnd : backWallEnd}
            isOtherDirection={isFrontWallInsideSize === true}
            onPointerUp={handleWallSizeClick}
          />
        )
      }
      <group ref={dollhouseViewRef}>
        <group
          {
            ...(() => {
              switch(viewMode) {
                case '2D':
                  if(isArrayIncludes(furnitureCreationModes, creationMode)) {
                    return targetLevel.isActive === true && {
                      onPointerEnter(e) {
                        e.stopPropagation();
                        setCursor('pointer');
                      },
                      onPointerLeave(e) {
                        e.stopPropagation();
                        setCursor(null);
                      },
                      onPointerMove(e) {
                        e.stopPropagation();
                        assert(!isNull(ref.current), 'This should never happen. |wk9nsd|');

                        const { x } = e.point.clone().applyMatrix4(ref.current.matrixWorld.clone().invert());

                        setTempWallFurnitureIsOnWall(true);
                        setTempWallFurnitureCoordinate(id, x, null);
                      },
                      onPointerUp(e) {
                        if(e.button !== 0) {
                          return;
                        }
                        e.stopPropagation();

                        const { selectedItem } = useSelectedItem.getState();
                        const { isDesktopMenu } = useIsDesktopMenu.getState();
                        const { slideUpMenuLvl1 } = useSlideUpMenuLvl1.getState();

                        createWallFurnitureFromTempWallFurniture();
                        useIsMoving3DModel.setState({ isMoving3DModel: false });
                        if(!isNull(selectedItem) && selectedItem.type === 'wallFurniture') {
                          useSelectedItem.setState(useSelectedItem.getInitialState());
                        }
                        if(isDesktopMenu === false && slideUpMenuLvl1.type === 'catalog') {
                          showSlideUpMenuLvl1();
                        }
                      },
                    } satisfies Partial<GroupProps>;
                  }
                  if((creationMode === 'pointer' || canMoveWall === true) && isNull(wallMover) && isActiveLevel === true) {
                    return {
                      onPointerEnter(e) {
                        e.stopPropagation();
                        setCursor('grab');
                      },
                      onPointerLeave(e) {
                        e.stopPropagation();
                        setCursor(null);
                      },
                      onPointerDown(e) {
                        if(e.button !== 0) {
                          return;
                        }
                        e.stopPropagation();

                        useWallMover.setState({
                          wallMover: {
                            type: 'parallel',
                            wallId: id,
                            startPosition: snapPosition(e.point),
                          },
                        });
                      },
                    } satisfies Partial<GroupProps>;
                  }
                  return;
                case '3D':
                  return (creationMode === 'pointer' || isArrayIncludes(furnitureCreationModes, creationMode)) && {
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
                    onPointerMove(e) {
                      if(creationMode === 'pointer') {
                        return;
                      }

                      e.stopPropagation();
                      assert(!isNull(ref.current), 'This should never happen. |8n5t3u|');

                      const { x, y } = e.point.clone().applyMatrix4(ref.current.matrixWorld.clone().invert());

                      setTempWallFurnitureIsOnWall(true);
                      setTempWallFurnitureCoordinate(id, x, y - 0.3);
                    },
                    onPointerUp(e) {
                      if(e.button !== 0) {
                        return;
                      }
                      e.stopPropagation();

                      assert(!isNull(ref.current), 'This should never happen. |t7s9pn|');

                      switch(creationMode) {
                        case 'doors':
                        case 'windows': {
                          const { selectedItem } = useSelectedItem.getState();

                          createWallFurnitureFromTempWallFurniture();
                          useIsMoving3DModel.setState({ isMoving3DModel: false });
                          if(!isNull(selectedItem) && selectedItem.type === 'wallFurniture') {
                            useSelectedItem.setState(useSelectedItem.getInitialState());
                          }
                          break;
                        }
                        case 'pointer': {
                          const { x } = e.point.clone().applyMatrix4(ref.current.matrixWorld.clone().invert());

                          usePopUpToolbar.setState({
                            popUpToolbar: {
                              type: 'wall',
                              id,
                              subItem: null,
                              coords: new Vector2(e.clientX, e.clientY),
                              onWallCoordinateX: x,
                            },
                          });
                          break;
                        }
                        default:
                          ((e: never) => e)(creationMode);
                          throw new Error('This should never happen. |h7n9i2|');
                      }

                      const { isDesktopMenu } = useIsDesktopMenu.getState();
                      const { slideUpMenuLvl1 } = useSlideUpMenuLvl1.getState();

                      if(isDesktopMenu === false && slideUpMenuLvl1.type === 'catalog' && isArrayIncludes(furnitureCreationModes, creationMode)) {
                        showSlideUpMenuLvl1();
                      }
                    },
                  } satisfies Partial<GroupProps>;
                default:
                  ((e: never) => e)(viewMode);
                  throw new Error('This should never happen. |dcx9sm|');
              }
            })()
          }
        >
          <group ref={snapCandidate}>
            <mesh layers={31} raycast={() => null}>
              <boxGeometry args={[w, wallHeight, thickness]} />
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
          <WallSides
            id={id}
            frontTexture={frontTexture}
            backTexture={backTexture}
            elevation={elevation}
            w={w}
            wallHeight={wallHeight}
            opacity={opacity === 1 && isOverFloorPlan === true ? semiTransparentElementsOpacity2 : opacity}
            wallThickness={thickness}
            cornersDiff={cornersDiff}
            furnitures={furnitures}
            roofId={roofId}
            wallCenter={center}
            wallDirection={wallDirection}
            floorThickness={!isNull(dormerRoofId) || isUndefined(targetSpace) ? 0 : targetSpace.floorData.thickness}
            frontColorOverlay={frontColorOverlay}
            backColorOverlay={backColorOverlay}
            frontCompositeOperation={frontCompositeOperation}
            backCompositeOperation={backCompositeOperation}
            polygonOffset={polygonOffset}
            isOverFloorPlan={isOverFloorPlan}
            excludeFromRoofCutting={excludeFromRoofCutting}
            dormerRoofId={dormerRoofId}
            isSelected={
              false
                || isTargetWallOpenedInPopUpToolbar === true
                || !isNull(wallMover) && wallMover.type === 'parallel' && wallMover.wallId === id
            }
          />
          <WallFurnitures
            furnitures={furnitures}
            w={w}
            wallHeight={wallHeight}
            wallThickness={thickness}
            isOverFloorPlan={isOverFloorPlan}
            levelId={levelId}
          />
          {
            viewMode === '2D' && opacity === 1 && (
              <WallOutline2D
                id={id}
                length={w}
                wallThickness={thickness}
                cornersDiff={cornersDiff}
                wallHeight={wallHeight}
                position={position}
                levelId={levelId}
                isHiddenWall={false}
              />
            )
          }
        </group>
      </group>
    </group>
  );
};
