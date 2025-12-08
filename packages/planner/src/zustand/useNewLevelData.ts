import { create } from 'zustand';
import { Positive } from '@draw-house/common/dist/brands';
import { LevelsStore, useLevels } from './useLevels/store';
import { useGlobalSettings } from './useGlobalSettings/store';
import { lang } from '../lang';
import { measurementSystemUtils } from '../utils/measurementSystemUtils';

type Store = {
  newLevelData: {
    elevation: LevelsStore['levels'][number]['elevation'];
    height: LevelsStore['levels'][number]['height'];
    name: LevelsStore['levels'][number]['name'];
  };
};

export const useNewLevelData = create<Store>(() => ({
  newLevelData: {
    name: '',
    elevation: 0,
    height: Positive(1),
  },
}));

export const updateNewLevelData = () => {
  const { measurementSystem } = useGlobalSettings.getState();
  const { levels } = useLevels.getState();

  const name = `${lang.slideUpMenus.levelsSettings.newLevelName} ${levels.length + 1}`;
  const elevation = levels.reduce((acc, { elevation, height }) => Math.max(acc, elevation + height), -Infinity);
  const height = measurementSystemUtils.levelHeight(measurementSystem);

  useNewLevelData.setState({
    newLevelData: {
      name,
      elevation,
      height,
    },
  });

  return {
    name,
    elevation,
    height,
  };
};
