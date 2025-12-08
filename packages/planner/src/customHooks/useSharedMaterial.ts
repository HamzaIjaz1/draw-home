import { useMemo } from 'react';
import { Color, ColorRepresentation, FrontSide, MeshStandardMaterial, MeshStandardMaterialParameters, SRGBColorSpace, Texture } from 'three';
import { ColorInstance } from 'color';
import { theme } from '@draw-house/ui/dist/theme';
import { MeshStandardMaterialProps } from '@react-three/fiber';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { twoDWallColor } from '../constants';
import { nullMapProps } from '../utils';
import { extendedJSON } from '../utils/safeJSONParse';

const materialCache = new Map<string, MeshStandardMaterial>();

const convertColorProp = (value: any): ColorRepresentation | undefined => {
  if(Array.isArray(value) && value.length === 3 && value.every(n => typeof n === 'number')) {
    return new Color(...value);
  }
  return value;
};

const threeStrictKeys = new Set(['color', 'emissive', 'blendColor']);

const stripUnsafeUndefinedValues = <T extends Record<string, unknown>>(
  obj: T,
): Partial<T> => {
  const result: Partial<T> = {};

  for(const key of Object.keys(obj)) {
    if(!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue;
    }

    const value = obj[key as keyof T];

    if(
      value !== null &&
      (value !== undefined || !threeStrictKeys.has(key as keyof T & string))
    ) {
      result[key as keyof T] = value;
    }
  }

  return result;
};

const ensureSRGBColorSpace = (e: Texture | null): void => {
  if(!isNull(e) && e.colorSpace !== SRGBColorSpace) {
    e.colorSpace = SRGBColorSpace;
    e.needsUpdate = true;
  }
};

const fixMaterialColorSpaces = (material: MeshStandardMaterial) => {
  ensureSRGBColorSpace(material.map);
};

const convertToThreeMaterialParams = (
  props: MeshStandardMaterialProps,
): MeshStandardMaterialParameters => {
  const {
    color,
    emissive,
    blendColor,
    onUpdate,
    ...rest
  } = props;

  const base: any = {
    ...rest,
    color: convertColorProp(color),
    emissive: convertColorProp(emissive),
    blendColor: convertColorProp(blendColor),
  };

  return stripUnsafeUndefinedValues(base) as MeshStandardMaterialParameters;
};

const getMapPropsHash = (props: MeshStandardMaterialProps): string => (
  Object.entries(props)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => {
      if(typeof v === 'string') {
        return `${k}:${v}`;
      }
      if(typeof v === 'number') {
        return `${k}:${v}`;
      }
      if(v instanceof Color) {
        return `${k}:${v.getStyle()}`;
      }
      if(typeof v === 'object' && !isNull(v) && 'uuid' in v) {
        return `${k}:${v.uuid}`;
      }
      return `${k}:1`;
    })
    .sort()
    .join('|')
);

export const useSharedMaterial = ({
  mapProps,
  repeat,
  overlayColor,
  compositeOperation,
  isSelected,
  is2D,
  opacity,
  polygonOffset,
  polygonOffsetUnits,
  polygonOffsetFactor,
  isOverFloorPlan,
}: {
  mapProps: MeshStandardMaterialProps;
  repeat: { x: number; y: number };
  overlayColor: ColorInstance | null;
  compositeOperation: string;
  isSelected: boolean;
  is2D: boolean;
  opacity: number;
  polygonOffset: boolean;
  polygonOffsetUnits: number;
  polygonOffsetFactor: number;
  isOverFloorPlan: boolean;
}) => useMemo(() => {
  const cleanedMapProps = nullMapProps(is2D || isSelected, mapProps);
  const mapPropsHash = getMapPropsHash(cleanedMapProps);
  const key = extendedJSON.stringify({
    overlayColor,
    compositeOperation,
    repeat,
    isSelected,
    is2D,
    mapPropsHash,
    opacity,
  });

  const cached = materialCache.get(key);
  if(!isUndefined(cached)) {
    return cached;
  }

  const material = new MeshStandardMaterial({
    ...convertToThreeMaterialParams(cleanedMapProps),
    side: FrontSide,
    transparent: opacity !== 1,
    opacity,
    color: (
      isSelected === true
        ? theme.palette.primary.main
        : isOverFloorPlan === true
          ? '#3fbffa'
          : is2D === true
            ? twoDWallColor
            : 'white'
    ),
    polygonOffset,
    polygonOffsetUnits,
    polygonOffsetFactor,
  });

  materialCache.set(key, material);
  fixMaterialColorSpaces(material);

  return material;
}, [
  is2D,
  isSelected,
  mapProps,
  overlayColor,
  compositeOperation,
  repeat,
  opacity,
  isOverFloorPlan,
  polygonOffset,
  polygonOffsetUnits,
  polygonOffsetFactor,
]);
