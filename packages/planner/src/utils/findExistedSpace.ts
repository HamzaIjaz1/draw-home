import { WallId } from '@draw-house/common/dist/brands';
import { SpacesStore } from '../zustand/useSpaces/store';

export const findExistedSpace = (spaces: SpacesStore['spaces'], wallIds: WallId[]) => {
  const targetWallsSet = new Set(wallIds);

  for(const space of spaces) {
    const spaceWallsSet = new Set(space.walls);

    if(spaceWallsSet.size === targetWallsSet.size && [...targetWallsSet].every(e => spaceWallsSet.has(e))) {
      return space;
    }
  }

  return null;
};
