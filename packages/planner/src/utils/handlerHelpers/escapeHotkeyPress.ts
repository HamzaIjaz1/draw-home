import { isNull } from '@arthurka/ts-utils';
import { closePopUpToolbar, useCreationMode, usePopUpToolbar, useTempWalls } from '../../zustand';
import { clickPointerModeButton } from '../creationModeOrigin';
import { useNewCustomModel } from '../../zustand/useNewCustomModel';
import { useSelectedItem } from '../../zustand/useSelectedItem';

export const escapeHotkeyPress = () => {
  const { tempWalls } = useTempWalls.getState();
  const { creationMode } = useCreationMode.getState();
  const { newCustomModel } = useNewCustomModel.getState();
  const { popUpToolbar } = usePopUpToolbar.getState();
  const { selectedItem } = useSelectedItem.getState();

  switch(true) {
    case !isNull(newCustomModel):
      if(!isNull(newCustomModel.lastCopiedModelId)) {
        useSelectedItem.setState({
          selectedItem: {
            id: newCustomModel.lastCopiedModelId,
            type: 'customModel',
            mode: 'selected',
          },
        });
      }
      useNewCustomModel.setState(useNewCustomModel.getInitialState());
      break;
    case !isNull(popUpToolbar) || !isNull(selectedItem):
      closePopUpToolbar();
      useSelectedItem.setState(useSelectedItem.getInitialState());
      break;
    case tempWalls.length > 0:
      useTempWalls.setState(useTempWalls.getInitialState());
      break;
    case creationMode !== 'pointer':
      clickPointerModeButton();
      break;
    default:
      break;
  }
};
