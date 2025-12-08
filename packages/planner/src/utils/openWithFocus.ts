import { KeyOf } from '@arthurka/ts-utils';
import { closeSlideUpMenuLvl1, openSlideUpMenuLvl1, useSlideUpMenuLvl1, useViewMode } from '../zustand';
import { SceneObjectsStore } from '../zustand/useSceneObjects';
import { closeSlideUpMenus } from './closeSlideUpMenus';
import { focusThenOpenAndRestore } from './focusThenOpenAndRestore';

export const openWithFocus = (
  key: KeyOf<SceneObjectsStore['sceneObjects']>,
  payload: Parameters<typeof openSlideUpMenuLvl1>[0],
  same: (s: ReturnType<typeof useSlideUpMenuLvl1.getState>['slideUpMenuLvl1']) => boolean,
) => {
  const { viewMode } = useViewMode.getState();

  const open = async () => {
    await closeSlideUpMenus({ except: 'lvl1' });

    const { slideUpMenuLvl1 } = useSlideUpMenuLvl1.getState();

    if(slideUpMenuLvl1.isOpened === true && same(slideUpMenuLvl1) === false) {
      await closeSlideUpMenuLvl1({});
    }

    await openSlideUpMenuLvl1(payload);
  };

  const isThisOpen = () => {
    const { slideUpMenuLvl1 } = useSlideUpMenuLvl1.getState();

    return same(slideUpMenuLvl1);
  };

  return viewMode === '3D' ? focusThenOpenAndRestore(key, open, isThisOpen) : open();
};
