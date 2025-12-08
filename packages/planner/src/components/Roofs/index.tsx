import { getNotUndefined, isArrayLength, isUndefined } from '@arthurka/ts-utils';
import { Vector3 } from 'three';
import assert from 'assert';
import { Fragment } from 'react';
import { clearFutureWalls, mergeFutureWalls, useGlobalSettings, useLevels, useSpaces, useTempWalls, useViewMode, useWalls } from '../../zustand';
import { FlatRoof } from './FlatRoof';
import { CalculatedRoof } from './CalculatedRoof';
import { RoofSkeleton2D } from './RoofSkeleton2D';
import { RoofDormer } from './RoofDormer';
import { useInteractivePresence } from '../../customHooks';
import { semiTransparentElementsOpacity } from '../../constants';
import { useRoofs } from '../../zustand/useRoofs';
import { removeRepeatedValues } from '../../utils/removeRepeatedValues';
import { calculateHipRoofDataCached, calculateSlantedRoofDataCached, calculateWraparoundRoofDataCached } from '../../utils/roofCache';
import { findSpaceClosedContours } from '../../utils/findSpaceClosedContours';
import { calculateCoplanarPolygonArea } from '../../utils/getAreaOfSmallerContour';
import { offsetPolygon } from '../../calculationsByJovan/Utils/Curve/utils';
import { isContourClockwise } from '../../utils/isContourClockwise';
import { getOverFloorPlans2DData, useFloorPlans2D } from '../../utils/getOverFloorPlans2DData';

export const Roofs: React.FC = () => {
  const isRoofsShown = useGlobalSettings(s => s.isRoofsShown);
  const isRoofLinesIn2DShown = useGlobalSettings(s => s.isRoofLinesIn2DShown);
  const { walls } = useWalls();
  const { tempWalls } = useTempWalls();
  const { spaces } = useSpaces();
  const { roofs } = useRoofs();
  const { levels } = useLevels();
  const { viewMode } = useViewMode();
  const { getInteractivePresence } = useInteractivePresence();
  const floorPlans2D = useFloorPlans2D();

  const futureWalls = mergeFutureWalls([...walls, ...tempWalls]);
  const wallsOverFloorPlan = getOverFloorPlans2DData(futureWalls, floorPlans2D);
  const spacesOverFloorPlan = spaces.filter(({ walls }) => wallsOverFloorPlan.some(e => walls.includes(e.id)));

  return (
    <>
      {
        isRoofsShown === true && viewMode === '3D' && (
          roofs.map(({
            id: roofId,
            roofData: {
              isVisible,
              isHidden,
              type,
              activeGableIndices,
              isClosedGable,
              heightFromBase,
              overhang,
              hipSlope,
              slantedSlope,
              slantedSlopeOrientation,
              thickness,
              topTexture,
              bottomTexture,
              edgeTexture,
              topColorOverlay,
              bottomColorOverlay,
              edgeColorOverlay,
              topCompositeOperation,
              bottomCompositeOperation,
              edgeCompositeOperation,
              topTextureTransform,
              bottomTextureTransform,
              edgeTextureTransform,
              isFlippedWraparound,
              dormers,
            },
          }) => {
            const wallIds = removeRepeatedValues(spaces.filter(e => e.roofId === roofId).flatMap(e => e.walls));
            const isOverFloorPlan = spacesOverFloorPlan.some(e => e.roofId === roofId);

            if(wallIds.length === 0 || isVisible === false || isHidden === true || isOverFloorPlan === true) {
              return null;
            }

            const futureWalls = clearFutureWalls([...walls, ...tempWalls]);
            const spaceWalls = wallIds.map(id => futureWalls.find(e => e.id === id)).filter(e => !isUndefined(e));
            if(!isArrayLength(spaceWalls, '>=', 1)) {
              return null;
            }

            const { elevation, height, isActive, isLevelVisible, isSemiTransparent } = getNotUndefined(levels.find(e => e.id === spaceWalls[0].levelId), 'Something went wrong. |6fr9pu|');
            if(isLevelVisible === false) {
              return null;
            }

            const opacity = isSemiTransparent === true ? semiTransparentElementsOpacity : 1;
            const { isRendered } = getInteractivePresence(isActive);
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

            if(isRendered === false || !isArrayLength(biggestContour, '>=', 3)) {
              return null;
            }

            switch(type) {
              case 'hip': {
                const { roofParts, transformableGableToHipRoofParts } = calculateHipRoofDataCached({
                  roofId,
                  coords: biggestContour,
                  offset: overhang,
                  roofHeightFromBase: heightFromBase,
                  roofSlope: hipSlope,
                  gableIndices: activeGableIndices,
                  isClosedGable,
                });

                return (
                  <Fragment key={roofId}>
                    <CalculatedRoof
                      type={type}
                      roofId={roofId}
                      roofParts={roofParts}
                      transformableGableToHipRoofParts={transformableGableToHipRoofParts}
                      elevation={elevation + height}
                      opacity={opacity}
                      thickness={thickness}
                      topTexture={topTexture}
                      bottomTexture={bottomTexture}
                      edgeTexture={edgeTexture}
                      topColorOverlay={topColorOverlay}
                      bottomColorOverlay={bottomColorOverlay}
                      edgeColorOverlay={edgeColorOverlay}
                      topCompositeOperation={topCompositeOperation}
                      bottomCompositeOperation={bottomCompositeOperation}
                      edgeCompositeOperation={edgeCompositeOperation}
                    />
                    {
                      dormers.map(dormer => (
                        <RoofDormer
                          key={dormer.id}
                          dormer={dormer}
                          roofParts={roofParts}
                          elevation={elevation + height}
                          opacity={opacity}
                          thickness={thickness}
                          topTexture={topTexture}
                          bottomTexture={bottomTexture}
                          edgeTexture={edgeTexture}
                          topColorOverlay={topColorOverlay}
                          bottomColorOverlay={bottomColorOverlay}
                          edgeColorOverlay={edgeColorOverlay}
                          topCompositeOperation={topCompositeOperation}
                          bottomCompositeOperation={bottomCompositeOperation}
                          edgeCompositeOperation={edgeCompositeOperation}
                          topTextureTransform={topTextureTransform}
                          bottomTextureTransform={bottomTextureTransform}
                          edgeTextureTransform={edgeTextureTransform}
                        />
                      ))
                    }
                  </Fragment>
                );
              }
              case 'slanted': {
                const { roofParts } = calculateSlantedRoofDataCached({
                  coords: biggestContour,
                  offset: overhang,
                  roofHeightFromBase: heightFromBase,
                  roofSlope: slantedSlope,
                  slopeOrientation: slantedSlopeOrientation,
                });

                return (
                  <Fragment key={roofId}>
                    <CalculatedRoof
                      type={type}
                      roofId={roofId}
                      roofParts={roofParts}
                      transformableGableToHipRoofParts={[]}
                      elevation={elevation + height}
                      opacity={opacity}
                      thickness={thickness}
                      topTexture={topTexture}
                      bottomTexture={bottomTexture}
                      edgeTexture={edgeTexture}
                      topColorOverlay={topColorOverlay}
                      bottomColorOverlay={bottomColorOverlay}
                      edgeColorOverlay={edgeColorOverlay}
                      topCompositeOperation={topCompositeOperation}
                      bottomCompositeOperation={bottomCompositeOperation}
                      edgeCompositeOperation={edgeCompositeOperation}
                    />
                    {
                      dormers.map(dormer => (
                        <RoofDormer
                          key={dormer.id}
                          dormer={dormer}
                          roofParts={roofParts}
                          elevation={elevation + height}
                          opacity={opacity}
                          thickness={thickness}
                          topTexture={topTexture}
                          bottomTexture={bottomTexture}
                          edgeTexture={edgeTexture}
                          topColorOverlay={topColorOverlay}
                          bottomColorOverlay={bottomColorOverlay}
                          edgeColorOverlay={edgeColorOverlay}
                          topCompositeOperation={topCompositeOperation}
                          bottomCompositeOperation={bottomCompositeOperation}
                          edgeCompositeOperation={edgeCompositeOperation}
                          topTextureTransform={topTextureTransform}
                          bottomTextureTransform={bottomTextureTransform}
                          edgeTextureTransform={edgeTextureTransform}
                        />
                      ))
                    }
                  </Fragment>
                );
              }
              case 'wraparound': {
                const { roofParts } = calculateWraparoundRoofDataCached({
                  coords: biggestContour,
                  offset: overhang,
                  roofHeightFromBase: heightFromBase,
                  roofSlope: slantedSlope,
                  flipSide: isFlippedWraparound,
                });

                return (
                  <Fragment key={roofId}>
                    <CalculatedRoof
                      type={type}
                      roofId={roofId}
                      roofParts={roofParts}
                      transformableGableToHipRoofParts={[]}
                      elevation={elevation + height}
                      opacity={opacity}
                      thickness={thickness}
                      topTexture={topTexture}
                      bottomTexture={bottomTexture}
                      edgeTexture={edgeTexture}
                      topColorOverlay={topColorOverlay}
                      bottomColorOverlay={bottomColorOverlay}
                      edgeColorOverlay={edgeColorOverlay}
                      topCompositeOperation={topCompositeOperation}
                      bottomCompositeOperation={bottomCompositeOperation}
                      edgeCompositeOperation={edgeCompositeOperation}
                    />
                    {
                      dormers.map(dormer => (
                        <RoofDormer
                          key={dormer.id}
                          dormer={dormer}
                          roofParts={roofParts}
                          elevation={elevation + height}
                          opacity={opacity}
                          thickness={thickness}
                          topTexture={topTexture}
                          bottomTexture={bottomTexture}
                          edgeTexture={edgeTexture}
                          topColorOverlay={topColorOverlay}
                          bottomColorOverlay={bottomColorOverlay}
                          edgeColorOverlay={edgeColorOverlay}
                          topCompositeOperation={topCompositeOperation}
                          bottomCompositeOperation={bottomCompositeOperation}
                          edgeCompositeOperation={edgeCompositeOperation}
                          topTextureTransform={topTextureTransform}
                          bottomTextureTransform={bottomTextureTransform}
                          edgeTextureTransform={edgeTextureTransform}
                        />
                      ))
                    }
                  </Fragment>
                );
              }
              case 'flat': {
                const counterclockwiseBiggestContour = isContourClockwise(biggestContour) ? biggestContour.toReversed() : biggestContour;
                const biggestContourWithOffset = offsetPolygon(counterclockwiseBiggestContour, overhang);
                assert(isArrayLength(biggestContourWithOffset, '>=', 3), 'Something went wrong. |6hfp3y|');

                return (
                  <FlatRoof
                    key={roofId}
                    roofId={roofId}
                    coords={biggestContourWithOffset}
                    elevation={elevation + height}
                    opacity={opacity}
                    heightFromBase={heightFromBase}
                    thickness={thickness}
                    topTexture={topTexture}
                    bottomTexture={bottomTexture}
                    edgeTexture={edgeTexture}
                    topColorOverlay={topColorOverlay}
                    bottomColorOverlay={bottomColorOverlay}
                    edgeColorOverlay={edgeColorOverlay}
                    topCompositeOperation={topCompositeOperation}
                    bottomCompositeOperation={bottomCompositeOperation}
                    edgeCompositeOperation={edgeCompositeOperation}
                  />
                );
              }
              default:
                ((e: never) => e)(type);
                throw new Error('This should never happen. |ti7rrf|');
            }
          })
        )
      }
      {
        isRoofLinesIn2DShown === true && viewMode === '2D' && (
          roofs.map(({
            id: roofId,
            roofData: {
              isVisible,
              isHidden,
              type,
              activeGableIndices,
              isClosedGable,
              heightFromBase,
              overhang,
              hipSlope,
              slantedSlope,
              slantedSlopeOrientation,
              isFlippedWraparound,
            },
          }) => {
            if(type === 'flat') {
              return null;
            }

            const wallIds = removeRepeatedValues(spaces.filter(e => e.roofId === roofId).flatMap(e => e.walls));

            if(wallIds.length === 0 || isVisible === false || isHidden === true) {
              return null;
            }

            const futureWalls = clearFutureWalls([...walls, ...tempWalls]);
            const spaceWalls = wallIds.map(id => futureWalls.find(e => e.id === id)).filter(e => !isUndefined(e));
            if(!isArrayLength(spaceWalls, '>=', 1)) {
              return null;
            }

            const { elevation, height, isActive, isLevelVisible } = getNotUndefined(levels.find(e => e.id === spaceWalls[0].levelId), 'Something went wrong. |7v61yn|');
            if(isLevelVisible === false) {
              return null;
            }

            const { isRendered } = getInteractivePresence(isActive);
            if(isRendered === false) {
              return null;
            }

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
            if(!isArrayLength(biggestContour, '>=', 3)) {
              return null;
            }

            // Get skeleton data based on roof type
            let boundaryLines: Array<{ start: Vector3; end: Vector3 }> = [];
            let skeletonLines: Array<{ start: Vector3; end: Vector3 }> = [];

            switch(type) {
              case 'hip': {
                const result = calculateHipRoofDataCached({
                  roofId,
                  coords: biggestContour,
                  offset: overhang,
                  roofHeightFromBase: heightFromBase,
                  roofSlope: hipSlope,
                  gableIndices: activeGableIndices,
                  isClosedGable,
                });
                boundaryLines = result.boundaryLines;
                skeletonLines = result.skeletonLines;
                break;
              }
              case 'slanted': {
                const { roofParts } = calculateSlantedRoofDataCached({
                  coords: biggestContour,
                  offset: overhang,
                  roofHeightFromBase: heightFromBase,
                  roofSlope: slantedSlope,
                  slopeOrientation: slantedSlopeOrientation,
                });
                // For slanted roofs, create boundary lines from the roof perimeter
                if(isArrayLength(roofParts, '>=', 1)) {
                  const perimeter = roofParts[0];
                  if(perimeter && isArrayLength(perimeter, '>=', 3)) {
                    boundaryLines = perimeter.map((point, i) => ({
                      start: point,
                      end: getNotUndefined(perimeter[(i + 1) % perimeter.length], 'This should never happen. |lsn5iq|'),
                    }));
                  }
                }
                break;
              }
              case 'wraparound': {
                const result = calculateWraparoundRoofDataCached({
                  coords: biggestContour,
                  offset: overhang,
                  roofHeightFromBase: heightFromBase,
                  roofSlope: slantedSlope,
                  flipSide: isFlippedWraparound,
                });
                // Wraparound roofs have proper skeleton data from the calculation
                boundaryLines = result.boundaryLines;
                skeletonLines = result.skeletonLines;
                break;
              }
              default:
                ((e: never) => e)(type);
                throw new Error('This should never happen. |7c20vh|');
            }

            return (
              <RoofSkeleton2D
                key={roofId}
                boundaryLines={boundaryLines}
                skeletonLines={skeletonLines}
                elevation={elevation + height}
              />
            );
          })
        )
      }
    </>
  );
};
