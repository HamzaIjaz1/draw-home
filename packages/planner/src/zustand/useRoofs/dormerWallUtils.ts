import { Vector2, Vector3 } from 'three';
import { NonNegative, Positive, RoofDormerId, WallFurnitureId, WallId } from '@draw-house/common/dist/brands';
import { generateUUID } from '@draw-house/common/dist/utils/helpers';
import { useWalls, WallsStore } from '../useWalls/store';
import { useStrapiAppConfigResolved } from '../useStrapiAppConfig';

export const WINDOW_OFFSET_FROM_DORMER_ROOF = 1.1;

export const createDormerWalls = (
  debugPoints: {
    leftFrontTop: Vector3;
    rightFrontTop: Vector3;
    leftBackProjected: Vector3;
    rightBackProjected: Vector3;
  },
  levelId: WallsStore['walls'][number]['levelId'],
  dormerRoofId: RoofDormerId,
): WallId[] => {
  const { strapiAppConfig } = useStrapiAppConfigResolved.getState();
  const { walls } = useWalls.getState();

  const defaultTexture = strapiAppConfig.defaultTexturePalette.wallTextureFront;
  const defaultWindowModel = strapiAppConfig.defaultWindowModels[0];
  const wallHeight = Positive(10);

  const windowYPosition = NonNegative(
    debugPoints.leftFrontTop.y - WINDOW_OFFSET_FROM_DORMER_ROOF,
  );

  const newWalls: WallsStore['walls'] = [
    {
      id: WallId(generateUUID()),
      levelId,
      position: {
        start: new Vector2(debugPoints.leftFrontTop.x, debugPoints.leftFrontTop.z),
        end: new Vector2(debugPoints.rightFrontTop.x, debugPoints.rightFrontTop.z),
      },
      frontSideSpaceId: null,
      backSideSpaceId: null,
      frontTexture: defaultTexture,
      backTexture: defaultTexture,
      frontColorOverlay: null,
      backColorOverlay: null,
      frontCompositeOperation: 'source-over',
      backCompositeOperation: 'source-over',
      isVisible: true,
      isHidden: false,
      thickness: Positive(0.2),
      height: wallHeight,
      excludeFromRoofCutting: true,
      dormerRoofId,
      commentName: '',
      commentFrontTextureAppearance: '',
      commentFrontTextureOverlayColor: '',
      commentBackTextureAppearance: '',
      commentBackTextureOverlayColor: '',
      furnitures: [
        {
          type: 'window',
          id: WallFurnitureId(generateUUID()),
          onWallCoordinateX: 0.03,
          onWallCoordinateY: windowYPosition,
          isFlippedHorizontal: false,
          isMirrored: false,
          isHidden: false,
          url: defaultWindowModel.url,
          width: null,
          height: null,
          depth: null,
          overrideMaterials: null,
        },
      ],
    },
    {
      id: WallId(generateUUID()),
      levelId,
      position: {
        start: new Vector2(debugPoints.rightFrontTop.x, debugPoints.rightFrontTop.z),
        end: new Vector2(debugPoints.rightBackProjected.x, debugPoints.rightBackProjected.z),
      },
      frontSideSpaceId: null,
      backSideSpaceId: null,
      frontTexture: defaultTexture,
      backTexture: defaultTexture,
      frontColorOverlay: null,
      backColorOverlay: null,
      frontCompositeOperation: 'source-over',
      backCompositeOperation: 'source-over',
      isVisible: true,
      isHidden: false,
      thickness: Positive(0.2),
      height: wallHeight,
      excludeFromRoofCutting: true,
      dormerRoofId,
      commentName: '',
      commentFrontTextureAppearance: '',
      commentFrontTextureOverlayColor: '',
      commentBackTextureAppearance: '',
      commentBackTextureOverlayColor: '',
      furnitures: [],
    },
    {
      id: WallId(generateUUID()),
      levelId,
      position: {
        start: new Vector2(debugPoints.rightBackProjected.x, debugPoints.rightBackProjected.z),
        end: new Vector2(debugPoints.leftBackProjected.x, debugPoints.leftBackProjected.z),
      },
      frontSideSpaceId: null,
      backSideSpaceId: null,
      frontTexture: defaultTexture,
      backTexture: defaultTexture,
      frontColorOverlay: null,
      backColorOverlay: null,
      frontCompositeOperation: 'source-over',
      backCompositeOperation: 'source-over',
      isVisible: true,
      isHidden: false,
      thickness: Positive(0.2),
      height: wallHeight,
      excludeFromRoofCutting: true,
      dormerRoofId,
      commentName: '',
      commentFrontTextureAppearance: '',
      commentFrontTextureOverlayColor: '',
      commentBackTextureAppearance: '',
      commentBackTextureOverlayColor: '',
      furnitures: [],
    },
    {
      id: WallId(generateUUID()),
      levelId,
      position: {
        start: new Vector2(debugPoints.leftBackProjected.x, debugPoints.leftBackProjected.z),
        end: new Vector2(debugPoints.leftFrontTop.x, debugPoints.leftFrontTop.z),
      },
      frontSideSpaceId: null,
      backSideSpaceId: null,
      frontTexture: defaultTexture,
      backTexture: defaultTexture,
      frontColorOverlay: null,
      backColorOverlay: null,
      frontCompositeOperation: 'source-over',
      backCompositeOperation: 'source-over',
      isVisible: true,
      isHidden: false,
      thickness: Positive(0.2),
      height: wallHeight,
      excludeFromRoofCutting: true,
      dormerRoofId,
      commentName: '',
      commentFrontTextureAppearance: '',
      commentFrontTextureOverlayColor: '',
      commentBackTextureAppearance: '',
      commentBackTextureOverlayColor: '',
      furnitures: [],
    },
  ];

  useWalls.setState({ walls: [...walls, ...newWalls] });

  return newWalls.map(e => e.id);
};
