import { CustomModelId } from '@draw-house/common/dist/brands';
import { closePopUpToolbar, removeCustomModel } from '../../zustand';

export const removeCustomModelPopUpToolbarClick = (id: CustomModelId) => {
  closePopUpToolbar();
  removeCustomModel(id);
};
