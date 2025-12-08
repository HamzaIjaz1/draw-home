import { Transform } from '@gltf-transform/core';

/** Replace NaN/Infinity to 0 in all float-accessors */
export const sanitizeNanAccessorsSceneExport: Transform = document => {
  const COMPONENT_TYPE_FLOAT = 5126; // glTF spec

  for(const accessor of document.getRoot().listAccessors()) {
    if(accessor.getComponentType() === COMPONENT_TYPE_FLOAT) {
      const arr = accessor.getArray() as Float32Array;
      let dirty = false;

      for(let i = 0; i < arr.length; i++) {
        if(!Number.isFinite(arr[i])) {
          arr[i] = 0;
          dirty = true;
        }
      }

      if(dirty === true) {
        accessor.setArray(new Float32Array(arr));
      }
    }
  }
};
