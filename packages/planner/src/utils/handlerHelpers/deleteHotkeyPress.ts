import { isNull } from '@arthurka/ts-utils';
import { removeWallFurniture, usePopUpToolbar } from '../../zustand';
import { removeWallPopUpToolbarClick } from './removeWallPopUpToolbarClick';
import { removeCustomModelPopUpToolbarClick } from './removeCustomModelPopUpToolbarClick';
import { removeStairPopUpToolbarClick } from './removeStairPopUpToolbarClick';
import { removeAsset2DPopUpToolbarClick } from './removeAsset2DPopUpToolbarClick';
import { removeRoofDormerPopUpToolbarClick } from './removeRoofDormerPopUpToolbarClick';

export const deleteHotkeyPress = () => {
  const { popUpToolbar } = usePopUpToolbar.getState();
  if(isNull(popUpToolbar)) {
    return;
  }

  const { type, id } = popUpToolbar;

  switch(type) {
    case 'wall':
      removeWallPopUpToolbarClick(id);
      break;
    case 'door':
    case 'window':
      removeWallFurniture(id);
      break;
    case 'customModel':
      removeCustomModelPopUpToolbarClick(id);
      break;
    case 'stair':
      removeStairPopUpToolbarClick(id);
      break;
    case 'asset2D':
      removeAsset2DPopUpToolbarClick(id);
      break;
    case 'roofDormer':
      removeRoofDormerPopUpToolbarClick(id);
      break;
    case 'floor':
    case 'ceiling':
    case 'roof':
    case 'space':
      break;
    default:
      ((e: never) => e)(popUpToolbar);
      throw new Error('This should never happen. |tds7vg|');
  }
};
