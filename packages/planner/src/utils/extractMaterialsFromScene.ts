import { Material, Mesh, Object3D } from 'three';

export const extractMaterialsFromScene = (scene: Object3D) => {
  const materialMap = new Map<string, Material>();

  scene.traverse(e => {
    if(!(e instanceof Mesh)) {
      return;
    }

    const materialArray = Array.isArray(e.material) ? e.material : [e.material];

    for(const e of materialArray) {
      if(!materialMap.has(e.name)) {
        materialMap.set(e.name, e);
      }
    }
  });

  return Object.fromEntries(materialMap);
};
