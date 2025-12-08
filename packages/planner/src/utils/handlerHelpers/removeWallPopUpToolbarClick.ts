import { WallId } from '@draw-house/common/dist/brands';
import { removeWalls } from '../../zustand';

export const removeWallPopUpToolbarClick = (id: WallId) => {
  removeWalls([{
    oldWallId: id,
    newWallIds: [],
  }]);
};
