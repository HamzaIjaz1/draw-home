import { isNull, Union } from '@arthurka/ts-utils';
import { CustomModelId, RoofDormerId, RoofId, SpaceId, StairId, WallFurnitureId, WallId } from '@draw-house/common/dist/brands';
import { Vector2, Vector3 } from 'three';
import { create } from 'zustand';
import type { WallsStore } from './useWalls';
import { withComparingSetState } from '../utils/withComparingSetState';
import { useWallLengthChangeInputData } from './useWallLengthChangeInputData';

export type PopUpToolbarStore = {
  popUpToolbar: null | Union<
    & {
      coords: Vector2;
    }
    & (
      | {
        type: 'wall';
        id: WallId;
        onWallCoordinateX: WallsStore['walls'][number]['furnitures'][number]['onWallCoordinateX'];
        subItem: null | 'plus';
      }
      | {
        type: 'door';
        id: WallFurnitureId;
      }
      | {
        type: 'window';
        id: WallFurnitureId;
      }
      | {
        type: 'floor';
        id: SpaceId;
      }
      | {
        type: 'ceiling';
        id: SpaceId;
      }
      | {
        type: 'roof';
        id: RoofId;
        activeGableIndex: null | number;
        isSlanted: boolean;
        clickPoint: Vector3;
        subItem: null | 'plus';
      }
      | {
        type: 'customModel';
        id: CustomModelId;
      }
      | {
        type: 'asset2D';
        id: CustomModelId;
      }
      | {
        type: 'space';
        id: SpaceId;
      }
      | {
        type: 'stair';
        id: StairId;
      }
      | {
        type: 'roofDormer';
        id: RoofDormerId;
      }
    )
  >;
};

export const usePopUpToolbar = create<PopUpToolbarStore>(() => ({
  popUpToolbar: null,
}));

withComparingSetState(usePopUpToolbar);

export const closePopUpToolbar = () => {
  usePopUpToolbar.setState(usePopUpToolbar.getInitialState());
};

usePopUpToolbar.subscribe((state, prevState) => {
  if(!isNull(prevState.popUpToolbar) && prevState.popUpToolbar.type === 'wall' && state.popUpToolbar?.type !== 'wall') {
    useWallLengthChangeInputData.setState(useWallLengthChangeInputData.getInitialState());
  }
});
