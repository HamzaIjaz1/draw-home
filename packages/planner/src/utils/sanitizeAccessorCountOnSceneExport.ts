import { isNull, isUndefined } from '@arthurka/ts-utils';
import { Transform } from '@gltf-transform/core';

export const sanitizeAccessorCountSceneExport: Transform = document => {
  for(const mesh of document.getRoot().listMeshes()) {
    for(const prim of mesh.listPrimitives()) {
      const attributes = prim.listSemantics();
      if(attributes.length === 0 || isUndefined(attributes[0])) {
        continue;
      }

      const firstAttr = prim.getAttribute(attributes[0]);
      if(isNull(firstAttr)) {
        continue;
      }

      const expected = firstAttr.getCount();

      for(const semantic of attributes) {
        const attr = prim.getAttribute(semantic);
        if(isNull(attr)) {
          continue;
        }

        if(attr.getCount() !== expected) {
          console.warn(`Dropping mismatched attribute ${semantic} (count=${attr.getCount()}, expected=${expected})`);
          prim.setAttribute(semantic, null);
        }
      }
    }
  }
};
