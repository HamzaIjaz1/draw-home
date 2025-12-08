import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { openSnackbar, useCustomModels, usePopUpToolbar, useWalls } from '../../zustand';
import { lang } from '../../lang';
import { useObjectClipboard } from '../../zustand/useObjectClipboard';

export const copyObjectHotkeyPress = () => {
  const { walls } = useWalls.getState();
  const { customModels } = useCustomModels.getState();
  const { popUpToolbar } = usePopUpToolbar.getState();

  const wallFurnitures = walls.flatMap(e => e.furnitures);

  if(isNull(popUpToolbar)) {
    return;
  }
  const { type, id } = popUpToolbar;

  switch(type) {
    case 'door':
    case 'window':
      useObjectClipboard.setState({
        objectClipboard: {
          type,
          url: getNotUndefined(wallFurnitures.find(e => e.id === id), 'Something went wrong. |2hp91v|')?.url,
        },
      });
      break;
    case 'customModel':
      useObjectClipboard.setState({
        objectClipboard: {
          type,
          id,
          customModels,
        },
      });
      break;
    case 'stair':
    case 'wall':
    case 'asset2D':
    case 'floor':
    case 'ceiling':
    case 'roof':
    case 'roofDormer':
    case 'space':
      return;
    default:
      ((e: never) => e)(popUpToolbar);
      throw new Error('This should never happen. |8nc5sb|');
  }

  openSnackbar({
    type: 'success',
    message: lang.objectIdCopied,
  });
};
