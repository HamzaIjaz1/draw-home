import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { useWalls, WallsStore } from '../zustand/useWalls/store';
import { useSpaces } from '../zustand/useSpaces/store';

export const getWallType = (
  { frontSideSpaceId, backSideSpaceId }: Pick<WallsStore['walls'][number], 'frontSideSpaceId' | 'backSideSpaceId'>,
  spaces = useSpaces.getState().spaces,
) => {
  if(isNull(frontSideSpaceId) || isNull(backSideSpaceId)) {
    return 'exterior';
  }

  const { walls } = useWalls.getState();

  const spaceWalls = [
    ...getNotUndefined(spaces.find(e => e.id === frontSideSpaceId), 'Something went wrong. |qmt3i6|').walls,
    ...getNotUndefined(spaces.find(e => e.id === backSideSpaceId), 'Something went wrong. |taw6t7|').walls,
  ].map(id => getNotUndefined(walls.find(e => e.id === id), 'Something went wrong. |67fa0k|'));

  return spaceWalls.some(e => e.isVisible === false) ? 'exterior' : 'interior';
};
