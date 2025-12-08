// normalizeAttributes.ts
import { Transform } from '@gltf-transform/core';
import { isNull, isUndefined } from '@arthurka/ts-utils';

// local type for allowed accessor types from glTF 2.0 spec
type AccessorType = 'SCALAR' | 'VEC2' | 'VEC3' | 'VEC4';

function dimensionFromType(type: AccessorType): number {
  switch(type) {
    case 'SCALAR': return 1;
    case 'VEC2': return 2;
    case 'VEC3': return 3;
    case 'VEC4': return 4;
    default: return 0;
  }
}

function typeFromDimension(dim: number): AccessorType {
  switch(dim) {
    case 1: return 'SCALAR';
    case 2: return 'VEC2';
    case 3: return 'VEC3';
    case 4: return 'VEC4';
    default: return 'SCALAR';
  }
}

/**
 * normalizeAttributes
 *
 * Ensures that vertex attributes within primitives:
 * - keep only allowed semantics (POSITION, NORMAL, TANGENT, TEXCOORD_0, COLOR_0)
 * - are aligned to consistent dimension sizes
 * - COLOR_0 and TANGENT are padded with 1 where needed
 * - attributes with count mismatch vs POSITION are removed
 */
export const sanitizeNormalizeAttributesSceneExport: Transform = document => {
  const wantedDims: Record<string, number> = {
    POSITION: 3,
    NORMAL: 3,
    TANGENT: 4,
    TEXCOORD_0: 2,
    COLOR_0: 4,
  };

  for(const mesh of document.getRoot().listMeshes()) {
    for(const prim of mesh.listPrimitives()) {
      // 1) Remove all semantics not in the whitelist
      for(const sem of prim.listSemantics()) {
        if(isUndefined(wantedDims[sem])) {
          prim.setAttribute(sem, null);
        }
      }

      const pos = prim.getAttribute('POSITION');
      if(isNull(pos)) {
        continue;
      }

      const expectedCount = pos.getCount();

      // 2) Align semantics to the expected count and dimension
      for(const sem of Object.keys(wantedDims)) {
        const attr = prim.getAttribute(sem);
        if(isNull(attr)) {
          continue;
        }

        // drop attribute if count mismatch
        if(attr.getCount() !== expectedCount) {
          prim.setAttribute(sem, null);
          continue;
        }

        const targetDim = wantedDims[sem];
        if(isUndefined(targetDim)) {
          prim.setAttribute(sem, null);
          continue;
        }

        const curDim = dimensionFromType(attr.getType() as AccessorType);

        if(curDim === targetDim) {
          continue;
        }

        const src = attr.getArray() as Float32Array;
        const dst = new Float32Array(expectedCount * targetDim);

        const fill = (sem === 'COLOR_0' || sem === 'TANGENT') && targetDim === 4 ? 1 : 0;

        for(let t = 0; t < expectedCount; t++) {
          const srcBase = t * curDim;
          const dstBase = t * targetDim;

          let m = 0;
          for(; m < Math.min(curDim, targetDim); m++) {
            const vv = src[srcBase + m];
            dst[dstBase + m] = isUndefined(vv) || !Number.isFinite(vv) ? 0 : vv;
          }
          while(m < targetDim) {
            dst[dstBase + m] = fill;
            m++;
          }
        }

        attr.setType(typeFromDimension(targetDim));
        attr.setArray(dst);
      }
    }
  }
};
