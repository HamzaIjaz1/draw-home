import { LevelId, Positive, StairId } from '@draw-house/common/dist/brands';
import { generateUUID } from '@draw-house/common/dist/utils';
import { Quaternion, Vector3 } from 'three';
import { StairsStore } from '../zustand/useStairs/store';
import { NewStairsLastClickedStrapiModelDataStore } from '../zustand/useNewStairsLastClickedStrapiModelData';
import { lang } from '../lang';
import { getAndIncreaseAmountCounter } from '../zustand/useAmountCounters';

export const makeNewStairProps = ({ position, height, stairType, levelId }: {
  position: Vector3;
  height: Positive;
  stairType: NewStairsLastClickedStrapiModelDataStore['newStairsLastClickedStrapiModelData']['type'];
  levelId: LevelId;
}) => ({
  id: StairId(generateUUID()),
  position,
  quaternion: new Quaternion(),
  type: stairType.toLowerCase(),
  height,
  width: Positive(1),
  supportType: 'stringer',
  landingType: 'landing',
  commentName: lang.stairName(getAndIncreaseAmountCounter('stair')),
  commentStairs: '',
  commentStringer: '',
  commentRailings: '',
  numberOfLandings: 1,
  numberOfWinders: 3,
  run: Positive(0.3),
  rise: Positive(0.175),
  mirror: false,
  gapBetweenFlights: 0,
  stairConfiguration: 'two-flights',
  includeTopLanding: true,
  topLandingRailingOrientation: 'middle',
  railingLocation: {
    left: true,
    right: true,
  },
  stringerLocations: {
    left: true,
    middle: false,
    right: true,
  },
  landings: {
    stepsAfter: [],
    lengths: [],
  },
  levelId,
  isFlippedHorizontal: false,
  isMirrored: false,
  isHidden: false,
} satisfies StairsStore['stairs'][number]);
