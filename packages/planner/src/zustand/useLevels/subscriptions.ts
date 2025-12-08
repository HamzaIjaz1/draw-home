import { closeSlideUpMenuLvl2, useSlideUpMenuLvl2 } from '../slideUpMenus';
import { withLoadedAppPage } from '../useAppPage/requestToLoad';
import { createProjectHash } from '../useProjectHash';
import { useLevels } from './store';

useLevels.subscribe(withLoadedAppPage(createProjectHash));

useLevels.subscribe(withLoadedAppPage(async ({ levels }) => {
  const { type, isOpened, levelId } = useSlideUpMenuLvl2.getState().slideUpMenuLvl2;

  if(isOpened === false) {
    return;
  }

  if(type === 'levelSettings') {
    if(levels.every(e => e.id !== levelId)) {
      await closeSlideUpMenuLvl2({});
    }
  }
}));
