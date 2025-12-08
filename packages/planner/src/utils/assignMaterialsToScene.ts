import { Material, Mesh, Object3D } from 'three';
import { isUndefined } from '@arthurka/ts-utils';

export const assignMaterialsToScene = (scene: Object3D, materials: Record<string, Material>) => {
  scene.traverse(e => {
    if(!(e instanceof Mesh)) {
      return;
    }

    const materialArray = Array.isArray(e.material) ? e.material : [e.material];
    const newMaterials = materialArray.map(e => {
      const material = e.clone();
      const assignedMaterial = materials[e.name];
      if(isUndefined(assignedMaterial)) {
        return material;
      }

      material.needsUpdate = true;

      return assignedMaterial;
    });

    e.material = Array.isArray(e.material) ? newMaterials : newMaterials[0];
  });
};
