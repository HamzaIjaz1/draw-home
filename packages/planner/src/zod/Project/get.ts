import { z } from 'zod/v4';
import lzbase62 from 'lzbase62';
import { Quaternion, Vector2, Vector3 } from 'three';
import { isArrayLength } from '@arthurka/ts-utils';
import Color from 'color';
import assert from 'assert';
import { NonNegativeInteger } from '@draw-house/common/dist/brands';
import { strapiAbsoluteUrl } from '@draw-house/common/dist/zod/strapiMedia';
import { stringifiedJsonTransformation } from '../../utils/stringifiedJsonTransformation';
import { customCustomModelId, customLevelId, customNonNegative, customNonNegativeInteger, customPositive, customProjectId, customRoofDormerId, customRoofId, customSpaceId, customStrapiMediaId, customStrapiProjectId, customWallFurnitureId, customWallId } from '../customSchemas';
import { zData } from '../common';
import { TextureAsset } from '../TextureAsset';
import { Stairs } from '../Stairs';
import { compositeOperations } from '../../constants';

const valueV136 = z.strictObject({
  version: z.literal(136),
  projectData: z.strictObject({
    globalSettings: z.strictObject({
      isMeasurementsShown1: z.boolean(),
      isMeasurementsShown2: z.boolean(),
      isSpaceNamesShown: z.boolean(),
      measurementSystem: z.enum(['metric', 'imperial']),
      withLandscapeTextures: z.boolean(),
      landscapeTexture: z.string().nullable(),
      withFloorTextures: z.boolean(),
      gridSpacing: customPositive,

      snapToWallEnd: z.boolean(),
      snapToWallLine: z.boolean(),
      snapToGrid: z.boolean(),
      snapToLockedAxis: z.boolean(),

      isRoofsShown: z.boolean(),
      isGridShown: z.boolean(),
      isZoomToSelectionActive: z.boolean(),
      isLabelsIn3DShown: z.boolean(),
      isExteriorWallsShown: z.boolean(),
      isInteriorWallsShown: z.boolean(),
      isFloorsShown: z.boolean(),
      isCeilingsShown: z.boolean(),
      isDoorsShown: z.boolean(),
      isWindowsShown: z.boolean(),
      isCustomModelsShown: z.boolean(),
      isAssets2DShown: z.boolean(),
      isRoofLinesIn2DShown: z.boolean(),
      isColumnsShown: z.boolean(),
      isStairsShown: z.boolean(),
      isOutlinesTurnedOn: z.boolean(),
      defaultExteriorWallThickness: customPositive,
      defaultInteriorWallThickness: customPositive,
      snapDistanceFactor: customPositive,
      outlinesSettings: z.strictObject({
        depthBias: z.number(),
        depthMultiplier: z.number(),
        normalBias: z.number(),
        normalMultiplier: z.number(),
        outlineColor: z.string(),
        debugVisualize: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
      }),

      defaultRoof: z.strictObject({
        isVisible: z.boolean(),
        type: z.enum(['hip', 'hip-with-all-gable-corners', 'flat', 'slanted', 'wraparound']),
      }),
    }),
    walls: z.array(
      z.strictObject({
        id: customWallId,
        levelId: customLevelId,
        position: z.strictObject({
          start: z.instanceof(Vector2),
          end: z.instanceof(Vector2),
        }),
        frontSideSpaceId: customSpaceId.nullable(),
        backSideSpaceId: customSpaceId.nullable(),
        frontTexture: TextureAsset,
        backTexture: TextureAsset,
        frontTextureTransform: z.object({
          wScale: z.number().gte(0.01).default(1),
          lScale: z.number().gte(0.01).default(1),
          rotateDeg: z.number().default(0),
        }).optional(),
        backTextureTransform: z.object({
          wScale: z.number().gte(0.01).default(1),
          lScale: z.number().gte(0.01).default(1),
          rotateDeg: z.number().default(0),
        }).optional(),
        frontColorOverlay: z.strictObject({
          type: z.enum(['spectrum', 'predefined']),
          value: z.instanceof(Color),
        }).nullable(),
        backColorOverlay: z.strictObject({
          type: z.enum(['spectrum', 'predefined']),
          value: z.instanceof(Color),
        }).nullable(),
        frontCompositeOperation: z.enum(compositeOperations),
        backCompositeOperation: z.enum(compositeOperations),
        isVisible: z.boolean(),
        isHidden: z.boolean(),
        thickness: customPositive,
        height: customPositive.nullable(),
        commentName: z.string(),
        commentFrontTextureAppearance: z.string(),
        commentFrontTextureOverlayColor: z.string(),
        commentBackTextureAppearance: z.string(),
        commentBackTextureOverlayColor: z.string(),
        furnitures: z.array(
          z.strictObject({
            type: z.enum(['door', 'window']),
            id: customWallFurnitureId,
            onWallCoordinateX: z.number(),
            onWallCoordinateY: customNonNegative,
            isFlippedHorizontal: z.boolean(),
            isMirrored: z.boolean(),
            isHidden: z.boolean(),
            url: z.url(),
            width: customPositive.nullable(),
            height: customPositive.nullable(),
            depth: customPositive.nullable(),
            overrideMaterials: z.record(z.string(), z.strictObject({
              texture: TextureAsset,
              colorOverlay: z.strictObject({
                type: z.enum(['spectrum', 'predefined']),
                value: z.instanceof(Color),
              }).nullable(),
              compositeOperation: z.enum(compositeOperations),
              commentTextureAppearance: z.string(),
              commentTextureOverlayColor: z.string(),
              textureTransform: z.object({
                wScale: z.number().gte(0.01).default(1),
                lScale: z.number().gte(0.01).default(1),
                rotateDeg: z.number().default(0),
              }).optional(),
            })).nullable(),
          }),
        ),
      }),
    ),
    customModels: z.array(
      z.intersection(
        z.object({
          id: customCustomModelId,
          url: z.url(),
          position: z.instanceof(Vector3),
          quaternion: z.instanceof(Quaternion),
          levelId: customLevelId,
          commentName: z.string(),
        }),
        z.union([
          z.object({
            type: z.enum(['regular', 'column']),
            width: customPositive.nullable(),
            height: customPositive.nullable(),
            depth: customPositive.nullable(),
            isFlippedHorizontal: z.boolean(),
            isMirrored: z.boolean(),
            isHidden: z.boolean(),
            appearanceOptionsShown: z.boolean(),
            appearanceOptionsExceptionTextureNames: z.array(z.string()),
            overrideMaterials: z.record(z.string(), z.strictObject({
              texture: TextureAsset,
              colorOverlay: z.strictObject({
                type: z.enum(['spectrum', 'predefined']),
                value: z.instanceof(Color),
              }).nullable(),
              compositeOperation: z.enum(compositeOperations),
              commentTextureAppearance: z.string(),
              commentTextureOverlayColor: z.string(),
              textureTransform: z.object({
                wScale: z.number().gte(0.01).default(1),
                lScale: z.number().gte(0.01).default(1),
                rotateDeg: z.number().default(0),
              }).optional(),
            })).nullable(),
          }),
          z.object({
            type: z.literal('asset-2d'),
            scale: customPositive,
            transparency: z.number(),
            tilt: z.number(),
            location: z.enum(['background', 'foreground']),
          }),
        ]),
      ),
    ),
    levels: (
      z
        .array(
          z.strictObject({
            id: customLevelId,
            name: z.string(),
            elevation: z.number(),
            height: customPositive,
            isActive: z.boolean(),
            isLevelVisible: z.boolean(),
            isSemiTransparent: z.boolean(),
          }),
        )
        .transform(e => {
          assert(isArrayLength(e, '>=', 1), 'This should never happen. |2q591m|');

          return e;
        })
    ),
    spaces: z.array(
      z.strictObject({
        id: customSpaceId,
        name: z.string(),
        roofId: customRoofId,
        walls: z.array(customWallId),
        hasUniqueRoof: z.boolean(),
        floorData: z.strictObject({
          isVisible: z.boolean(),
          isHidden: z.boolean(),
          thickness: customPositive,
          topTexture: TextureAsset,
          bottomTexture: TextureAsset,
          edgeTexture: TextureAsset,
          topColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          bottomColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          edgeColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          topCompositeOperation: z.enum(compositeOperations),
          bottomCompositeOperation: z.enum(compositeOperations),
          edgeCompositeOperation: z.enum(compositeOperations),
          commentTopTextureAppearance: z.string(),
          commentTopTextureOverlayColor: z.string(),
          commentBottomTextureAppearance: z.string(),
          commentBottomTextureOverlayColor: z.string(),
          commentEdgeTextureAppearance: z.string(),
          commentEdgeTextureOverlayColor: z.string(),
          topTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          bottomTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          edgeTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
        }),
        ceilingData: z.strictObject({
          isVisible: z.boolean(),
          isHidden: z.boolean(),
          thickness: customPositive,
          distanceFromTop: z.number(),
          commentName: z.string(),
          topTexture: TextureAsset,
          bottomTexture: TextureAsset,
          edgeTexture: TextureAsset,
          topColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          bottomColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          edgeColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          topCompositeOperation: z.enum(compositeOperations),
          bottomCompositeOperation: z.enum(compositeOperations),
          edgeCompositeOperation: z.enum(compositeOperations),
          commentTopTextureAppearance: z.string(),
          commentTopTextureOverlayColor: z.string(),
          commentBottomTextureAppearance: z.string(),
          commentBottomTextureOverlayColor: z.string(),
          commentEdgeTextureAppearance: z.string(),
          commentEdgeTextureOverlayColor: z.string(),
          topTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          bottomTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          edgeTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
        }),
      }),
    ),
    roofs: z.array(
      z.strictObject({
        id: customRoofId,
        roofData: z.strictObject({
          isVisible: z.boolean(),
          isHidden: z.boolean(),
          type: z.enum(['hip', 'flat', 'slanted', 'wraparound']),
          isClosedGable: z.boolean(),
          overhang: z.number(),
          heightFromBase: z.number(),
          hipSlope: z.number(),
          thickness: customPositive,
          slantedSlope: z.number(),
          slantedSlopeOrientation: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
          activeGableIndices: z.array(z.number()),
          commentName: z.string(),
          topTexture: TextureAsset,
          bottomTexture: TextureAsset,
          edgeTexture: TextureAsset,
          topColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          bottomColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          edgeColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          topCompositeOperation: z.enum(compositeOperations),
          bottomCompositeOperation: z.enum(compositeOperations),
          edgeCompositeOperation: z.enum(compositeOperations),
          commentTopTextureAppearance: z.string(),
          commentTopTextureOverlayColor: z.string(),
          commentBottomTextureAppearance: z.string(),
          commentBottomTextureOverlayColor: z.string(),
          commentEdgeTextureAppearance: z.string(),
          commentEdgeTextureOverlayColor: z.string(),
          topTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          bottomTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          edgeTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          isFlippedWraparound: z.boolean(),
          transformableGableToHipRoofParts: z.array(
            z.strictObject({
              index: z.number(),
              part: z.array(z.instanceof(Vector3)).transform(e => {
                assert(isArrayLength(e, '===', 3), 'This should never happen. |zq0rlb|');

                return e;
              }),
            }),
          ),
          dormers: z.array(
            z.strictObject({
              id: customRoofDormerId,
              type: z.enum(['gable', 'hip', 'shed']),
              position: z.instanceof(Vector3),
              rotation: z.instanceof(Quaternion),
              width: customPositive,
              height: customPositive,
              depth: customPositive,
              isHidden: z.boolean(),
            }),
          ),
        }),
      }),
    ),
    spaceIdCounter: customNonNegativeInteger,
    stairs: Stairs,
  }),
});
const valueV137 = z.strictObject({
  version: z.literal(137),
  projectData: z.strictObject({
    globalSettings: z.strictObject({
      isMeasurementsShown1: z.boolean(),
      isMeasurementsShown2: z.boolean(),
      isSpaceNamesShown: z.boolean(),
      measurementSystem: z.enum(['metric', 'imperial']),
      withLandscapeTextures: z.boolean(),
      landscapeTexture: z.string().nullable(),
      withFloorTextures: z.boolean(),
      gridSpacing: customPositive,

      snapToWallEnd: z.boolean(),
      snapToWallLine: z.boolean(),
      snapToGrid: z.boolean(),
      snapToLockedAxis: z.boolean(),

      isRoofsShown: z.boolean(),
      isGridShown: z.boolean(),
      isZoomToSelectionActive: z.boolean(),
      isLabelsIn3DShown: z.boolean(),
      isExteriorWallsShown: z.boolean(),
      isInteriorWallsShown: z.boolean(),
      isFloorsShown: z.boolean(),
      isCeilingsShown: z.boolean(),
      isDoorsShown: z.boolean(),
      isWindowsShown: z.boolean(),
      isCustomModelsShown: z.boolean(),
      isAssets2DShown: z.boolean(),
      isRoofLinesIn2DShown: z.boolean(),
      isColumnsShown: z.boolean(),
      isStairsShown: z.boolean(),
      isOutlinesTurnedOn: z.boolean(),
      defaultExteriorWallThickness: customPositive,
      defaultInteriorWallThickness: customPositive,
      snapDistanceFactor: customPositive,
      outlinesSettings: z.strictObject({
        depthBias: z.number(),
        depthMultiplier: z.number(),
        normalBias: z.number(),
        normalMultiplier: z.number(),
        outlineColor: z.string(),
        debugVisualize: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
      }),

      defaultRoof: z.strictObject({
        isVisible: z.boolean(),
        type: z.enum(['hip', 'hip-with-all-gable-corners', 'flat', 'slanted', 'wraparound']),
      }),
    }),
    walls: z.array(
      z.strictObject({
        id: customWallId,
        levelId: customLevelId,
        position: z.strictObject({
          start: z.instanceof(Vector2),
          end: z.instanceof(Vector2),
        }),
        frontSideSpaceId: customSpaceId.nullable(),
        backSideSpaceId: customSpaceId.nullable(),
        frontTexture: TextureAsset,
        backTexture: TextureAsset,
        frontTextureTransform: z.object({
          wScale: z.number().gte(0.01).default(1),
          lScale: z.number().gte(0.01).default(1),
          rotateDeg: z.number().default(0),
        }).optional(),
        backTextureTransform: z.object({
          wScale: z.number().gte(0.01).default(1),
          lScale: z.number().gte(0.01).default(1),
          rotateDeg: z.number().default(0),
        }).optional(),
        frontColorOverlay: z.strictObject({
          type: z.enum(['spectrum', 'predefined']),
          value: z.instanceof(Color),
        }).nullable(),
        backColorOverlay: z.strictObject({
          type: z.enum(['spectrum', 'predefined']),
          value: z.instanceof(Color),
        }).nullable(),
        frontCompositeOperation: z.enum(compositeOperations),
        backCompositeOperation: z.enum(compositeOperations),
        isVisible: z.boolean(),
        isHidden: z.boolean(),
        thickness: customPositive,
        height: customPositive.nullable(),
        commentName: z.string(),
        commentFrontTextureAppearance: z.string(),
        commentFrontTextureOverlayColor: z.string(),
        commentBackTextureAppearance: z.string(),
        commentBackTextureOverlayColor: z.string(),
        furnitures: z.array(
          z.strictObject({
            type: z.enum(['door', 'window']),
            id: customWallFurnitureId,
            onWallCoordinateX: z.number(),
            onWallCoordinateY: customNonNegative,
            isFlippedHorizontal: z.boolean(),
            isMirrored: z.boolean(),
            isHidden: z.boolean(),
            url: z.url(),
            width: customPositive.nullable(),
            height: customPositive.nullable(),
            depth: customPositive.nullable(),
            overrideMaterials: z.record(z.string(), z.strictObject({
              texture: TextureAsset,
              colorOverlay: z.strictObject({
                type: z.enum(['spectrum', 'predefined']),
                value: z.instanceof(Color),
              }).nullable(),
              compositeOperation: z.enum(compositeOperations),
              commentTextureAppearance: z.string(),
              commentTextureOverlayColor: z.string(),
              textureTransform: z.object({
                wScale: z.number().gte(0.01).default(1),
                lScale: z.number().gte(0.01).default(1),
                rotateDeg: z.number().default(0),
              }).optional(),
            })).nullable(),
          }),
        ),
      }),
    ),
    customModels: z.array(
      z.intersection(
        z.object({
          id: customCustomModelId,
          url: z.url(),
          position: z.instanceof(Vector3),
          quaternion: z.instanceof(Quaternion),
          levelId: customLevelId,
          commentName: z.string(),
        }),
        z.union([
          z.object({
            type: z.enum(['regular', 'column']),
            width: customPositive.nullable(),
            height: customPositive.nullable(),
            depth: customPositive.nullable(),
            isFlippedHorizontal: z.boolean(),
            isMirrored: z.boolean(),
            isHidden: z.boolean(),
            appearanceOptionsShown: z.boolean(),
            appearanceOptionsExceptionTextureNames: z.array(z.string()),
            overrideMaterials: z.record(z.string(), z.strictObject({
              texture: TextureAsset,
              colorOverlay: z.strictObject({
                type: z.enum(['spectrum', 'predefined']),
                value: z.instanceof(Color),
              }).nullable(),
              compositeOperation: z.enum(compositeOperations),
              commentTextureAppearance: z.string(),
              commentTextureOverlayColor: z.string(),
              textureTransform: z.object({
                wScale: z.number().gte(0.01).default(1),
                lScale: z.number().gte(0.01).default(1),
                rotateDeg: z.number().default(0),
              }).optional(),
            })).nullable(),
          }),
          z.object({
            type: z.literal('asset-2d'),
            scale: customPositive,
            transparency: z.number(),
            tilt: z.number(),
            location: z.enum(['background', 'foreground']),
          }),
        ]),
      ),
    ),
    levels: (
      z
        .array(
          z.strictObject({
            id: customLevelId,
            name: z.string(),
            elevation: z.number(),
            height: customPositive,
            isActive: z.boolean(),
            isLevelVisible: z.boolean(),
            isSemiTransparent: z.boolean(),
          }),
        )
        .transform(e => {
          assert(isArrayLength(e, '>=', 1), 'This should never happen. |g74glq|');

          return e;
        })
    ),
    spaces: z.array(
      z.strictObject({
        id: customSpaceId,
        name: z.string(),
        roofId: customRoofId,
        walls: z.array(customWallId),
        hasUniqueRoof: z.boolean(),
        floorData: z.strictObject({
          isVisible: z.boolean(),
          isHidden: z.boolean(),
          thickness: customPositive,
          topTexture: TextureAsset,
          bottomTexture: TextureAsset,
          edgeTexture: TextureAsset,
          topColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          bottomColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          edgeColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          topCompositeOperation: z.enum(compositeOperations),
          bottomCompositeOperation: z.enum(compositeOperations),
          edgeCompositeOperation: z.enum(compositeOperations),
          commentTopTextureAppearance: z.string(),
          commentTopTextureOverlayColor: z.string(),
          commentBottomTextureAppearance: z.string(),
          commentBottomTextureOverlayColor: z.string(),
          commentEdgeTextureAppearance: z.string(),
          commentEdgeTextureOverlayColor: z.string(),
          topTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          bottomTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          edgeTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
        }),
        ceilingData: z.strictObject({
          isVisible: z.boolean(),
          isHidden: z.boolean(),
          thickness: customPositive,
          distanceFromTop: z.number(),
          commentName: z.string(),
          topTexture: TextureAsset,
          bottomTexture: TextureAsset,
          edgeTexture: TextureAsset,
          topColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          bottomColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          edgeColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          topCompositeOperation: z.enum(compositeOperations),
          bottomCompositeOperation: z.enum(compositeOperations),
          edgeCompositeOperation: z.enum(compositeOperations),
          commentTopTextureAppearance: z.string(),
          commentTopTextureOverlayColor: z.string(),
          commentBottomTextureAppearance: z.string(),
          commentBottomTextureOverlayColor: z.string(),
          commentEdgeTextureAppearance: z.string(),
          commentEdgeTextureOverlayColor: z.string(),
          topTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          bottomTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          edgeTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
        }),
      }),
    ),
    roofs: z.array(
      z.strictObject({
        id: customRoofId,
        roofData: z.strictObject({
          isVisible: z.boolean(),
          isHidden: z.boolean(),
          type: z.enum(['hip', 'flat', 'slanted', 'wraparound']),
          isClosedGable: z.boolean(),
          overhang: z.number(),
          heightFromBase: z.number(),
          hipSlope: z.number(),
          thickness: customPositive,
          slantedSlope: z.number(),
          slantedSlopeOrientation: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
          activeGableIndices: z.array(z.number()),
          commentName: z.string(),
          topTexture: TextureAsset,
          bottomTexture: TextureAsset,
          edgeTexture: TextureAsset,
          topColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          bottomColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          edgeColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          topCompositeOperation: z.enum(compositeOperations),
          bottomCompositeOperation: z.enum(compositeOperations),
          edgeCompositeOperation: z.enum(compositeOperations),
          commentTopTextureAppearance: z.string(),
          commentTopTextureOverlayColor: z.string(),
          commentBottomTextureAppearance: z.string(),
          commentBottomTextureOverlayColor: z.string(),
          commentEdgeTextureAppearance: z.string(),
          commentEdgeTextureOverlayColor: z.string(),
          topTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          bottomTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          edgeTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          isFlippedWraparound: z.boolean(),
          transformableGableToHipRoofParts: z.array(
            z.strictObject({
              index: z.number(),
              part: z.array(z.instanceof(Vector3)).transform(e => {
                assert(isArrayLength(e, '===', 3), 'This should never happen. |3i876x|');

                return e;
              }),
            }),
          ),
          dormers: z.array(
            z.strictObject({
              id: customRoofDormerId,
              type: z.enum(['gable', 'hip', 'shed']),
              position: z.instanceof(Vector3),
              rotation: z.instanceof(Quaternion),
              width: customPositive,
              height: customPositive,
              depth: customPositive,
              isHidden: z.boolean(),
            }),
          ),
        }),
      }),
    ),
    amountCounters: z.strictObject({
      space: customNonNegativeInteger,
      roof: customNonNegativeInteger,
      wall: customNonNegativeInteger,
      ceiling: customNonNegativeInteger,
      stair: customNonNegativeInteger,
    }),
    stairs: Stairs,
  }),
});
const valueV138 = z.strictObject({
  version: z.literal(138),
  projectData: z.strictObject({
    globalSettings: z.strictObject({
      isMeasurementsShown1: z.boolean(),
      isMeasurementsShown2: z.boolean(),
      isSpaceNamesShown: z.boolean(),
      measurementSystem: z.enum(['metric', 'imperial']),
      withLandscapeTextures: z.boolean(),
      landscapeTexture: z.string().nullable(),
      withFloorTextures: z.boolean(),
      gridSpacing: customPositive,

      snapToWallEnd: z.boolean(),
      snapToWallLine: z.boolean(),
      snapToGrid: z.boolean(),
      snapToLockedAxis: z.boolean(),

      isRoofsShown: z.boolean(),
      isGridShown: z.boolean(),
      isZoomToSelectionActive: z.boolean(),
      isLabelsIn3DShown: z.boolean(),
      isExteriorWallsShown: z.boolean(),
      isInteriorWallsShown: z.boolean(),
      isFloorsShown: z.boolean(),
      isCeilingsShown: z.boolean(),
      isDoorsShown: z.boolean(),
      isWindowsShown: z.boolean(),
      isCustomModelsShown: z.boolean(),
      isAssets2DShown: z.boolean(),
      isRoofLinesIn2DShown: z.boolean(),
      isColumnsShown: z.boolean(),
      isStairsShown: z.boolean(),
      isOutlinesTurnedOn: z.boolean(),
      defaultExteriorWallThickness: customPositive,
      defaultInteriorWallThickness: customPositive,
      snapDistanceFactor: customPositive,
      outlinesSettings: z.strictObject({
        depthBias: z.number(),
        depthMultiplier: z.number(),
        normalBias: z.number(),
        normalMultiplier: z.number(),
        outlineColor: z.string(),
        debugVisualize: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
      }),

      defaultRoof: z.strictObject({
        isVisible: z.boolean(),
        type: z.enum(['hip', 'hip-with-all-gable-corners', 'flat', 'slanted', 'wraparound']),
      }),
    }),
    walls: z.array(
      z.strictObject({
        id: customWallId,
        levelId: customLevelId,
        position: z.strictObject({
          start: z.instanceof(Vector2),
          end: z.instanceof(Vector2),
        }),
        frontSideSpaceId: customSpaceId.nullable(),
        backSideSpaceId: customSpaceId.nullable(),
        frontTexture: TextureAsset,
        backTexture: TextureAsset,
        frontTextureTransform: z.object({
          wScale: z.number().gte(0.01).default(1),
          lScale: z.number().gte(0.01).default(1),
          rotateDeg: z.number().default(0),
        }).optional(),
        backTextureTransform: z.object({
          wScale: z.number().gte(0.01).default(1),
          lScale: z.number().gte(0.01).default(1),
          rotateDeg: z.number().default(0),
        }).optional(),
        frontColorOverlay: z.strictObject({
          type: z.enum(['spectrum', 'predefined']),
          value: z.instanceof(Color),
        }).nullable(),
        backColorOverlay: z.strictObject({
          type: z.enum(['spectrum', 'predefined']),
          value: z.instanceof(Color),
        }).nullable(),
        frontCompositeOperation: z.enum(compositeOperations),
        backCompositeOperation: z.enum(compositeOperations),
        isVisible: z.boolean(),
        isHidden: z.boolean(),
        thickness: customPositive,
        height: customPositive.nullable(),
        commentName: z.string(),
        commentFrontTextureAppearance: z.string(),
        commentFrontTextureOverlayColor: z.string(),
        commentBackTextureAppearance: z.string(),
        commentBackTextureOverlayColor: z.string(),
        excludeFromRoofCutting: z.boolean(),
        dormerRoofId: customRoofDormerId.nullable(),
        furnitures: z.array(
          z.strictObject({
            type: z.enum(['door', 'window']),
            id: customWallFurnitureId,
            onWallCoordinateX: z.number(),
            onWallCoordinateY: customNonNegative,
            isFlippedHorizontal: z.boolean(),
            isMirrored: z.boolean(),
            isHidden: z.boolean(),
            url: z.url(),
            width: customPositive.nullable(),
            height: customPositive.nullable(),
            depth: customPositive.nullable(),
            overrideMaterials: z.record(z.string(), z.strictObject({
              texture: TextureAsset,
              colorOverlay: z.strictObject({
                type: z.enum(['spectrum', 'predefined']),
                value: z.instanceof(Color),
              }).nullable(),
              compositeOperation: z.enum(compositeOperations),
              commentTextureAppearance: z.string(),
              commentTextureOverlayColor: z.string(),
              textureTransform: z.object({
                wScale: z.number().gte(0.01).default(1),
                lScale: z.number().gte(0.01).default(1),
                rotateDeg: z.number().default(0),
              }).optional(),
            })).nullable(),
          }),
        ),
      }),
    ),
    customModels: z.array(
      z.intersection(
        z.object({
          id: customCustomModelId,
          url: z.url(),
          position: z.instanceof(Vector3),
          quaternion: z.instanceof(Quaternion),
          levelId: customLevelId,
          commentName: z.string(),
        }),
        z.union([
          z.object({
            type: z.enum(['regular', 'column']),
            width: customPositive.nullable(),
            height: customPositive.nullable(),
            depth: customPositive.nullable(),
            isFlippedHorizontal: z.boolean(),
            isMirrored: z.boolean(),
            isHidden: z.boolean(),
            appearanceOptionsShown: z.boolean(),
            appearanceOptionsExceptionTextureNames: z.array(z.string()),
            overrideMaterials: z.record(z.string(), z.strictObject({
              texture: TextureAsset,
              colorOverlay: z.strictObject({
                type: z.enum(['spectrum', 'predefined']),
                value: z.instanceof(Color),
              }).nullable(),
              compositeOperation: z.enum(compositeOperations),
              commentTextureAppearance: z.string(),
              commentTextureOverlayColor: z.string(),
              textureTransform: z.object({
                wScale: z.number().gte(0.01).default(1),
                lScale: z.number().gte(0.01).default(1),
                rotateDeg: z.number().default(0),
              }).optional(),
            })).nullable(),
          }),
          z.object({
            type: z.literal('asset-2d'),
            scale: customPositive,
            transparency: z.number(),
            tilt: z.number(),
            location: z.enum(['background', 'foreground']),
          }),
        ]),
      ),
    ),
    levels: (
      z
        .array(
          z.strictObject({
            id: customLevelId,
            name: z.string(),
            elevation: z.number(),
            height: customPositive,
            isActive: z.boolean(),
            isLevelVisible: z.boolean(),
            isSemiTransparent: z.boolean(),
          }),
        )
        .transform(e => {
          assert(isArrayLength(e, '>=', 1), 'This should never happen. |r7bz20|');

          return e;
        })
    ),
    spaces: z.array(
      z.strictObject({
        id: customSpaceId,
        name: z.string(),
        roofId: customRoofId,
        walls: z.array(customWallId),
        hasUniqueRoof: z.boolean(),
        dormerRoofId: customRoofDormerId.nullable(),
        floorData: z.strictObject({
          isVisible: z.boolean(),
          isHidden: z.boolean(),
          thickness: customPositive,
          topTexture: TextureAsset,
          bottomTexture: TextureAsset,
          edgeTexture: TextureAsset,
          topColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          bottomColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          edgeColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          topCompositeOperation: z.enum(compositeOperations),
          bottomCompositeOperation: z.enum(compositeOperations),
          edgeCompositeOperation: z.enum(compositeOperations),
          commentTopTextureAppearance: z.string(),
          commentTopTextureOverlayColor: z.string(),
          commentBottomTextureAppearance: z.string(),
          commentBottomTextureOverlayColor: z.string(),
          commentEdgeTextureAppearance: z.string(),
          commentEdgeTextureOverlayColor: z.string(),
          topTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          bottomTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          edgeTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
        }),
        ceilingData: z.strictObject({
          isVisible: z.boolean(),
          isHidden: z.boolean(),
          thickness: customPositive,
          distanceFromTop: z.number(),
          commentName: z.string(),
          topTexture: TextureAsset,
          bottomTexture: TextureAsset,
          edgeTexture: TextureAsset,
          topColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          bottomColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          edgeColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          topCompositeOperation: z.enum(compositeOperations),
          bottomCompositeOperation: z.enum(compositeOperations),
          edgeCompositeOperation: z.enum(compositeOperations),
          commentTopTextureAppearance: z.string(),
          commentTopTextureOverlayColor: z.string(),
          commentBottomTextureAppearance: z.string(),
          commentBottomTextureOverlayColor: z.string(),
          commentEdgeTextureAppearance: z.string(),
          commentEdgeTextureOverlayColor: z.string(),
          topTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          bottomTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          edgeTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
        }),
      }),
    ),
    roofs: z.array(
      z.strictObject({
        id: customRoofId,
        roofData: z.strictObject({
          isVisible: z.boolean(),
          isHidden: z.boolean(),
          type: z.enum(['hip', 'flat', 'slanted', 'wraparound']),
          isClosedGable: z.boolean(),
          overhang: z.number(),
          heightFromBase: z.number(),
          hipSlope: z.number(),
          thickness: customPositive,
          slantedSlope: z.number(),
          slantedSlopeOrientation: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
          activeGableIndices: z.array(z.number()),
          commentName: z.string(),
          topTexture: TextureAsset,
          bottomTexture: TextureAsset,
          edgeTexture: TextureAsset,
          topColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          bottomColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          edgeColorOverlay: z.strictObject({
            type: z.enum(['spectrum', 'predefined']),
            value: z.instanceof(Color),
          }).nullable(),
          topCompositeOperation: z.enum(compositeOperations),
          bottomCompositeOperation: z.enum(compositeOperations),
          edgeCompositeOperation: z.enum(compositeOperations),
          commentTopTextureAppearance: z.string(),
          commentTopTextureOverlayColor: z.string(),
          commentBottomTextureAppearance: z.string(),
          commentBottomTextureOverlayColor: z.string(),
          commentEdgeTextureAppearance: z.string(),
          commentEdgeTextureOverlayColor: z.string(),
          topTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          bottomTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          edgeTextureTransform: z.object({
            wScale: z.number().gte(0.01).default(1),
            lScale: z.number().gte(0.01).default(1),
            rotateDeg: z.number().default(0),
          }).optional(),
          isFlippedWraparound: z.boolean(),
          transformableGableToHipRoofParts: z.array(
            z.strictObject({
              index: z.number(),
              part: z.array(z.instanceof(Vector3)).transform(e => {
                assert(isArrayLength(e, '===', 3), 'This should never happen. |kb4ruw|');

                return e;
              }),
            }),
          ),
          dormers: z.array(
            z.strictObject({
              id: customRoofDormerId,
              type: z.enum(['gable', 'hip', 'shed']),
              position: z.instanceof(Vector3),
              rotation: z.instanceof(Quaternion),
              width: customPositive,
              height: customPositive,
              depth: customPositive,
              isHidden: z.boolean(),
              wallIds: z.array(customWallId).nullable(),
            }),
          ),
        }),
      }),
    ),
    amountCounters: z.strictObject({
      space: customNonNegativeInteger,
      roof: customNonNegativeInteger,
      wall: customNonNegativeInteger,
      ceiling: customNonNegativeInteger,
      stair: customNonNegativeInteger,
    }),
    stairs: Stairs,
  }),
});

const data = (
  z.union([
    valueV136,
    valueV137,
    valueV138,
  ])
    .transform(e => {
      if(e.version !== 136) {
        return e;
      }

      const { spaceIdCounter, ...projectData } = e.projectData;

      return ((e: z.infer<typeof valueV137>) => e)({
        version: 137,
        projectData: {
          ...projectData,
          amountCounters: {
            space: spaceIdCounter,
            roof: NonNegativeInteger(0),
            wall: NonNegativeInteger(0),
            ceiling: NonNegativeInteger(0),
            stair: NonNegativeInteger(0),
          },
        },
      });
    })
    .transform(e => {
      if(e.version !== 137) {
        return e;
      }

      return ((e: z.infer<typeof valueV138>) => e)({
        version: 138,
        projectData: {
          ...e.projectData,
          walls: e.projectData.walls.map((e): z.infer<typeof valueV138>['projectData']['walls'][number] => ({
            ...e,
            excludeFromRoofCutting: false,
            dormerRoofId: null,
          })),
          spaces: e.projectData.spaces.map((e): z.infer<typeof valueV138>['projectData']['spaces'][number] => ({
            ...e,
            dormerRoofId: null,
          })),
          roofs: e.projectData.roofs.map(e => ({
            ...e,
            roofData: {
              ...e.roofData,
              dormers: e.roofData.dormers.map((e): z.infer<typeof valueV138>['projectData']['roofs'][number]['roofData']['dormers'][number] => ({
                ...e,
                wallIds: null,
              })),
            },
          })),
        },
      });
    })
);

export const Project = z.object({
  id: customStrapiProjectId,
  projectId: customProjectId,
  name: z.string(),
  image: (
    z
      .object({
        id: customStrapiMediaId,
        url: strapiAbsoluteUrl,
      })
      .transform(({ url }) => url)
      .nullable()
  ),
  data: (
    z.string()
      .transform(e => lzbase62.decompress(e))
      .transform(stringifiedJsonTransformation(data))
  ),
});
export type Project = z.infer<typeof Project>;

const ProjectWithoutData = Project.omit({ data: true });
export type ProjectWithoutData = z.infer<typeof ProjectWithoutData>;

export const ProjectWithoutDataRouteResponse = zData(z.array(ProjectWithoutData));
