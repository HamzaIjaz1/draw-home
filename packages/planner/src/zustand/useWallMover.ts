import { Vector2 } from 'three';
import { create } from 'zustand';
import { isNull, Union } from '@arthurka/ts-utils';
import { WallId } from '@draw-house/common/dist/brands';
import { closePopUpToolbar } from './usePopUpToolbar';
import { useWallLengthChangeInputData } from './useWallLengthChangeInputData';

type Store = {
  wallMover: null | Union<
    | {
      type: 'corner';
      startPosition: Vector2;
    }
    | {
      type: 'parallel';
      wallId: WallId;
      startPosition: Vector2;
    }
  >;
};

export const useWallMover = create<Store>(() => ({
  wallMover: null,
}));

useWallMover.subscribe(() => {
  const { wallLengthChangeInputData } = useWallLengthChangeInputData.getState();

  if(isNull(wallLengthChangeInputData)) {
    closePopUpToolbar();
  }
});
