import { CustomModelId } from '@draw-house/common/dist/brands';
import { closePopUpToolbar, removeCustomModel } from '../../zustand';
import { useSelectedItem } from '../../zustand/useSelectedItem';

export const removeAsset2DPopUpToolbarClick = (id: CustomModelId) => {
  closePopUpToolbar();
  removeCustomModel(id);
  useSelectedItem.setState(useSelectedItem.getInitialState());
};
