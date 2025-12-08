import { RoofId, SpaceId, WallId } from '@draw-house/common/dist/brands';
import { getNotUndefined, isNull, isUndefined, tuple, Unionize } from '@arthurka/ts-utils';
import { DiscoveryErrorCode, DiscoveryResultType, PlanarFaceTree } from 'planar-face-discovery';
import assert from 'assert';
import { fixIEEE, generateUUID } from '@draw-house/common/dist/utils';
import Color from 'color';
import { Vector2 } from 'three';
import { debounce } from 'throttle-debounce';
import { SpacesStore, useSpaces } from './store';
import { useWalls } from '../useWalls/store';
import { useLevels } from '../useLevels/store';
import { getUniquePoints } from '../../utils/helpers';
import { useCreationModeConfig } from '../useCreationModeConfig';
import { compositeOperations, defaultCeilingThickness, defaultFloorThickness, defaultHipRoofSlope, defaultRoofHeightFromBase, defaultRoofOverhang, defaultRoofThickness, defaultSlantedRoofSlope } from '../../constants';
import { findExistedSpace } from '../../utils/findExistedSpace';
import { getAndIncreaseAmountCounter } from '../useAmountCounters';
import { useStrapiAppConfigResolved } from '../useStrapiAppConfig';
import { addRoofs, removeNotUsedRoofs, setRoofParams } from '../useRoofs/actions';
import { findExistedRoofId } from '../../utils/findExistedRoofId';
import type { SlideUpMenuLvl2Store } from '../slideUpMenus';
import { useGlobalSettings } from '../useGlobalSettings/store';
import { useTempWalls } from '../useTempWalls/store';
import { updateRoofsSubtractions } from '../useRoofsWallSubtraction/actions';
import { removeRepeatedValues } from '../../utils/removeRepeatedValues';
import { clearFutureWalls, redefineWallSideTypes } from '../useWalls/actions1';
import { calculateHipRoofDataCached } from '../../utils/roofCache';
import { RoofsStore, useRoofs } from '../useRoofs/store';
import { lang } from '../../lang';
import { getDefaultColorForTexture } from '../../utils/getDefaultColorForTexture';
import { findSpaceClosedContours } from '../../utils/findSpaceClosedContours';
import { calculateCoplanarPolygonArea } from '../../utils/getAreaOfSmallerContour';
import { getFloorCoordinates } from '../../utils/floor';
import { getWallType } from '../../utils/getWallType';

const updateSpaces = (makeNewSpaces: (walls: SpacesStore['spaces']) => SpacesStore['spaces']) => {
  const { spaces } = useSpaces.getState();
  const { walls } = useWalls.getState();

  useSpaces.setState({
    spaces: makeNewSpaces(spaces).map(e => ({
      ...e,
      walls: e.walls.filter(id => !isUndefined(walls.find(e => e.id === id))),
    })),
  });
};

type MakeSpacesProps = {
  onNewSpaceCreated?: () => void;
};

export const hideRoofsFromOverlapLevelSpaces = debounce(100, () => {
  const { levels } = useLevels.getState();
  const { spaces } = useSpaces.getState();
  const { walls } = useWalls.getState();

  const exteriorWalls = walls.filter(e => getWallType(e) === 'exterior');
  const levelExteriorWalls = levels.map(e => ({
    level: e,
    walls: exteriorWalls.filter(({ levelId }) => e.id === levelId),
  }));

  for(const [i, e1] of levelExteriorWalls.entries()) {
    for(const [j, e2] of levelExteriorWalls.entries()) {
      if(j <= i || e1.walls.length !== e2.walls.length) {
        continue;
      }

      const theSameWalls = e1.walls.every(e1 => e2.walls.some(e2 => (
        false
          || e1.position.start.equals(e2.position.start) && e1.position.end.equals(e2.position.end)
          || e1.position.start.equals(e2.position.end) && e1.position.end.equals(e2.position.start)
      )));
      if(theSameWalls === false) {
        continue;
      }

      const bottom = e1.level.elevation >= e2.level.elevation ? e2 : e1;
      const targetSpaces = spaces.filter(e => e.walls.some(e => bottom.walls.some(({ id }) => e === id)));

      for(const { roofId } of targetSpaces) {
        setRoofParams(roofId, null, {
          isVisible: false,
        });
      }
    }
  }
});

export const makeSpaces = ({ onNewSpaceCreated }: MakeSpacesProps = {}) => {
  updateSpaces(spaces => {
    const { defaultRoof } = useGlobalSettings.getState();
    const { walls } = useWalls.getState();
    const { tempWalls } = useTempWalls.getState();
    const { levels } = useLevels.getState();
    const { strapiAppConfig } = useStrapiAppConfigResolved.getState();
    const { creationModeConfig } = useCreationModeConfig.getState();
    const { roofs } = useRoofs.getState();

    const floorTopColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.floorTextureTop.id);
    const floorBottomColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.floorTextureBottom.id);
    const floorEdgeColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.floorTextureEdge.id);
    const ceilingTopColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.ceilingTextureTop.id);
    const ceilingBottomColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.ceilingTextureBottom.id);
    const ceilingEdgeColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.ceilingTextureEdge.id);
    const roofTopColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.roofTextureTop.id);
    const roofBottomColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.roofTextureBottom.id);
    const roofEdgeColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.roofTextureEdge.id);

    const futureWalls = clearFutureWalls([...walls, ...tempWalls]);
    const newSpaces: typeof spaces = [];

    outer: for(const { id: levelId } of levels) {
      const levelWalls = walls.filter(e => e.levelId === levelId);
      const uniquePoints = getUniquePoints(levelWalls.flatMap(({ position: { start, end } }) => [start, end]));

      const [minX, minY] = uniquePoints.reduce<readonly [number, number]>(([minX, minY], { x, y }) => [
        Math.min(minX, x),
        Math.min(minY, y),
      ], [0, 0]);

      const nodes = uniquePoints.map(e => ({
        point: e,
        node: tuple(e.x - minX, e.y - minY).map(fixIEEE),
      }));

      const result = new PlanarFaceTree().discover(
        nodes.map(e => e.node),
        levelWalls.map(({ position: { start, end } }) => {
          const startIndex = uniquePoints.findIndex(e => e.equals(start));
          const endIndex = uniquePoints.findIndex(e => e.equals(end));

          assert(startIndex !== -1 && endIndex !== -1, 'This should never happen. |0rz7ha|');

          return tuple(startIndex, endIndex);
        }),
      );

      if(result.type === DiscoveryResultType.ERROR) {
        switch(result.reason) {
          case DiscoveryErrorCode.GRAPH_EMPTY:
            break outer;
          case DiscoveryErrorCode.DUPLICATE_EDGE_FOUND:
          case DiscoveryErrorCode.EDGE_ENDPOINT_OUT_OF_BOUNDS:
          case DiscoveryErrorCode.INVALID_COORDINATE_SYSTEM:
          case DiscoveryErrorCode.VERTICES_HAVE_SAME_POSITION:
            console.error('|8pg68q|', result);
            break outer;
          default:
            ((e: never) => e)(result.reason);
            throw new Error('This should never happen. |f51c0j|');
        }
      }

      const cycles = result.forest.flatMap(function recursive({ cycle, children }): Array<typeof cycle> {
        return [
          cycle,
          ...children.flatMap(recursive),
        ];
      }).filter(e => e.length > 0);

      for(const cycle of cycles) {
        const cycleWalls: WallId[] = [];

        for(let i = 0; i < cycle.length - 1; i++) {
          const startIndex = getNotUndefined(cycle[i], 'This should never happen. |g68qud|');
          const endIndex = getNotUndefined(cycle[i + 1], 'This should never happen. |32klu3|');
          const { point: startPoint } = getNotUndefined(nodes[startIndex], 'This should never happen. |0m4m8o|');
          const { point: endPoint } = getNotUndefined(nodes[endIndex], 'This should never happen. |ir4a5n|');

          const { id } = getNotUndefined(
            levelWalls.find(({ position: { start, end } }) => (
              start.equals(startPoint) && end.equals(endPoint) || start.equals(endPoint) && end.equals(startPoint)
            )),
            'This should never happen. |x98gdq|',
          );

          cycleWalls.push(id);
        }

        const alreadyExistedSpace = findExistedSpace(spaces, cycleWalls);
        const existedRoofId = findExistedRoofId(newSpaces.filter(e => e.hasUniqueRoof === false), cycleWalls);

        if(!isNull(alreadyExistedSpace)) {
          if(alreadyExistedSpace.hasUniqueRoof === true) {
            newSpaces.push({
              ...alreadyExistedSpace,
              ...!isUndefined(newSpaces.find(e => e.roofId === alreadyExistedSpace.roofId)) && {
                roofId: RoofId(generateUUID()),
              },
            });
          } else if(isNull(existedRoofId)) {
            newSpaces.push(alreadyExistedSpace);
          } else {
            newSpaces.push({
              ...alreadyExistedSpace,
              roofId: existedRoofId,
            });
          }
        } else {
          newSpaces.push({
            id: SpaceId(generateUUID()),
            name: lang.spaceName(getAndIncreaseAmountCounter('space')),
            roofId: defaultRoof.isVisible === true && !isNull(existedRoofId) ? existedRoofId : RoofId(generateUUID()),
            walls: cycleWalls,
            hasUniqueRoof: defaultRoof.isVisible === false,
            dormerRoofId: null,
            floorData: {
              isVisible: creationModeConfig.isFloorVisible,
              isHidden: false,
              thickness: defaultFloorThickness,
              topTexture: strapiAppConfig.defaultTexturePalette.floorTextureTop,
              bottomTexture: strapiAppConfig.defaultTexturePalette.floorTextureBottom,
              edgeTexture: strapiAppConfig.defaultTexturePalette.floorTextureEdge,
              topColorOverlay: isNull(floorTopColorOverlay) ? null : {
                type: 'predefined',
                value: new Color(floorTopColorOverlay),
              },
              bottomColorOverlay: isNull(floorBottomColorOverlay) ? null : {
                type: 'predefined',
                value: new Color(floorBottomColorOverlay),
              },
              edgeColorOverlay: isNull(floorEdgeColorOverlay) ? null : {
                type: 'predefined',
                value: new Color(floorEdgeColorOverlay),
              },
              topCompositeOperation: compositeOperations[0],
              bottomCompositeOperation: compositeOperations[0],
              edgeCompositeOperation: compositeOperations[0],
              commentTopTextureAppearance: '',
              commentTopTextureOverlayColor: '',
              commentBottomTextureAppearance: '',
              commentBottomTextureOverlayColor: '',
              commentEdgeTextureAppearance: '',
              commentEdgeTextureOverlayColor: '',
            },
            ceilingData: {
              isVisible: creationModeConfig.isCeilingVisible,
              isHidden: false,
              thickness: defaultCeilingThickness,
              distanceFromTop: defaultCeilingThickness,
              commentName: lang.ceilingName(getAndIncreaseAmountCounter('ceiling')),
              topTexture: strapiAppConfig.defaultTexturePalette.ceilingTextureTop,
              bottomTexture: strapiAppConfig.defaultTexturePalette.ceilingTextureBottom,
              edgeTexture: strapiAppConfig.defaultTexturePalette.ceilingTextureEdge,
              topColorOverlay: isNull(ceilingTopColorOverlay) ? null : {
                type: 'predefined',
                value: new Color(ceilingTopColorOverlay),
              },
              bottomColorOverlay: isNull(ceilingBottomColorOverlay) ? null : {
                type: 'predefined',
                value: new Color(ceilingBottomColorOverlay),
              },
              edgeColorOverlay: isNull(ceilingEdgeColorOverlay) ? null : {
                type: 'predefined',
                value: new Color(ceilingEdgeColorOverlay),
              },
              topCompositeOperation: compositeOperations[0],
              bottomCompositeOperation: compositeOperations[0],
              edgeCompositeOperation: compositeOperations[0],
              commentTopTextureAppearance: '',
              commentTopTextureOverlayColor: '',
              commentBottomTextureAppearance: '',
              commentBottomTextureOverlayColor: '',
              commentEdgeTextureAppearance: '',
              commentEdgeTextureOverlayColor: '',
            },
          });

          if(!isUndefined(onNewSpaceCreated)) {
            onNewSpaceCreated();
          }
          if(creationModeConfig.mode === 'multipleStraightLines') {
            window.setTimeout(() => {
              useTempWalls.setState(useTempWalls.getInitialState());
            }, 0);
          }
        }
      }
    }

    addRoofs(newSpaces.map(({ roofId }): Parameters<typeof addRoofs>[0][number] => {
      const wallIds = removeRepeatedValues(newSpaces.filter(e => e.roofId === roofId).flatMap(e => e.walls));
      const spaceWalls = wallIds.map(id => futureWalls.find(e => e.id === id)).filter(e => !isUndefined(e));
      const biggestContour = (() => {
        const { contours } = findSpaceClosedContours(spaceWalls);
        const [biggestContour] = (
          contours
            .map(e => ({
              area: calculateCoplanarPolygonArea(e),
              contour: e,
            }))
            .toSorted((a, b) => b.area - a.area)
        );

        return isUndefined(biggestContour) ? [] : biggestContour.contour.slice(0, -1);
      })();

      const roofPolygon = biggestContour.length >= 3 ? biggestContour : getFloorCoordinates(spaceWalls.map(e => e.position));
      const currentWallSet = new Set(wallIds);

      let bestMatchingPrevSpace: SpacesStore['spaces'][number] | null = null;
      let highestOverlapScore = 0;

      for(const prevSpace of spaces) {
        const prevWallSet = new Set(prevSpace.walls);
        const intersectionCount = [...currentWallSet].filter(id => prevWallSet.has(id)).length;
        const unionCount = new Set([...currentWallSet, ...prevWallSet]).size;
        const overlapScore = unionCount === 0 ? 0 : intersectionCount / unionCount;

        if(overlapScore > highestOverlapScore) {
          highestOverlapScore = overlapScore;
          bestMatchingPrevSpace = prevSpace;
        }
      }

      let previousRoofData = highestOverlapScore >= 0.6 ? roofs.find(e => e.id === bestMatchingPrevSpace?.roofId)?.roofData : undefined;
      if(isUndefined(previousRoofData) && roofPolygon.length >= 3) {
        const currentCentroidX = roofPolygon.reduce((acc, { x }) => acc + x, 0) / roofPolygon.length;
        const currentCentroidZ = roofPolygon.reduce((acc, { y }) => acc + y, 0) / roofPolygon.length;

        const anyRoofWallIds = removeRepeatedValues(newSpaces.filter(e => e.roofId === roofId).flatMap(e => e.walls));
        const anyRoofWall = futureWalls.find(e => anyRoofWallIds.includes(e.id));
        const currentLevelId = anyRoofWall?.levelId ?? null;

        let nearestRoofDistanceSq = Number.POSITIVE_INFINITY;
        let nearestRoofId: RoofId | null = null;

        for(const prevSpace of spaces) {
          const firstWall = futureWalls.find(e => prevSpace.walls[0] === e?.id);

          if(!isNull(currentLevelId) && !isUndefined(firstWall) && firstWall.levelId !== currentLevelId) {
            continue;
          }

          const prevWalls = prevSpace.walls.map(id => futureWalls.find(e => e.id === id)).filter(Boolean);
          let prevPoints = getFloorCoordinates(prevWalls.map(e => e.position));

          if(prevPoints.length < 3) {
            const endpoints = (
              Array
                .from(new Set(prevWalls.flatMap(e => [e.position.start, e.position.end]).map(e => `${e.x},${e.y}`)))
                .map(e => {
                  const [x, y] = e.split(',').map(Number);

                  return new Vector2(x, y);
                })
            );
            prevPoints = endpoints;
            if(prevPoints.length === 0) {
              continue;
            }
          }
          const prevCentroidX = prevPoints.reduce((acc, { x }) => acc + x, 0) / prevPoints.length;
          const prevCentroidZ = prevPoints.reduce((acc, { y }) => acc + y, 0) / prevPoints.length;
          const distanceSq = (prevCentroidX - currentCentroidX) ** 2 + (prevCentroidZ - currentCentroidZ) ** 2;

          if(distanceSq < nearestRoofDistanceSq) {
            nearestRoofDistanceSq = distanceSq;
            nearestRoofId = prevSpace.roofId;
          }
        }

        if(!isNull(nearestRoofId)) {
          const matchedRoof = roofs.find(e => e.id === nearestRoofId)?.roofData;
          if(!isUndefined(matchedRoof)) {
            previousRoofData = matchedRoof;
          }
        }
      }

      const roofType = defaultRoof.type === 'hip-with-all-gable-corners' ? 'hip' : defaultRoof.type;

      const commonRoofData = {
        type: roofType,
        isVisible: defaultRoof.isVisible,
        isHidden: false,
        overhang: roofType === 'flat' ? 0 : defaultRoofOverhang,
        heightFromBase: defaultRoofHeightFromBase,
        hipSlope: defaultHipRoofSlope,
        slantedSlope: defaultSlantedRoofSlope,
        thickness: defaultRoofThickness,
        slantedSlopeOrientation: 0,
        isClosedGable: false,
        commentName: lang.roofName(getAndIncreaseAmountCounter('roof')),
        topTexture: strapiAppConfig.defaultTexturePalette.roofTextureTop,
        bottomTexture: strapiAppConfig.defaultTexturePalette.roofTextureBottom,
        edgeTexture: strapiAppConfig.defaultTexturePalette.roofTextureEdge,
        topColorOverlay: isNull(roofTopColorOverlay) ? null : {
          type: 'predefined',
          value: new Color(roofTopColorOverlay),
        },
        bottomColorOverlay: isNull(roofBottomColorOverlay) ? null : {
          type: 'predefined',
          value: new Color(roofBottomColorOverlay),
        },
        edgeColorOverlay: isNull(roofEdgeColorOverlay) ? null : {
          type: 'predefined',
          value: new Color(roofEdgeColorOverlay),
        },
        topCompositeOperation: compositeOperations[0],
        bottomCompositeOperation: compositeOperations[0],
        edgeCompositeOperation: compositeOperations[0],
        commentTopTextureAppearance: '',
        commentTopTextureOverlayColor: '',
        commentBottomTextureAppearance: '',
        commentBottomTextureOverlayColor: '',
        commentEdgeTextureAppearance: '',
        commentEdgeTextureOverlayColor: '',
        isFlippedWraparound: false,
      } satisfies Partial<RoofsStore['roofs'][number]['roofData']>;

      const transformableGableToHipRoofParts = defaultRoof.type !== 'hip-with-all-gable-corners' ? [] : calculateHipRoofDataCached({
        roofId,
        coords: biggestContour,
        offset: commonRoofData.overhang,
        roofHeightFromBase: commonRoofData.heightFromBase,
        roofSlope: commonRoofData.hipSlope,
        gableIndices: [],
        isClosedGable: false,
      }).transformableGableToHipRoofParts;

      const mergedRoofData: RoofsStore['roofs'][number]['roofData'] = {
        ...commonRoofData,
        ...!isUndefined(previousRoofData) && {
          type: previousRoofData.type,
          isVisible: previousRoofData.isVisible,
          isHidden: previousRoofData.isHidden,
          overhang: previousRoofData.overhang,
          heightFromBase: previousRoofData.heightFromBase,
          hipSlope: previousRoofData.hipSlope,
          slantedSlope: previousRoofData.slantedSlope,
          thickness: previousRoofData.thickness,
          slantedSlopeOrientation: previousRoofData.slantedSlopeOrientation,
          commentName: previousRoofData.commentName,
          topTexture: previousRoofData.topTexture,
          bottomTexture: previousRoofData.bottomTexture,
          edgeTexture: previousRoofData.edgeTexture,
          topColorOverlay: previousRoofData.topColorOverlay,
          bottomColorOverlay: previousRoofData.bottomColorOverlay,
          edgeColorOverlay: previousRoofData.edgeColorOverlay,
          topCompositeOperation: previousRoofData.topCompositeOperation,
          bottomCompositeOperation: previousRoofData.bottomCompositeOperation,
          edgeCompositeOperation: previousRoofData.edgeCompositeOperation,
          topTextureTransform: previousRoofData.topTextureTransform,
          bottomTextureTransform: previousRoofData.bottomTextureTransform,
          edgeTextureTransform: previousRoofData.edgeTextureTransform,
          isFlippedWraparound: previousRoofData.isFlippedWraparound,
        },
        transformableGableToHipRoofParts,
        activeGableIndices: (() => {
          const max = transformableGableToHipRoofParts.length - 1;
          const prev = previousRoofData?.activeGableIndices ?? [];

          return prev.filter(e => e >= 0 && e <= max);
        })(),
        dormers: isUndefined(previousRoofData) ? [] : previousRoofData.dormers,
      };

      return {
        id: roofId,
        roofData: mergedRoofData,
      };
    }));
    window.setTimeout(() => {
      removeNotUsedRoofs();
    }, 50);

    redefineWallSideTypes(newSpaces);
    hideRoofsFromOverlapLevelSpaces();

    return newSpaces;
  });
};

export const refreshSpaces = () => {
  updateSpaces(spaces => spaces);
  removeNotUsedRoofs();
  window.setTimeout(() => {
    makeSpaces();
  }, 0);
};

export const replaceWallsInSpaces = (wallsData: Array<{ oldWallId: WallId; newWallIds: WallId[] }>) => {
  updateSpaces(spaces => (
    spaces.map(e => ({
      ...e,
      walls: e.walls.flatMap(id => (
        wallsData.find(({ oldWallId }) => oldWallId === id)?.newWallIds ?? id
      )),
    }))
  ));
};

export const addWallsToSpace = (spaceId: SpaceId, wallIds: WallId[]) => {
  updateSpaces(spaces => (
    spaces.map(e => e.id !== spaceId ? e : {
      ...e,
      walls: [
        ...e.walls,
        ...wallIds,
      ],
    })
  ));
};

export const setSpaceParams = (
  id: SpaceId,
  params: Unionize<Pick<SpacesStore['spaces'][number], 'name'>>,
) => {
  updateSpaces(spaces => (
    spaces.map(e => e.id !== id ? e : {
      ...e,
      ...params,
    })
  ));
};

export const setSpaceRoofUniqueness = (id: SpaceId, hasUniqueRoof: SpacesStore['spaces'][number]['hasUniqueRoof']) => {
  updateSpaces(spaces => (
    spaces.map(e => e.id !== id ? e : {
      ...e,
      hasUniqueRoof,
    })
  ));

  makeSpaces();
  updateRoofsSubtractions();
};

export const setFloorParams = (
  spaceId: SpaceId,
  applyToAll: null | Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'floorAppearance' }>['applyToAll'],
  params: Unionize<Pick<SpacesStore['spaces'][number]['floorData'], 'thickness' | 'isVisible' | 'topTexture' | 'bottomTexture' | 'edgeTexture' | 'topColorOverlay' | 'bottomColorOverlay' | 'edgeColorOverlay' | 'topCompositeOperation' | 'bottomCompositeOperation' | 'edgeCompositeOperation' | 'commentTopTextureAppearance' | 'commentTopTextureOverlayColor' | 'commentBottomTextureAppearance' | 'commentBottomTextureOverlayColor' | 'commentEdgeTextureAppearance' | 'commentEdgeTextureOverlayColor' | 'topTextureTransform' | 'bottomTextureTransform' | 'edgeTextureTransform' | 'isHidden'>>,
) => {
  updateSpaces(spaces => {
    const { walls } = useWalls.getState();

    const getLevelId = (spaceId: SpaceId) => {
      const { walls: [wallId] } = getNotUndefined(spaces.find(e => e.id === spaceId), 'Something went wrong. |4vfs9g|');
      assert(!isUndefined(wallId), 'Something went wrong. |kyt807|');

      const { levelId } = getNotUndefined(walls.find(e => e.id === wallId), 'Something went wrong. |d78q23|');

      return levelId;
    };

    const levelId = getLevelId(spaceId);

    return spaces.map(e => {
      const isUpdate = (
        false
          || e.id === spaceId
          || !isNull(applyToAll) && applyToAll.isActive === true && (
            false
              || applyToAll.type === 'floors'
              || applyToAll.type === 'sameLevelFloors' && getLevelId(e.id) === levelId
          )
      );

      return isUpdate === false ? e : {
        ...e,
        floorData: {
          ...e.floorData,
          ...params,
        },
      };
    });
  });
};

export const setCeilingParams = (
  spaceId: SpaceId,
  applyToAll: null | Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'ceilingAppearance' }>['applyToAll'],
  params: Unionize<Pick<SpacesStore['spaces'][number]['ceilingData'], 'thickness' | 'isVisible' | 'distanceFromTop' | 'commentName' | 'topTexture' | 'bottomTexture' | 'edgeTexture' | 'topColorOverlay' | 'bottomColorOverlay' | 'edgeColorOverlay' | 'topCompositeOperation' | 'bottomCompositeOperation' | 'edgeCompositeOperation' | 'commentTopTextureAppearance' | 'commentTopTextureOverlayColor' | 'commentBottomTextureAppearance' | 'commentBottomTextureOverlayColor' | 'commentEdgeTextureAppearance' | 'commentEdgeTextureOverlayColor' | 'topTextureTransform' | 'bottomTextureTransform' | 'edgeTextureTransform' | 'isHidden'>>,
) => {
  updateSpaces(spaces => {
    const { walls } = useWalls.getState();

    const getLevelId = (spaceId: SpaceId) => {
      const { walls: [wallId] } = getNotUndefined(spaces.find(e => e.id === spaceId), 'Something went wrong. |26kc72|');
      assert(!isUndefined(wallId), 'Something went wrong. |bsq0tw|');

      const { levelId } = getNotUndefined(walls.find(e => e.id === wallId), 'Something went wrong. |zs75iu|');

      return levelId;
    };

    const levelId = getLevelId(spaceId);

    return spaces.map(e => {
      const isUpdate = (
        false
          || e.id === spaceId
          || !isNull(applyToAll) && applyToAll.isActive === true && (
            false
              || applyToAll.type === 'ceilings'
              || applyToAll.type === 'sameLevelCeilings' && getLevelId(e.id) === levelId
          )
      );

      return isUpdate === false ? e : {
        ...e,
        ceilingData: {
          ...e.ceilingData,
          ...params,
        },
      };
    });
  });
};
