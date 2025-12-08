import { useGLTF } from '@react-three/drei';
import { Float32BufferAttribute, Mesh, Vector3 } from 'three';

export const useGLTFWithAutoUV = (url: string, projectionAxis: 'xy' | 'xz' | 'yz' = 'xz') => {
  const { scene } = useGLTF(url);

  scene.traverse(child => {
    if(child instanceof Mesh && child.geometry) {
      const geometry = child.geometry;
      geometry.computeBoundingBox();

      const bbox = geometry.boundingBox;
      const size = new Vector3();
      bbox.getSize(size);

      const position = geometry.attributes.position;
      const uvArray = [];

      for(let i = 0; i < position.count; i++) {
        let u = 0;
        let v = 0;

        if(projectionAxis === 'xy') {
          u = (position.getX(i) - bbox.min.x) / size.x;
          v = (position.getY(i) - bbox.min.y) / size.y;
        } else if(projectionAxis === 'xz') {
          u = (position.getX(i) - bbox.min.x) / size.x;
          v = (position.getZ(i) - bbox.min.z) / size.z;
        } else if(projectionAxis === 'yz') {
          u = (position.getZ(i) - bbox.min.z) / size.z;
          v = (position.getY(i) - bbox.min.y) / size.y;
        }

        uvArray.push(Number.isFinite(u) ? u : 0, Number.isFinite(v) ? v : 0);
      }

      geometry.setAttribute('uv', new Float32BufferAttribute(uvArray, 2));
    }
  });

  return { scene };
};
