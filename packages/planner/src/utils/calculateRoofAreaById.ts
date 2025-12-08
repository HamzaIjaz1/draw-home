import { getNotUndefined, isUndefined } from '@arthurka/ts-utils';
import { RoofId } from '@draw-house/common/dist/brands';
import { clearFutureWalls, useSpaces, useTempWalls, useWalls } from '../zustand';
import { useRoofs } from '../zustand/useRoofs';
import { removeRepeatedValues } from './removeRepeatedValues';
import { findSpaceClosedContours } from './findSpaceClosedContours';
import { calculateHipRoofDataCached, calculateSlantedRoofDataCached, calculateWraparoundRoofDataCached } from './roofCache';
import { calculateCoplanarPolygonArea } from './getAreaOfSmallerContour';

export const calculateRoofAreaById = (roofId: RoofId) => {
  const { walls } = useWalls.getState();
  const { tempWalls } = useTempWalls.getState();
  const { spaces } = useSpaces.getState();
  const { roofs } = useRoofs.getState();

  const {
    roofData: {
      type,
      activeGableIndices,
      heightFromBase,
      overhang,
      hipSlope,
      slantedSlope,
      slantedSlopeOrientation,
      isFlippedWraparound,
      isVisible,
    },
  } = getNotUndefined(roofs.find(e => e.id === roofId), 'This should never happen. |n5n1i9|');

  if(isVisible === false) {
    return 0;
  }

  const wallIds = removeRepeatedValues(spaces.filter(e => e.roofId === roofId).flatMap(e => e.walls));
  const futureWalls = clearFutureWalls([...walls, ...tempWalls]);
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

  const roofParts = (() => {
    switch(type) {
      case 'hip': {
        const { roofParts } = calculateHipRoofDataCached({
          roofId,
          coords: biggestContour,
          offset: overhang,
          roofHeightFromBase: heightFromBase,
          roofSlope: hipSlope,
          gableIndices: activeGableIndices,
          isClosedGable: false,
        });

        return roofParts;
      }
      case 'slanted': {
        const { roofParts } = calculateSlantedRoofDataCached({
          coords: biggestContour,
          offset: overhang,
          roofHeightFromBase: heightFromBase,
          roofSlope: slantedSlope,
          slopeOrientation: slantedSlopeOrientation,
        });

        return roofParts;
      }
      case 'wraparound': {
        const { roofParts } = calculateWraparoundRoofDataCached({
          coords: biggestContour,
          offset: overhang,
          roofHeightFromBase: heightFromBase,
          roofSlope: slantedSlope,
          flipSide: isFlippedWraparound,
        });

        return roofParts;
      }
      case 'flat': {
        const { contours } = findSpaceClosedContours(spaceWalls);
        const [biggestContour] = (
          contours
            .map(e => ({
              area: calculateCoplanarPolygonArea(e),
              contour: e,
            }))
            .toSorted((a, b) => b.area - a.area)
        );

        return isUndefined(biggestContour) ? [] : [biggestContour.contour.slice(0, -1)];
      }
      default:
        ((e: never) => e)(type);
        throw new Error('This should never happen. |v3ob9z|');
    }
  })();

  return roofParts.reduce((acc, e) => acc + calculateCoplanarPolygonArea(e), 0);
};
