import { closeSlideUpMenuLvl1, openSlideUpMenuLvl1, useSlideUpMenuLvl1 } from '../../zustand';
import { closeSlideUpMenus } from '../closeSlideUpMenus';

export const toggleVisibilitySlideUpMenu = async () => {
  const { slideUpMenuLvl1 } = useSlideUpMenuLvl1.getState();

  await closeSlideUpMenus({ except: 'lvl1' });
  if(slideUpMenuLvl1.isOpened === true) {
    await closeSlideUpMenuLvl1({});

    if(slideUpMenuLvl1.type === 'visibilitySettings') {
      return;
    }
  }

  await openSlideUpMenuLvl1({
    type: 'visibilitySettings',
    isOpened: true,
  });
};
