import { getNotUndefined, isUndefined } from '@arthurka/ts-utils';
import { Vector2 } from 'three';
import { fixIEEE } from '@draw-house/common/dist/utils';
import { Positive } from '@draw-house/common/dist/brands';
import { useLevels } from '../useLevels/store';
import { useWalls, WallsStore } from './store';
import { getVector2Distance } from '../../utils/helpers';
import { SpacesStore, useSpaces } from '../useSpaces/store';
import { getWallSidesSpaceRelations } from '../../utils/getWallSidesSpaceRelations';
import { getWallType } from '../../utils/getWallType';
import { useGlobalSettings } from '../useGlobalSettings/store';
import { isPointInsideSpaceWalls } from '../../utils/isPointInsideSpaceWalls';

export const mergeFutureWalls = (walls: WallsStore['walls']) => {
  const { levels } = useLevels.getState();

  return (
    levels
      .map(e => walls.filter(({ levelId }) => e.id === levelId))
      .flatMap(walls => (
        walls
          .filter((e, i, arr) => arr.findLastIndex(e1 => e.id === e1.id) === i)
          .reduce<typeof walls>((acc, cur) => {
            const e1 = acc.find(e => e.position.start.equals(cur.position.start) && e.position.end.equals(cur.position.end));
            if(!isUndefined(e1)) {
              return [
                ...acc.filter(e => e !== e1),
                {
                  ...cur,
                  furnitures: [
                    ...cur.furnitures,
                    ...e1.furnitures,
                  ],
                },
              ];
            }

            const e2 = acc.find(e => e.position.start.equals(cur.position.end) && e.position.end.equals(cur.position.start));
            if(!isUndefined(e2)) {
              return [
                ...acc.filter(e => e !== e2),
                {
                  ...cur,
                  furnitures: [
                    ...cur.furnitures,
                    ...e2.furnitures.map(e => ({
                      ...e,
                      onWallCoordinateX: -e.onWallCoordinateX,
                    })),
                  ],
                },
              ];
            }

            return [...acc, cur];
          }, [])
          .toSorted((a, b) => a.id < b.id ? -1 : 1)
      ))
  );
};

export const clearFutureWalls = (walls: WallsStore['walls']) => (
  mergeFutureWalls(walls)
    .map(e => ({
      ...e,
      position: {
        start: new Vector2(fixIEEE(e.position.start.x), fixIEEE(e.position.start.y)),
        end: new Vector2(fixIEEE(e.position.end.x), fixIEEE(e.position.end.y)),
      },
    }))
    .filter(e => !e.position.start.equals(e.position.end))
    .map(e => {
      const halfWallLength = fixIEEE(getVector2Distance(e.position.start, e.position.end) / 2);

      return {
        ...e,
        furnitures: e.furnitures.filter(({ onWallCoordinateX }) => (
          Math.abs(onWallCoordinateX) <= halfWallLength
        )),
      };
    })
);

export const redefineWallSideTypes = (newSpaces: SpacesStore['spaces']) => {
  const { walls } = useWalls.getState();
  const { spaces } = useSpaces.getState();
  const { levels } = useLevels.getState();
  const { defaultExteriorWallThickness, defaultInteriorWallThickness } = useGlobalSettings.getState();

  const wallSidesSpaceRelations = getWallSidesSpaceRelations(walls, newSpaces);
  const allSpaces = [...spaces, ...newSpaces];

  useWalls.setState({
    walls: walls.map(e => {
      const { frontSide, backSide } = getNotUndefined(wallSidesSpaceRelations.find(({ wallId }) => e.id === wallId), 'This should never happen. |y0rp0s|');

      const isSpaceWall = allSpaces.some(({ walls }) => walls.includes(e.id));

      if(isSpaceWall === false) {
        const targetLevel = getNotUndefined(levels.find(({ id }) => e.levelId === id), 'Something went wrong. |766wtq|');
        const targetSpace = (
          spaces
            .map(e => ({
              ...e,
              walls: e.walls.map(id => getNotUndefined(walls.find(e => e.id === id), 'Something went wrong. |8bmo0i|')),
            }))
            .filter(({ walls }) => targetLevel.id === getNotUndefined(walls[0], 'Something went wrong. |2sd9lk|').levelId)
            .find(({ walls }) => {
              const wallCenter = new Vector2().addVectors(e.position.start, e.position.end).divideScalar(2);

              return isPointInsideSpaceWalls(wallCenter, walls);
            })
        );

        return isUndefined(targetSpace) ? e : {
          ...e,
          frontSideSpaceId: targetSpace.id,
          backSideSpaceId: targetSpace.id,
          thickness: defaultInteriorWallThickness,
        };
      }

      const oldWallType = getWallType(e);
      const newWallType = getWallType({
        frontSideSpaceId: frontSide,
        backSideSpaceId: backSide,
      }, allSpaces);

      return {
        ...e,
        frontSideSpaceId: frontSide,
        backSideSpaceId: backSide,
        ...oldWallType !== newWallType && {
          thickness: ({
            exterior: defaultExteriorWallThickness,
            interior: defaultInteriorWallThickness,
          } satisfies Record<typeof newWallType, Positive>)[newWallType],
        },
      };
    }),
  });
};

export const getWallsByLevel = (walls: WallsStore['walls']): Map<string, Array<WallsStore['walls'][number]>> => {
  const map = new Map<string, Array<WallsStore['walls'][number]>>();
  for(const w of walls) {
    let arr = map.get(w.levelId);
    if(isUndefined(arr)) {
      arr = [];
      map.set(w.levelId, arr);
    }
    arr.push(w);
  }
  return map;
};
