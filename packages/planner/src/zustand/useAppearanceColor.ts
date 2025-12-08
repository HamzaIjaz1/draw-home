import { create } from 'zustand';
import { StrictExtract } from '@draw-house/common/dist/utils';
import assert from 'assert';
import { isNull, unionObject } from '@arthurka/ts-utils';
import debounce from 'debounce';
import { SlideUpMenuLvl2Store, useSlideUpMenuLvl2 } from './slideUpMenus';
import { setWallFurnitureOverrideMaterialParams, setWallSideParams } from './useWalls';
import { setCeilingParams, setFloorParams } from './useSpaces';
import { setRoofParams } from './useRoofs';
import { setCustomModelOverrideMaterialParams } from './useCustomModels';
import { ColorOverlay } from '../utils';

type Store = {
  appearanceColor: null | {
    type: StrictExtract<SlideUpMenuLvl2Store['slideUpMenuLvl2']['type'], 'wallAppearance' | 'floorAppearance' | 'ceilingAppearance' | 'roofAppearance' | 'customModelAppearance' | 'wallFurnitureAppearance'>;
    color: null | ColorOverlay;
  };
};

export const useAppearanceColor = create<Store>(() => ({
  appearanceColor: null,
}));

const updateTargetColor = debounce(() => {
  const { slideUpMenuLvl2 } = useSlideUpMenuLvl2.getState();
  const { appearanceColor } = useAppearanceColor.getState();

  assert(!isNull(appearanceColor) && slideUpMenuLvl2.type === appearanceColor.type, 'Something went wrong. |bcv33u|');

  switch(slideUpMenuLvl2.type) {
    case 'wallAppearance':
      assert(!isNull(slideUpMenuLvl2.wallId), 'Something went wrong. |5fj7x3|');
      setWallSideParams(slideUpMenuLvl2.wallId, slideUpMenuLvl2.applyToAll, slideUpMenuLvl2.textureType, { colorOverlay: appearanceColor.color });
      break;
    case 'floorAppearance':
      assert(!isNull(slideUpMenuLvl2.spaceId), 'Something went wrong. |x7y7z9|');
      setFloorParams(slideUpMenuLvl2.spaceId, slideUpMenuLvl2.applyToAll, unionObject(`${slideUpMenuLvl2.textureType}ColorOverlay`, appearanceColor.color));
      break;
    case 'ceilingAppearance':
      assert(!isNull(slideUpMenuLvl2.spaceId), 'Something went wrong. |q2u6wu|');
      setCeilingParams(slideUpMenuLvl2.spaceId, slideUpMenuLvl2.applyToAll, unionObject(`${slideUpMenuLvl2.textureType}ColorOverlay`, appearanceColor.color));
      break;
    case 'roofAppearance':
      assert(!isNull(slideUpMenuLvl2.roofId), 'Something went wrong. |s5art5|');
      setRoofParams(slideUpMenuLvl2.roofId, slideUpMenuLvl2.applyToAll, unionObject(`${slideUpMenuLvl2.textureType}ColorOverlay`, appearanceColor.color));
      break;
    case 'customModelAppearance':
      assert(!isNull(slideUpMenuLvl2.customModelId), 'Something went wrong. |cs1vfz|');
      setCustomModelOverrideMaterialParams(slideUpMenuLvl2.customModelId, slideUpMenuLvl2.overrideMaterialName, slideUpMenuLvl2.applyToAll, {
        colorOverlay: appearanceColor.color,
      });
      break;
    case 'wallFurnitureAppearance':
      assert(!isNull(slideUpMenuLvl2.wallFurnitureId), 'Something went wrong. |r5b66c|');
      setWallFurnitureOverrideMaterialParams(slideUpMenuLvl2.wallFurnitureId, slideUpMenuLvl2.overrideMaterialName, slideUpMenuLvl2.applyToAll, {
        colorOverlay: appearanceColor.color,
      });
      break;
    default:
      ((e: never) => e)(slideUpMenuLvl2);
      throw new Error('This should never happen. |207dgt|');
  }
}, 1000);

export const setAppearanceColorWithUpdate = (
  immediately: boolean,
  type: NonNullable<Store['appearanceColor']>['type'],
  color: NonNullable<Store['appearanceColor']>['color'],
) => {
  useAppearanceColor.setState({
    appearanceColor: {
      type,
      color,
    },
  });
  updateTargetColor();

  if(immediately === true) {
    updateTargetColor.flush();
  }
};
