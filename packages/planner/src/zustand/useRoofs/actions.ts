import { Positive, RoofDormerId, RoofId } from '@draw-house/common/dist/brands';
import { getNotNull, getNotUndefined, isNull, isUndefined, Unionize } from '@arthurka/ts-utils';
import { generateUUID } from '@draw-house/common/dist/utils/helpers';
import assert from 'assert';
import { Quaternion, Vector3 } from 'three';
import { RoofsStore, useRoofs } from './store';
import { useSpaces } from '../useSpaces/store';
import type { SlideUpMenuLvl2Store } from '../slideUpMenus';
import { useWalls } from '../useWalls/store';
import { clearRoofWallSubtraction } from '../useRoofsWallSubtraction/actions';

const updateRoofs = (makeNewRoofs: (walls: RoofsStore['roofs']) => RoofsStore['roofs']) => {
  const { roofs } = useRoofs.getState();

  useRoofs.setState({
    roofs: makeNewRoofs(roofs),
  });
};

export const removeNotUsedRoofs = () => {
  const { spaces } = useSpaces.getState();

  const usedRoofIds = new Set(spaces.map(e => e.roofId).filter(id => id !== null));

  updateRoofs(roofs => (
    roofs.filter(({ id }) => {
      const isUsed = usedRoofIds.has(id);
      if(isUsed === false) {
        clearRoofWallSubtraction(id);
      }

      return isUsed;
    })
  ));
};

export const addRoofs = (newRoofs: RoofsStore['roofs']) => {
  updateRoofs(roofs => [
    ...roofs,
    ...newRoofs,
  ].filter((e, i, arr) => arr.findIndex(({ id }) => e.id === id) === i));
};

export const setRoofParams = (
  roofId: RoofId,
  applyToAll: null | Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'roofAppearance' }>['applyToAll'],
  params: Unionize<Pick<RoofsStore['roofs'][number]['roofData'], 'type' | 'overhang' | 'heightFromBase' | 'hipSlope' | 'slantedSlope' | 'activeGableIndices' | 'isClosedGable' | 'thickness' | 'commentName' | 'isVisible' | 'topTexture' | 'bottomTexture' | 'edgeTexture' | 'topTexture' | 'bottomTexture' | 'edgeTexture' | 'topColorOverlay' | 'bottomColorOverlay' | 'edgeColorOverlay' | 'topCompositeOperation' | 'bottomCompositeOperation' | 'edgeCompositeOperation' | 'commentTopTextureAppearance' | 'commentTopTextureOverlayColor' | 'commentBottomTextureAppearance' | 'commentBottomTextureOverlayColor' | 'commentEdgeTextureAppearance' | 'commentEdgeTextureOverlayColor' | 'isFlippedWraparound' | 'topTextureTransform' | 'bottomTextureTransform' | 'edgeTextureTransform' | 'isHidden'>>,
) => {
  updateRoofs(roofs => {
    const { spaces } = useSpaces.getState();
    const { walls } = useWalls.getState();

    const getLevelId = (roofId: RoofId) => {
      const space = spaces.find(e => e.roofId === roofId);
      if(isUndefined(space)) {
        return null;
      }

      const { walls: [wallId] } = space;
      assert(!isUndefined(wallId), 'Something went wrong. |aj79cr|');

      const { levelId } = getNotUndefined(walls.find(e => e.id === wallId), 'Something went wrong. |u9yde2|');

      return levelId;
    };

    const levelId = getLevelId(roofId);

    return roofs.map(e => {
      const isUpdate = (
        false
          || e.id === roofId
          || !isNull(applyToAll) && applyToAll.isActive === true && (
            false
              || applyToAll.type === 'roofs'
              || applyToAll.type === 'sameLevelRoofs' && getNotNull(getLevelId(e.id), 'Something went wrong. |90zmh7|') === getNotNull(levelId, 'This should never happen. |j8uc68|')
          )
      );

      return isUpdate === false ? e : {
        ...e,
        roofData: {
          ...e.roofData,
          ...params,
        },
      };
    });
  });
};

export const toggleActiveGableIndex = (id: RoofId, activeGableIndex: number) => {
  updateRoofs(roofs => (
    roofs.map(e => e.id !== id ? e : {
      ...e,
      roofData: {
        ...e.roofData,
        activeGableIndices: (
          e.roofData.activeGableIndices.includes(activeGableIndex)
            ? e.roofData.activeGableIndices.filter(e => e !== activeGableIndex)
            : [...e.roofData.activeGableIndices, activeGableIndex]
        ),
      },
    })
  ));
};

export const rotateSlantedRoof = (id: RoofId, direction: 'clockwise' | 'counterclockwise') => {
  type Orientation = RoofsStore['roofs'][number]['roofData']['slantedSlopeOrientation'];

  const directions = {
    clockwise: {
      0: 3,
      1: 0,
      2: 1,
      3: 2,
    },
    counterclockwise: {
      0: 1,
      1: 2,
      2: 3,
      3: 0,
    },
  } satisfies Record<typeof direction, Record<Orientation, Orientation>>;

  updateRoofs(roofs => (
    roofs.map(e => e.id !== id ? e : {
      ...e,
      roofData: {
        ...e.roofData,
        slantedSlopeOrientation: directions[direction][e.roofData.slantedSlopeOrientation],
      },
    })
  ));
};

export const addDormer = ({
  roofId,
  type,
  position,
  rotation,
  width = Positive(2),
  height = Positive(1.5),
  depth = Positive(1),
}: {
  roofId: RoofId;
  type: 'gable' | 'hip' | 'shed';
  position: Vector3;
  rotation: Quaternion;
  width?: Positive;
  height?: Positive;
  depth?: Positive;
}) => {
  updateRoofs(roofs => (
    roofs.map(e => e.id !== roofId ? e : {
      ...e,
      roofData: {
        ...e.roofData,
        dormers: [
          ...e.roofData.dormers,
          {
            id: RoofDormerId(generateUUID()),
            type,
            position,
            rotation,
            width,
            height,
            depth,
            isHidden: false,
            wallIds: null,
          },
        ],
      },
    })
  ));
};

export const setDormerParams = (
  dormerId: RoofDormerId,
  params: Partial<RoofsStore['roofs'][number]['roofData']['dormers'][number]>,
) => {
  updateRoofs(roofs => (
    roofs.map(roof => ({
      ...roof,
      roofData: {
        ...roof.roofData,
        dormers: roof.roofData.dormers.map(e => e.id !== dormerId ? e : {
          ...e,
          ...params,
        }),
      },
    }))
  ));
};

export const removeDormer = (dormerId: RoofDormerId) => {
  const { roofs } = useRoofs.getState();

  const targetRoof = roofs.find(roof => roof.roofData.dormers.some(e => e.id === dormerId));
  const targetDormer = targetRoof?.roofData.dormers.find(e => e.id === dormerId);

  if(!isUndefined(targetDormer)) {
    const { walls } = useWalls.getState();
    const { spaces } = useSpaces.getState();

    const deletedWallIds = new Set(targetDormer.wallIds);
    const updatedWalls = walls.filter(wall => !deletedWallIds.has(wall.id));
    const updatedSpaces = (
      spaces
        .filter(e => e.dormerRoofId !== dormerId)
        .map(e => ({
          ...e,
          walls: e.walls.filter(wallId => !deletedWallIds.has(wallId)),
        }))
        .filter(e => e.walls.length > 0)
    );

    useWalls.setState({ walls: updatedWalls });
    useSpaces.setState({ spaces: updatedSpaces });
  }

  updateRoofs(roofs => (
    roofs.map(roof => ({
      ...roof,
      roofData: {
        ...roof.roofData,
        dormers: roof.roofData.dormers.filter(e => e.id !== dormerId),
      },
    }))
  ));
};
