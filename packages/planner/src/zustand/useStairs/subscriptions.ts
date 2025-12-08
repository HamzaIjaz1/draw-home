import { closeSlideUpMenuLvl1, useSlideUpMenuLvl1 } from '../slideUpMenus';
import { withLoadedAppPage } from '../useAppPage/requestToLoad';
import { closePopUpToolbar } from '../usePopUpToolbar';
import { createProjectHash } from '../useProjectHash';
import { useStairs } from './store';

useStairs.subscribe(withLoadedAppPage(closePopUpToolbar));
useStairs.subscribe(withLoadedAppPage(createProjectHash));

useStairs.subscribe(withLoadedAppPage(async ({ stairs }) => {
  const { type, isOpened, stairId } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;

  if(isOpened === false) {
    return;
  }

  if(type === 'stairSettings') {
    if(stairs.every(e => e.id !== stairId)) {
      await closeSlideUpMenuLvl1({});
    }
  }
}));
