import { closeSlideUpMenuLvl1, openSlideUpMenuLvl1, useSlideUpMenuLvl1 } from '../../zustand';
import { useStrapiAppConfigResolved } from '../../zustand/useStrapiAppConfig';
import { closeSlideUpMenus } from '../closeSlideUpMenus';

export const toggleAiToolsSlideUpMenu = async () => {
  const { strapiAppConfig } = useStrapiAppConfigResolved.getState();
  const { slideUpMenuLvl1 } = useSlideUpMenuLvl1.getState();

  if(strapiAppConfig.enableFloorPlanAIFeature === false) {
    return;
  }

  await closeSlideUpMenus({ except: 'lvl1' });
  if(slideUpMenuLvl1.isOpened === true) {
    await closeSlideUpMenuLvl1({});

    if(slideUpMenuLvl1.type === 'aiTools') {
      return;
    }
  }

  await openSlideUpMenuLvl1({
    type: 'aiTools',
    isOpened: true,
  });
};
