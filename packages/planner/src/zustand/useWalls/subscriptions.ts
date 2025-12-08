import { closePopUpToolbar } from '../usePopUpToolbar';
import { closeSlideUpMenuLvl1, closeSlideUpMenuLvl2, useSlideUpMenuLvl1, useSlideUpMenuLvl2 } from '../slideUpMenus';
import { useWalls } from './store';
import { withLoadedAppPage } from '../useAppPage';
import { createProjectHash } from '../useProjectHash';

useWalls.subscribe(withLoadedAppPage(closePopUpToolbar));
useWalls.subscribe(withLoadedAppPage(createProjectHash));

useWalls.subscribe(withLoadedAppPage(async ({ walls }) => {
  const { type, isOpened, wallId, furnitureId, replacementElement } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;

  if(isOpened === false) {
    return;
  }

  if(type === 'wall') {
    if(walls.every(e => e.id !== wallId)) {
      await closeSlideUpMenuLvl1({});
    }
  } else if(type === 'door' || type === 'window') {
    if(walls.flatMap(e => e.furnitures).every(e => e.id !== furnitureId)) {
      await closeSlideUpMenuLvl1({});
    }
  }

  if(type === 'replaceElementCatalog' && (replacementElement.type === 'door' || replacementElement.type === 'window')) {
    if(walls.flatMap(e => e.furnitures).every(e => e.id !== replacementElement.id)) {
      await closeSlideUpMenuLvl1({});
    }
  }
}));

useWalls.subscribe(withLoadedAppPage(async ({ walls }) => {
  const { type, isOpened, wallId } = useSlideUpMenuLvl2.getState().slideUpMenuLvl2;

  if(isOpened === false) {
    return;
  }

  if(type === 'wallAppearance') {
    if(walls.every(e => e.id !== wallId)) {
      await closeSlideUpMenuLvl2({});
    }
  }
}));
