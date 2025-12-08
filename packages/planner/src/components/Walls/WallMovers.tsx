import { useRef, useState } from 'react';
import { DoubleSide, Group, OrthographicCamera, Vector2 } from 'three';
import { getNotUndefined, isNull, isUndefined } from '@arthurka/ts-utils';
import { useTheme } from '@mui/material';
import { useFrame, useThree } from '@react-three/fiber';
import { clamp } from '@draw-house/common/dist/utils';
import { setCursor, useCreationMode, useGlobalSettings, useLevels, usePopUpToolbar, useTempWalls, useViewMode, useWallMover, useWalls } from '../../zustand';
import { getUniquePoints } from '../../utils';
import { WallMoversPlane } from '../WallMoversPlane';
import { getWallType } from '../../utils/getWallType';
import { useCanMoveWall } from '../../zustand/useCanMoveWall';

type WallMoverProps = {
  x: number;
  y: number;
  elevation: number;
  isVisuallyActive: boolean;
  isDraggingCorner: boolean;
  isDraggingParallel: boolean;
};

const WallMover: React.FC<WallMoverProps> = ({ x, y, elevation, isVisuallyActive, isDraggingCorner, isDraggingParallel }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const { camera } = useThree();

  const wallEndpointCircleSize = 0.1;
  const hoveredCircleRadius = wallEndpointCircleSize * 1.75;
  const outerCircleRadius = hoveredCircleRadius * 2;
  const activeMoverRef = useRef<Group>(null);

  useFrame(() => {
    if(isNull(activeMoverRef.current) || !(camera instanceof OrthographicCamera)) {
      return;
    }

    const zoom = camera.zoom;
    const maxScale = 1;
    const minScale = 0.55;

    const start = 50;
    const end = 400;

    let scale: number;

    if(zoom <= start) {
      scale = maxScale;
    } else if(zoom >= end) {
      scale = minScale;
    } else {
      const t = clamp(0, (zoom - start) / (end - start), 1);

      scale = maxScale - (maxScale - minScale) * t;
    }

    if(activeMoverRef.current.scale.x !== scale) {
      activeMoverRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group
      position={[x, elevation, y]}
      onPointerDown={e => {
        if(e.button !== 0) {
          return;
        }
        e.stopPropagation();

        useWallMover.setState({
          wallMover: {
            type: 'corner',
            startPosition: new Vector2(x, y),
          },
        });
      }}
    >
      {
        (isHovered === true || isVisuallyActive === true || isDraggingCorner === true) && (
          <group ref={activeMoverRef}>
            <mesh rotation-x={Math.PI / 2} position-y={0.01}>
              <circleGeometry args={[outerCircleRadius, 32]} />
              <meshBasicMaterial color='white' transparent opacity={0.4} side={DoubleSide} />
            </mesh>
            <mesh rotation-x={Math.PI / 2} position-y={0.02}>
              <ringGeometry args={[outerCircleRadius, outerCircleRadius - 0.02, 32]} />
              <meshBasicMaterial color={theme.palette.primary.main} side={DoubleSide} />
            </mesh>
            <mesh rotation-x={Math.PI / 2} position-y={0.03}>
              <circleGeometry args={[hoveredCircleRadius, 32]} />
              <meshBasicMaterial color={theme.palette.primary.main} side={DoubleSide} />
            </mesh>
          </group>
        )
      }
      {
        isDraggingParallel === false && (
          <mesh
            position-y={0.01}
            rotation-x={Math.PI / 2}
            onPointerEnter={e => {
              e.stopPropagation();

              setIsHovered(true);
              setCursor('grab');
            }}
            onPointerLeave={e => {
              e.stopPropagation();

              setIsHovered(false);
              setCursor(null);
            }}
          >
            <circleGeometry args={[wallEndpointCircleSize, 32]} />
            <meshBasicMaterial color='#aaa' side={DoubleSide} />
          </mesh>
        )
      }
    </group>
  );
};

export const WallMovers: React.FC = () => {
  const isExteriorWallsShown = useGlobalSettings(s => s.isExteriorWallsShown);
  const isInteriorWallsShown = useGlobalSettings(s => s.isInteriorWallsShown);
  const { viewMode } = useViewMode();
  const { creationMode } = useCreationMode();
  const { walls } = useWalls();
  const { tempWalls } = useTempWalls();
  const { wallMover } = useWallMover();
  const { levels } = useLevels();
  const { popUpToolbar } = usePopUpToolbar();
  const { canMoveWall } = useCanMoveWall();

  const { elevation, height, id, isLevelVisible } = getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |wre8rt|');
  const levelWalls = walls.filter(e => e.levelId === id);

  const openInToolbarWallId = !isNull(popUpToolbar) && popUpToolbar.type === 'wall' ? popUpToolbar.id : null;
  const targetWall = isNull(openInToolbarWallId) ? null : getNotUndefined(walls.find(e => e.id === openInToolbarWallId), 'Something went wrong. |i4ztq9|');
  const isTargetWallOnActiveLevel = isNull(targetWall) ? false : targetWall.levelId === id;

  return viewMode === '2D' && (creationMode === 'pointer' || canMoveWall === true) && isLevelVisible === true && (
    <>
      {!isNull(wallMover) && <WallMoversPlane elevation={elevation + height} />}
      {
        getUniquePoints(
          levelWalls
            .filter(e => isExteriorWallsShown === true ? true : getWallType(e) !== 'exterior')
            .filter(e => isInteriorWallsShown === true ? true : getWallType(e) !== 'interior')
            .flatMap(({ position: { start, end } }) => [start, end]),
        )
          .map(e => {
            let { x, y } = e;
            const isDraggingCorner = !isNull(wallMover) && wallMover.type === 'corner' && wallMover.startPosition.equals(e);

            if(isDraggingCorner === true) {
              const movingWall = levelWalls.find(({ position }) => position.start.equals(e) || position.end.equals(e));

              if(!isUndefined(movingWall)) {
                const tempWall = tempWalls.find(e => e.id === movingWall.id);

                if(!isUndefined(tempWall)) {
                  if(movingWall.position.start.equals(e)) {
                    x = tempWall.position.start.x;
                    y = tempWall.position.start.y;
                  } else {
                    x = tempWall.position.end.x;
                    y = tempWall.position.end.y;
                  }
                }
              }
            }

            const isDraggingParallel = !isNull(wallMover) && wallMover.type === 'parallel';
            const isVisuallyActive = (
              true
                && !isNull(targetWall)
                && isTargetWallOnActiveLevel === true
                && (targetWall.position.start.equals(e) || targetWall.position.end.equals(e))
            );

            return (
              <WallMover
                key={`${e.x} ${e.y}`}
                x={x}
                y={y}
                elevation={elevation + height}
                isDraggingCorner={isDraggingCorner}
                isDraggingParallel={isDraggingParallel}
                isVisuallyActive={isVisuallyActive}
              />
            );
          })
      }
    </>
  );
};
