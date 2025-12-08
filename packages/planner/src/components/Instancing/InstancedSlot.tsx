import { BoxGeometry, MeshBasicMaterial, Quaternion, Vector3 } from 'three';
import { FC, ReactNode, useEffect, useMemo } from 'react';
import { tuple } from '@arthurka/ts-utils';
import { InstanceTransform, PoolItem, useInstancing } from '../../zustand/useInstancing/store';
import { canInstance, materialSignatureOf } from '../../utils/useGLTFInstanceParts';
import { removeInstance, upsertInstance } from '../../zustand/useInstancing/actions';
import { CustomModelsStore } from '../../zustand/useCustomModels/store';

export type InstancedSlotProps = {
  id: string;
  url: string;
  basePosition: Vector3;
  quaternion: Quaternion;
  scaleXYZ: [number, number, number];
  flip: -1 | 1;
  mirror: -1 | 1;
  center: Vector3;
  isSemiTransparent: boolean;
  is2DRepresentationImageShown: boolean;
  overrideMaterials: CustomModelsStore['customModels'][number]['overrideMaterials'];
  fallback: ReactNode; // default huge 3D model
  hitBoxSize: [number, number, number];
};

const HitBoxGeometry = new BoxGeometry(1, 1, 1);
const HitBoxMaterial = new MeshBasicMaterial({
  transparent: true,
  opacity: 0,
  depthWrite: false,
});

export const InstancedSlot: FC<InstancedSlotProps> = ({
  id,
  url,
  scaleXYZ,
  center,
  flip,
  mirror,
  quaternion,
  basePosition,
  isSemiTransparent,
  is2DRepresentationImageShown,
  overrideMaterials,
  fallback,
  hitBoxSize,
}) => {
  const { enabled } = useInstancing();

  const [sx, sy, sz] = scaleXYZ;
  const { x: cx, z: cz } = center;
  const { x: px, y: py, z: pz } = basePosition;
  const { x: qx, y: qy, z: qz, w: qw } = quaternion;

  const allowed = canInstance({ isSemiTransparent, is2DRepresentationImageShown });

  const materialSig = useMemo(() => materialSignatureOf(overrideMaterials), [overrideMaterials]);
  const transform = useMemo((): InstanceTransform => {
    const basePos = new Vector3(px, py, pz);
    const quat = new Quaternion(qx, qy, qz, qw);
    const localOffset = new Vector3(cx * (1 - flip) * sx, 0, cz * (1 - mirror) * sz).applyQuaternion(quat);

    const position = basePos.add(localOffset);
    const scale = tuple(sx * flip, sy, sz * mirror);

    return { position, quaternion: quat, scale };
  }, [sx, sy, sz, px, py, pz, cx, cz, qx, qy, qz, qw, flip, mirror]);
  const item = useMemo((): PoolItem => ({
    id,
    url,
    materialSig,
    transform,
    overrideMaterials,
    isSemiTransparent,
  }), [id, url, materialSig, transform, overrideMaterials, isSemiTransparent]);

  useEffect(() => {
    if(allowed === false) {
      return;
    }

    upsertInstance(item);

    return () => {
      removeInstance(item);
    };
  }, [allowed, item]);

  if(enabled === false || allowed === false) {
    return fallback;
  }

  // Primitive HitBox Only
  return (
    <group
      scale={scaleXYZ}
      position={
        new Vector3(
          center.x * (1 - flip) * scaleXYZ[0],
          0,
          center.z * (1 - mirror) * scaleXYZ[2],
        )
      }
    >
      <mesh
        geometry={HitBoxGeometry}
        material={HitBoxMaterial}
        scale={hitBoxSize}
      />
    </group>
  );
};
