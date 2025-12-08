import { LevelId, RoofId, SpaceId, StairId, WallFurnitureId, WallId } from '@draw-house/common/dist/brands';
import { generateUUID } from '@draw-house/common/dist/utils';
import { getNotUndefined, isArrayLength, isNull, isUndefined, Unionize } from '@arthurka/ts-utils';
import { Vector3 } from 'three';
import { LevelsStore, useLevels } from './store';
import { removeLevelWalls } from '../useWalls/actions2';
import { updateNewLevelData, useNewLevelData } from '../useNewLevelData';
import { removeLevelStairs } from '../useStairs/actions';
import { removeLevelCustomModels } from '../useCustomModels';
import { updateCameraElevationDiff } from '../useCameraElevationDiff';
import { openSnackbar } from '../useSnackbar';
import { lang } from '../../lang';
import { useWalls } from '../useWalls';
import { hideRoofsFromOverlapLevelSpaces, useSpaces } from '../useSpaces';
import { removeDormer, useRoofs } from '../useRoofs';
import { clearDormerRoofWallSubtraction } from '../useDormerRoofsWallSubtraction/actions';
import { getAndIncreaseAmountCounter } from '../useAmountCounters';
import { useStairs } from '../useStairs';

const updateLevels = (makeNewLevels: (walls: LevelsStore['levels']) => LevelsStore['levels']) => {
  const { levels } = useLevels.getState();

  useLevels.setState({
    levels: makeNewLevels(levels),
  });
};

export const activateLevel = (levelId: LevelsStore['levels'][number]['id']) => {
  updateCameraElevationDiff();
  updateLevels(levels => (
    levels.map(e => (
      e.id === levelId
        ? {
          ...e,
          isActive: true,
          isSemiTransparent: e.isActive === true ? e.isSemiTransparent : false,
        }
        : {
          ...e,
          isActive: false,
          isSemiTransparent: false,
        }
    ))
  ));
};

export const setLevelParams = (
  id: LevelsStore['levels'][number]['id'],
  params: Unionize<Pick<LevelsStore['levels'][number], 'height' | 'elevation' | 'name' | 'isLevelVisible' | 'isSemiTransparent'>>,
) => {
  updateLevels(levels => levels.map(e => e.id !== id ? e : {
    ...e,
    ...params,
  }));
};

export const deleteLevel = (id: LevelsStore['levels'][number]['id']) => {
  updateLevels(levels => {
    const newLevels = levels.filter(e => e.id !== id);

    if(!isArrayLength(newLevels, '>=', 1)) {
      return levels;
    }

    removeLevelWalls(id);
    removeLevelStairs(id);
    removeLevelCustomModels(id);

    if(!newLevels.find(e => e.isActive)) {
      return newLevels.map((e, i) => i !== 0 ? e : {
        ...e,
        isActive: true,
      });
    }

    return newLevels;
  });
};

export const createLevelFromNewLevelData = () => {
  const id = LevelId(generateUUID());

  updateLevels(levels => {
    const { elevation, height, name } = useNewLevelData.getState().newLevelData;

    useNewLevelData.setState(useNewLevelData.getInitialState());

    return [
      ...levels,
      {
        id,
        name,
        elevation,
        height,
        isActive: false,
        isLevelVisible: true,
        isSemiTransparent: false,
      },
    ];
  });
  activateLevel(id);

  return id;
};

export const switchLevel = (to: 'next' | 'prev') => {
  const { levels } = useLevels.getState();

  const currentActiveLevelIndex = levels.findIndex(e => e.isActive === true);
  const targetLevel = levels[currentActiveLevelIndex + (to === 'next' ? 1 : -1)];
  if(isUndefined(targetLevel)) {
    return;
  }

  activateLevel(targetLevel.id);
};

export const duplicateLevel = async (levelId: LevelId) => {
  const { walls } = useWalls.getState();
  const { spaces } = useSpaces.getState();
  const { roofs } = useRoofs.getState();
  const { stairs } = useStairs.getState();

  const levelWalls = walls.filter(e => e.levelId === levelId);
  const levelSpaces = spaces.filter(e => levelWalls.some(({ id }) => e.walls.includes(id)));
  const levelRoofs = roofs.filter(({ id }) => levelSpaces.some(e => e.roofId === id));

  for(const roof of levelRoofs) {
    for(const dormer of roof.roofData.dormers) {
      clearDormerRoofWallSubtraction(dormer.id);
      removeDormer(dormer.id);
    }
  }

  const targetWalls = levelWalls.filter(e => isNull(e.dormerRoofId));
  const targetSpaces = levelSpaces.filter(e => isNull(e.dormerRoofId));
  const targetRoofs = levelRoofs;
  const targetStairs = stairs.filter(e => e.levelId === levelId);

  const { walls: wallsAfterCleanup } = useWalls.getState();
  const { spaces: spacesAfterCleanup } = useSpaces.getState();
  const { roofs: roofsAfterCleanup } = useRoofs.getState();

  const newLevelData = updateNewLevelData();
  const newLevelId = createLevelFromNewLevelData();

  const newWalls = new Map(targetWalls.map(e => [e.id, {
    ...e,
    id: WallId(generateUUID()),
    levelId: newLevelId,
    commentName: lang.wallName(getAndIncreaseAmountCounter('wall')),
    furnitures: e.furnitures.map(e => ({
      ...e,
      id: WallFurnitureId(generateUUID()),
    })),
  } satisfies typeof e] as const));
  const newRoofs = new Map(targetRoofs.map(e => [e.id, {
    ...e,
    id: RoofId(generateUUID()),
    roofData: {
      ...e.roofData,
      commentName: lang.roofName(getAndIncreaseAmountCounter('roof')),
      dormers: [], // Dormers are not duplicated
    },
  } satisfies typeof e] as const));
  const targetWallIds = new Set(targetWalls.map(e => e.id));
  const newSpaces = new Map(targetSpaces.map(e => [e.id, {
    ...e,
    id: SpaceId(generateUUID()),
    name: lang.spaceName(getAndIncreaseAmountCounter('space')),
    roofId: getNotUndefined(newRoofs.get(e.roofId), 'This should never happen. |x1nfa7|').id,
    walls: e.walls.filter(wallId => targetWallIds.has(wallId)).map(wallId => getNotUndefined(newWalls.get(wallId), 'This should never happen. |n61fd2|').id),
    ceilingData: {
      ...e.ceilingData,
      commentName: lang.ceilingName(getAndIncreaseAmountCounter('ceiling')),
    },
  } satisfies typeof e] as const));
  const newStairs = new Map(targetStairs.map(e => [e.id, {
    ...e,
    id: StairId(generateUUID()),
    levelId: newLevelId,
    position: new Vector3(e.position.x, newLevelData.elevation, e.position.z),
    commentName: lang.stairName(getAndIncreaseAmountCounter('stair')),
  } satisfies typeof e] as const));

  useWalls.setState({ walls: [...wallsAfterCleanup, ...newWalls.values()] });
  useRoofs.setState({ roofs: [...roofsAfterCleanup, ...newRoofs.values()] });
  useSpaces.setState({ spaces: [...spacesAfterCleanup, ...newSpaces.values()] });
  useStairs.setState({ stairs: [...stairs, ...newStairs.values()] });

  hideRoofsFromOverlapLevelSpaces();

  await openSnackbar({
    type: 'success',
    message: lang.slideUpMenus.levelsSettings.levelCreated(newLevelData.name),
  });
};
