import { create } from 'zustand';
import { Quaternion, Vector3 } from 'three';
import { withComparingSetState } from '../../utils/withComparingSetState';
import { CustomModelsStore } from '../useCustomModels/store';

export type InstanceTransform = {
  position: Vector3;
  quaternion: Quaternion;
  scale: [number, number, number];
};
export type PoolItem = {
  id: string;
  url: string;
  materialSig: string;
  transform: InstanceTransform;
  overrideMaterials: CustomModelsStore['customModels'][number]['overrideMaterials'];
  isSemiTransparent: boolean;
};

export type InstancingStore = {
  version: number;
  pools: Map<string, Map<string, PoolItem[]>>;
  headroom: number;
  enabled: boolean;
};

export const useInstancing = create<InstancingStore>(() => ({
  version: 0,
  pools: new Map<string, Map<string, PoolItem[]>>(),
  headroom: 16,
  enabled: true,
}));

withComparingSetState(useInstancing);
