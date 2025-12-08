import { RoofDormerId } from '@draw-house/common/dist/brands';
import { closePopUpToolbar } from '../../zustand';
import { removeDormer } from '../../zustand/useRoofs';

export const removeRoofDormerPopUpToolbarClick = (dormerId: RoofDormerId) => {
  closePopUpToolbar();
  removeDormer(dormerId);
};
