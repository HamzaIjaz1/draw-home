import { isNull } from '@arthurka/ts-utils';
import { closeSlideUpMenuLvl1, openSlideUpMenuLvl1, useSlideUpMenuLvl1 } from '../../zustand';
import { useNewCustomModel } from '../../zustand/useNewCustomModel';
import { closeSlideUpMenus } from '../closeSlideUpMenus';
import { useSelectedItem } from '../../zustand/useSelectedItem';

export const toggleCatalogSlideUpMenu = async () => {
  const { slideUpMenuLvl1 } = useSlideUpMenuLvl1.getState();
  const { newCustomModel } = useNewCustomModel.getState();

  if(!isNull(newCustomModel)) {
    if(!isNull(newCustomModel.lastCopiedModelId)) {
      useSelectedItem.setState({
        selectedItem: {
          id: newCustomModel.lastCopiedModelId,
          type: 'customModel',
          mode: 'selected',
        },
      });
    }
    useNewCustomModel.setState(useNewCustomModel.getInitialState());
    return;
  }

  await closeSlideUpMenus({ except: 'lvl1' });
  if(slideUpMenuLvl1.isOpened === true) {
    await closeSlideUpMenuLvl1({});

    if(slideUpMenuLvl1.type === 'catalog') {
      return;
    }
  }

  await openSlideUpMenuLvl1({
    type: 'catalog',
    isOpened: true,
  });
};
