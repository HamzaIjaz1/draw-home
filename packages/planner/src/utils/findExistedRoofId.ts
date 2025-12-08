import { WallId } from '@draw-house/common/dist/brands';
import { SpacesStore } from '../zustand/useSpaces/store';

export const findExistedRoofId = (spaces: SpacesStore['spaces'], wallIds: WallId[]) => {
  const targetWallsSet = new Set(wallIds);

  for(const { walls, roofId } of spaces) {
    const spaceWallsSet = new Set(walls);

    if([...targetWallsSet].some(e => spaceWallsSet.has(e))) {
      return roofId;
    }
  }

  return null;
};
