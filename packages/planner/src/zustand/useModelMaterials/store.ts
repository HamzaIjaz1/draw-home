import { Material } from 'three';
import { create } from 'zustand';
import { withComparingSetState } from '../../utils/withComparingSetState';

type ModelMaterialsStore = {
  modelMaterials: Record<string, Material>;
  modelMaterialPreviews: Record<string, string>;
};

export const useModelMaterials = create<ModelMaterialsStore>(() => ({
  modelMaterials: {},
  modelMaterialPreviews: {},
}));

withComparingSetState(useModelMaterials);
