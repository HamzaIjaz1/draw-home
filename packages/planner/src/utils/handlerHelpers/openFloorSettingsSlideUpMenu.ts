import { SpaceId } from '@draw-house/common/dist/brands';
import { closeSlideUpMenuLvl1, openSlideUpMenuLvl1, useSlideUpMenuLvl1, useViewMode } from '../../zustand';
import { closeSlideUpMenus } from '../closeSlideUpMenus';
import { focusThenOpenAndRestore } from '../focusThenOpenAndRestore';

export const openFloorSettingsSlideUpMenu = async (id: SpaceId) => {
  const { viewMode } = useViewMode.getState();

  const openSame = async () => {
    const { type, isOpened, spaceId } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;

    await closeSlideUpMenus({ except: 'lvl1' });
    if(isOpened === true) {
      if(type === 'floor' && spaceId === id) {
        return;
      }

      await closeSlideUpMenuLvl1({});
    }

    await openSlideUpMenuLvl1({
      type: 'floor',
      isOpened: true,
      spaceId: id,
    });
  };
  const isThisOpen = () => {
    const { isOpened, type, spaceId } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;

    return isOpened === true && type === 'floor' && spaceId === id;
  };

  await focusThenOpenAndRestore(
    `floor:${id}`,
    openSame,
    isThisOpen,
    viewMode === '3D'
      ? {
        tempToggles: {
          isRoofsShown: false,
          isCeilingsShown: false,
          isInteriorWallsShown: false,
          isExteriorWallsShown: false,
        },
        pitchCandidatesDeg: [25, 35],
        margin: 1.25,
        distMultipliers: [1.0, 1.25, 1.5],
      }
      : {
        skipFocus: true,
      },
  );
};
