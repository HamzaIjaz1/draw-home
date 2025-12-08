import { isNull } from '@arthurka/ts-utils';
import { useIsMoving3DModel } from '../../zustand/useIsMoving3DModel';
import { useNewCustomModel } from '../../zustand/useNewCustomModel';
import { useSelectedItem } from '../../zustand/useSelectedItem';

export const objectDeselectHotkeyPress = () => {
  const { isMoving3DModel } = useIsMoving3DModel.getState();
  const { newCustomModel } = useNewCustomModel.getState();

  if(isMoving3DModel === false && isNull(newCustomModel)) {
    useSelectedItem.setState(useSelectedItem.getInitialState());
  }
};
