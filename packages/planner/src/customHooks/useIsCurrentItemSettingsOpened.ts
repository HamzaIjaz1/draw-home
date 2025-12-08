import { isNull, Union } from '@arthurka/ts-utils';
import { CustomModelId, StairId, WallFurnitureId } from '@draw-house/common/dist/brands';
import { useSlideUpMenuLvl1, useSlideUpMenuLvl2 } from '../zustand';
import { useSelectedItem } from '../zustand/useSelectedItem';

type Params = Union<
  | {
    type: 'stair';
    id: StairId;
  }
  | {
    type: 'customModel';
    id: CustomModelId;
  }
  | {
    type: 'door' | 'window';
    id: WallFurnitureId;
  }
>;

export const useIsCurrentItemSettingsOpened = ({ type, id }: Params) => {
  const { slideUpMenuLvl1 } = useSlideUpMenuLvl1();
  const { slideUpMenuLvl2 } = useSlideUpMenuLvl2();
  const { selectedItem } = useSelectedItem();

  if(isNull(selectedItem) || selectedItem.id !== id) {
    return false;
  }

  switch(type) {
    case 'stair':
      return (
        true
          && slideUpMenuLvl1.type === 'stairSettings'
          && slideUpMenuLvl1.isOpened === true
          && slideUpMenuLvl1.stairId === id
      );
    case 'customModel':
      return (
        false
          || (
            true
              && slideUpMenuLvl1.type === 'customModel'
              && slideUpMenuLvl1.isOpened === true
              && slideUpMenuLvl1.customModelId === id
          )
          || (
            true
              && slideUpMenuLvl2.type === 'customModelAppearance'
              && slideUpMenuLvl2.isOpened === true
              && slideUpMenuLvl2.customModelId === id
          )
      );
    case 'door':
      return (
        false
          || (
            true
              && slideUpMenuLvl1.type === 'door'
              && slideUpMenuLvl1.isOpened === true
              && slideUpMenuLvl1.furnitureId === id
          )
          || (
            true
              && slideUpMenuLvl2.type === 'wallFurnitureAppearance'
              && slideUpMenuLvl2.isOpened === true
              && slideUpMenuLvl2.wallFurnitureId === id
          )
      );
    case 'window':
      return (
        false
          || (
            true
              && slideUpMenuLvl1.type === 'window'
              && slideUpMenuLvl1.isOpened === true
              && slideUpMenuLvl1.furnitureId === id
          )
          || (
            true
              && slideUpMenuLvl2.type === 'wallFurnitureAppearance'
              && slideUpMenuLvl2.isOpened === true
              && slideUpMenuLvl2.wallFurnitureId === id
          )
      );
    default:
      ((e: never) => e)(type);
      throw new Error('This should never happen. |b53o7c|');
  }
};
