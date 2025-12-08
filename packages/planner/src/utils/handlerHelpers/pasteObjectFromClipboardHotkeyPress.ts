import { isNull } from '@arthurka/ts-utils';
import { copyCustomModel } from '../../zustand';
import { useObjectClipboard } from '../../zustand/useObjectClipboard';
import { wallFurnitureCatalogHandler } from './wallFurnitureCatalogHandler';
import { useSelectedItem } from '../../zustand/useSelectedItem';

export const pasteObjectFromClipboardHotkeyPress = () => {
  const { objectClipboard } = useObjectClipboard.getState();
  if(isNull(objectClipboard)) {
    return;
  }

  switch(objectClipboard.type) {
    case 'door':
    case 'window':
      wallFurnitureCatalogHandler(`${objectClipboard.type}s`, objectClipboard.url);
      break;
    case 'customModel': {
      const copiedModelId = copyCustomModel(objectClipboard.id, true, {
        customModels: objectClipboard.customModels,
      });

      useSelectedItem.setState({
        selectedItem: {
          type: 'customModel',
          id: copiedModelId,
          mode: 'selected',
        },
      });
      break;
    }
    default:
      ((e: never) => e)(objectClipboard);
      throw new Error('This should never happen. |az1dyx|');
  }
};
