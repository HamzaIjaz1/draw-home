import { closeSlideUpMenuLvl1, useSlideUpMenuLvl1 } from '../slideUpMenus/useSlideUpMenuLvl1';
import { withLoadedAppPage } from '../useAppPage';
import { createProjectHash } from '../useProjectHash';
import { useSpaces } from './store';

useSpaces.subscribe(withLoadedAppPage(createProjectHash));

useSpaces.subscribe(withLoadedAppPage(async ({ spaces }) => {
  const { type, isOpened, spaceId } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;

  if(isOpened === false) {
    return;
  }

  if(type === 'space') {
    if(spaces.every(e => e.id !== spaceId)) {
      await closeSlideUpMenuLvl1({});
    }
  }
}));
