import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { DragControls, PivotControls, Plane, useTexture } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import assert from 'assert';
import { memo, useEffect, useRef, useState } from 'react';
import { DoubleSide, Group, Quaternion, Vector2, Vector3 } from 'three';
import { assets2DDefaultSize } from '../constants';
import { CustomModelsStore, setAsset2DParams, setCursor, useCreationMode, useCreationModeConfig, useLevels, usePopUpToolbar, useSlideUpMenuLvl1, useViewMode } from '../zustand';
import { useAsset2DTransparency } from '../zustand/useAsset2DTransparency';
import { useIsMoving3DModel } from '../zustand/useIsMoving3DModel';
import { useSelectedItem } from '../zustand/useSelectedItem';
import { Asset2DOutline } from './Asset2DOutline';
import { CornerScaleHandles } from './CornerScaleHandles';
import { SuspenseHOC } from './SuspenseHOC';
import { TapeMeasureTool } from './TapeMeasureTool';
import { useTouchScreen } from '../zustand/useTouchScreen';

export const Asset2D: React.FC<Extract<CustomModelsStore['customModels'][number], { type: 'asset-2d' }>> = memo(SuspenseHOC(({
  id,
  url,
  position,
  quaternion,
  scale,
  levelId,
  location,
  tilt,
  transparency: _transparency,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tapeMeasurePositions, setTapeMeasurePositions] = useState<{ posP1: Vector3; posP2: Vector3 } | null>(null);
  const ref = useRef<Group>(null);
  const { creationMode } = useCreationMode();
  const { selectedItem } = useSelectedItem();
  const { isMoving3DModel } = useIsMoving3DModel();
  const { viewMode } = useViewMode();
  const textureMap = useTexture(url);
  const { asset2DTransparency } = useAsset2DTransparency();
  const { levels } = useLevels();
  const scaleGroupRef = useRef<Group>(null);
  const isSelected = !isNull(selectedItem) && selectedItem.type === 'asset2D' && selectedItem.id === id;
  const { isTouchScreen } = useTouchScreen();

  const textureRatio = textureMap.image.width / textureMap.image.height;
  const targetLevel = getNotUndefined(levels.find(e => e.id === levelId), 'This should never happen. |tk1k7q|');

  useEffect(() => {
    if(isSelected === false) {
      setIsHovered(false);
    }
  }, [isSelected]);

  const { transparency } = (() => {
    const { slideUpMenuLvl1 } = useSlideUpMenuLvl1.getState();

    return {
      transparency: (
        isNull(asset2DTransparency) || slideUpMenuLvl1.type !== 'asset2DSettings' || slideUpMenuLvl1.asset2DId !== id
          ? _transparency
          : asset2DTransparency
      ),
    };
  })();

  useEffect(() => {
    textureMap.colorSpace = 'srgb';
    textureMap.needsUpdate = true;
  }, [textureMap]);

  const positionZ = assets2DDefaultSize / textureRatio * scale * Math.cos(tilt * Math.PI / 180) / 2;
  const rotationX = tilt * Math.PI / 180;

  return (
    <group
      renderOrder={1}
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
                type: 'asset2D',
                id,
                mode: 'selected',
                measuredDistanceWorld: null,
              },
            });
            usePopUpToolbar.setState({
              popUpToolbar: {
                type: 'asset2D',
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
            setCursor(!isNull(selectedItem) && selectedItem.type === 'asset2D' && selectedItem.mode === 'selected' ? 'grab' : 'pointer');
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

            setCursor('grab');
            useSelectedItem.setState({
              selectedItem: {
                type: 'asset2D',
                id,
                mode: 'selected',
                measuredDistanceWorld: null,
              },
            });
            usePopUpToolbar.setState({
              popUpToolbar: {
                type: 'asset2D',
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
              key={JSON.stringify([position.toArray()])}
              autoTransform={selectedItem.type === 'asset2D' && selectedItem.id === id}
              axisLock='y'
              onDragStart={() => {
                if(isTouchScreen === false) {
                  setIsHovered(false);
                }
                if(selectedItem.type === 'asset2D' && selectedItem.id !== id) {
                  return;
                }

                useIsMoving3DModel.setState({ isMoving3DModel: true });
                setCursor('grabbing');
              }}
              onDragEnd={() => {
                if(selectedItem.type === 'asset2D' && selectedItem.id !== id) {
                  return;
                }
                assert(!isNull(ref.current), 'This should never happen. |1jb8sj|');

                const position = new Vector3();
                const quaternion = new Quaternion();

                ref.current.getWorldPosition(position);
                ref.current.getWorldQuaternion(quaternion);

                setCursor(null);
                setAsset2DParams(id, { position, quaternion });
                useIsMoving3DModel.setState({ isMoving3DModel: false });
              }}
            >
              <group
                position-x={position.x}
                position-y={
                  viewMode === '3D'
                    ? position.y
                    : ({
                      background: targetLevel.elevation,
                      foreground: targetLevel.elevation + targetLevel.height + 0.02,
                    } satisfies Record<typeof location, number>)[location]
                }
                position-z={position.z}
                quaternion={quaternion}
              >
                <PivotControls
                  ref={ref}
                  depthTest={false}
                  annotations
                  autoTransform
                  scale={2}
                  axisColors={['red', '#fd5631', 'blue']}
                  rotationLimits={[[0, 0], [-Infinity, Infinity], [0, 0]]}
                  activeAxes={[
                    selectedItem.type === 'asset2D' && selectedItem.id === id && selectedItem.mode === 'rotate',
                    false,
                    selectedItem.type === 'asset2D' && selectedItem.id === id && selectedItem.mode === 'rotate',
                  ]}
                  disableAxes
                  disableRotations={selectedItem.type !== 'asset2D' || selectedItem.id !== id || selectedItem.mode !== 'rotate'}
                  disableSliders
                  disableScaling
                  onDragStart={() => {
                    useIsMoving3DModel.setState({ isMoving3DModel: true });
                    setCursor('grabbing');
                  }}
                  onDragEnd={() => {
                    assert(!isNull(ref.current), 'This should never happen. |w5y3lj|');

                    const newPosition = new Vector3();
                    const quaternion = new Quaternion();

                    ref.current.getWorldPosition(newPosition);
                    ref.current.getWorldQuaternion(quaternion);

                    if(viewMode === '2D') {
                      newPosition.setY(position.y);
                    }

                    setAsset2DParams(id, {
                      position: newPosition,
                      quaternion,
                    });
                    useIsMoving3DModel.setState({ isMoving3DModel: false });
                    setCursor(null);
                  }}
                >
                  <group position-z={positionZ} rotation-x={rotationX}>
                    <group
                      ref={scaleGroupRef}
                      scale={[scale, 1, scale]}
                      position-z={-assets2DDefaultSize / textureRatio * scale / 2}
                    >
                      <Plane args={[assets2DDefaultSize, assets2DDefaultSize / textureRatio]} rotation-x={-Math.PI / 2}>
                        <meshBasicMaterial
                          map={textureMap}
                          side={DoubleSide}
                          polygonOffset
                          polygonOffsetFactor={-1}
                          polygonOffsetUnits={-1}
                          transparent={transparency !== 1}
                          opacity={transparency}
                          toneMapped={false}
                        />
                      </Plane>
                      <Asset2DOutline
                        assets2DDefaultSize={assets2DDefaultSize}
                        isSelected={isSelected}
                        textureRatio={textureRatio}
                      />
                      {
                        selectedItem.type === 'asset2D' && selectedItem.id === id && (
                          <CornerScaleHandles
                            scaleGroupRef={scaleGroupRef}
                            scale={scale}
                            id={id}
                            textureRatio={textureRatio}
                            assets2DDefaultSize={assets2DDefaultSize}
                            elevation={
                              viewMode === '3D'
                                ? position.y
                                : ({
                                  background: targetLevel.elevation,
                                  foreground: targetLevel.elevation + targetLevel.height + 0.02,
                                } satisfies Record<typeof location, number>)[location]
                            }
                          />
                        )
                      }
                      {
                        (selectedItem.mode === 'measure' || selectedItem.mode === 'measure-scale-mode') && (
                          <TapeMeasureTool
                            id={id}
                            scaleGroupRef={scaleGroupRef}
                            posP1={
                              !isNull(tapeMeasurePositions)
                                ? tapeMeasurePositions.posP1
                                : new Vector3(-assets2DDefaultSize / 2, 0, (assets2DDefaultSize / textureRatio) / 2 + 1)
                            }
                            posP2={
                              !isNull(tapeMeasurePositions)
                                ? tapeMeasurePositions.posP2
                                : new Vector3(assets2DDefaultSize / 2, 0, (assets2DDefaultSize / textureRatio) / 2 + 1)
                            }
                            elevation={
                              viewMode === '3D'
                                ? position.y
                                : ({
                                  background: targetLevel.elevation,
                                  foreground: targetLevel.elevation + targetLevel.height + 0.02,
                                } satisfies Record<typeof location, number>)[location]
                            }
                            mode={selectedItem.mode}
                            onPositionChange={(posP1, posP2) => {
                              setTapeMeasurePositions({ posP1, posP2 });
                            }}
                            onClose={() => {
                              setTapeMeasurePositions(null);
                              useSelectedItem.setState({
                                selectedItem: {
                                  type: 'asset2D',
                                  id,
                                  mode: 'selected',
                                  measuredDistanceWorld: null,
                                },
                              });
                            }}
                          />
                        )
                      }
                    </group>
                  </group>
                </PivotControls>
              </group>
            </DragControls>
          )
          : (
            <group
              position-x={position.x}
              position-y={
                viewMode === '3D'
                  ? position.y
                  : ({
                    background: targetLevel.elevation,
                    foreground: targetLevel.elevation + targetLevel.height + 0.02,
                  } satisfies Record<typeof location, number>)[location]
              }
              position-z={position.z}
              quaternion={quaternion}
            >
              <group position-z={positionZ} rotation-x={rotationX}>
                <group
                  ref={scaleGroupRef}
                  scale={[scale, 1, scale]}
                  position-z={-assets2DDefaultSize / textureRatio * scale / 2}
                >
                  <Plane args={[assets2DDefaultSize, assets2DDefaultSize / textureRatio]} rotation-x={-Math.PI / 2}>
                    <meshBasicMaterial
                      map={textureMap}
                      side={DoubleSide}
                      polygonOffset
                      polygonOffsetFactor={-1}
                      polygonOffsetUnits={-1}
                      transparent={transparency !== 1}
                      opacity={transparency}
                      toneMapped={false}
                    />
                  </Plane>
                  {
                    isHovered === true && (
                      <Asset2DOutline
                        assets2DDefaultSize={assets2DDefaultSize}
                        isSelected={isSelected}
                        textureRatio={textureRatio}
                      />
                    )
                  }
                </group>
              </group>
            </group>
          )
      }
    </group>
  );
}));
