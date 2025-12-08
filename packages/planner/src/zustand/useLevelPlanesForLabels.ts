import { create } from 'zustand';
import { LevelId } from '@draw-house/common/dist/brands';
import { isUndefined, ValueOf } from '@arthurka/ts-utils';

type Store = {
  levelPlanesForLabels: {
    items: Map<LevelId, {
      levelId: LevelId;
      name: string;
      screenY: number;
      screenXRight: number;
      worldY: number;
      active: boolean;
    }>;
    tick: number;
  };
};

export const useLevelPlanesForLabels = create<Store>()(() => ({
  levelPlanesForLabels: {
    items: new Map<LevelId, ValueOf<Store['levelPlanesForLabels']['items']>>(),
    tick: 0,
  },
}));

export function setAllLevelPlanesForLabelsInPlace(arr: Array<ValueOf<Store['levelPlanesForLabels']['items']>>) {
  const { levelPlanesForLabels } = useLevelPlanesForLabels.getState();

  const next = new Map(levelPlanesForLabels.items);
  for(const e of arr) {
    const prev = next.get(e.levelId);
    next.set(e.levelId, isUndefined(prev) ? { ...e } : { ...prev, ...e });
  }

  useLevelPlanesForLabels.setState({
    levelPlanesForLabels: {
      items: next,
      tick: levelPlanesForLabels.tick + 1,
    },
  });
}
