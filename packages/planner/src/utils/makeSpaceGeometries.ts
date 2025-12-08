import { RoofDormerId, RoofId } from '@draw-house/common/dist/brands';
import { getNotUndefined, isNull, isUndefined } from '@arthurka/ts-utils';
import assert from 'assert';
import { ExtrudeGeometry, Shape } from 'three';
import { LevelsStore, SpacesStore, WallsStore } from '../zustand';
import { getFloorCoordinates } from './floor';

export const makeSpaceGeometries = ({ roofId, dormerRoofId, spaces, walls, levels }: {
  roofId: RoofId;
  dormerRoofId?: RoofDormerId | null;
  spaces: SpacesStore['spaces'];
  walls: WallsStore['walls'];
  levels: LevelsStore['levels'];
}) => {
  const filteredSpaces = spaces.filter(e => (
    !isUndefined(dormerRoofId) && !isNull(dormerRoofId)
      ? e.dormerRoofId === dormerRoofId
      : e.roofId !== roofId
  ));

  return (
    filteredSpaces
      .map(e => e.walls.map(id => getNotUndefined(walls.find(e => e.id === id), 'Something went wrong. |35xe0b|')))
      .map(spaceWalls => {
        const wall = spaceWalls[0];
        if(isUndefined(wall)) {
          return null;
        }

        const targetLevel = levels.find(e => e.id === wall.levelId);
        assert(!isUndefined(targetLevel), 'Something went wrong. |cv1v4x|');

        const coords = getFloorCoordinates(spaceWalls.map(e => e.position));
        if(coords.length === 0) {
          return null;
        }

        const shape = new Shape(coords);
        const geometry = new ExtrudeGeometry(shape, {
          depth: targetLevel.height,
          bevelEnabled: false,
        });

        geometry.rotateX(Math.PI / 2);

        return {
          geometry,
          elevation: targetLevel.elevation + targetLevel.height,
        };
      })
      .filter(e => !isNull(e))
  );
};
