import { isNull, Union } from '@arthurka/ts-utils';
import { CustomModelId, Positive, RoofDormerId, StairId, WallFurnitureId } from '@draw-house/common/dist/brands';
import { create } from 'zustand';
import { closePopUpToolbar } from './usePopUpToolbar';
import { useIsMoving3DModel } from './useIsMoving3DModel';
import { withComparingSetState } from '../utils/withComparingSetState';

export type SelectedItemStore = {
  selectedItem: null | Union<
    | {
      type: 'wallFurniture';
      id: WallFurnitureId;
      mode: 'selected' | 'move';
    }
    | {
      type: 'stair';
      id: StairId;
      mode: 'selected' | 'rotate';
    }
    | {
      type: 'customModel';
      id: CustomModelId;
      mode: 'selected' | 'scale';
    }
    | {
      type: 'asset2D';
      id: CustomModelId;
      mode: 'selected' | 'rotate' | 'measure' | 'measure-scale-mode';
      measuredDistanceWorld: Positive | null;
    }
    | {
      type: 'roofDormer';
      id: RoofDormerId;
      mode: 'selected' | 'move';
    }
  >;
};

export const useSelectedItem = create<SelectedItemStore>(() => ({
  selectedItem: null,
}));

withComparingSetState(useSelectedItem);

export const unselectItem = () => {
  const { selectedItem } = useSelectedItem.getState();
  const { isMoving3DModel } = useIsMoving3DModel.getState();

  if(isNull(selectedItem) || isMoving3DModel === true || (selectedItem && (selectedItem.mode === 'measure' || selectedItem.mode === 'measure-scale-mode'))) {
    return;
  }

  useSelectedItem.setState(useSelectedItem.getInitialState());
};

useSelectedItem.subscribe(closePopUpToolbar);
