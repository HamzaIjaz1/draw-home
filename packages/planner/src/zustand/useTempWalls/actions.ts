import { getNotUndefined, isArrayLength, isNull, isUndefined } from '@arthurka/ts-utils';
import { Vector2 } from 'three';
import { useWalls, WallsStore } from '../useWalls/store';
import { useWallMover } from '../useWallMover';
import { TempWallsStore, useTempWalls } from './store';
import { useLevels } from '../useLevels';
import { createDefaultWall } from '../useWalls';
import { useSpaces } from '../useSpaces';
import { isPointInsideSpaceWalls } from '../../utils/isPointInsideSpaceWalls';
import { useGlobalSettings } from '../useGlobalSettings';

const updateTempWalls = (makeNewTempWalls: (tempWalls: TempWallsStore['tempWalls']) => TempWallsStore['tempWalls']) => {
  const { tempWalls } = useTempWalls.getState();

  useTempWalls.setState({
    tempWalls: makeNewTempWalls(tempWalls),
  });
};

export const setSingleTempWallEndpoint = (end: WallsStore['walls'][number]['position']['end']) => {
  updateTempWalls(tempWalls => {
    if(!isArrayLength(tempWalls, '===', 1)) {
      return tempWalls;
    }

    const { defaultExteriorWallThickness, defaultInteriorWallThickness } = useGlobalSettings.getState();
    const { levels } = useLevels.getState();
    const { spaces } = useSpaces.getState();
    const { walls } = useWalls.getState();

    const { position, levelId } = tempWalls[0];
    const targetLevel = getNotUndefined(levels.find(({ id }) => levelId === id), 'Something went wrong. |c2q5pw|');
    const targetSpace = (
      spaces
        .map(e => ({
          ...e,
          walls: e.walls.map(id => getNotUndefined(walls.find(e => e.id === id), 'Something went wrong. |7oc5ak|')),
        }))
        .filter(({ walls }) => targetLevel.id === getNotUndefined(walls[0], 'Something went wrong. |mv15a1|').levelId)
        .find(({ walls }) => {
          const wallCenter = new Vector2().addVectors(position.start, end).divideScalar(2);

          return isPointInsideSpaceWalls(wallCenter, walls);
        })
    );

    return [{
      ...tempWalls[0],
      position: {
        ...position,
        end,
      },
      thickness: isUndefined(targetSpace) ? defaultExteriorWallThickness : defaultInteriorWallThickness,
    }];
  });
};

export const moveTempWalls = (position: Vector2) => {
  const { walls } = useWalls.getState();
  const { wallMover } = useWallMover.getState();
  const { levels } = useLevels.getState();

  if(isNull(wallMover)) {
    return;
  }

  const { id: levelId } = getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |qvm9zp|');
  const { type, startPosition, wallId } = wallMover;

  switch(type) {
    case 'corner':
      updateTempWalls(() => (
        walls
          .filter(e => e.levelId === levelId)
          .filter(e => e.position.start.equals(startPosition) || e.position.end.equals(startPosition))
          .map(e => ({
            ...e,
            position: (
              e.position.start.equals(startPosition)
                ? {
                  ...e.position,
                  start: position,
                }
                : {
                  ...e.position,
                  end: position,
                }
            ),
          }))
      ));
      break;
    case 'parallel': {
      const selectedWall = getNotUndefined(walls.find(e => e.id === wallId), 'This should never happen. |94up24|');
      const { position: { start, end }, id } = selectedWall;
      const wallsOnLevel = walls.filter(e => e.levelId === levelId);
      const moveVector = new Vector2().subVectors(position, startPosition);
      const wallDirection = new Vector2().subVectors(end, start).normalize();
      const perpDirection = new Vector2(-wallDirection.y, wallDirection.x);
      const perpMove = perpDirection.multiplyScalar(moveVector.dot(perpDirection));

      const hasConnectedStart = wallsOnLevel.some(e => e.id !== id && (e.position.start.equals(start) || e.position.end.equals(start)));
      const hasConnectedEnd = wallsOnLevel.some(e => e.id !== id && (e.position.start.equals(end) || e.position.end.equals(end)));

      const areWallsPerpendicular = (wall1: WallsStore['walls'][number], wall2: WallsStore['walls'][number], tolerance = 0.1) => {
        const dir1 = new Vector2().subVectors(wall1.position.end, wall1.position.start).normalize();
        const dir2 = new Vector2().subVectors(wall2.position.end, wall2.position.start).normalize();
        const dotProduct = Math.abs(dir1.dot(dir2));

        return dotProduct < tolerance;
      };
      const areWallsConnected = (wall1: WallsStore['walls'][number], wall2: WallsStore['walls'][number]) => (
        false
          || wall1.position.start.equals(wall2.position.start)
          || wall1.position.start.equals(wall2.position.end)
          || wall1.position.end.equals(wall2.position.start)
          || wall1.position.end.equals(wall2.position.end)
      );

      const perpendicularConnectedWalls = wallsOnLevel.filter(e => (
        true
          && e.id !== id
          && areWallsConnected(selectedWall, e)
          && areWallsPerpendicular(selectedWall, e)
      ));

      const stationaryPointsAtSelectedWallStart: Vector2[] = [];
      const stationaryPointsAtSelectedWallEnd: Vector2[] = [];

      wallsOnLevel.forEach(wall => {
        if(wall.id === id || perpendicularConnectedWalls.some(e => e.id === wall.id)) {
          return;
        }

        if(wall.position.start.equals(start)) {
          stationaryPointsAtSelectedWallStart.push(wall.position.start);
        }
        if(wall.position.end.equals(start)) {
          stationaryPointsAtSelectedWallStart.push(wall.position.end);
        }
        if(wall.position.start.equals(end)) {
          stationaryPointsAtSelectedWallEnd.push(wall.position.start);
        }
        if(wall.position.end.equals(end)) {
          stationaryPointsAtSelectedWallEnd.push(wall.position.end);
        }
      });

      const gapWalls: WallsStore['walls'] = [];
      const selectedWallNewStart = new Vector2().addVectors(start, perpMove);
      const newEnd = new Vector2().addVectors(end, perpMove);

      if(perpMove.equals(new Vector2(0, 0)) === false && stationaryPointsAtSelectedWallStart.length > 0) {
        const uniqueStationaryPoints = stationaryPointsAtSelectedWallStart.filter((e, i, arr) => arr.findIndex(e2 => e2.equals(e)) === i);

        uniqueStationaryPoints.forEach(stationaryPoint => {
          const gapWall = createDefaultWall(stationaryPoint, selectedWallNewStart, levelId);

          gapWalls.push(gapWall);
        });
      }

      if(perpMove.equals(new Vector2(0, 0)) === false && stationaryPointsAtSelectedWallEnd.length > 0) {
        const uniqueStationaryPoints = stationaryPointsAtSelectedWallEnd.filter((e, i, arr) => arr.findIndex(e2 => e2.equals(e)) === i);
        uniqueStationaryPoints.forEach(stationaryPoint => {
          const gapWall = createDefaultWall(stationaryPoint, newEnd, levelId);

          gapWalls.push(gapWall);
        });
      }

      if(hasConnectedStart === false && hasConnectedEnd === false) {
        const selectedWallNewStart = new Vector2().addVectors(start, moveVector);
        const newEnd = new Vector2().addVectors(end, moveVector);

        updateTempWalls(() => [
          ...wallsOnLevel
            .filter(e => e.id === id)
            .map(e => ({
              ...e,
              position: {
                start: selectedWallNewStart,
                end: newEnd,
              },
            })),
        ]);
        break;
      }

      updateTempWalls(() => [
        ...wallsOnLevel
          .filter(e => (
            e.id === id ||
            perpendicularConnectedWalls.some(perpWall => perpWall.id === e.id)
          ))
          .map(e => {
            if(e.id === id) {
              return {
                ...e,
                position: {
                  start: selectedWallNewStart,
                  end: newEnd,
                },
              };
            }

            let newWallStart = e.position.start;
            let newWallEnd = e.position.end;

            if(e.position.start.equals(start)) {
              newWallStart = selectedWallNewStart;
            } else if(e.position.start.equals(end)) {
              newWallStart = newEnd;
            }

            if(e.position.end.equals(start)) {
              newWallEnd = selectedWallNewStart;
            } else if(e.position.end.equals(end)) {
              newWallEnd = newEnd;
            }

            return {
              ...e,
              position: {
                start: newWallStart,
                end: newWallEnd,
              },
            };
          }),
        ...gapWalls,
      ]);
      break;
    }
    default:
      ((e: never) => e)(type);
      throw new Error('This should never happen. |a5651p|');
  }
};
