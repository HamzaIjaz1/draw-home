import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { saveAs } from 'file-saver';
import { AxesHelper, Box3, BufferAttribute, BufferGeometry, Camera, Light, Material, Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, Scene, ShaderMaterial, Vector3 } from 'three';
import { isNull, ObjKeys } from '@arthurka/ts-utils';
import { dedup, prune, weld } from '@gltf-transform/functions';
import { Format, WebIO } from '@gltf-transform/core';
import assert from 'assert';
import { filenamify } from './filenamify';
import { defaultProjectName } from '../zustand';
import { sanitizeAccessorCountSceneExport } from './sanitizeAccessorCountOnSceneExport';
import { sanitizeNanAccessorsSceneExport } from './sanitizeNanAccessorsOnSceneExport';
import { sanitizeNormalizeAttributesSceneExport } from './sanitizeNormalizeAttributesSceneExport';

const shouldExcludeObject = (object: Object3D): boolean => {
  if(
    false
      || object.type === 'Line2'
      || object instanceof Camera
      || object instanceof Light
      || object instanceof AxesHelper
  ) {
    return true;
  }

  // Special case, exclude plane-helpers
  if(object instanceof Mesh && object.geometry instanceof PlaneGeometry) {
    const params = object.geometry.parameters;

    if(
      true
        && (params.width === 100 || params.width === 1)
        && (params.height === 100 || params.height === 1)
        && params.widthSegments === 1
        && params.heightSegments === 1
    ) {
      return true;
    }
  }

  // Sketchfab import workaround
  // Exclude very large objects (sky, sun, clouds, etc...) they are breaking bounding box of the scene and breaks zoom,
  const tmpBox = new Box3();
  const tmpSize = new Vector3();
  if(object instanceof Mesh) {
    tmpBox.setFromObject(object);
    tmpBox.getSize(tmpSize);

    const maxDim = Math.max(tmpSize.x, tmpSize.y, tmpSize.z);
    if(maxDim > 1000) {
      console.warn(`Excluded object (too large bbox): size=${tmpSize.toArray()} uuid=${object.uuid}`);
      return true;
    }
  }

  return false;
};

const cloneGeometry = (geometry: BufferGeometry): BufferGeometry => {
  try {
    const clone = geometry.clone();

    // Position check
    if(!('position' in clone.attributes)) {
      console.warn('Geometry missing position attribute, skipping...');
      return new BufferGeometry();
    }

    // Null checks
    for(const attrKey of ObjKeys(clone.attributes)) {
      const attribute = clone.attributes[attrKey];
      if(!attribute?.array) {
        continue;
      }

      const array = attribute.array;
      for(let i = 0; i < array.length; i++) {
        if(!Number.isFinite(array[i])) {
          array[i] = 0;
        }
      }
      attribute.needsUpdate = true;
    }

    // Normals check
    if(!('normal' in clone.attributes)) {
      console.warn(`Geometry ${geometry.uuid} missing normals, computing...`);
      clone.computeVertexNormals();
    }

    // UV's check
    if(!('uv' in clone.attributes)) {
      const position = clone.getAttribute('position');
      if(position instanceof BufferAttribute) {
        clone.computeBoundingBox();
        const { boundingBox } = clone;

        if(isNull(boundingBox)) {
          console.warn(`Unable to compute bounding box for geometry ${geometry.uuid}; skipping UVs.`);
        } else {
          console.warn(`Geometry ${geometry.uuid} missing UVs, generating planar UVs...`);

          const uvArray = new Float32Array(position.count * 2);
          const dx = boundingBox.max.x - boundingBox.min.x || 1;
          const dy = boundingBox.max.y - boundingBox.min.y || 1;

          for(let i = 0; i < position.count; i++) {
            const x = position.getX(i);
            const y = position.getY(i);
            uvArray[i * 2] = (x - boundingBox.min.x) / dx;
            uvArray[i * 2 + 1] = (y - boundingBox.min.y) / dy;
          }

          clone.setAttribute('uv', new BufferAttribute(uvArray, 2));
        }
      }
    }

    return clone;
  } catch(e) {
    console.error('Error cloning geometry:', e);
    return new BufferGeometry();
  }
};

const cloneMaterial = (e: Material | Material[]): Material | Material[] => {
  try {
    if(Array.isArray(e)) {
      return e.map(mat => {
        if(mat instanceof ShaderMaterial) {
          console.warn(`ShaderMaterial for ${mat.name} not supported in GLTF, using default`);
          return new MeshBasicMaterial({ color: 0xffffff });
        }
        const cloned = mat.clone();
        return cloned;
      });
    }
    if(e instanceof ShaderMaterial) {
      console.warn(`ShaderMaterial for ${e.name} not supported in GLTF, using default`);
      return new MeshBasicMaterial({ color: 0xffffff });
    }
    const cloned = e.clone();
    return cloned;
  } catch(e) {
    console.error('Error cloning material:', e);
    return new MeshBasicMaterial({ color: 0xffffff });
  }
};

const copyMeshes = (source: Object3D, targetParent: Object3D) => {
  source.traverse(child => {
    if(shouldExcludeObject(child)) {
      return;
    }

    try {
      if(child instanceof Mesh) {
        const material = cloneMaterial(child.material);
        const geometry = cloneGeometry(child.geometry);
        const clonedMesh = new Mesh(geometry, material);
        clonedMesh.name = child.name;
        clonedMesh.userData = { ...child.userData };
        clonedMesh.matrix.copy(child.matrixWorld);
        clonedMesh.matrix.decompose(clonedMesh.position, clonedMesh.quaternion, clonedMesh.scale);
        clonedMesh.updateMatrixWorld(true);
        clonedMesh.matrixAutoUpdate = false;

        targetParent.add(clonedMesh);
      }
    } catch(e) {
      console.error(`Error cloning object ${child.name || 'Unnamed Object'}:`, e);
    }
  });
};

type ExportSceneParams = {
  format: 'GLB' | 'GLTF';
  scene: Scene;
  projectName: string;
};

export const exportScene = ({ projectName, format, scene }: ExportSceneParams) => {
  try {
    const sceneClone = new Scene();
    sceneClone.name = scene.name;
    sceneClone.userData = { ...scene.userData };

    copyMeshes(scene, sceneClone);

    const fileName = filenamify(projectName.trim() === '' ? defaultProjectName : projectName);

    new GLTFExporter().parse(
      sceneClone,
      async result => {
        const io = new WebIO({ credentials: 'omit' });

        assert(result instanceof ArrayBuffer, 'GLTFExporter should be configured only to binary:true. |p5s5ic|');
        const document = await io.readBinary(new Uint8Array(result));
        await document.transform(
          prune(),
          dedup(),
          weld(),
          sanitizeNanAccessorsSceneExport,
          sanitizeAccessorCountSceneExport,
          sanitizeNormalizeAttributesSceneExport,
        );

        if(format === 'GLB') {
          const cleaned = await io.writeBinary(document);
          saveAs(new Blob([cleaned], { type: 'model/gltf-binary' }), `${fileName}.glb`);
        } else if(format === 'GLTF') {
          const { json, resources } = await io.writeJSON(document, { format: Format.GLTF });
          saveAs(new Blob([JSON.stringify(json, null, 2)], { type: 'model/gltf+json' }), `${fileName}.gltf`);
          Object.entries(resources).forEach(([name, data]) => {
            saveAs(new Blob([data as ArrayBuffer], { type: 'application/octet-stream' }), name);
          });
        }
      },
      error => console.error('GLTF Export error:', error),
      {
        binary: true, // prepare in binary only for gltfTransform processing
        onlyVisible: true,
        maxTextureSize: 2048,
        includeCustomExtensions: true,
        embedImages: true,
      },
    );
  } catch(e) {
    console.error('Scene export failed:', e);
  }
};
