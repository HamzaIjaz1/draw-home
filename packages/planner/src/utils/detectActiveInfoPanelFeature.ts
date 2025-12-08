import { ObjEntries } from '@arthurka/ts-utils';
import { useCreationMode, useSlideUpMenuLvl1 } from '../zustand';
import { infoPanelFeatures } from '../constants';
import { featureDetectors } from './featureDetectors';
import { useIsFirstPersonView } from '../zustand/useIsFirstPersonView';

// Note: higher priority modes are placed first
const modes = {
  'level-menu': () => {
    const { slideUpMenuLvl1 } = useSlideUpMenuLvl1.getState();

    return featureDetectors['level-menu'](slideUpMenuLvl1);
  },
  'view-settings-menu': () => {
    const { slideUpMenuLvl1 } = useSlideUpMenuLvl1.getState();

    return featureDetectors['view-settings-menu'](slideUpMenuLvl1);
  },
  'settings-menu': () => {
    const { slideUpMenuLvl1 } = useSlideUpMenuLvl1.getState();

    return featureDetectors['settings-menu'](slideUpMenuLvl1);
  },
  'ai-menu': () => {
    const { slideUpMenuLvl1 } = useSlideUpMenuLvl1.getState();

    return featureDetectors['ai-menu'](slideUpMenuLvl1);
  },
  'walk-mode': () => {
    const { isFirstPersonView } = useIsFirstPersonView.getState();

    return featureDetectors['walk-mode'](isFirstPersonView);
  },
  'draw-mode-line': () => {
    const { creationMode } = useCreationMode.getState();

    return featureDetectors['draw-mode-line'](creationMode);
  },
  'select-mode': () => {
    const { creationMode } = useCreationMode.getState();

    return featureDetectors['select-mode'](creationMode);
  },
} as const satisfies Partial<Record<keyof typeof infoPanelFeatures, () => boolean>>;

export const detectActiveInfoPanelFeature = () => {
  for(const [feature, detect] of ObjEntries(modes)) {
    if(detect() === true) {
      return feature;
    }
  }

  return null;
};
