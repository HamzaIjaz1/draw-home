import { Color, MeshStandardMaterial } from 'three';
import { MeshStandardMaterialProps } from '@react-three/fiber';
import { ObjEntries } from '@arthurka/ts-utils';

const cachedMeshStandardMaterial = new MeshStandardMaterial();

export const normalizeMaterialProps = (props: MeshStandardMaterialProps): Partial<MeshStandardMaterial> => {
  const normalized: Partial<MeshStandardMaterial> = {};

  for(const [key, value] of ObjEntries(props)) {
    if(key === 'color' || key === 'emissive' || key === 'blendColor') {
      normalized[key] = new Color(value as string);
    } else if(key in cachedMeshStandardMaterial) {
      (normalized as any)[key] = value;
    }
  }

  return normalized;
};
