import { DoubleSide, Group, Shape, ShapeGeometry, Vector2, Vector3 } from 'three';
import { useEffect, useMemo, useRef } from 'react';
import assert from 'assert';
import { isNull } from '@arthurka/ts-utils';
import { GroupProps } from '@react-three/fiber';
import { LevelId, Positive } from '@draw-house/common/dist/brands';
import { Line } from '@react-three/drei';
import { setCursor, showSlideUpMenuLvl1, useCreationMode, useCreationModeConfig, useIsDesktopMenu, usePopUpToolbar, useSlideUpMenuLvl1, useViewMode, useWallMover, WallsStore } from '../../zustand';
import { WallSize } from './WallSize';
import { getVector2Distance, snapPosition, toVector2 } from '../../utils';
import { useCanMoveWall } from '../../zustand/useCanMoveWall';
import { WallOutline2D } from './WallOutline2D';
import { WallSidesSpaceRelations } from '../../utils/getWallSidesSpaceRelations';

export type HiddenWallProps = {
  id: WallsStore['walls'][number]['id'];
  position: WallsStore['walls'][number]['position'];
  elevation: number;
  showMeasurement: boolean;
  wallThickness: Positive;
  cornersDiff: {
    frontStart: number;
    frontEnd: number;
    backStart: number;
    backEnd: number;
  };
  isActiveLevel: boolean;
  wallHeight: Positive;
  levelId: LevelId;
  wallSidesRelations: WallSidesSpaceRelations | undefined;
};

export const HiddenWall: React.FC<HiddenWallProps> = ({
  id,
  elevation,
  showMeasurement,
  wallThickness,
  isActiveLevel,
  position: {
    start,
    end,
  },
  cornersDiff: {
    frontStart,
    frontEnd,
    backStart,
    backEnd,
  },
  wallHeight,
  levelId,
  wallSidesRelations,
}) => {
  const { creationMode } = useCreationMode();
  const { viewMode } = useViewMode();
  const { wallMover } = useWallMover();
  const { canMoveWall } = useCanMoveWall();
  const ref = useRef<Group>(null);

  const { w, center, lookDirection } = useMemo(() => {
    const startPoint = new Vector3(start.x, elevation, start.y);
    const endPoint = new Vector3(end.x, elevation, end.y);
    const wallDirection = new Vector3().subVectors(endPoint, startPoint);
    const lookDirection = new Vector3(-wallDirection.z, wallDirection.y, wallDirection.x);

    return {
      wallDirection,
      w: getVector2Distance(start, end),
      center: new Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5),
      lookDirection,
    };
  }, [elevation, end, start]);

  const wallShape = useMemo(() => {
    const startPoint = new Vector3(-w / 2, 0, 0);
    const endPoint = new Vector3(w / 2, 0, 0);
    const halfThickness = wallThickness / 2;

    return [
      startPoint.clone(),
      new Vector3(-w / 2 - frontStart, 0, halfThickness),
      new Vector3(w / 2 + frontEnd, 0, halfThickness),
      endPoint.clone(),
      new Vector3(w / 2 + backEnd, 0, -halfThickness),
      new Vector3(-w / 2 - backStart, 0, -halfThickness),
      startPoint.clone(),
    ];
  }, [w, wallThickness, frontStart, frontEnd, backStart, backEnd]);

  const wallGeometry = useMemo(() => {
    const wallShapePoints = wallShape.map(toVector2);
    const shape = new Shape(wallShapePoints);

    return new ShapeGeometry(shape);
  }, [wallShape]);
  useEffect(() => (
    () => {
      wallGeometry.dispose();
    }
  ), [wallGeometry]);

  const wallSizeStart = new Vector3(-w / 2, 0, 0);
  const wallSizeEnd = new Vector3(w / 2, 0, 0);

  useEffect(() => {
    if(isNull(ref.current)) {
      return;
    }

    ref.current.lookAt(center.clone().add(lookDirection));
    ref.current.updateMatrixWorld(true);
  }, [center, lookDirection]);

  return (
    <group
      ref={ref}
      position={center}
      onPointerEnter={() => {
        setCursor('pointer');
      }}
      onPointerLeave={() => {
        setCursor(null);
      }}
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

            assert(!isNull(ref.current), 'This should never happen. |dl8in8|');

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
      {
        ...(() => {
          switch(viewMode) {
            case '2D':
              if((creationMode === 'pointer' || canMoveWall === true) && isNull(wallMover) && isActiveLevel === true) {
                return {
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
              return creationMode === 'pointer' && {
                onPointerUp(e) {
                  if(e.button !== 0) {
                    return;
                  }
                  e.stopPropagation();

                  assert(!isNull(ref.current), 'This should never happen. |29s6u5|');

                  if(creationMode === 'pointer') {
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
                  }
                },
              } satisfies Partial<GroupProps>;
            default:
              ((e: never) => e)(viewMode);
              throw new Error('This should never happen. |ho6el0|');
          }
        })()
      }
    >
      {
        viewMode === '2D' && (
          <>
            <mesh geometry={wallGeometry} position-y={wallHeight} rotation={[Math.PI / 2, 0, 0]}>
              <meshBasicMaterial
                color='white'
                side={DoubleSide}
                toneMapped={false}
              />
            </mesh>
            <WallOutline2D
              id={id}
              length={w}
              levelId={levelId}
              position={{ start, end }}
              wallHeight={wallHeight}
              wallThickness={wallThickness}
              cornersDiff={{ frontStart, frontEnd, backStart, backEnd }}
              wallSidesRelations={wallSidesRelations}
              isHiddenWall
            />
          </>
        )
      }
      {
        viewMode === '3D' && (
          <Line points={wallShape} color='gray' lineWidth={1} />
        )
      }
      {
        showMeasurement === true && (
          <group position-y={viewMode === '2D' ? wallHeight + 0.01 : 0.02}>
            <WallSize
              wallId={id}
              lookDirection={lookDirection}
              takeoutType='center'
              start={wallSizeStart}
              end={wallSizeEnd}
              onPointerUp={undefined}
            />
          </group>
        )
      }
    </group>
  );
};
