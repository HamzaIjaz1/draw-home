import { SpaceId } from '@draw-house/common/dist/brands';
import { closeSlideUpMenuLvl1, openSlideUpMenuLvl1, useSlideUpMenuLvl1 } from '../../zustand';
import { closeSlideUpMenus } from '../closeSlideUpMenus';

export const openSpaceSettingsSlideUpMenu = async (id: SpaceId) => {
  const { isOpened, type, spaceId } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;

  await closeSlideUpMenus({ except: 'lvl1' });
  if(isOpened === true) {
    if(type === 'space' && spaceId === id) {
      return;
    }

    await closeSlideUpMenuLvl1({});
  }

  await openSlideUpMenuLvl1({
    type: 'space',
    isOpened: true,
    spaceId: id,
  });
};
