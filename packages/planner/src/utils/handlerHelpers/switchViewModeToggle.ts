import { wait } from '@arthurka/ts-utils';
import { useIsFirstPersonView, useViewMode, viewModes } from '../../zustand';
import { dispatchInfoPanelEvent } from '../dispatchInfoPanelEvent';
import { useIsDollhouseView } from '../../zustand/useIsDollhouseView';

export type ViewModeToggleTab = typeof viewModes[number] | 'dollhouse' | 'walk';

export const switchViewModeToggle = async (tab: ViewModeToggleTab) => {
  useViewMode.setState({
    viewMode: tab === 'walk' || tab === 'dollhouse' ? '3D' : tab,
  });
  await wait(0);
  useIsFirstPersonView.setState({
    isFirstPersonView: tab === 'walk',
  });
  useIsDollhouseView.setState({
    isDollhouseView: tab === 'dollhouse',
  });
  if(tab === '3D') {
    dispatchInfoPanelEvent('first-switch-to-3d');
  }
  if(tab === 'walk') {
    dispatchInfoPanelEvent('first-switch-to-walk-mode');
  }
};
