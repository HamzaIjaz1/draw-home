import { closeSlideUpMenuLvl1, useSlideUpMenuLvl1 } from '../slideUpMenus';
import { withLoadedAppPage } from '../useAppPage/requestToLoad';
import { closePopUpToolbar } from '../usePopUpToolbar';
import { createProjectHash } from '../useProjectHash';
import { useCustomModels } from './store';

useCustomModels.subscribe(withLoadedAppPage(closePopUpToolbar));
useCustomModels.subscribe(withLoadedAppPage(createProjectHash));

useCustomModels.subscribe(withLoadedAppPage(async ({ customModels }) => {
  const { type, isOpened, customModelId, asset2DId, replacementElement } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;

  if(isOpened === false) {
    return;
  }

  if(type === 'customModel') {
    if(customModels.every(e => e.id !== customModelId)) {
      await closeSlideUpMenuLvl1({});
    }
  }
  if(type === 'asset2DSettings') {
    if(customModels.every(e => e.id !== asset2DId)) {
      await closeSlideUpMenuLvl1({});
    }
  }
  if(type === 'replaceElementCatalog' && (replacementElement.type === 'customModel' || replacementElement.type === 'column')) {
    if(customModels.every(e => e.id !== replacementElement.id)) {
      await closeSlideUpMenuLvl1({});
    }
  }
}));
