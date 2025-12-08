import { getNotUndefined, isUndefined } from '@arthurka/ts-utils';
import { SpaceId, WallId } from '@draw-house/common/dist/brands';
import { WallsStore } from '../zustand/useWalls/store';
import { SpacesStore } from '../zustand/useSpaces/store';
import { calculateCoplanarPolygonArea } from './getAreaOfSmallerContour';
import { getWallContoursFromSegments } from './getWallContoursFromSegments';
import { getSpaceWallSegmentsAndDiff } from './getSpaceWallSegmentsAndDiff';

export type WallSidesSpaceRelations = {
  wallId: WallId;
  frontSide: SpaceId | null;
  backSide: SpaceId | null;
};

export const getWallSidesSpaceRelations = (walls: WallsStore['walls'], spaces: SpacesStore['spaces']) => {
  const wallsWithSidesRelations = walls.map(({ id }): WallSidesSpaceRelations => ({
    wallId: id,
    frontSide: null,
    backSide: null,
  }));

  for(const space of spaces) {
    const spaceWalls = space.walls.map(id => walls.find(e => e.id === id)).filter(e => !isUndefined(e));
    const { spaceWallSegments } = getSpaceWallSegmentsAndDiff(spaceWalls);

    const [contour1, contour2] = getWallContoursFromSegments(spaceWallSegments);
    if(isUndefined(contour1) || isUndefined(contour2)) {
      break;
    }

    const { segments } = calculateCoplanarPolygonArea(contour1.vertices) < calculateCoplanarPolygonArea(contour2.vertices) ? contour1 : contour2;

    for(const { sideType, wallId } of segments) {
      if(sideType === 'front-cap' || sideType === 'back-cap') {
        continue;
      }

      const wallRelation = getNotUndefined(wallsWithSidesRelations.find(e => e.wallId === wallId), 'This should never happen. |z566z1|');

      wallRelation[`${sideType}Side`] = space.id;
    }
  }

  return wallsWithSidesRelations;
};
