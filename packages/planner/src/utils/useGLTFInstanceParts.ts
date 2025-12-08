import { Box3, BufferGeometry, Group, Matrix4, Mesh, MeshStandardMaterial, Object3D, Vector3 } from 'three';
import { isNull, isNullish, isUndefined } from '@arthurka/ts-utils';
import assert from 'assert';
import { assignMaterialsToScene } from './assignMaterialsToScene';
import { assignTextureMapsToScene } from './assignTextureMapsToScene';
import { makeModelSemiTransparent } from './makeModelSemiTransparent';
import { CustomModelsStore } from '../zustand/useCustomModels/store';

export type InstancePart = {
  key: string;
  geometry: BufferGeometry;
  material: MeshStandardMaterial;
};

export const computePartsFromScene = (root: Object3D): InstancePart[] => {
  const box = new Box3().setFromObject(root);
  const size = box.getSize(new Vector3());
  const center = box.getCenter(new Vector3());

  const recenter = new Matrix4().makeTranslation(
    -center.x,
    -(center.y - size.y / 2),
    -center.z,
  );

  const parts: InstancePart[] = [];
  let idx = 0;

  root.traverse(e => {
    if(!(e instanceof Mesh)) {
      return;
    }

    e.updateWorldMatrix(true, false);

    const g = e.geometry.clone();
    g.applyMatrix4(e.matrixWorld.clone().multiply(recenter));

    assert(e.material instanceof MeshStandardMaterial, 'Something went wrong. |03ilt5|');
    const mat = e.material.clone();
    parts.push({
      key: `p${idx++}`,
      geometry: g,
      material: mat,
    });
  });

  return parts;
};

export const canInstance = ({ isSemiTransparent, is2DRepresentationImageShown }: {
  isSemiTransparent: boolean;
  is2DRepresentationImageShown: boolean;
}) => (
  isSemiTransparent === false && is2DRepresentationImageShown === false
);

export const materialSignatureOf = (overrideMaterials: CustomModelsStore['customModels'][number]['overrideMaterials']): string => {
  if(isNull(overrideMaterials) || isUndefined(overrideMaterials)) {
    return 'base';
  }

  return `ovr:${JSON.stringify(overrideMaterials)}`;
};

export const applyOverrideMaterialsToParts = (
  parts: InstancePart[],
  opts: {
    modelMaterials: Parameters<typeof assignMaterialsToScene>[1];
    overrideMaterials: CustomModelsStore['customModels'][number]['overrideMaterials'];
    semiTransparent: boolean;
  },
) => {
  if(parts.length === 0) {
    return;
  }

  const group = new Group();

  for(const { geometry, material } of parts) {
    group.add(new Mesh(geometry, material));
  }

  assignMaterialsToScene(group, opts.modelMaterials);
  if(!isNullish(opts.overrideMaterials)) {
    assignTextureMapsToScene(group, opts.overrideMaterials);
  }

  if(opts.semiTransparent === true) {
    makeModelSemiTransparent(group);
  }
};
