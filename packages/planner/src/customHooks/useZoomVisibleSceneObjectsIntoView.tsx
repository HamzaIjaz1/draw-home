import { useThree } from '@react-three/fiber';
import { Box3, Mesh, OrthographicCamera, PerspectiveCamera, Vector3 } from 'three';
import { useEffect, useRef } from 'react';
import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { OrbitControls } from 'three-stdlib';
import { useCurrentCameraReset, useLevels } from '../zustand';
import { useTouchScreen } from '../zustand/useTouchScreen';
import { cameraTargetY } from '../constants';

export const useZoomVisibleSceneObjectsIntoView = () => {
  const currentCameraReset = useCurrentCameraReset();
  const { scene, camera, controls } = useThree();
  const { levels } = useLevels();
  const { isTouchScreen } = useTouchScreen();
  const objectsBoundingBox = useRef(new Box3());

  const { elevation } = getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |5ya5ut|');

  useEffect(() => {
    if(currentCameraReset.isCameraResetTriggered === false) {
      return;
    }

    const box = new Box3();

    scene.traverse(obj => {
      if(!(obj instanceof Mesh) || obj.visible === false) {
        return;
      }

      let cur: typeof obj.parent = obj;
      let ignore = false;

      do {
        if(cur.userData.isNotPartOfLevelObjects === true) {
          ignore = true;
          break;
        }
        cur = cur.parent;
      } while(!isNull(cur));

      if(ignore === false) {
        obj.geometry.computeBoundingBox();
        const geometryBoundingBox = obj.geometry.boundingBox;

        if(!geometryBoundingBox) {
          return;
        }

        const worldBox = geometryBoundingBox.clone().applyMatrix4(obj.matrixWorld);
        box.union(worldBox);
      }
    });

    const minBox = new Box3(new Vector3(-5, 0, -5), new Vector3(5, 3, 5));

    if(box.isEmpty()) {
      box.copy(minBox);
    } else {
      const center = box.getCenter(new Vector3());
      const size = box.getSize(new Vector3());
      const minSize = minBox.getSize(new Vector3());

      size.max(minSize);
      box.setFromCenterAndSize(center, size);
    }

    objectsBoundingBox.current = box;
  }, [scene, elevation, currentCameraReset]);

  useEffect(() => {
    if(currentCameraReset.isCameraResetTriggered === false || isNull(controls) || !(controls instanceof OrbitControls)) {
      return;
    }

    const box = objectsBoundingBox.current;
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());

    if(camera instanceof PerspectiveCamera) {
      const marginValue = isTouchScreen ? 0.05 : 0.15;
      const marginFactor = 1 / (1 - marginValue * 2);
      const target = new Vector3(center.x, elevation + cameraTargetY, center.z);

      const halfFovY = (camera.fov / 2) * (Math.PI / 180);
      const halfFovX = Math.atan(Math.tan(halfFovY) * camera.aspect);
      const tanX = Math.tan(halfFovX);
      const tanY = Math.tan(halfFovY);

      const pitchAngle = Math.PI / 4;
      const viewDir = new Vector3(0, -Math.sin(pitchAngle), -Math.cos(pitchAngle)).normalize();

      const forward = viewDir.clone();
      const horizontal = new Vector3().crossVectors(camera.up, forward).normalize();
      const vertical = new Vector3().crossVectors(forward, horizontal).normalize();

      const corners = [
        new Vector3(center.x - size.x / 2, center.y - size.y / 2, center.z - size.z / 2),
        new Vector3(center.x + size.x / 2, center.y - size.y / 2, center.z - size.z / 2),
        new Vector3(center.x - size.x / 2, center.y + size.y / 2, center.z - size.z / 2),
        new Vector3(center.x + size.x / 2, center.y + size.y / 2, center.z - size.z / 2),
        new Vector3(center.x - size.x / 2, center.y - size.y / 2, center.z + size.z / 2),
        new Vector3(center.x + size.x / 2, center.y - size.y / 2, center.z + size.z / 2),
        new Vector3(center.x - size.x / 2, center.y + size.y / 2, center.z + size.z / 2),
        new Vector3(center.x + size.x / 2, center.y + size.y / 2, center.z + size.z / 2),
      ];

      let distance = 0;

      for(const corner of corners) {
        const offsetFromTarget = corner.clone().sub(target);
        const x = Math.abs(offsetFromTarget.dot(horizontal)) * marginFactor;
        const y = Math.abs(offsetFromTarget.dot(vertical)) * marginFactor;
        const z = offsetFromTarget.dot(forward);

        distance = Math.max(
          distance,
          x / tanX - z,
          y / tanY - z,
        );
      }

      const cameraPos = target.clone().addScaledVector(viewDir, -distance);

      camera.position.copy(cameraPos);
      controls.target.copy(target);
      camera.lookAt(target);
      camera.updateProjectionMatrix();
      controls.update();
    }

    if(camera instanceof OrthographicCamera) {
      const marginValue = isTouchScreen ? 0.05 : 0.15;
      const margin = 1 / (1 - marginValue * 2);

      const prev = camera.position.clone();
      const pos = new Vector3(center.x, prev.y, center.z);
      camera.position.copy(pos);

      controls.target.copy(new Vector3(center.x, center.y + cameraTargetY, center.z));

      const aspect = camera.right / camera.top;
      const objectAspect = size.x / size.z;

      const baseZoom = (
        objectAspect > aspect
          ? (camera.right * 2) / size.x
          : (camera.top * 2) / size.z
      );

      camera.zoom = baseZoom / margin;

      camera.updateProjectionMatrix();
      controls.update();
    }

    useCurrentCameraReset.setState({
      isCameraResetTriggered: false,
    });
  }, [currentCameraReset, camera, controls, isTouchScreen, elevation]);
};
