import { Positive } from '@draw-house/common/dist/brands';
import type { GlobalSettingsStore, LevelsStore, WallsStore } from '../zustand';
import { measurements } from './measurements';
import { getWallType } from './getWallType';

export const measurementSystemUtils = {
  levelHeight(measurementSystem: GlobalSettingsStore['measurementSystem']) {
    return ({
      metric: Positive(measurements.from(3, 'metric')),
      imperial: Positive(measurements.from(measurements.ftToIn(10), 'imperial')),
    } satisfies Record<typeof measurementSystem, LevelsStore['levels'][number]['height']>)[measurementSystem];
  },
  roofHeightFromBaseMinLimit(measurementSystem: GlobalSettingsStore['measurementSystem']) {
    return ({
      metric: -10,
      imperial: measurements.ftToIn(-30),
    } satisfies Record<typeof measurementSystem, number>)[measurementSystem];
  },
  gridSpacing(measurementSystem: GlobalSettingsStore['measurementSystem']) {
    return ({
      metric: Positive(measurements.from(0.3, 'metric')),
      imperial: Positive(measurements.from(measurements.ftToIn(1), 'imperial')),
    } satisfies Record<typeof measurementSystem, GlobalSettingsStore['gridSpacing']>)[measurementSystem];
  },
  wallThickness(wallType: ReturnType<typeof getWallType>, measurementSystem: GlobalSettingsStore['measurementSystem']) {
    return ({
      metric: Positive(measurements.from(({
        exterior: 0.2,
        interior: 0.1,
      } satisfies Record<typeof wallType, number>)[wallType], 'metric')),
      imperial: Positive(measurements.from(({
        exterior: 8,
        interior: 4,
      } satisfies Record<typeof wallType, number>)[wallType], 'imperial')),
    } satisfies Record<typeof measurementSystem, WallsStore['walls'][number]['thickness']>)[measurementSystem];
  },
};
