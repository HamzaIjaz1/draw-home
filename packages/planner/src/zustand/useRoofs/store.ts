import { Positive, RoofDormerId, RoofId, WallId } from '@draw-house/common/dist/brands';
import { create } from 'zustand';
import { Quaternion, Vector3 } from 'three';
import { TextureAsset } from '../../zod';
import { withComparingSetState } from '../../utils/withComparingSetState';
import { ColorOverlay } from '../../utils/types';
import { TextureTransform } from '../../zod/TextureTransform';

export type RoofsStore = {
  roofs: Array<{
    id: RoofId;
    roofData: {
      isVisible: boolean;
      isHidden: boolean;
      type: 'hip' | 'flat' | 'slanted' | 'wraparound';
      overhang: number;
      heightFromBase: number;
      hipSlope: number;
      thickness: Positive;
      slantedSlopeOrientation: 0 | 1 | 2 | 3;
      slantedSlope: number;
      activeGableIndices: number[];
      isClosedGable: boolean;
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
      isFlippedWraparound: boolean;
      transformableGableToHipRoofParts: Array<{
        index: number;
        part: [Vector3, Vector3, Vector3];
      }>;
      dormers: Array<{
        id: RoofDormerId;
        type: 'gable' | 'hip' | 'shed';
        position: Vector3;
        rotation: Quaternion;
        width: Positive;
        height: Positive;
        depth: Positive;
        isHidden: boolean;
        wallIds: WallId[] | null;
      }>;
    };
  }>;
};

export const useRoofs = create<RoofsStore>(() => ({
  roofs: [],
}));

withComparingSetState(useRoofs);
