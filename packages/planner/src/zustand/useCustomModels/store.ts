import { CustomModelId, LevelId, Positive } from '@draw-house/common/dist/brands';
import { Quaternion, Vector3 } from 'three';
import { create } from 'zustand';
import { Union } from '@arthurka/ts-utils';
import { TextureAsset } from '../../zod/TextureAsset';
import { withComparingSetState } from '../../utils/withComparingSetState';
import { ColorOverlay } from '../../utils/types';
import { TextureTransform } from '../../zod/TextureTransform';

export type CustomModelsStore = {
  customModels: Array<
    Union<
      & {
        id: CustomModelId;
        url: string;
        position: Vector3;
        quaternion: Quaternion;
        levelId: LevelId;
        commentName: string;
      }
      & (
        | {
          type: 'asset-2d';
          transparency: number;
          location: 'background' | 'foreground';
          scale: Positive;
          tilt: number;
        }
        | {
          type: 'regular' | 'column';
          width: null | Positive;
          height: null | Positive;
          depth: null | Positive;
          isFlippedHorizontal: boolean;
          isMirrored: boolean;
          isHidden: boolean;
          appearanceOptionsShown: boolean;
          appearanceOptionsExceptionTextureNames: string[];
          overrideMaterials: null | Record<string, {
            texture: TextureAsset;
            colorOverlay: null | ColorOverlay;
            compositeOperation: GlobalCompositeOperation;
            commentTextureAppearance: string;
            commentTextureOverlayColor: string;
            textureTransform?: TextureTransform;
          }>;
        }
      )
    >
  >;
};

export const useCustomModels = create<CustomModelsStore>(() => ({
  customModels: [],
}));

withComparingSetState(useCustomModels);
