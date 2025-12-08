import { Positive, RoofDormerId, RoofId, SpaceId, WallId } from '@draw-house/common/dist/brands';
import { create } from 'zustand';
import type { TextureAsset } from '../../zod';
import { withComparingSetState } from '../../utils/withComparingSetState';
import { ColorOverlay } from '../../utils/types';
import { TextureTransform } from '../../zod/TextureTransform';

export type SpacesStore = {
  spaces: Array<{
    id: SpaceId;
    name: string;
    roofId: RoofId;
    dormerRoofId: RoofDormerId | null;
    walls: WallId[];
    hasUniqueRoof: boolean;
    floorData: {
      isVisible: boolean;
      isHidden: boolean;
      thickness: Positive;
      topTexture: TextureAsset;
      bottomTexture: TextureAsset;
      edgeTexture: TextureAsset;
      topColorOverlay: null | ColorOverlay;
      bottomColorOverlay: null | ColorOverlay;
      edgeColorOverlay: null | ColorOverlay;
      topCompositeOperation: GlobalCompositeOperation;
      bottomCompositeOperation: GlobalCompositeOperation;
      edgeCompositeOperation: GlobalCompositeOperation;
      commentTopTextureAppearance: string;
      commentTopTextureOverlayColor: string;
      commentBottomTextureAppearance: string;
      commentBottomTextureOverlayColor: string;
      commentEdgeTextureAppearance: string;
      commentEdgeTextureOverlayColor: string;
      topTextureTransform?: TextureTransform;
      bottomTextureTransform?: TextureTransform;
      edgeTextureTransform?: TextureTransform;
    };
    ceilingData: {
      isVisible: boolean;
      isHidden: boolean;
      thickness: Positive;
      distanceFromTop: number;
      commentName: string;
      topTexture: TextureAsset;
      bottomTexture: TextureAsset;
      edgeTexture: TextureAsset;
      topColorOverlay: null | ColorOverlay;
      bottomColorOverlay: null | ColorOverlay;
      edgeColorOverlay: null | ColorOverlay;
      topCompositeOperation: GlobalCompositeOperation;
      bottomCompositeOperation: GlobalCompositeOperation;
      edgeCompositeOperation: GlobalCompositeOperation;
      commentTopTextureAppearance: string;
      commentTopTextureOverlayColor: string;
      commentBottomTextureAppearance: string;
      commentBottomTextureOverlayColor: string;
      commentEdgeTextureAppearance: string;
      commentEdgeTextureOverlayColor: string;
      topTextureTransform?: TextureTransform;
      bottomTextureTransform?: TextureTransform;
      edgeTextureTransform?: TextureTransform;
    };
  }>;
};

export const useSpaces = create<SpacesStore>(() => ({
  spaces: [],
}));

withComparingSetState(useSpaces);
