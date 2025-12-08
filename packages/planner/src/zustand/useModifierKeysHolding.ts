import { create } from 'zustand';
import { NODE_ENV } from '@draw-house/common/dist/envVariables/public';
import { withComparingSetState } from '../utils/withComparingSetState';
import { useIsHotkeysShown } from './useIsHotkeysShown';
import { useIsInfoPanelOpened } from './useIsInfoPanelOpened';

export type ModifierKeysHoldingStore = {
  modifierKeysHolding: {
    ctrl: boolean;
    alt: boolean;
    shift: boolean;
  };
};

export const useModifierKeysHolding = create<ModifierKeysHoldingStore>(() => ({
  modifierKeysHolding: {
    ctrl: false,
    alt: false,
    shift: false,
  },
}));

withComparingSetState(useModifierKeysHolding);

export const getHoldingModifiers = ({ ctrl, alt, shift }: ModifierKeysHoldingStore['modifierKeysHolding']) => {
  const key = `_${Number(ctrl)}${Number(alt)}${Number(shift)}` as const;

  return ({
    _000: 'none',
    _001: 'shift',
    _010: 'alt',
    _011: 'alt+shift',
    _100: 'ctrl',
    _101: 'ctrl+shift',
    _110: 'ctrl+alt',
    _111: 'ctrl+alt+shift',
  } as const satisfies Record<typeof key, string>)[key];
};

useModifierKeysHolding.subscribe(({ modifierKeysHolding }) => {
  const modifierKeys = getHoldingModifiers(modifierKeysHolding);

  useIsHotkeysShown.setState({
    isHotkeysShown: modifierKeys === 'alt',
  });
  if(NODE_ENV === 'production' && modifierKeys === 'alt') {
    useIsInfoPanelOpened.setState({ isInfoPanelOpened: true });
  }
});
