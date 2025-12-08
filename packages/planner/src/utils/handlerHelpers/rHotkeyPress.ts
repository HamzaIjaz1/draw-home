import { isNull } from '@arthurka/ts-utils';
import { resetCurrentCamera, rotateCustomModel } from '../../zustand';
import { rotateNewCustomModel, useNewCustomModel } from '../../zustand/useNewCustomModel';
import { useSelectedItem } from '../../zustand/useSelectedItem';

export const rHotkeyPress = () => {
  const { newCustomModel } = useNewCustomModel.getState();
  const { selectedItem } = useSelectedItem.getState();

  switch(true) {
    case !isNull(newCustomModel):
      rotateNewCustomModel(90);
      break;
    case !isNull(selectedItem) && (selectedItem.type === 'customModel' || selectedItem.type === 'asset2D'):
      rotateCustomModel(selectedItem.id, 90);
      break;
    default:
      resetCurrentCamera();
  }
};
