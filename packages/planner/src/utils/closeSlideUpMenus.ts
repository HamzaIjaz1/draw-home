import { closeSlideUpMenuLvl1, closeSlideUpMenuLvl2, closeSlideUpMenuLvl3 } from '../zustand';

export const closeSlideUpMenus = async ({ except }: { except?: 'lvl1' | 'lvl2' | 'lvl3' }) => {
  await Promise.all([
    except === 'lvl1' ? null : closeSlideUpMenuLvl1({}),
    except === 'lvl2' ? null : closeSlideUpMenuLvl2({}),
    except === 'lvl3' ? null : closeSlideUpMenuLvl3({}),
  ]);
};
