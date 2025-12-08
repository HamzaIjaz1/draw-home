import type { ThreeEvent } from '@react-three/fiber';
import type { Intersection, Object3D } from 'three';
import { isNull, isNullish } from '@arthurka/ts-utils';
import type { ColorOverlay } from '.';
import type { TextureAsset } from '../zod';
import { takeOverlaySample, takeTextureSample, useAppearanceSampler } from '../zustand/useAppearanceSampler';
import { TextureTransform } from '../zod/TextureTransform';

type AppearanceTag = {
  texture: TextureAsset | null;
  transform: TextureTransform | null;
  overlay: ColorOverlay | null;
};

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

const isColorOverlay = (v: unknown): v is ColorOverlay => isObject(v) && 'type' in v && 'value' in v;

const isTextureAsset = (v: unknown): v is TextureAsset => isObject(v) && 'id' in v && 'attributes' in v;

const isTextureTransform = (v: unknown): v is TextureTransform => isObject(v) && 'wScale' in v && 'lScale' in v && 'rotateDeg' in v;

const isAppearanceTag = (v: unknown): v is AppearanceTag => isObject(v) &&
  (
    !('texture' in v) || v.texture === null || isTextureAsset(v.texture)
  ) &&
  (
    !('overlay' in v) || v.overlay === null || isColorOverlay(v.overlay)
  ) &&
  (
    !('transform' in v) || v.transform === null || isTextureTransform(v.transform)
  );

const getAppearanceFromUserData = (o: Object3D | null | undefined): AppearanceTag | null => {
  if(isNullish(o)) {
    return null;
  }
  const userData: unknown = o.userData;
  if(!isObject(userData)) {
    return null;
  }

  const maybeAp: unknown =
    'appearance' in userData ? userData.appearance : null;

  return isAppearanceTag(maybeAp) ? maybeAp : null;
};

const findNearestAppearance = (start: Object3D | null | undefined): AppearanceTag | null => {
  let node = start;
  while(node) {
    const ap = getAppearanceFromUserData(node);
    if(!isNull(ap)) {
      return ap;
    }
    node = node.parent;
  }
  return null;
};

const findAppearanceFromIntersections = (
  intersections: ReadonlyArray<Intersection<Object3D>>,
): AppearanceTag | null => {
  for(const hit of intersections) {
    const ap = findNearestAppearance(hit.object);
    if(!isNull(ap)) {
      return ap;
    }
  }
  return null;
};

export const handleAppearanceSample = (e: ThreeEvent<PointerEvent> | ThreeEvent<MouseEvent>): boolean => {
  const { isActive, mode } = useAppearanceSampler.getState();
  if(e.button !== 0 || isActive === false) {
    return false;
  }

  e.stopPropagation();

  const ap =
    findNearestAppearance(e.eventObject) ||
    findNearestAppearance((e as unknown as { object?: Object3D }).object) ||
    (Array.isArray(e.intersections) ? findAppearanceFromIntersections(e.intersections) : null);

  if(isNull(ap)) {
    return true;
  }
  if(mode === 'overlay') {
    takeOverlaySample(isColorOverlay(ap.overlay) ? ap.overlay : null);
    return true;
  }
  if(mode === 'texture') {
    takeTextureSample(isAppearanceTag(ap) ? ap : null);
    return true;
  }

  return true;
};
