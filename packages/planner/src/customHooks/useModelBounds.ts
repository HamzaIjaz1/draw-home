import { useEffect, useMemo, useState } from 'react';
import { Box3, Mesh, Object3D, Vector3 } from 'three';
import { isUndefined } from '@arthurka/ts-utils';
import { loadGltf } from '../utils/loadGltf';

type ModelBoundParams = {
  url?: string | null;
  object?: Object3D | null;
  overrides?: Partial<{ width: number; height: number; depth: number }>;
  cacheKey?: string | null;
  enabled?: boolean;
};

export type ModelBounds = {
  box: Box3;
  size: Vector3;
  geometricCenter: Vector3;
} | null;

const boundsCache = new Map<string, { box: Box3; size: Vector3; center: Vector3 }>();

export const computeBoundsOnlyMeshes = (root: Object3D) => {
  const box = new Box3();
  root.updateMatrixWorld(true);

  let hasMesh = false;
  root.traverse(obj => {
    if(obj instanceof Mesh && obj.geometry) {
      hasMesh = true;
      if(!obj.geometry.boundingBox) {
        obj.geometry.computeBoundingBox?.();
      }
      const geometryBox = new Box3().copy(obj.geometry.boundingBox);
      geometryBox.applyMatrix4(obj.matrixWorld);
      box.union(geometryBox);
    }
  });

  if(hasMesh === false) {
    box.setFromObject(root);
  }

  const size = box.getSize(new Vector3());
  const center = box.getCenter(new Vector3());
  return { box, size, center };
};

export const useModelBounds = (opts: ModelBoundParams): ModelBounds => {
  const { url = null, object = null, overrides, cacheKey = url ?? null, enabled = true } = opts;
  const [raw, setRaw] = useState<{ box: Box3; size: Vector3; center: Vector3 } | null>(null);

  useEffect(() => {
    if(!enabled) {
      setRaw(null);
      return;
    }

    let cancelled = false;

    (async () => {
      if(object) {
        const r = computeBoundsOnlyMeshes(object);
        if(!cancelled) {
          setRaw(r);
        }
        return;
      }

      if(!url) {
        if(!cancelled) {
          setRaw(null);
        }
        return;
      }

      if(cacheKey) {
        const cached = boundsCache.get(cacheKey) ?? null;
        if(!cancelled) {
          setRaw(cached);
        }
        if(cached) {
          return;
        }
      }

      const { scene } = await loadGltf(url);
      const r = computeBoundsOnlyMeshes(scene);
      if(cacheKey) {
        boundsCache.set(cacheKey, r);
      }
      if(!cancelled) {
        setRaw(r);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [enabled, url, object, cacheKey]);

  const value: ModelBounds = useMemo(() => {
    if(!raw) {
      return null;
    }

    const w = overrides?.width;
    const h = overrides?.height;
    const d = overrides?.depth;

    if(isUndefined(w) && isUndefined(h) && isUndefined(d)) {
      return { box: raw.box, size: raw.size, geometricCenter: raw.center };
    }

    const size = new Vector3(
      isUndefined(w) ? raw.size.x : w,
      isUndefined(h) ? raw.size.y : h,
      isUndefined(d) ? raw.size.z : d,
    );

    return { box: raw.box, size, geometricCenter: raw.center };
  }, [raw, overrides?.width, overrides?.height, overrides?.depth]);

  return value;
};
