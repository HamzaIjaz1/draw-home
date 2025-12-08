import { StairId } from '@draw-house/common/dist/brands';
import { closePopUpToolbar } from '../../zustand';
import { removeStair } from '../../zustand/useStairs';

export const removeStairPopUpToolbarClick = (id: StairId) => {
  closePopUpToolbar();
  removeStair(id);
};
