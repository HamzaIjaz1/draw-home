import { SpaceId } from '@draw-house/common/dist/brands';
import { closeSlideUpMenuLvl1, openSlideUpMenuLvl1, useSlideUpMenuLvl1, useViewMode } from '../../zustand';
import { closeSlideUpMenus } from '../closeSlideUpMenus';
import { focusThenOpenAndRestore } from '../focusThenOpenAndRestore';

export const openCeilingSettingsSlideUpMenu = async (id: SpaceId) => {
  const { viewMode } = useViewMode.getState();

  const openSame = async () => {
    const { type, isOpened, spaceId } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;

    await closeSlideUpMenus({ except: 'lvl1' });
    if(isOpened === true) {
      if(type === 'ceiling' && spaceId === id) {
        return;
      }

      await closeSlideUpMenuLvl1({});
    }

    await openSlideUpMenuLvl1({
      type: 'ceiling',
      isOpened: true,
      spaceId: id,
    });
  };
  const isThisOpen = () => {
    const { isOpened, type, spaceId } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;

    return isOpened === true && type === 'ceiling' && spaceId === id;
  };

  await focusThenOpenAndRestore(
    `ceiling:${id}`,
    openSame,
    isThisOpen,
    viewMode === '3D'
      ? {
        tempToggles: {
          isRoofsShown: false,
          isInteriorWallsShown: false,
          isExteriorWallsShown: false,
          isFloorsShown: false,
        },
        pitchCandidatesDeg: [30, 40],
        margin: 1.25,
        distMultipliers: [1.0, 1.25, 1.5],
      }
      : {
        skipFocus: true,
      },
  );
};
