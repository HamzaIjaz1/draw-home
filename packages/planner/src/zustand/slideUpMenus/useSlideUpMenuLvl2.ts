import { create } from 'zustand';
import { getNotUndefined, isNull, isNullish, Union, unionObject, wait } from '@arthurka/ts-utils';
import { animationDuration } from '@draw-house/ui/dist/components/Menu/SlideUpMenu/styles';
import { CustomModelId, LevelId, RoofId, SpaceId, StrapiCustomModelCategoryId, WallFurnitureId, WallId } from '@draw-house/common/dist/brands';
import { capitalize, checkIsNotNever } from '@draw-house/common/dist/utils';
import assert from 'assert';
import type { Menu } from '../../utils';
import { useIsDesktopMenu } from '../useIsDesktopMenu';
import { useWalls } from '../useWalls/store';
import { setWallFurnitureOverrideMaterialParams, setWallSideParams } from '../useWalls/actions2';
import { setCeilingParams, setFloorParams, useSpaces } from '../useSpaces';
import { setRoofParams } from '../useRoofs/actions';
import { useRoofs } from '../useRoofs/store';
import { useCustomModels } from '../useCustomModels/store';
import { setCustomModelOverrideMaterialParams } from '../useCustomModels/actions';

export type SlideUpMenuLvl2Store = {
  slideUpMenuLvl2: Union<
    | {
      type: '__RESET_STATE_DUMMY__';
      isOpened: false;
    }
    | {
      type: 'newLevel';
      isOpened: boolean;
    }
    | {
      type: 'snapSettings';
      isOpened: boolean;
    }
    | {
      type: 'newCustomModelCategoryPicker';
      isOpened: boolean;
    }
    | {
      type: 'landTextures';
      isOpened: boolean;
    }
    | (
      & {
        type: 'levelSettings';
      }
      & Menu<'levelId', LevelId>
    )
    | (
      & {
        type: 'wallAppearance';
        textureType: 'front' | 'back';
        applyToAll: {
          isActive: boolean;
          type: 'sameFaceSameSpaceWallFaces' | 'sameFaceSameLevelWallFaces' | 'sameFaceWallFaces';
        };
      }
      & Menu<'wallId', WallId>
    )
    | (
      & {
        type: 'floorAppearance';
        textureType: 'top' | 'bottom' | 'edge';
        applyToAll: {
          isActive: boolean;
          type: 'sameLevelFloors' | 'floors';
        };
      }
      & Menu<'spaceId', SpaceId>
    )
    | (
      & {
        type: 'ceilingAppearance';
        textureType: 'top' | 'bottom' | 'edge';
        applyToAll: {
          isActive: boolean;
          type: 'sameLevelCeilings' | 'ceilings';
        };
      }
      & Menu<'spaceId', SpaceId>
    )
    | (
      & {
        type: 'roofAppearance';
        textureType: 'top' | 'bottom' | 'edge';
        applyToAll: {
          isActive: boolean;
          type: 'sameLevelRoofs' | 'roofs';
        };
      }
      & Menu<'roofId', RoofId>
    )
    | (
      & {
        type: 'customModelAppearance';
        overrideMaterialName: string;
        applyToAll: {
          isActive: boolean;
          type: 'sameLevelSameCustomModels' | 'sameCustomModels';
        };
      }
      & Menu<'customModelId', CustomModelId>
    )
    | (
      & {
        type: 'wallFurnitureAppearance';
        overrideMaterialName: string;
        applyToAll: {
          isActive: boolean;
          type: 'sameLevelSameWallFurnitures' | 'sameWallFurnitures';
        };
      }
      & Menu<'wallFurnitureId', WallFurnitureId>
    )
    | (
      & {
        type: 'imageUpload';
      }
      & Menu<'modelCategoryId', StrapiCustomModelCategoryId>
    )
    | (
      & {
        type: 'myAssets';
      }
      & Menu<'only2D', boolean>
    )
  >;
};

export const useSlideUpMenuLvl2 = create<SlideUpMenuLvl2Store>(() => ({
  slideUpMenuLvl2: {
    type: '__RESET_STATE_DUMMY__',
    isOpened: false,
  },
}));

export const openSlideUpMenuLvl2 = async (
  slideUpMenuLvl2: Exclude<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { isOpened: false }>,
) => {
  checkIsNotNever(slideUpMenuLvl2);

  useSlideUpMenuLvl2.setState({
    slideUpMenuLvl2: {
      ...slideUpMenuLvl2,
      isOpened: false,
    },
  });

  await wait(0.05);

  useSlideUpMenuLvl2.setState({
    slideUpMenuLvl2: {
      ...slideUpMenuLvl2,
      isOpened: true,
    },
  });
};

export const closeSlideUpMenuLvl2 = async ({ preserveState = false }: { preserveState?: boolean }) => {
  const { slideUpMenuLvl2 } = useSlideUpMenuLvl2.getState();

  if(slideUpMenuLvl2.isOpened === false) {
    return;
  }

  useSlideUpMenuLvl2.setState({
    slideUpMenuLvl2: {
      ...slideUpMenuLvl2,
      isOpened: false,
    },
  });
  if(useIsDesktopMenu.getState().isDesktopMenu === false) {
    await wait(animationDuration);
  }

  if(preserveState === false) {
    useSlideUpMenuLvl2.setState(useSlideUpMenuLvl2.getInitialState());

    await wait(0);
  }

  useSlideUpMenuLvl2.setState({
    slideUpMenuLvl2: {
      ...slideUpMenuLvl2,
      isOpened: false,
    },
  });
};

export const showSlideUpMenuLvl2 = () => {
  const {
    type,
    wallId,
    isOpened,
    spaceId,
    customModelId,
    roofId,
    applyToAll,
    levelId,
    overrideMaterialName,
    textureType,
    wallFurnitureId,
    modelCategoryId,
    only2D,
  } = useSlideUpMenuLvl2.getState().slideUpMenuLvl2;

  switch(type) {
    case '__RESET_STATE_DUMMY__':
      throw new Error('Should not happen. |mf7hpr|');
    case 'newLevel':
    case 'snapSettings':
    case 'newCustomModelCategoryPicker':
    case 'landTextures':
      useSlideUpMenuLvl2.setState({
        slideUpMenuLvl2: {
          type,
          isOpened: true,
        },
      });
      break;
    case 'imageUpload':
      if(isNull(modelCategoryId) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl2.setState({
        slideUpMenuLvl2: {
          type,
          isOpened: true,
          modelCategoryId,
        },
      });
      break;
    case 'myAssets':
      if(isNull(only2D) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl2.setState({
        slideUpMenuLvl2: {
          isOpened: true,
          type,
          only2D,
        },
      });
      break;
    case 'levelSettings':
      if(isNull(levelId) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl2.setState({
        slideUpMenuLvl2: {
          type,
          isOpened: true,
          levelId,
        },
      });
      break;
    case 'wallAppearance':
      if(isNull(wallId) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl2.setState({
        slideUpMenuLvl2: {
          type,
          isOpened: true,
          textureType,
          applyToAll,
          wallId,
        },
      });
      break;
    case 'floorAppearance':
      if(isNull(spaceId) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl2.setState({
        slideUpMenuLvl2: {
          type,
          isOpened: true,
          textureType,
          applyToAll,
          spaceId,
        },
      });
      break;
    case 'ceilingAppearance':
      if(isNull(spaceId) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl2.setState({
        slideUpMenuLvl2: {
          type,
          isOpened: true,
          textureType,
          applyToAll,
          spaceId,
        },
      });
      break;
    case 'roofAppearance':
      if(isNull(roofId) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl2.setState({
        slideUpMenuLvl2: {
          type,
          isOpened: true,
          textureType,
          applyToAll,
          roofId,
        },
      });
      break;
    case 'customModelAppearance':
      if(isNull(customModelId) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl2.setState({
        slideUpMenuLvl2: {
          type,
          isOpened: true,
          overrideMaterialName,
          applyToAll,
          customModelId,
        },
      });
      break;
    case 'wallFurnitureAppearance':
      if(isNull(wallFurnitureId) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl2.setState({
        slideUpMenuLvl2: {
          type,
          isOpened: true,
          overrideMaterialName,
          applyToAll,
          wallFurnitureId,
        },
      });
      break;
    default:
      ((e: never) => e)(type);
      throw new Error('This should never happen. |sp2m7t|');
  }
};

useSlideUpMenuLvl2.subscribe(({
  slideUpMenuLvl2: {
    type,
    wallId,
    spaceId,
    roofId,
    customModelId,
    wallFurnitureId,
    overrideMaterialName,
    applyToAll,
    textureType,
  },
}) => {
  switch(type) {
    case '__RESET_STATE_DUMMY__':
    case 'levelSettings':
    case 'newLevel':
    case 'snapSettings':
    case 'newCustomModelCategoryPicker':
    case 'landTextures':
    case 'imageUpload':
    case 'myAssets':
      break;
    case 'wallAppearance': {
      if(applyToAll.isActive === false) {
        break;
      }
      assert(!isNull(wallId), 'Something went wrong. |5ug98y|');

      const { walls } = useWalls.getState();
      const targetWall = getNotUndefined(walls.find(e => e.id === wallId), 'Something went wrong. |mbn8dv|');

      setWallSideParams(wallId, applyToAll, textureType, {
        commentTextureAppearance: targetWall[`comment${capitalize(textureType)}TextureAppearance`],
        commentTextureOverlayColor: targetWall[`comment${capitalize(textureType)}TextureOverlayColor`],
        colorOverlay: targetWall[`${textureType}ColorOverlay`],
        compositeOperation: targetWall[`${textureType}CompositeOperation`],
        texture: targetWall[`${textureType}Texture`],
      });
      break;
    }
    case 'floorAppearance': {
      if(applyToAll.isActive === false) {
        break;
      }
      assert(!isNull(spaceId), 'Something went wrong. |cp4x4v|');

      const { spaces } = useSpaces.getState();
      const { floorData } = getNotUndefined(spaces.find(e => e.id === spaceId), 'Something went wrong. |y1iz4n|');

      setFloorParams(spaceId, applyToAll, {
        ...unionObject(`comment${capitalize(textureType)}TextureAppearance`, floorData[`comment${capitalize(textureType)}TextureAppearance`]),
        ...unionObject(`comment${capitalize(textureType)}TextureOverlayColor`, floorData[`comment${capitalize(textureType)}TextureOverlayColor`]),
        ...unionObject(`${textureType}ColorOverlay`, floorData[`${textureType}ColorOverlay`]),
        ...unionObject(`${textureType}CompositeOperation`, floorData[`${textureType}CompositeOperation`]),
        ...unionObject(`${textureType}Texture`, floorData[`${textureType}Texture`]),
      });
      break;
    }
    case 'ceilingAppearance': {
      if(applyToAll.isActive === false) {
        break;
      }
      assert(!isNull(spaceId), 'Something went wrong. |it0dbt|');

      const { spaces } = useSpaces.getState();
      const { ceilingData } = getNotUndefined(spaces.find(e => e.id === spaceId), 'Something went wrong. |g0p41k|');

      setCeilingParams(spaceId, applyToAll, {
        ...unionObject(`comment${capitalize(textureType)}TextureAppearance`, ceilingData[`comment${capitalize(textureType)}TextureAppearance`]),
        ...unionObject(`comment${capitalize(textureType)}TextureOverlayColor`, ceilingData[`comment${capitalize(textureType)}TextureOverlayColor`]),
        ...unionObject(`${textureType}ColorOverlay`, ceilingData[`${textureType}ColorOverlay`]),
        ...unionObject(`${textureType}CompositeOperation`, ceilingData[`${textureType}CompositeOperation`]),
        ...unionObject(`${textureType}Texture`, ceilingData[`${textureType}Texture`]),
      });
      break;
    }
    case 'roofAppearance': {
      if(applyToAll.isActive === false) {
        break;
      }
      assert(!isNull(roofId), 'Something went wrong. |uv8vkt|');

      const { roofs } = useRoofs.getState();
      const { roofData } = getNotUndefined(roofs.find(e => e.id === roofId), 'Something went wrong. |0679hr|');

      setRoofParams(roofId, applyToAll, {
        ...unionObject(`comment${capitalize(textureType)}TextureAppearance`, roofData[`comment${capitalize(textureType)}TextureAppearance`]),
        ...unionObject(`comment${capitalize(textureType)}TextureOverlayColor`, roofData[`comment${capitalize(textureType)}TextureOverlayColor`]),
        ...unionObject(`${textureType}ColorOverlay`, roofData[`${textureType}ColorOverlay`]),
        ...unionObject(`${textureType}CompositeOperation`, roofData[`${textureType}CompositeOperation`]),
        ...unionObject(`${textureType}Texture`, roofData[`${textureType}Texture`]),
      });
      break;
    }
    case 'customModelAppearance': {
      if(applyToAll.isActive === false) {
        break;
      }
      assert(!isNull(customModelId), 'Something went wrong. |1h3dha|');

      const { customModels } = useCustomModels.getState();
      const { overrideMaterials } = getNotUndefined(customModels.find(e => e.id === customModelId), 'Something went wrong. |91m9pl|');
      assert(!isNullish(overrideMaterials), 'Something went wrong. |zfm78c|');

      const overrideMaterial = getNotUndefined(overrideMaterials[overrideMaterialName], 'Something went wrong. |gmp1a8|');

      setCustomModelOverrideMaterialParams(customModelId, overrideMaterialName, applyToAll, overrideMaterial);
      break;
    }
    case 'wallFurnitureAppearance': {
      if(applyToAll.isActive === false) {
        break;
      }
      assert(!isNull(wallFurnitureId), 'Something went wrong. |yi39pg|');

      const { walls } = useWalls.getState();
      const { overrideMaterials } = getNotUndefined(walls.flatMap(e => e.furnitures).find(e => e.id === wallFurnitureId), 'Something went wrong. |9cfi6m|');
      assert(!isNull(overrideMaterials), 'Something went wrong. |p1x6c7|');

      const overrideMaterial = getNotUndefined(overrideMaterials[overrideMaterialName], 'Something went wrong. |wi588c|');

      setWallFurnitureOverrideMaterialParams(wallFurnitureId, overrideMaterialName, applyToAll, overrideMaterial);
      break;
    }
    default:
      ((e: never) => e)(type);
      throw new Error('This should never happen. |hfl0hw|');
  }
});
