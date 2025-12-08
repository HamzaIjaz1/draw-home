import { useEffect } from 'react';
import { Mesh, Object3D } from 'three';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';

export const useOptimizationForCustomModel = (scene: Object3D) => {
  useEffect(() => {
    const optimizeMesh = (cb: (e: Mesh) => void) => {
      scene.traverse(e => {
        if(e instanceof Mesh) {
          cb(e);
        }
      });
    };

    optimizeMesh(e => {
      e.geometry.computeBoundsTree = computeBoundsTree;
      e.geometry.disposeBoundsTree = disposeBoundsTree;
      e.geometry.computeBoundsTree();
      e.raycast = acceleratedRaycast;
    });

    return () => {
      optimizeMesh(({ geometry }) => {
        geometry.disposeBoundsTree();
      });
    };
  }, [scene]);
};
