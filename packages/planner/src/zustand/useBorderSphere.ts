import { generateUUID } from '@draw-house/common/dist/utils';
import { ThreeEvent } from '@react-three/fiber';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { finishFurnitureCreationMode } from './useCreationMode';
import { closePopUpToolbar } from './usePopUpToolbar';
import { useCanMoveWall } from './useCanMoveWall';
import { unselectItem } from './useSelectedItem';

type Store = {
  pointerUp: string;
  pointerDown: string;
  click: string;
};

const useBorderSphere = create(subscribeWithSelector<Store>(() => ({
  pointerUp: generateUUID(),
  pointerDown: generateUUID(),
  click: generateUUID(),
})));

export const pointerUpBorderSphere = (e: ThreeEvent<PointerEvent>) => {
  if(e.button !== 0) {
    return;
  }

  useBorderSphere.setState({
    pointerUp: generateUUID(),
  });
};

export const pointerDownBorderSphere = (e: ThreeEvent<PointerEvent>) => {
  if(e.button !== 0) {
    return;
  }

  useBorderSphere.setState({
    pointerDown: generateUUID(),
  });
};

export const clickBorderSphere = (e: ThreeEvent<MouseEvent>) => {
  if(e.button !== 0) {
    return;
  }

  useBorderSphere.setState({
    click: generateUUID(),
  });
};

export const onEmptySpacePointerDown = (cb: () => void) => (
  useBorderSphere.subscribe(s => s.pointerDown, cb)
);

useBorderSphere.subscribe(s => s.pointerUp, finishFurnitureCreationMode);
useBorderSphere.subscribe(s => s.pointerUp, closePopUpToolbar);
useBorderSphere.subscribe(s => s.pointerUp, unselectItem);
useBorderSphere.subscribe(s => s.pointerUp, () => {
  useCanMoveWall.setState({ canMoveWall: false });
});
