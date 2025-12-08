import { create } from 'zustand';
import { LevelId, NonNegative, Positive, RoofDormerId, SpaceId, WallFurnitureId, WallId } from '@draw-house/common/dist/brands';
import { Vector2 } from 'three';
import { TextureAsset } from '../../zod/TextureAsset';
import { ColorOverlay } from '../../utils/types';
import { TextureTransform } from '../../zod/TextureTransform';

export type WallsStore = {
  walls: Array<{
    id: WallId;
    levelId: LevelId;
    position: {
      start: Vector2;
      end: Vector2;
    };
    frontSideSpaceId: null | SpaceId;
    backSideSpaceId: null | SpaceId;
    frontTexture: TextureAsset;
    backTexture: TextureAsset;
    frontColorOverlay: null | ColorOverlay;
    backColorOverlay: null | ColorOverlay;
    frontCompositeOperation: GlobalCompositeOperation;
    backCompositeOperation: GlobalCompositeOperation;
    frontTextureTransform?: TextureTransform;
    backTextureTransform?: TextureTransform;
    isVisible: boolean;
    isHidden: boolean;
    thickness: Positive;
    height: null | Positive;
    excludeFromRoofCutting: boolean;
    dormerRoofId: RoofDormerId | null;
    commentName: string;
    commentFrontTextureAppearance: string;
    commentFrontTextureOverlayColor: string;
    commentBackTextureAppearance: string;
    commentBackTextureOverlayColor: string;
    furnitures: Array<{
      type: 'door' | 'window';
      id: WallFurnitureId;
      onWallCoordinateX: number;
      onWallCoordinateY: NonNegative;
      isFlippedHorizontal: boolean;
      isMirrored: boolean;
      isHidden: boolean;
      url: string;
      width: null | Positive;
      height: null | Positive;
      depth: null | Positive;
      overrideMaterials: null | Record<string, {
        texture: TextureAsset;
        colorOverlay: null | ColorOverlay;
        compositeOperation: GlobalCompositeOperation;
        commentTextureAppearance: string;
        commentTextureOverlayColor: string;
        textureTransform?: TextureTransform;
      }>;
    }>;
  }>;
};

export const useWalls = create<WallsStore>(() => ({
  walls: [],
}));
