import { LevelsStore } from '../zustand/useLevels/store';

export const getTotalHeight = (levels: LevelsStore['levels']): number => {
  let maxY = 0;
  for(const l of levels) {
    const top = Number(l.elevation) + Number(l.height);
    if(Number.isFinite(top) && top > maxY) {
      maxY = top;
    }
  }
  return maxY;
};
