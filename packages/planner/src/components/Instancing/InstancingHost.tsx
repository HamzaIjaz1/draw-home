import { Instance, Instances, useGLTF } from '@react-three/drei';
import { FC, memo, useMemo } from 'react';
import { isArrayLength, isNull, isUndefined } from '@arthurka/ts-utils';
import { PoolItem, useInstancing } from '../../zustand/useInstancing/store';
import { useModelMaterials } from '../../zustand/useModelMaterials/store';
import { assignMaterialsToScene } from '../../utils/assignMaterialsToScene';
import { assignTextureMapsToScene } from '../../utils/assignTextureMapsToScene';
import { makeModelSemiTransparent } from '../../utils/makeModelSemiTransparent';
import { computePartsFromScene, InstancePart } from '../../utils/useGLTFInstanceParts';

type InstancedMaterialGroupProps = {
  url: string;
  items: PoolItem[];
  limit: number;
};

const InstancedMaterialGroup: FC<InstancedMaterialGroupProps> = memo(({ url, items, limit }) => {
  const { scene } = useGLTF(url);
  const { modelMaterials } = useModelMaterials();

  const parts = useMemo((): InstancePart[] => {
    if(!isArrayLength(items, '>', 0)) {
      return [];
    }

    const sample = items[0];
    const root = scene.clone();
    root.updateWorldMatrix(true, true);

    if(isNull(sample.overrideMaterials)) {
      assignMaterialsToScene(root, modelMaterials);
    } else if(!isUndefined(sample.overrideMaterials)) {
      assignTextureMapsToScene(root, sample.overrideMaterials);
    }

    if(sample.isSemiTransparent === true) {
      makeModelSemiTransparent(root);
    }

    return computePartsFromScene(root);
  }, [items, scene, modelMaterials]);

  return isArrayLength(items, '>', 0) && (
    parts.map(({ key, geometry, material }) => (
      <Instances key={key} geometry={geometry} material={material} limit={limit}>
        {
          items.map(({ id, transform }) => (
            <Instance
              key={`${id}:${key}`}
              position={transform.position}
              quaternion={transform.quaternion}
              scale={transform.scale}
            />
          ))
        }
      </Instances>
    ))
  );
});

type InstancedUrlProps = {
  url: string;
  materialGroups: Map<string, PoolItem[]>;
  headroom: number;
};

const InstancedUrl: FC<InstancedUrlProps> = memo(({ url, materialGroups, headroom }) => {
  const groupEntries = useMemo(() => [...materialGroups.entries()], [materialGroups]);

  return groupEntries.map(([materialSig, items]) => (
    <InstancedMaterialGroup
      key={materialSig}
      url={url}
      items={items}
      limit={items.length + headroom}
    />
  ));
});

export const InstancingHost: FC = memo(() => {
  const headroom = useInstancing(s => s.headroom);
  const pools = useInstancing(s => s.pools);

  const urlEntries = useMemo(() => [...pools.entries()], [pools]);

  return urlEntries.map(([url, materialGroups]) => (
    <InstancedUrl key={url} url={url} materialGroups={materialGroups} headroom={headroom} />
  ));
});
