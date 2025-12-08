import { useCreationMode } from '../../zustand';
import { useIsWallDrawToolbarShown } from '../../zustand/useIsWallDrawToolbarShown';
import { dispatchInfoPanelEvent } from '../dispatchInfoPanelEvent';

export const clickWallCreationButton = () => {
  const { isWallDrawToolbarShown } = useIsWallDrawToolbarShown.getState();
  const { creationMode } = useCreationMode.getState();

  dispatchInfoPanelEvent('draw-mode-line');
  useCreationMode.setState({ creationMode: 'walls' });

  if(creationMode === 'walls') {
    useIsWallDrawToolbarShown.setState({
      isWallDrawToolbarShown: isWallDrawToolbarShown === false,
    });
  }
};
