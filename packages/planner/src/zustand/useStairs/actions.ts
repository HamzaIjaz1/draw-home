import { LevelId, Positive, StairId } from '@draw-house/common/dist/brands';
import { Vector3 } from 'three';
import { Unionize } from '@arthurka/ts-utils';
import { StairsStore, useStairs } from './store';
import { useNewStairsLastClickedStrapiModelData } from '../useNewStairsLastClickedStrapiModelData';
import { makeNewStairProps } from '../../utils/makeNewStairProps';
import { getFlipHorizontalMirrorNextStep } from '../../utils/helpers';
import { useCreationMode } from '../useCreationMode';

const updateStairs = (makeNewStairs: (stairs: StairsStore['stairs']) => StairsStore['stairs']) => {
  const { stairs } = useStairs.getState();

  useStairs.setState({
    stairs: makeNewStairs(stairs),
  });
};

export const removeStair = (id: StairsStore['stairs'][number]['id']) => {
  updateStairs(stairs => stairs.filter(e => e.id !== id));
};

export const removeLevelStairs = (levelId: StairsStore['stairs'][number]['levelId']) => {
  updateStairs(stairs => stairs.filter(e => e.levelId !== levelId));
};

export const createStair = (position: Vector3, height: Positive, levelId: LevelId) => {
  const { newStairsLastClickedStrapiModelData } = useNewStairsLastClickedStrapiModelData.getState();
  const createdStairsProp = makeNewStairProps({
    position,
    height,
    stairType: newStairsLastClickedStrapiModelData.type,
    levelId,
  });

  useCreationMode.setState({ creationMode: 'pointer' });
  updateStairs(stairs => [
    ...stairs,
    createdStairsProp,
  ]);

  return createdStairsProp.id;
};

export const setStairParams = (
  id: StairId,
  params: Unionize<Pick<StairsStore['stairs'][number], 'type' | 'position' | 'quaternion' | 'commentName' | 'width' | 'height' | 'run' | 'rise' | 'commentRailings' | 'commentStairs' | 'commentStringer' | 'levelId' | 'includeTopLanding' | 'topLandingRailingOrientation' | 'isHidden'>>,
) => {
  updateStairs(stairs => (
    stairs.map(e => e.id !== id ? e : {
      ...e,
      ...params,
    })
  ));
};

export const setStairStringerLocations = (id: StairId, stringerLocations: StairsStore['stairs'][number]['stringerLocations']) => {
  updateStairs(stairs => (
    stairs.map(e => e.id !== id ? e : {
      ...e,
      stringerLocations,
    })
  ));
};

export const setStairRailingLocation = (id: StairId, railingLocation: StairsStore['stairs'][number]['railingLocation']) => {
  updateStairs(stairs => (
    stairs.map(e => e.id !== id ? e : {
      ...e,
      railingLocation,
    })
  ));
};

export const flipHorizontalOrMirrorStair = (id: StairId) => {
  updateStairs(stairs => (
    stairs.map(e => e.id !== id ? e : (() => {
      const { isFlippedHorizontal, isMirrored } = getFlipHorizontalMirrorNextStep(e);

      return {
        ...e,
        isFlippedHorizontal,
        isMirrored,
      };
    })())
  ));
};
