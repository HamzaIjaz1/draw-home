import { CanvasTexture, Color, Mesh, MeshStandardMaterial, Object3D, RepeatWrapping, Vector3 } from 'three';
import { isNull, isUndefined, ObjEntries } from '@arthurka/ts-utils';
import assert from 'assert';
import { loadTextures } from './loadTextures';
import { normalizeMaterialProps } from './normalizeMaterialProps';
import { createOverlayCanvasFromTexture } from './canvas';
import { DEFAULT_TEXTURE_TRANSFORM } from '../zod/TextureTransform';
import { CustomModelsStore } from '../zustand/useCustomModels/store';

const disposeCanvasTexture = (e: MeshStandardMaterial) => {
  if(e.map instanceof CanvasTexture && e.map.userData?.__overlay__ === true) {
    e.map.dispose();
    delete e.map.userData.__overlay__;
  }
};

export const assignTextureMapsToScene = async (
  scene: Object3D,
  overrideMaterials: NonNullable<Extract<CustomModelsStore['customModels'][number], { type: 'regular' | 'column' }>['overrideMaterials']>,
) => {
  const jobs: Array<() => Promise<void>> = [];

  scene.traverse(e => {
    if(!(e instanceof Mesh)) {
      return;
    }

    jobs.push(async () => {
      const geometry = e.geometry;
      geometry.computeBoundingBox();
      const bbox = geometry.boundingBox;
      if(!bbox) {
        return;
      }

      const size = new Vector3();
      bbox.getSize(size);

      // Calculate bounding box aspect for correct texture tilling
      let uSize = 1;
      let vSize = 1;
      if(size.x <= size.y && size.x <= size.z) {
        uSize = size.z;
        vSize = size.y;
      } else if(size.y <= size.x && size.y <= size.z) {
        uSize = size.x;
        vSize = size.z;
      } else {
        uSize = size.x;
        vSize = size.y;
      }

      const materialArray = Array.isArray(e.material) ? e.material : [e.material];
      const newMaterials = await Promise.all(
        materialArray.map(async e => {
          assert(e instanceof MeshStandardMaterial, 'Something went wrong. |0xfu7u|');

          const material = e.clone();
          const overrideMaterial = overrideMaterials[e.name];
          if(isUndefined(overrideMaterial)) {
            return material;
          }

          const { texture, colorOverlay, compositeOperation, textureTransform } = overrideMaterial;
          const xf = textureTransform ?? DEFAULT_TEXTURE_TRANSFORM;
          const mapProps = await loadTextures(texture.attributes.maps);

          for(const [key, val] of ObjEntries(normalizeMaterialProps(mapProps))) {
            if(key in material) {
              (material as any)[key] = val;
            }
          }

          if(!isNull(colorOverlay)) {
            assert(!isNull(material.map) && material.map.image instanceof HTMLImageElement, 'Something went wrong. |e77xk4|');

            disposeCanvasTexture(material);

            const overlay = new CanvasTexture(createOverlayCanvasFromTexture(material.map.image, colorOverlay.value.hexa(), compositeOperation));
            overlay.userData = overlay.userData ?? {};
            overlay.userData.__overlay__ = true;

            material.map = overlay;
            material.color = new Color('#ccc');
          }

          if(!isNull(material.map)) {
            material.map.wrapS = material.map.wrapT = RepeatWrapping;
            const uTilesBase = uSize / texture.attributes.scale;
            const vTilesBase = vSize / texture.attributes.scale;
            const uTiles = (Number.isFinite(uTilesBase) ? uTilesBase : 1) / Math.max(0.01, xf.wScale);
            const vTiles = (Number.isFinite(vTilesBase) ? vTilesBase : 1) / Math.max(0.01, xf.lScale);

            material.map.repeat.set(Number.isFinite(uTiles) ? uTiles : 1, Number.isFinite(vTiles) ? vTiles : 1);
            material.map.center.set(0.5, 0.5);
            material.map.rotation = (xf.rotateDeg * Math.PI) / 180;
          }

          const appearance = {
            texture,
            transform: xf,
            overlay: colorOverlay,
          };
          material.userData = material.userData ?? {};
          material.userData.__appearance = appearance;

          material.needsUpdate = true;

          return material;
        }),
      );

      e.material = Array.isArray(e.material) ? newMaterials : newMaterials[0];

      if(Array.isArray(e.material) === false) {
        const ap = e.material?.userData?.__appearance;
        if(ap !== undefined) {
          e.userData = e.userData ?? {};
          e.userData.appearance = ap;
        }
      }
    });
  });

  for(const run of jobs) {
    await run();
  }
};
