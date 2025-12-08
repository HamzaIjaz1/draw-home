import { LevelId, Positive } from '@draw-house/common/dist/brands';
import { generateUUID } from '@draw-house/common/dist/utils';
import { create } from 'zustand';
import { measurementSystemUtils } from '../../utils/measurementSystemUtils';
import { initialMeasurementSystem } from '../../constants';
import { withComparingSetState } from '../../utils/withComparingSetState';

type Level = {
  id: LevelId;
  name: string;
  elevation: number;
  height: Positive;
  isActive: boolean;
  isLevelVisible: boolean;
  isSemiTransparent: boolean;
};

export type LevelsStore = {
  levels: [Level, ...Level[]];
};

export const useLevels = create<LevelsStore>(() => ({
  levels: [{
    id: LevelId(generateUUID()),
    name: 'Level 1',
    elevation: 0,
    height: measurementSystemUtils.levelHeight(initialMeasurementSystem),
    isActive: true,
    isLevelVisible: true,
    isSemiTransparent: false,
  }],
}));

withComparingSetState(useLevels);
