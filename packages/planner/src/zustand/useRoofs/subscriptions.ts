import { isNull, isUndefined } from '@arthurka/ts-utils';
import { Vector2, Vector3 } from 'three';
import { NonNegative } from '@draw-house/common/dist/brands';
import { closeSlideUpMenuLvl2, useSlideUpMenuLvl2 } from '../slideUpMenus/useSlideUpMenuLvl2';
import { closeSlideUpMenuLvl1, useSlideUpMenuLvl1 } from '../slideUpMenus/useSlideUpMenuLvl1';
import { withLoadedAppPage } from '../useAppPage';
import { createProjectHash } from '../useProjectHash';
import { RoofsStore, useRoofs } from './store';
import { createDormerWalls, WINDOW_OFFSET_FROM_DORMER_ROOF } from './dormerWallUtils';
import { useSpaces } from '../useSpaces/store';
import { useLevels } from '../useLevels/store';
import { useWalls } from '../useWalls/store';
import { GableDormer } from '../../calculationsByJovan/dormers/gableDormer';
import { HipDormer } from '../../calculationsByJovan/dormers/hipDormer';
import { ShedDormer } from '../../calculationsByJovan/dormers/shedDormer';
import { Dormer } from '../../calculationsByJovan/dormers/dormer';
import { RoofParts } from '../../calculationsByJovan/types';
import { calculateHipRoofDataCached, calculateSlantedRoofDataCached, calculateWraparoundRoofDataCached } from '../../utils/roofCache';
import { removeRepeatedValues } from '../../utils/removeRepeatedValues';
import { clearFutureWalls } from '../useWalls/actions1';
import { findSpaceClosedContours } from '../../utils/findSpaceClosedContours';
import { calculateCoplanarPolygonArea } from '../../utils/getAreaOfSmallerContour';
import { useTempWalls } from '../useTempWalls/store';

export const DORMER_SOFFIT = 0.5;

const findDormerRoofPartIndex = (position: Vector3, roofParts: RoofParts): number => {
  let closestIndex = 0;
  let closestDistance = Infinity;

  for(let i = 0; i < roofParts.length; i++) {
    const roofPart = roofParts[i];
    if(!roofPart || roofPart.length < 3) {
      continue;
    }

    const [p0, p1, p2] = roofPart;
    const v1 = new Vector3().subVectors(p1, p0);
    const v2 = new Vector3().subVectors(p2, p0);
    const normal = new Vector3().crossVectors(v1, v2).normalize();
    const d = -normal.dot(p0);
    const distance = Math.abs(normal.dot(position) + d);

    if(distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  }

  return closestIndex;
};

const createDormerInstance = (
  dormer: RoofsStore['roofs'][number]['roofData']['dormers'][number],
  relativePosition: Vector3,
  roofParts: RoofParts,
): Dormer => {
  const directionVector = new Vector3(0, 0, 1);
  directionVector.applyQuaternion(dormer.rotation);
  const directionPoint = relativePosition.clone().add(directionVector);

  const dormerMainRoofPartIndex = findDormerRoofPartIndex(relativePosition, roofParts);
  const wallHeight = dormer.height * 0.6;
  const roofHeight = dormer.height * 0.4;

  if(dormer.type === 'gable') {
    return new GableDormer(
      relativePosition,
      directionPoint,
      dormer.width,
      dormer.depth,
      wallHeight,
      roofHeight,
      roofParts,
      [dormerMainRoofPartIndex],
      'roof',
      DORMER_SOFFIT,
    );
  }

  if(dormer.type === 'hip') {
    return new HipDormer(
      relativePosition,
      directionPoint,
      dormer.width,
      dormer.depth,
      wallHeight,
      roofHeight,
      roofParts,
      [dormerMainRoofPartIndex],
      'roof',
      DORMER_SOFFIT,
    );
  }

  return new ShedDormer(
    relativePosition,
    directionPoint,
    dormer.width,
    dormer.depth,
    wallHeight,
    roofHeight,
    roofParts,
    [dormerMainRoofPartIndex],
    'roof',
    DORMER_SOFFIT,
  );
};

const calculateDormerGeometry = (
  dormer: RoofsStore['roofs'][number]['roofData']['dormers'][number],
  levelElevation: number,
  levelHeight: number,
  roofParts: RoofParts,
) => {
  const relativePosition = dormer.position.clone();
  relativePosition.y -= (levelElevation + levelHeight);

  const dormerInstance = createDormerInstance(dormer, relativePosition, roofParts);
  const { debugPoints } = dormerInstance.calculateGeometry();

  return { debugPoints };
};

useRoofs.subscribe(withLoadedAppPage(createProjectHash));

useRoofs.subscribe(withLoadedAppPage(async ({ roofs }) => {
  const { type, isOpened, roofId } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;

  if(isOpened === false) {
    return;
  }

  if(type === 'roof') {
    if(roofs.every(e => e.id !== roofId)) {
      await closeSlideUpMenuLvl1({});
    }
  }
}));

useRoofs.subscribe(withLoadedAppPage(async ({ roofs }) => {
  const { type, isOpened, roofId } = useSlideUpMenuLvl2.getState().slideUpMenuLvl2;

  if(isOpened === false) {
    return;
  }

  if(type === 'roofAppearance') {
    if(roofs.every(e => e.id !== roofId)) {
      await closeSlideUpMenuLvl2({});
    }
  }
}));

const getCommonDormerData = (
  roof: RoofsStore['roofs'][number],
  spaces: ReturnType<typeof useSpaces.getState>['spaces'],
  walls: ReturnType<typeof useWalls.getState>['walls'],
  tempWalls: ReturnType<typeof useTempWalls.getState>['tempWalls'],
  levels: ReturnType<typeof useLevels.getState>['levels'],
) => {
  // Collect walls from ALL spaces that have this roofId (matching Roofs/index.tsx behavior)
  // This is critical because when a roof expands, multiple spaces may share the same roofId
  const wallIds = removeRepeatedValues(
    spaces.filter(s => s.roofId === roof.id).flatMap(s => s.walls),
  );

  if(wallIds.length === 0) {
    return null;
  }

  const futureWalls = clearFutureWalls([...walls, ...tempWalls]);
  const spaceWalls = wallIds.map(id => futureWalls.find(e => e.id === id)).filter(e => !isUndefined(e));

  const firstWall = spaceWalls[0];
  if(isUndefined(firstWall)) {
    return null;
  }

  const level = levels.find(l => l.id === firstWall.levelId);
  if(isUndefined(level)) {
    return null;
  }

  const { contours } = findSpaceClosedContours(spaceWalls);
  const [biggestContour] = contours
    .map(e => ({ area: calculateCoplanarPolygonArea(e), contour: e }))
    .toSorted((a, b) => b.area - a.area);

  if(isUndefined(biggestContour)) {
    return null;
  }

  const coords = biggestContour.contour.slice(0, -1);

  const roofParts = (() => {
    switch(roof.roofData.type) {
      case 'hip': {
        const { roofParts } = calculateHipRoofDataCached({
          roofId: roof.id,
          coords,
          offset: roof.roofData.overhang,
          roofHeightFromBase: roof.roofData.heightFromBase,
          roofSlope: roof.roofData.hipSlope,
          gableIndices: roof.roofData.activeGableIndices,
          isClosedGable: roof.roofData.isClosedGable,
        });
        return roofParts;
      }
      case 'slanted': {
        const { roofParts } = calculateSlantedRoofDataCached({
          coords,
          offset: roof.roofData.overhang,
          roofHeightFromBase: roof.roofData.heightFromBase,
          roofSlope: roof.roofData.slantedSlope,
          slopeOrientation: roof.roofData.slantedSlopeOrientation,
        });
        return roofParts;
      }
      case 'wraparound': {
        const { roofParts } = calculateWraparoundRoofDataCached({
          coords,
          offset: roof.roofData.overhang,
          roofHeightFromBase: roof.roofData.heightFromBase,
          roofSlope: roof.roofData.slantedSlope,
          flipSide: roof.roofData.isFlippedWraparound,
        });
        return roofParts;
      }
      case 'flat':
        return [];
      default:
        return [];
    }
  })();

  if(roofParts.length === 0) {
    return null;
  }

  return { level, roofParts };
};

const updateExistingDormerWalls = (
  dormer: RoofsStore['roofs'][number]['roofData']['dormers'][number],
  debugPoints: NonNullable<ReturnType<Dormer['calculateGeometry']>['debugPoints']>,
) => {
  const { walls: currentWalls } = useWalls.getState();
  const dormerWallIds = dormer.wallIds;

  if(isNull(dormerWallIds) || dormerWallIds.length !== 4) {
    return;
  }

  const [frontWallId, rightWallId, backWallId, leftWallId] = dormerWallIds;
  const { leftFrontTop, rightFrontTop, leftBackProjected, rightBackProjected } = debugPoints;

  const newWindowYPosition = NonNegative(leftFrontTop.y - WINDOW_OFFSET_FROM_DORMER_ROOF);

  useWalls.setState({
    walls: currentWalls.map(wall => {
      if(wall.id === frontWallId) {
        return {
          ...wall,
          position: {
            start: new Vector2(leftFrontTop.x, leftFrontTop.z),
            end: new Vector2(rightFrontTop.x, rightFrontTop.z),
          },
          furnitures: wall.furnitures.map(furniture => ({
            ...furniture,
            onWallCoordinateY: newWindowYPosition,
          })),
        };
      }
      if(wall.id === rightWallId) {
        return {
          ...wall,
          position: {
            start: new Vector2(rightFrontTop.x, rightFrontTop.z),
            end: new Vector2(rightBackProjected.x, rightBackProjected.z),
          },
        };
      }
      if(wall.id === backWallId) {
        return {
          ...wall,
          position: {
            start: new Vector2(rightBackProjected.x, rightBackProjected.z),
            end: new Vector2(leftBackProjected.x, leftBackProjected.z),
          },
        };
      }
      if(wall.id === leftWallId) {
        return {
          ...wall,
          position: {
            start: new Vector2(leftBackProjected.x, leftBackProjected.z),
            end: new Vector2(leftFrontTop.x, leftFrontTop.z),
          },
        };
      }
      return wall;
    }),
  });
};

const createNewDormerWalls = (
  dormer: RoofsStore['roofs'][number]['roofData']['dormers'][number],
  roofId: RoofsStore['roofs'][number]['id'],
  levelId: ReturnType<typeof useLevels.getState>['levels'][number]['id'],
  debugPoints: NonNullable<ReturnType<Dormer['calculateGeometry']>['debugPoints']>,
) => {
  const createdWallIds = createDormerWalls(debugPoints, levelId, dormer.id);

  const { roofs: currentRoofs } = useRoofs.getState();
  useRoofs.setState({
    roofs: currentRoofs.map(e => e.id !== roofId ? e : {
      ...e,
      roofData: {
        ...e.roofData,
        dormers: e.roofData.dormers.map(e => e.id !== dormer.id ? e : {
          ...e,
          wallIds: createdWallIds,
        }),
      },
    }),
  });
};

useRoofs.subscribe(withLoadedAppPage(({ roofs }, prevState) => {
  const { spaces } = useSpaces.getState();
  const { levels } = useLevels.getState();
  const { walls } = useWalls.getState();
  const { tempWalls } = useTempWalls.getState();

  for(const roof of roofs) {
    const prevRoof = prevState.roofs.find(e => e.id === roof.id);

    for(const dormer of roof.roofData.dormers) {
      const prevDormer = prevRoof?.roofData.dormers.find(e => e.id === dormer.id);

      // Check if dormer position, rotation, or dimensions have changed
      const hasPositionChanged = (
        true
          && !isUndefined(prevDormer)
          && !isNull(dormer.wallIds)
          && (
            false
              || !prevDormer.position.equals(dormer.position)
              || !prevDormer.rotation.equals(dormer.rotation)
              || prevDormer.width !== dormer.width
              || prevDormer.depth !== dormer.depth
              || prevDormer.height !== dormer.height
          )
      );

      // Handle dormer position/dimension changes - update existing walls
      if(hasPositionChanged) {
        const commonData = getCommonDormerData(roof, spaces, walls, tempWalls, levels);
        if(isNull(commonData)) {
          continue;
        }

        const { level, roofParts } = commonData;
        const { debugPoints } = calculateDormerGeometry(dormer, level.elevation, level.height, roofParts);

        if(!isUndefined(debugPoints)) {
          updateExistingDormerWalls(dormer, debugPoints);
        }
        continue;
      }

      // Handle new dormer creation - create new walls
      if(isUndefined(prevDormer) && isNull(dormer.wallIds)) {
        const commonData = getCommonDormerData(roof, spaces, walls, tempWalls, levels);
        if(isNull(commonData)) {
          continue;
        }

        const { level, roofParts } = commonData;
        const { debugPoints } = calculateDormerGeometry(dormer, level.elevation, level.height, roofParts);

        if(!isUndefined(debugPoints)) {
          createNewDormerWalls(dormer, roof.id, level.id, debugPoints);
        }
      }
    }
  }
}));
