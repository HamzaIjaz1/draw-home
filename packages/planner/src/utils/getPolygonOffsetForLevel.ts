import { LevelId } from '@draw-house/common/dist/brands';
import { isUndefined } from '@arthurka/ts-utils';
import { LevelsStore } from '../zustand';

export const getPolygonOffsetForLevel = (levelId: LevelId, allLevels: LevelsStore['levels']) => {
  const targetLevel = allLevels.find(e => e.id === levelId);
  if(isUndefined(targetLevel)) {
    return 0;
  }

  const currentSortedLevelIndex = (
    allLevels
      .toSorted((a, b) => a.elevation - b.elevation)
      .findIndex(({ id }) => id === targetLevel.id)
  );

  return -4 * (currentSortedLevelIndex + 1);
};
