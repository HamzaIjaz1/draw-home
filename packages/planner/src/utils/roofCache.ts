import { isUndefined, ValueOf } from '@arthurka/ts-utils';
import { RoofId } from '@draw-house/common/dist/brands';
import { StrictExclude } from '@draw-house/common/dist/utils';
import { calculateHipRoofData, calculateSlantedRoofData } from '../calculationsByJovan';
import { extendedJSON } from './safeJSONParse';
import { addHipRoofTempGableIndicesData } from '../zustand/useHipRoofTempGableIndicesData';
import { calculateWraparoundRoofData } from '../calculationsByJovan/calculateWraparoundRoofData';
import type { RoofsStore } from '../zustand/useRoofs';

const cache = {
  hip: new Map<string, Pick<ReturnType<typeof calculateHipRoofData>, 'roofParts' | 'transformableGableToHipRoofParts' | 'updatedGableIndices' | 'boundaryLines' | 'skeletonLines' | 'boundaryBaseLines'>>(),
  slanted: new Map<string, Pick<ReturnType<typeof calculateSlantedRoofData>, 'roofParts'>>(),
  wraparound: new Map<string, ReturnType<typeof calculateWraparoundRoofData>>(),
} satisfies Record<StrictExclude<RoofsStore['roofs'][number]['roofData']['type'], 'flat'>, Map<string, unknown>>;

export const calculateHipRoofDataCached = ({
  roofId,
  coords,
  offset,
  roofHeightFromBase,
  roofSlope,
  gableIndices,
  isClosedGable,
}: Parameters<typeof calculateHipRoofData>[0] & { roofId: RoofId }): ValueOf<typeof cache.hip> => {
  const params = {
    coords,
    offset,
    roofHeightFromBase,
    roofSlope,
    gableIndices,
    isClosedGable,
  };

  const key = extendedJSON.stringify(params);
  const cachedResult = cache.hip.get(key);

  if(!isUndefined(cachedResult)) {
    return cachedResult;
  }

  const {
    roofParts,
    transformableGableToHipRoofParts,
    updatedGableIndices,
    boundaryLines,
    skeletonLines,
    boundaryBaseLines,
  } = calculateHipRoofData(params);

  addHipRoofTempGableIndicesData(roofId, updatedGableIndices);
  const result = {
    transformableGableToHipRoofParts,
    updatedGableIndices,
    roofParts: roofParts.filter((e, i) => !updatedGableIndices.includes(i)),
    boundaryLines,
    skeletonLines,
    boundaryBaseLines,
  };

  cache.hip.set(key, result);

  return result;
};

export const calculateSlantedRoofDataCached = ({
  coords,
  offset,
  roofHeightFromBase,
  roofSlope,
  slopeOrientation,
}: Parameters<typeof calculateSlantedRoofData>[0]): ValueOf<typeof cache.slanted> => {
  const params = {
    coords,
    offset,
    roofHeightFromBase,
    roofSlope,
    slopeOrientation,
  };

  const key = extendedJSON.stringify(params);
  const cachedResult = cache.slanted.get(key);

  if(!isUndefined(cachedResult)) {
    return cachedResult;
  }

  const { roofParts } = calculateSlantedRoofData(params);
  const result = { roofParts };

  cache.slanted.set(key, result);

  return result;
};

export const calculateWraparoundRoofDataCached = ({
  coords,
  offset,
  roofHeightFromBase,
  roofSlope,
  flipSide,
}: Parameters<typeof calculateWraparoundRoofData>[0]): ValueOf<typeof cache.wraparound> => {
  const params = {
    coords,
    offset,
    roofHeightFromBase,
    roofSlope,
    flipSide,
  };

  const key = extendedJSON.stringify(params);
  const cachedResult = cache.wraparound.get(key);

  if(!isUndefined(cachedResult)) {
    return cachedResult;
  }

  const { roofParts, boundaryLines, skeletonLines, boundaryBaseLines } = calculateWraparoundRoofData(params);
  const result = {
    roofParts,
    boundaryLines,
    skeletonLines,
    boundaryBaseLines,
  };

  cache.wraparound.set(key, result);

  return result;
};
