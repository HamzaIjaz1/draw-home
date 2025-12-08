import { Box3, BufferGeometry, DoubleSide, Float32BufferAttribute, Group, Quaternion, Vector2, Vector3 } from 'three';
import { DragControls, PivotControls, useGLTF } from '@react-three/drei';
import { getNotUndefined, isNull, isUndefined, ObjEntries } from '@arthurka/ts-utils';
import { memo, Suspense, useEffect, useRef, useState } from 'react';
import assert from 'assert';
import { GroupProps } from '@react-three/fiber';
import { SafeOmit } from '@draw-house/common/dist/utils';
import { StairFactory } from '../calculationsByJovan/staircase/stairFactory';
import { setStairParams, useStairs } from '../zustand/useStairs';
import { Step } from '../calculationsByJovan/staircase/Components/step';
import { SpiralStep } from '../calculationsByJovan/staircase/Components/spiralStep';
import { Railing } from '../calculationsByJovan/staircase/Components/railing';
import { Stringer } from '../calculationsByJovan/staircase/Components/stringer';
import { Landing } from '../calculationsByJovan/staircase/Components/landing';
import { TopLanding } from '../calculationsByJovan/staircase/Components/topLanding';
import { setCursor, useCreationMode, useCreationModeConfig, useGlobalSettings, useLevels, usePopUpToolbar, useViewMode } from '../zustand';
import { Stair as _StairProps } from '../zod/Stairs';
import { useSelectedItem } from '../zustand/useSelectedItem';
import { useIsMoving3DModel } from '../zustand/useIsMoving3DModel';
import { SelectionOutline } from './SelectionOutline';
import { makeModelSemiTransparent } from '../utils/makeModelSemiTransparent';
import { registerSceneObject, unregisterSceneObject } from '../zustand/useSceneObjects';
import { useIsCurrentItemSettingsOpened } from '../customHooks/useIsCurrentItemSettingsOpened';
import { PreloaderCircle } from './PreloaderCircle';
import { useTouchScreen } from '../zustand/useTouchScreen';

export type StairProps = (
  & SafeOmit<_StairProps, 'commentName' | 'commentRailings' | 'commentStairs' | 'commentStringer'>
  & {
    isSemiTransparent?: boolean;
  }
);

export const Stair: React.FC<StairProps> = memo(({
  id,
  quaternion,
  type,
  height,
  width,
  position,
  landingPosition,
  numberOfLandings,
  landingLength,
  landings,
  supportType,
  landingType,
  numberOfWinders,
  mirror,
  gapBetweenFlights,
  stairConfiguration,
  innerRadius,
  outerRadius,
  stringerLocations,
  run,
  rise,
  includeTopLanding,
  topLandingRailingOrientation,
  isSemiTransparent = false,
  railingLocation: _railingLocation,
  isFlippedHorizontal,
  isMirrored,
}) => {
  const railingLocation = (
    _railingLocation.left === true
      ? _railingLocation.right === true
        ? 'both'
        : 'left'
      : _railingLocation.right === true
        ? 'right'
        : 'none'
  );

  const groupRef = useRef<Group>(null);
  const { viewMode } = useViewMode();
  const { isTouchScreen } = useTouchScreen();
  const { isMoving3DModel } = useIsMoving3DModel();

  const pivotControlsRef = useRef<Group>(null);
  const { creationMode } = useCreationMode();
  const { selectedItem } = useSelectedItem();
  const isCurrentItemSettingsOpened = useIsCurrentItemSettingsOpened({ type: 'stair', id });

  const isSelected = !isNull(selectedItem) && selectedItem.type === 'stair' && selectedItem.id === id;

  const [isHovered, setIsHovered] = useState(false);
  const [bboxSize, setBboxSize] = useState(new Vector3(1, 1, 1));
  const [bboxCenter, setBboxCenter] = useState(new Vector3());

  useEffect(() => {
    if(isSelected === false) {
      setIsHovered(false);
    }
  }, [isSelected]);

  const { scene: firstStepScene } = useGLTF('/3D-models/stairs/Sharp/steps/stepWood.glb');
  const { scene: stepScene } = useGLTF('/3D-models/stairs/Sharp/steps/stepWood.glb');
  const { scene: landingScene } = useGLTF('/3D-models/stairs/Sharp/steps/landingWood.glb');
  const { scene: stringerSectionScene } = useGLTF('/3D-models/stairs/Sharp/stringers/stringer.glb');
  const { scene: firstStringerSectionScene } = useGLTF('/3D-models/stairs/Sharp/stringers/stringerStart.glb');
  const { scene: stringerUnderLandingCenter } = useGLTF('/3D-models/stairs/Sharp/stringers/stringerUnderLandingCenter.glb');
  const { scene: railingScene } = useGLTF('/3D-models/stairs/Sharp/railings/railing.glb');
  const { scene: railingLandingFillScene } = useGLTF('/3D-models/stairs/Sharp/railings/railingStraightLanding.glb');
  const { scene: railingLandingPoleScene } = useGLTF('/3D-models/stairs/Sharp/railings/landingPole.glb');
  const { scene: spiralStepScene } = useGLTF('/3D-models/stairs/Spiral/StepSpiral.glb');
  const { scene: spiralLandingScene } = useGLTF('/3D-models/stairs/Spiral/Landing.glb');

  const originalDepthStep = 0.3;
  const originalDepthStringer = 0.3;
  const originalDepthRailing = 0.3;

  const originalRiseStringer = 0.175;
  const originalRiseStep = 0.175;
  const originalRiseRailing = 0.175;

  const depthScaleStep = run / originalDepthStep;
  const depthScaleStringer = run / originalDepthStringer;
  const depthScaleRailing = run / originalDepthRailing;

  const riseScaleStringer = rise / originalRiseStringer;
  const riseScaleStep = rise / originalRiseStep;
  const riseScaleRailing = rise / originalRiseRailing;

  const stair = (() => {
    const stairBuilder = StairFactory.getBuilder(type);

    switch(type) {
      case 'straight':
        stairBuilder
          .setCoords([new Vector2(0, 0), new Vector2(0, 5)])
          .setWidth(width)
          .setHeight(height)
          .setStepHeight(rise)
          .setRun(run)
          .setSupportType(supportType)
          .setStringerType('cut')
          .setStringerLocations(
            ObjEntries(stringerLocations)
              .filter(e => e[1] === true)
              .map(e => e[0]),
          )
          .setStringerHeight(0.4)
          .setRailingHeight(0.9)
          .setRailingOffset(-0.05)
          .setRailingLocation(railingLocation);

        if(supportType === 'beam') {
          stairBuilder.setBeamHeight(0.25).setBeamWidth(0.3);
        }

        if(landingPosition === 'none') {
          stairBuilder.setLandingPosition('none');
        } else if(landingPosition === 'symmetric') {
          stairBuilder.setLandingPosition('symmetric').setNumberOfLandings(numberOfLandings);
          if(!isUndefined(landingLength)) {
            stairBuilder.setLandingLength(landingLength);
          }
        } else if(landingPosition === 'custom' && landings) {
          stairBuilder.setLandingPosition('custom').setLandings(landings.stepsAfter, landings.lengths);
        }
        break;
      case 'l-shaped':
        stairBuilder
          .setCoords([new Vector2(0, 0)])
          .setWidth(width)
          .setHeight(height)
          .setStepHeight(rise)
          .setRun(run)
          .setSupportType(supportType)
          .setStringerType('cut')
          .setStringerLocations(
            ObjEntries(stringerLocations)
              .filter(e => e[1] === true)
              .map(e => e[0]),
          )
          .setStringerHeight(0.5)
          .setRailingHeight(0.9)
          .setRailingOffset(-0.05)
          .setRailingLocation(railingLocation)
          .setLandingType(landingType)
          .setNumberOfWinders(numberOfWinders)
          .setMirror(mirror);
        break;
      case 'u-shaped':
        stairBuilder
          .setCoords([new Vector2(0, 0)])
          .setWidth(width)
          .setHeight(height)
          .setStepHeight(rise)
          .setRun(run)
          .setSupportType(supportType)
          .setStringerType('cut')
          .setStringerLocations(
            ObjEntries(stringerLocations)
              .filter(e => e[1] === true)
              .map(e => e[0]),
          )
          .setStringerHeight(0.5)
          .setRailingHeight(0.9)
          .setRailingOffset(-0.05)
          .setRailingLocation(railingLocation)
          .setLandingLength(!isUndefined(landingLength) ? landingLength : width)
          .setMirror(mirror)
          .setGapBetweenFlights(gapBetweenFlights)
          .setStairConfiguration(stairConfiguration);
        break;
      case 'spiral':
        stairBuilder.setCoords([new Vector2(0, 0)]);

        if(!isUndefined(innerRadius)) {
          stairBuilder.setInnerRadius(innerRadius);
        }
        if(!isUndefined(outerRadius)) {
          stairBuilder.setOuterRadius(outerRadius);
        }

        stairBuilder
          .setHeight(height)
          .setStepHeight(0.175)
          .setSupportType(supportType)
          .setRailingHeight(0.9)
          .setRailingLocation(railingLocation);
        break;
      default:
        ((e: never) => e)(type);
        throw new Error('This should never happen. |5561ty|');
    }

    if(includeTopLanding === true) {
      stairBuilder.setIncludeTopLanding(true);
      stairBuilder.setTopLandingRailingOrientation(topLandingRailingOrientation);
    }

    return stairBuilder;
  })();

  const components = stair.build().getComponents();
  const stairGroupRef = useRef<Group>(null);

  useEffect(() => {
    assert(!isNull(groupRef.current), 'Something went wrong. |9ul561|');

    if(isSemiTransparent === true) {
      makeModelSemiTransparent(groupRef.current);
    }
  }, [isSemiTransparent]);

  useEffect(() => {
    if(!isNull(stairGroupRef.current)) {
      stairGroupRef.current.updateWorldMatrix(true, false);

      const temp = stairGroupRef.current.clone();
      temp.position.set(0, 0, 0);
      temp.rotation.set(0, 0, 0);
      temp.updateMatrixWorld(true);

      const localBox = new Box3().setFromObject(temp);
      const localSize = localBox.getSize(new Vector3());
      const localCenter = localBox.getCenter(new Vector3());

      if(bboxSize.equals(localSize) === false) {
        setBboxSize(localSize.clone());
      }
      if(bboxCenter.equals(localCenter) === false) {
        setBboxCenter(localCenter.clone());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [components]);

  useEffect(() => {
    if(viewMode !== '3D' || isNull(groupRef.current)) {
      unregisterSceneObject(`stair:${id}`);
      return;
    }

    groupRef.current.updateMatrixWorld(true);
    registerSceneObject(`stair:${id}`, groupRef.current);

    return () => {
      unregisterSceneObject(`stair:${id}`);
    };
  }, [viewMode, id]);

  useEffect(() => {
    groupRef.current?.updateMatrixWorld(true);
  }, [position, quaternion, width, height, run, rise, isFlippedHorizontal, isMirrored, components]);

  const flipHorizontal = isFlippedHorizontal === true ? -1 : 1;
  const mirrorStair = isMirrored === true ? -1 : 1;

  return (
    <group
      ref={groupRef}
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
                type: 'stair',
                id,
                mode: 'selected',
              },
            });
            usePopUpToolbar.setState({
              popUpToolbar: {
                type: 'stair',
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
            setCursor('pointer');
            if(isTouchScreen === false) {
              setIsHovered(true);
            }
          },
          onPointerLeave(e) {
            e.stopPropagation();
            setCursor(null);
            if(isTouchScreen === false) {
              setIsHovered(false);
            }
          },
          onPointerUp(e) {
            if(e.button !== 0) {
              return;
            }
            e.stopPropagation();

            useSelectedItem.setState({
              selectedItem: {
                type: 'stair',
                id,
                mode: 'selected',
              },
            });
            usePopUpToolbar.setState({
              popUpToolbar: {
                type: 'stair',
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
              autoTransform={isSelected === true && selectedItem.mode === 'selected'}
              axisLock='y'
              onDragStart={() => {
                setCursor('grabbing');
                useIsMoving3DModel.setState({ isMoving3DModel: true });
              }}
              onDragEnd={() => {
                assert(!isNull(pivotControlsRef.current), 'This should never happen. |u6zs2k|');

                const position = new Vector3();
                const quaternion = new Quaternion();

                pivotControlsRef.current.getWorldPosition(position);
                pivotControlsRef.current.getWorldQuaternion(quaternion);

                setCursor(null);

                setStairParams(id, { position, quaternion });
                useIsMoving3DModel.setState({ isMoving3DModel: false });
              }}
            >
              <group position={position} quaternion={quaternion}>
                <PivotControls
                  ref={pivotControlsRef}
                  // key here is needed to remount PivotControls on global new position
                  key={JSON.stringify([position.toArray(), quaternion.toArray()])}
                  depthTest={false}
                  annotations
                  autoTransform
                  scale={2}
                  axisColors={['red', '#fd5631', 'blue']}
                  rotationLimits={[[0, 0], [-Infinity, Infinity], [0, 0]]}
                  activeAxes={[
                    isSelected && selectedItem.mode === 'rotate',
                    false,
                    isSelected && selectedItem.mode === 'rotate',
                  ]}
                  disableAxes
                  disableRotations={selectedItem.mode !== 'rotate'}
                  disableSliders
                  disableScaling
                  onDragStart={() => {
                    setCursor('grabbing');
                    useIsMoving3DModel.setState({ isMoving3DModel: true });
                  }}
                  onDragEnd={() => {
                    assert(!isNull(pivotControlsRef.current), 'This should never happen. |03pcv1|');

                    const newPosition = new Vector3();
                    const newQuaternion = new Quaternion();

                    pivotControlsRef.current.getWorldPosition(newPosition);
                    pivotControlsRef.current.getWorldQuaternion(newQuaternion);

                    setStairParams(id, { position: newPosition, quaternion: newQuaternion });
                    useIsMoving3DModel.setState({ isMoving3DModel: false });
                    setCursor(null);
                  }}
                >
                  <group ref={stairGroupRef} scale={[flipHorizontal, 1, mirrorStair]}>
                    {
                      components.map((e, i) => {
                        if(e instanceof Step || e instanceof SpiralStep) {
                          if(e instanceof SpiralStep) {
                            return (
                              <group key={`spiral-step-group-${i}`}>
                                <primitive
                                  object={spiralStepScene.clone()}
                                  position={e.position}
                                  rotation={e.rotation}
                                  scale={[1, 1, 1]}
                                />
                              </group>
                            );
                          }

                          const isFirstStep = e.isFirstStep || i === 0;

                          return (
                            <group key={`step-group-${i}`}>
                              <primitive
                                object={isFirstStep ? firstStepScene.clone() : stepScene.clone()}
                                position={e.position}
                                rotation={e.rotation}
                                scale={[width, riseScaleStep, depthScaleStep]}
                              />
                            </group>
                          );
                        }

                        if(e instanceof TopLanding) {
                          const localOffset = new Vector3(0, 0, 0);
                          localOffset.applyEuler(e.rotation);

                          const adjustedPosition = e.position.clone().add(localOffset);

                          // Use the actual landing dimensions for proper scaling
                          const landingWidth = e.width;
                          const landingLength = e.length;

                          // For spiral stairs, use the spiral landing model without additional scaling
                          if(type === 'spiral') {
                            return (
                              <group key={`top-landing-group-${i}`}>
                                <primitive
                                  object={spiralLandingScene.clone()}
                                  position={e.position} // Use direct position like spiral steps, no adjustment needed
                                  rotation={e.rotation}
                                  scale={[1, 1, 1]}
                                />
                              </group>
                            );
                          }

                          // For other stair types, use the regular landing scene
                          return (
                            <group key={`top-landing-group-${i}`}>
                              <primitive
                                object={landingScene.clone()}
                                position={adjustedPosition}
                                rotation={e.rotation}
                                scale={[landingWidth, 1, landingLength]}
                              />
                            </group>
                          );
                        }

                        if(e instanceof Landing) {
                          const localOffset = new Vector3(0, 0, 0);
                          localOffset.applyEuler(e.rotation);

                          const adjustedPosition = e.position.clone().add(localOffset);

                          // Use the actual landing dimensions for proper scaling
                          const landingWidth = e.width;
                          const landingLength = e.length;

                          return (
                            <group key={`landing-group-${i}`}>
                              <primitive
                                object={landingScene.clone()}
                                position={adjustedPosition}
                                rotation={e.rotation}
                                scale={[landingWidth, 1, landingLength]}
                              />
                            </group>
                          );
                        }

                        if(e instanceof Stringer) {
                          return (
                            <group key={`stringer-${i}`}>
                              {
                                e.segments.map((segment, i) => {
                                  let stringerModel;
                                  const adjustedPosition = segment.position.clone();
                                  const adjustedScale = segment.scale.clone();

                                  // Determine the color based on segmentType
                                  if(segment.segmentType === 'landing-center') {
                                  // Use the landing stringer model
                                    stringerModel = stringerUnderLandingCenter.clone();
                                    // Set the scale to match the Landing component
                                    adjustedScale.set(width, 1, width);
                                  } else if(segment.segmentType === 'step') {
                                    stringerModel = segment.isFirstSegment
                                      ? firstStringerSectionScene.clone() // First model
                                      : stringerSectionScene.clone(); // Normal stringer

                                    // Adjust the segment's scale:
                                    // - along the z-axis with the run factor
                                    // - along the y-axis with the rise factor
                                    adjustedScale.z *= depthScaleStringer;
                                    adjustedScale.y *= riseScaleStringer;
                                  } else {
                                  // Optional: Handle unexpected segment types or omit this block
                                    console.warn(`Unknown segment type: ${segment.segmentType}`);
                                    return null; // Skip rendering this segment
                                  }

                                  return (
                                    <group key={`stringer-segment-${i}`}>
                                      {/* Render the stringer model */}
                                      <primitive
                                        object={stringerModel}
                                        position={adjustedPosition}
                                        rotation={segment.rotation}
                                        scale={adjustedScale.toArray()}
                                      />
                                    </group>
                                  );
                                })
                              }
                            </group>
                          );
                        }

                        const verticesArray = e.vertices.flatMap(e => e.toArray());
                        const indicesArray = e.indices;
                        const geometry = new BufferGeometry();
                        geometry.setAttribute('position', new Float32BufferAttribute(verticesArray, 3));
                        geometry.setIndex(indicesArray);
                        geometry.computeVertexNormals();

                        if(e instanceof Railing) {
                          return (
                            <group key={`railing-${i}`}>
                              {
                                e.segments.map((segment, i) => {
                                  switch(segment.type) {
                                  // --- 1) Corner Posts ---
                                    case 'corner': {
                                      const cornerPostModel = railingLandingPoleScene.clone();
                                      const adjustedScale = segment.scale.clone();
                                      adjustedScale.y *= riseScaleRailing;

                                      const offsetY = -0.2 * segment.scale.y * (riseScaleRailing - 1);
                                      const adjustedPosition = segment.position.clone();
                                      adjustedPosition.y += offsetY;

                                      return (
                                        <group key={`railing-corner-${i}`}>
                                          <primitive
                                            object={cornerPostModel}
                                            position={adjustedPosition}
                                            rotation={segment.rotation}
                                            scale={adjustedScale.toArray()}
                                          />
                                        </group>
                                      );
                                    }

                                    // --- 2) Fill Bars ---
                                    case 'fill': {
                                      const fillModel = railingLandingFillScene.clone();
                                      const adjustedScale = segment.scale.clone();
                                      adjustedScale.y *= riseScaleRailing;

                                      const offsetY = -0.2 * segment.scale.y * (riseScaleRailing - 1);
                                      const adjustedPosition = segment.position.clone();
                                      adjustedPosition.y += offsetY;

                                      return (
                                        <group key={`railing-fill-${i}`}>
                                          <primitive
                                            object={fillModel}
                                            position={adjustedPosition}
                                            rotation={segment.rotation}
                                            scale={adjustedScale.toArray()}
                                          />
                                        </group>
                                      );
                                    }

                                    // --- 3) Everything Else (e.g., normal rail segments) ---
                                    default: {
                                      const railingModel = railingScene.clone();
                                      const adjustedScale = segment.scale.clone();
                                      adjustedScale.z *= depthScaleRailing; // same approach as your code
                                      adjustedScale.y *= riseScaleRailing;

                                      const offsetY = -0.2 * segment.scale.y * (riseScaleRailing - 1);
                                      const adjustedPosition = segment.position.clone();
                                      adjustedPosition.y += offsetY;

                                      return (
                                        <primitive
                                          key={`railing-segment-${i}`}
                                          object={railingModel}
                                          position={adjustedPosition}
                                          rotation={segment.rotation}
                                          scale={adjustedScale.toArray()}
                                        />
                                      );
                                    }
                                  }
                                })
                              }
                            </group>
                          );
                        }

                        return (
                          <mesh key={`mesh-${i}`} geometry={geometry}>
                            <meshStandardMaterial color='brown' side={DoubleSide} />
                          </mesh>
                        );
                      })
                    }
                  </group>
                  <SelectionOutline
                    w={bboxSize.x}
                    h={bboxSize.y}
                    d={bboxSize.z}
                    isSelected={isSelected}
                    isSnapping={false}
                    position={bboxCenter}
                    isCurrentItemSettingsOpened={isCurrentItemSettingsOpened}
                  />
                </PivotControls>
              </group>
            </DragControls>
          )
          : (
            <group position={position} quaternion={quaternion}>
              <group ref={stairGroupRef} scale={[flipHorizontal, 1, mirrorStair]}>
                {
                  components.map((e, i) => {
                    if(e instanceof Step || e instanceof SpiralStep) {
                      if(e instanceof SpiralStep) {
                        return (
                          <group key={`spiral-step-group-${i}`}>
                            <primitive
                              object={spiralStepScene.clone()}
                              position={e.position}
                              rotation={e.rotation}
                              scale={[1, 1, 1]}
                            />
                          </group>
                        );
                      }

                      const isFirstStep = e.isFirstStep || i === 0;

                      return (
                        <group key={`step-group-${i}`}>
                          <primitive
                            object={isFirstStep ? firstStepScene.clone() : stepScene.clone()}
                            position={e.position}
                            rotation={e.rotation}
                            scale={[width, riseScaleStep, depthScaleStep]}
                          />
                        </group>
                      );
                    }

                    if(e instanceof TopLanding) {
                      const localOffset = new Vector3(0, 0, 0);
                      localOffset.applyEuler(e.rotation);

                      const adjustedPosition = e.position.clone().add(localOffset);

                      // Use the actual landing dimensions for proper scaling
                      const landingWidth = e.width;
                      const landingLength = e.length;

                      // For spiral stairs, use the spiral landing model without additional scaling
                      if(type === 'spiral') {
                        return (
                          <group key={`top-landing-group-${i}`}>
                            <primitive
                              object={spiralLandingScene.clone()}
                              position={e.position} // Use direct position like spiral steps, no adjustment needed
                              rotation={e.rotation}
                              scale={[1, 1, 1]}
                            />
                          </group>
                        );
                      }

                      // For other stair types, use the regular landing scene
                      return (
                        <group key={`top-landing-group-${i}`}>
                          <primitive
                            object={landingScene.clone()}
                            position={adjustedPosition}
                            rotation={e.rotation}
                            scale={[landingWidth, 1, landingLength]}
                          />
                        </group>
                      );
                    }

                    if(e instanceof Landing) {
                      const localOffset = new Vector3(0, 0, 0);
                      localOffset.applyEuler(e.rotation);

                      const adjustedPosition = e.position.clone().add(localOffset);

                      // Use the actual landing dimensions for proper scaling
                      const landingWidth = e.width;
                      const landingLength = e.length;

                      return (
                        <group key={`landing-group-${i}`}>
                          <primitive
                            object={landingScene.clone()}
                            position={adjustedPosition}
                            rotation={e.rotation}
                            scale={[landingWidth, 1, landingLength]}
                          />
                        </group>
                      );
                    }

                    if(e instanceof Stringer) {
                      return (
                        <group key={`stringer-${i}`}>
                          {
                            e.segments.map((segment, i) => {
                              let stringerModel;
                              const adjustedPosition = segment.position.clone();
                              const adjustedScale = segment.scale.clone();

                              // Determine the color based on segmentType
                              if(segment.segmentType === 'landing-center') {
                              // Use the landing stringer model
                                stringerModel = stringerUnderLandingCenter.clone();
                                // Set the scale to match the Landing component
                                adjustedScale.set(width, 1, width);
                              } else if(segment.segmentType === 'step') {
                                stringerModel = segment.isFirstSegment
                                  ? firstStringerSectionScene.clone() // First model
                                  : stringerSectionScene.clone(); // Normal stringer

                                // Adjust the segment's scale:
                                // - along the z-axis with the run factor
                                // - along the y-axis with the rise factor
                                adjustedScale.z *= depthScaleStringer;
                                adjustedScale.y *= riseScaleStringer;
                              } else {
                              // Optional: Handle unexpected segment types or omit this block
                                console.warn(`Unknown segment type: ${segment.segmentType}`);
                                return null; // Skip rendering this segment
                              }

                              return (
                                <group key={`stringer-segment-${i}`}>
                                  {/* Render the stringer model */}
                                  <primitive
                                    object={stringerModel}
                                    position={adjustedPosition}
                                    rotation={segment.rotation}
                                    scale={adjustedScale.toArray()}
                                  />
                                </group>
                              );
                            })
                          }
                        </group>
                      );
                    }

                    const verticesArray = e.vertices.flatMap(e => e.toArray());
                    const indicesArray = e.indices;
                    const geometry = new BufferGeometry();
                    geometry.setAttribute('position', new Float32BufferAttribute(verticesArray, 3));
                    geometry.setIndex(indicesArray);
                    geometry.computeVertexNormals();

                    if(e instanceof Railing) {
                      return (
                        <group key={`railing-${i}`}>
                          {
                            e.segments.map((segment, i) => {
                              switch(segment.type) {
                              // --- 1) Corner Posts ---
                                case 'corner': {
                                  const cornerPostModel = railingLandingPoleScene.clone();
                                  const adjustedScale = segment.scale.clone();
                                  adjustedScale.y *= riseScaleRailing;

                                  const offsetY = -0.2 * segment.scale.y * (riseScaleRailing - 1);
                                  const adjustedPosition = segment.position.clone();
                                  adjustedPosition.y += offsetY;

                                  return (
                                    <group key={`railing-corner-${i}`}>
                                      <primitive
                                        object={cornerPostModel}
                                        position={adjustedPosition}
                                        rotation={segment.rotation}
                                        scale={adjustedScale.toArray()}
                                      />
                                    </group>
                                  );
                                }

                                // --- 2) Fill Bars ---
                                case 'fill': {
                                  const fillModel = railingLandingFillScene.clone();
                                  const adjustedScale = segment.scale.clone();
                                  adjustedScale.y *= riseScaleRailing;

                                  const offsetY = -0.2 * segment.scale.y * (riseScaleRailing - 1);
                                  const adjustedPosition = segment.position.clone();
                                  adjustedPosition.y += offsetY;

                                  return (
                                    <group key={`railing-fill-${i}`}>
                                      <primitive
                                        object={fillModel}
                                        position={adjustedPosition}
                                        rotation={segment.rotation}
                                        scale={adjustedScale.toArray()}
                                      />
                                    </group>
                                  );
                                }

                                // --- 3) Everything Else (e.g., normal rail segments) ---
                                default: {
                                  const railingModel = railingScene.clone();
                                  const adjustedScale = segment.scale.clone();
                                  adjustedScale.z *= depthScaleRailing; // same approach as your code
                                  adjustedScale.y *= riseScaleRailing;

                                  const offsetY = -0.2 * segment.scale.y * (riseScaleRailing - 1);
                                  const adjustedPosition = segment.position.clone();
                                  adjustedPosition.y += offsetY;

                                  return (
                                    <primitive
                                      key={`railing-segment-${i}`}
                                      object={railingModel}
                                      position={adjustedPosition}
                                      rotation={segment.rotation}
                                      scale={adjustedScale.toArray()}
                                    />
                                  );
                                }
                              }
                            })
                          }
                        </group>
                      );
                    }

                    return (
                      <mesh key={`mesh-${i}`} geometry={geometry}>
                        <meshStandardMaterial color='brown' side={DoubleSide} />
                      </mesh>
                    );
                  })
                }
              </group>
              {
                isHovered === true && (
                  <SelectionOutline
                    w={bboxSize.x}
                    h={bboxSize.y}
                    d={bboxSize.z}
                    isSelected={isSelected}
                    isSnapping={false}
                    position={bboxCenter}
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

export const Stairs: React.FC = () => {
  const isStairsShown = useGlobalSettings(s => s.isStairsShown);
  const { stairs } = useStairs();
  const { levels } = useLevels();

  return isStairsShown === true && (
    stairs
      .filter(e => getNotUndefined(levels.find(({ id }) => id === e.levelId), 'This should never happen. |p711xt|').isLevelVisible)
      .filter(e => e.isHidden === false)
      .map(e => (
        <Suspense
          key={e.id}
          fallback={
            <PreloaderCircle
              elevation={getNotUndefined(levels.find(({ id }) => id === e.levelId), 'This should never happen. |qr91ha|').elevation}
              placementAreaPosition={e.position}
            />
          }
        >
          <Stair {...e} />
        </Suspense>
      ))
  );
};
