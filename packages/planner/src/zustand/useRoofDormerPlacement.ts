import { create } from 'zustand';
import { Positive, RoofDormerId } from '@draw-house/common/dist/brands';
import { generateUUID } from '@draw-house/common/dist/utils';
import { Quaternion, Vector3 } from 'three';
import { isNull } from '@arthurka/ts-utils';
import { withComparingSetState } from '../utils/withComparingSetState';
import { useTempRoofDormer } from './useTempRoofDormer';
import { RoofsStore } from './useRoofs';

export type RoofDormerPlacementStore = {
  activeDormerType: null | 'gable' | 'hip' | 'shed';
};

export const useRoofDormerPlacement = create<RoofDormerPlacementStore>(() => ({
  activeDormerType: null,
}));

withComparingSetState(useRoofDormerPlacement);

useRoofDormerPlacement.subscribe(state => {
  const { activeDormerType } = state;

  if(isNull(activeDormerType)) {
    useTempRoofDormer.setState({ tempRoofDormer: null });
    return;
  }

  const defaultDormer: RoofsStore['roofs'][number]['roofData']['dormers'][number] = {
    id: RoofDormerId(generateUUID()),
    type: activeDormerType,
    position: new Vector3(0, 0, 0),
    rotation: new Quaternion(),
    width: Positive(2),
    height: Positive(1.5),
    depth: Positive(1),
    isHidden: false,
    wallIds: null,
  };

  useTempRoofDormer.setState({
    tempRoofDormer: {
      targetRoofId: null,
      needToStopAfterFirstSet: true,
      isSelectedFromCatalog: true,
      dormer: defaultDormer,
      startPosition: null,
      startRotation: null,
      isOnRoof: false,
    },
  });
});
