import { ObjKeys } from '@arthurka/ts-utils';
import { create } from 'zustand';
import { withComparingSetState } from '../../utils/withComparingSetState';

export type CreationModeStore = {
  creationMode: 'walls' | 'pointer' | 'doors' | 'windows' | 'stairs';
};

export const useCreationMode = create<CreationModeStore>(() => ({
  creationMode: 'walls',
}));

withComparingSetState(useCreationMode);

export const furnitureCreationModes = ObjKeys({
  doors: true,
  windows: true,
} satisfies Partial<Record<NonNullable<CreationModeStore['creationMode']>, true>>);
