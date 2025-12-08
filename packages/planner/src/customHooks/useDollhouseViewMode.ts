import { useFrame } from '@react-three/fiber';
import { RefObject } from 'react';
import { Group, Vector3 } from 'three';
import { isNull } from '@arthurka/ts-utils';
import { useIsDollhouseView } from '../zustand/useIsDollhouseView';

type DollhouseViewModePropsType = {
  groupRef: RefObject<Group>;
  normal: Vector3 | null;
  threshold: number;
};

export const useDollhouseViewMode = ({ groupRef, normal, threshold }: DollhouseViewModePropsType) => {
  const { isDollhouseView } = useIsDollhouseView();

  useFrame(({ camera }) => {
    const group = groupRef.current;
    if(isNull(group) || isNull(normal)) {
      return;
    }

    if(isDollhouseView === false) {
      if(group.visible === false) {
        group.visible = true;
        group.scale.set(1, 1, 1);
      }
      return;
    }

    const cameraDir = camera.getWorldDirection(new Vector3());
    const shouldHide = normal.dot(cameraDir) > threshold;

    if(shouldHide === true) {
      group.visible = false;
      group.scale.set(0, 0, 0);
    } else {
      group.visible = true;
      group.scale.set(1, 1, 1);
    }
  });
};
