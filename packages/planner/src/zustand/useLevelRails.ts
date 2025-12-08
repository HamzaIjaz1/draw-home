import { create } from 'zustand';
import { LevelId } from '@draw-house/common/dist/brands';
import { ValueOf } from '@arthurka/ts-utils';

export type LevelRailsStore = {
  levelRails: Map<LevelId, {
    levelId: LevelId;
    screenY: number;
    railX1: number;
    railX2: number;
    active?: boolean;
    worldY?: number;
  }>;
};

export const useLevelRails = create<LevelRailsStore>()(() => ({
  levelRails: new Map<LevelId, ValueOf<LevelRailsStore['levelRails']>>(),
}));

export const setLevelRails = (items: Array<ValueOf<LevelRailsStore['levelRails']>>): void => {
  useLevelRails.setState({
    levelRails: new Map(items.map(e => [e.levelId, e] as const)),
  });
};
