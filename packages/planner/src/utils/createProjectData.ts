import lzbase62 from 'lzbase62';
import { ShouldBeNever } from '@draw-house/common/dist/utils';
import { PositiveInteger } from '@draw-house/common/dist/brands';
import { isUndefined } from '@arthurka/ts-utils';
import { Project } from '../zod';
import { useGlobalSettings } from '../zustand/useGlobalSettings/store';
import { useWalls } from '../zustand/useWalls/store';
import { extendedJSON } from './safeJSONParse';
import { useCustomModels } from '../zustand/useCustomModels/store';
import { takeScreenshot } from './canvas';
import { uploadStrapiMedia } from '../services/fetch/strapiMedia';
import { useLevels } from '../zustand/useLevels/store';
import { useSpaces } from '../zustand/useSpaces/store';
import { useAmountCounters } from '../zustand/useAmountCounters';
import { useStairs } from '../zustand/useStairs/store';
import { useRoofs } from '../zustand/useRoofs/store';
import { useStrapiAppConfigResolved } from '../zustand/useStrapiAppConfig/requestToLoad';

const getProjectData = () => {
  const { projectName, ...globalSettings } = useGlobalSettings.getState();
  const { walls } = useWalls.getState();
  const { customModels } = useCustomModels.getState();
  const { levels } = useLevels.getState();
  const { spaces } = useSpaces.getState();
  const { stairs } = useStairs.getState();
  const { roofs } = useRoofs.getState();
  const amountCounters = useAmountCounters.getState();

  return {
    projectName,
    globalSettings,
    walls,
    customModels,
    levels,
    spaces,
    amountCounters,
    stairs,
    roofs,
  };
};

export const createProjectDataForSave = async () => {
  const {
    projectName,
    globalSettings,
    walls,
    customModels,
    levels,
    spaces,
    amountCounters,
    stairs,
    roofs,
    ...rest
  } = getProjectData();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type NoExtraData = ShouldBeNever<keyof typeof rest>;

  const screenshot = await takeScreenshot(PositiveInteger(210 * 6));

  const formData = new FormData();
  formData.append('files', screenshot);

  const { id } = await uploadStrapiMedia(formData);
  const { strapiAppConfig } = useStrapiAppConfigResolved.getState();

  return {
    name: projectName,
    image: id,
    data: lzbase62.compress(
      extendedJSON.stringify({
        version: 138,
        projectData: {
          globalSettings: {
            ...globalSettings,
            isOutlinesTurnedOn: strapiAppConfig.enableOutlinesFeature === false ? false : globalSettings.isOutlinesTurnedOn,
          },
          walls,
          customModels,
          levels,
          spaces,
          amountCounters,
          stairs,
          roofs,
        },
      } satisfies Project['data']),
    ),
  };
};

export const createProjectDataForHash = () => {
  const {
    projectName,
    globalSettings,
    walls,
    customModels,
    levels,
    spaces,
    amountCounters,
    stairs,
    roofs,
    ...rest
  } = getProjectData();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type NoExtraData = ShouldBeNever<keyof typeof rest>;

  return {
    projectName,
    amountCounters: (() => {
      const {
        space,
      } = amountCounters;

      return {
        space,
      };
    })(),
    globalSettings: (() => {
      const {
        gridSpacing,
        isGridShown,
        isZoomToSelectionActive,
        isLabelsIn3DShown,
        isRoofsShown,
        isMeasurementsShown1,
        isMeasurementsShown2,
        measurementSystem,
        withLandscapeTextures,
        landscapeTexture,
        withFloorTextures,
        snapToWallEnd,
        snapToWallLine,
        snapToGrid,
        snapToLockedAxis,
        isExteriorWallsShown,
        isInteriorWallsShown,
        isFloorsShown,
        isCeilingsShown,
        isDoorsShown,
        isWindowsShown,
        isCustomModelsShown,
        isSpaceNamesShown,
        isColumnsShown,
        isAssets2DShown,
        isRoofLinesIn2DShown,
        isStairsShown,
        isOutlinesTurnedOn,
        defaultExteriorWallThickness,
        defaultInteriorWallThickness,
        defaultRoof,
        outlinesSettings,
        snapDistanceFactor,
        ...rest
      } = globalSettings;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      type NoExtraData = ShouldBeNever<keyof typeof rest>;

      return {
        gridSpacing,
        isGridShown,
        isZoomToSelectionActive,
        isLabelsIn3DShown,
        isRoofsShown,
        isMeasurementsShown1,
        isMeasurementsShown2,
        measurementSystem,
        withLandscapeTextures,
        landscapeTexture,
        withFloorTextures,
        snapToWallEnd,
        snapToWallLine,
        snapToGrid,
        snapToLockedAxis,
        isExteriorWallsShown,
        isInteriorWallsShown,
        isFloorsShown,
        isCeilingsShown,
        isDoorsShown,
        isWindowsShown,
        isCustomModelsShown,
        isSpaceNamesShown,
        isColumnsShown,
        isAssets2DShown,
        isRoofLinesIn2DShown,
        isStairsShown,
        isOutlinesTurnedOn,
        defaultExteriorWallThickness,
        defaultInteriorWallThickness,
        snapDistanceFactor,
        defaultRoof: (() => {
          const {
            isVisible,
            type,
            ...rest
          } = defaultRoof;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          type NoExtraData = ShouldBeNever<keyof typeof rest>;

          return {
            isVisible,
            type,
          };
        })(),
        outlinesSettings: (() => {
          const {
            depthBias,
            depthMultiplier,
            normalBias,
            normalMultiplier,
            outlineColor,
            debugVisualize,
            ...rest
          } = outlinesSettings;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          type NoExtraData = ShouldBeNever<keyof typeof rest>;

          return {
            depthBias,
            depthMultiplier,
            normalBias,
            normalMultiplier,
            outlineColor,
            debugVisualize,
          };
        })(),
      };
    })(),
    walls: walls.map(({
      id,
      levelId,
      thickness,
      height,
      furnitures,
      frontTexture,
      backTexture,
      commentName,
      commentFrontTextureAppearance,
      commentFrontTextureOverlayColor,
      commentBackTextureAppearance,
      commentBackTextureOverlayColor,
      frontCompositeOperation,
      backCompositeOperation,
      frontSideSpaceId,
      backSideSpaceId,
      isVisible,
      isHidden,
      position: { start, end },
      frontColorOverlay,
      backColorOverlay,
      frontTextureTransform,
      backTextureTransform,
      excludeFromRoofCutting,
      dormerRoofId,
      ...rest
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      type NoExtraData = ShouldBeNever<keyof typeof rest>;

      return {
        id,
        levelId,
        start,
        end,
        frontTexture,
        backTexture,
        commentName,
        commentFrontTextureAppearance,
        commentFrontTextureOverlayColor,
        commentBackTextureAppearance,
        commentBackTextureOverlayColor,
        frontCompositeOperation,
        backCompositeOperation,
        frontSideSpaceId,
        backSideSpaceId,
        isVisible,
        isHidden,
        thickness,
        height,
        frontColorOverlay,
        backColorOverlay,
        frontTextureTransform,
        backTextureTransform,
        excludeFromRoofCutting,
        dormerRoofId,
        furnitures: furnitures.map(({
          id,
          url,
          isFlippedHorizontal,
          isMirrored,
          isHidden,
          onWallCoordinateX,
          onWallCoordinateY,
          type,
          width,
          height,
          depth,
          overrideMaterials,
          ...rest
        }) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          type NoExtraData = ShouldBeNever<keyof typeof rest>;

          return {
            id,
            url,
            isFlippedHorizontal,
            isMirrored,
            isHidden,
            onWallCoordinateX,
            onWallCoordinateY,
            type,
            width,
            height,
            depth,
            overrideMaterials,
          };
        }),
      };
    }),
    customModels: customModels.map(({
      id,
      type,
      levelId,
      url,
      position,
      quaternion,
      width,
      height,
      depth,
      overrideMaterials,
      isFlippedHorizontal,
      isMirrored,
      isHidden,
      commentName,
      transparency,
      tilt,
      location,
      scale,
      appearanceOptionsShown,
      appearanceOptionsExceptionTextureNames,
      ...rest
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      type NoExtraData = ShouldBeNever<keyof typeof rest>;

      return {
        id,
        type,
        levelId,
        url,
        position,
        quaternion,
        width,
        height,
        depth,
        overrideMaterials,
        isFlippedHorizontal,
        isMirrored,
        isHidden,
        commentName,
        transparency,
        tilt,
        location,
        scale,
        appearanceOptionsShown,
        appearanceOptionsExceptionTextureNames,
      };
    }),
    levels: levels.map(({
      id,
      name,
      elevation,
      height,
      isActive,
      isLevelVisible,
      isSemiTransparent,
      ...rest
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      type NoExtraData = ShouldBeNever<keyof typeof rest>;

      return {
        id,
        name,
        elevation,
        height,
        isActive,
        isLevelVisible,
        isSemiTransparent,
      };
    }),
    spaces: spaces.map(({
      id,
      name,
      walls,
      floorData,
      ceilingData,
      roofId,
      dormerRoofId,
      hasUniqueRoof,
      ...rest
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      type NoExtraData = ShouldBeNever<keyof typeof rest>;

      return {
        id,
        name,
        roofId,
        dormerRoofId,
        walls,
        hasUniqueRoof,
        floorData: (() => {
          const {
            isVisible,
            isHidden,
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
            commentTopTextureAppearance,
            commentTopTextureOverlayColor,
            commentBottomTextureAppearance,
            commentBottomTextureOverlayColor,
            commentEdgeTextureAppearance,
            commentEdgeTextureOverlayColor,
            topTextureTransform,
            bottomTextureTransform,
            edgeTextureTransform,
            ...rest
          } = floorData;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          type NoExtraData = ShouldBeNever<keyof typeof rest>;

          return {
            isVisible,
            isHidden,
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
            commentTopTextureAppearance,
            commentTopTextureOverlayColor,
            commentBottomTextureAppearance,
            commentBottomTextureOverlayColor,
            commentEdgeTextureAppearance,
            commentEdgeTextureOverlayColor,
            topTextureTransform,
            bottomTextureTransform,
            edgeTextureTransform,
          };
        })(),
        ceilingData: (() => {
          const {
            isVisible,
            isHidden,
            thickness,
            distanceFromTop,
            commentName,
            topTexture,
            bottomTexture,
            edgeTexture,
            topColorOverlay,
            bottomColorOverlay,
            edgeColorOverlay,
            topCompositeOperation,
            bottomCompositeOperation,
            edgeCompositeOperation,
            commentTopTextureAppearance,
            commentTopTextureOverlayColor,
            commentBottomTextureAppearance,
            commentBottomTextureOverlayColor,
            commentEdgeTextureAppearance,
            commentEdgeTextureOverlayColor,
            topTextureTransform,
            bottomTextureTransform,
            edgeTextureTransform,
            ...rest
          } = ceilingData;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          type NoExtraData = ShouldBeNever<keyof typeof rest>;

          return {
            isVisible,
            isHidden,
            thickness,
            distanceFromTop,
            commentName,
            topTexture,
            bottomTexture,
            edgeTexture,
            topColorOverlay,
            bottomColorOverlay,
            edgeColorOverlay,
            topCompositeOperation,
            bottomCompositeOperation,
            edgeCompositeOperation,
            commentTopTextureAppearance,
            commentTopTextureOverlayColor,
            commentBottomTextureAppearance,
            commentBottomTextureOverlayColor,
            commentEdgeTextureAppearance,
            commentEdgeTextureOverlayColor,
            topTextureTransform,
            bottomTextureTransform,
            edgeTextureTransform,
          };
        })(),
      };
    }),
    roofs: roofs.map(({
      id,
      roofData,
      ...rest
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      type NoExtraData = ShouldBeNever<keyof typeof rest>;

      return {
        id,
        roofData: (() => {
          const {
            isVisible,
            isHidden,
            activeGableIndices,
            isClosedGable,
            heightFromBase,
            overhang,
            hipSlope,
            slantedSlope,
            thickness,
            slantedSlopeOrientation,
            transformableGableToHipRoofParts,
            type,
            commentName,
            topTexture,
            bottomTexture,
            edgeTexture,
            topColorOverlay,
            bottomColorOverlay,
            edgeColorOverlay,
            topCompositeOperation,
            bottomCompositeOperation,
            edgeCompositeOperation,
            commentTopTextureAppearance,
            commentTopTextureOverlayColor,
            commentBottomTextureAppearance,
            commentBottomTextureOverlayColor,
            commentEdgeTextureAppearance,
            commentEdgeTextureOverlayColor,
            topTextureTransform,
            bottomTextureTransform,
            edgeTextureTransform,
            isFlippedWraparound,
            dormers,
            ...rest
          } = roofData;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          type NoExtraData = ShouldBeNever<keyof typeof rest>;

          return {
            isVisible,
            isHidden,
            activeGableIndices,
            isClosedGable,
            heightFromBase,
            overhang,
            hipSlope,
            slantedSlope,
            thickness,
            slantedSlopeOrientation,
            transformableGableToHipRoofParts,
            type,
            commentName,
            topTexture,
            bottomTexture,
            edgeTexture,
            topColorOverlay,
            bottomColorOverlay,
            edgeColorOverlay,
            topCompositeOperation,
            bottomCompositeOperation,
            edgeCompositeOperation,
            commentTopTextureAppearance,
            commentTopTextureOverlayColor,
            commentBottomTextureAppearance,
            commentBottomTextureOverlayColor,
            commentEdgeTextureAppearance,
            commentEdgeTextureOverlayColor,
            topTextureTransform,
            bottomTextureTransform,
            edgeTextureTransform,
            isFlippedWraparound,
            dormers: dormers.map(({
              id,
              type,
              position,
              rotation,
              width,
              height,
              depth,
              isHidden,
              wallIds,
              ...rest
            }) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              type NoExtraData = ShouldBeNever<keyof typeof rest>;

              return {
                id,
                type,
                position,
                rotation,
                width,
                height,
                depth,
                isHidden,
                wallIds,
              };
            }),
          };
        })(),
      };
    }),
    stairs: stairs.map(({
      id,
      levelId,
      position,
      quaternion,
      height,
      supportType,
      type,
      width,
      run,
      rise,
      gapBetweenFlights,
      innerRadius,
      landingLength,
      landingPosition,
      landingType,
      includeTopLanding,
      topLandingRailingOrientation,
      mirror,
      numberOfLandings,
      numberOfWinders,
      outerRadius,
      railingLocation,
      stairConfiguration,
      landings,
      commentName,
      commentStairs,
      commentStringer,
      commentRailings,
      stringerLocations,
      isFlippedHorizontal,
      isMirrored,
      isHidden,
      ...rest
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      type NoExtraData = ShouldBeNever<keyof typeof rest>;

      return {
        id,
        levelId,
        position,
        quaternion,
        height,
        supportType,
        type,
        width,
        run,
        rise,
        gapBetweenFlights,
        innerRadius,
        landingLength,
        landingPosition,
        landingType,
        includeTopLanding,
        topLandingRailingOrientation,
        mirror,
        numberOfLandings,
        numberOfWinders,
        outerRadius,
        stairConfiguration,
        commentName,
        commentStairs,
        commentStringer,
        commentRailings,
        isFlippedHorizontal,
        isMirrored,
        isHidden,
        railingLocation: (() => {
          const {
            left,
            right,
            ...rest
          } = railingLocation;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          type NoExtraData = ShouldBeNever<keyof typeof rest>;

          return {
            left,
            right,
          };
        })(),
        stringerLocations: (() => {
          const {
            left,
            middle,
            right,
            ...rest
          } = stringerLocations;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          type NoExtraData = ShouldBeNever<keyof typeof rest>;

          return {
            left,
            middle,
            right,
          };
        })(),
        landings: isUndefined(landings) ? undefined : {
          lengths: landings.lengths,
          stepsAfter: landings.stepsAfter,
        },
      };
    }),
  };
};
