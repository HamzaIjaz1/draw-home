import { isUndefined, ObjEntries } from '@arthurka/ts-utils';
import { useModelMaterials } from './store';
import { TextureAsset } from '../../zod/TextureAsset';
import { loadTextures, normalizeMaterialProps } from '../../utils';

export const replaceModelMaterial = async (materialName: string, textureAsset: TextureAsset) => {
  const { modelMaterials } = useModelMaterials.getState();
  const existingMaterial = Object.values(modelMaterials).find(({ name }) => name === materialName);

  if(isUndefined(existingMaterial)) {
    return;
  }

  const mapProps = await loadTextures(textureAsset.attributes.maps);

  const material = existingMaterial.clone();
  for(const [key, value] of ObjEntries(normalizeMaterialProps(mapProps))) {
    if(key in material) {
      (material as any)[key] = value;
      material.needsUpdate = true;
    }
  }

  useModelMaterials.setState({
    modelMaterials: {
      ...modelMaterials,
      [materialName]: existingMaterial,
    },
  });
};
