import { create } from 'zustand';
import assert from 'assert';
import { isNull } from '@arthurka/ts-utils';
import debounce from 'debounce';
import { useSlideUpMenuLvl1 } from './slideUpMenus';
import { setAsset2DParams } from './useCustomModels';

type Store = {
  asset2DTransparency: null | number;
};

export const useAsset2DTransparency = create<Store>(() => ({
  asset2DTransparency: null,
}));

const updateTargetColor = debounce(() => {
  const { slideUpMenuLvl1 } = useSlideUpMenuLvl1.getState();
  const { asset2DTransparency } = useAsset2DTransparency.getState();

  assert(!isNull(asset2DTransparency), 'Something went wrong. |2caz4w|');

  if(slideUpMenuLvl1.type === 'asset2DSettings') {
    assert(!isNull(slideUpMenuLvl1.asset2DId), 'Something went wrong. |0v40v3|');
    setAsset2DParams(slideUpMenuLvl1.asset2DId, {
      transparency: asset2DTransparency,
    });
  }
}, 1000);

export const setAsset2DTransparencyWithUpdate = (asset2DTransparency: NonNullable<Store['asset2DTransparency']>) => {
  useAsset2DTransparency.setState({ asset2DTransparency });
  updateTargetColor();
};
