import { create } from 'zustand';
import { isNull, Union, wait } from '@arthurka/ts-utils';
import { animationDuration } from '@draw-house/ui/dist/components/Menu/SlideUpMenu/styles';
import { CustomModelId, RoofDormerId, RoofId, SpaceId, StairId, StrapiCustomModelCategoryId, WallFurnitureId, WallId } from '@draw-house/common/dist/brands';
import type { Menu } from '../../utils';
import { useIsDesktopMenu } from '../useIsDesktopMenu';

export type SlideUpMenuLvl1Store = {
  slideUpMenuLvl1: Union<
    | {
      type: '__RESET_STATE_DUMMY__';
      isOpened: false;
    }
    | {
      type: 'globalSettings';
      isOpened: boolean;
    }
    | {
      type: 'levels';
      isOpened: boolean;
    }
    | {
      type: 'visibilitySettings';
      isOpened: boolean;
    }
    | {
      type: 'catalog';
      isOpened: boolean;
    }
    | {
      type: 'aiTools';
      isOpened: boolean;
    }
    | (
      & {
        type: 'wall';
      }
      & Menu<'wallId', WallId>
    )
    | (
      & {
        type: 'door' | 'window';
      }
      & Menu<'furnitureId', WallFurnitureId>
    )
    | (
      & {
        type: 'floor';
      }
      & Menu<'spaceId', SpaceId>
    )
    | (
      & {
        type: 'ceiling';
      }
      & Menu<'spaceId', SpaceId>
    )
    | (
      & {
        type: 'roof';
      }
      & Menu<'roofId', RoofId>
    )
    | (
      & {
        type: 'space';
      }
      & Menu<'spaceId', SpaceId>
    )
    | (
      & {
        type: 'customModel';
      }
      & Menu<'customModelId', CustomModelId>
    )
    | (
      & {
        type: 'stairSettings';
      }
      & Menu<'stairId', StairId>
    )
    | (
      & {
        type: 'roofDormer';
      }
      & Menu<'dormerId', RoofDormerId>
    )
    | (
      & {
        type: 'replaceElementCatalog';
      }
      & Menu<'replacementElement',
        | {
          type: 'customModel';
          id: CustomModelId;
        }
        | {
          type: 'column';
          id: CustomModelId;
        }
        | {
          type: 'door';
          id: WallFurnitureId;
        }
        | {
          type: 'window';
          id: WallFurnitureId;
        }
      >
    )
    | (
      & {
        type: 'asset2DSettings';
      }
      & Menu<'asset2DId', CustomModelId>
    )
    | (
      & {
        type: 'imageAssetCatalog';
      }
      & Menu<'imageCategoryId', StrapiCustomModelCategoryId>
    )
    | (
      & {
        type: 'associatedObjects';
      }
      & Menu<'spaceIds', SpaceId[]>
    )
  >;
};

export const useSlideUpMenuLvl1 = create<SlideUpMenuLvl1Store>(() => ({
  slideUpMenuLvl1: {
    type: '__RESET_STATE_DUMMY__',
    isOpened: false,
  },
}));

export const openSlideUpMenuLvl1 = async (
  slideUpMenuLvl1: Exclude<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { isOpened: false }>,
) => {
  useSlideUpMenuLvl1.setState({
    slideUpMenuLvl1: {
      ...slideUpMenuLvl1,
      isOpened: false,
    },
  });

  await wait(0.05);

  useSlideUpMenuLvl1.setState({
    slideUpMenuLvl1: {
      ...slideUpMenuLvl1,
      isOpened: true,
    },
  });
};

export const closeSlideUpMenuLvl1 = async ({ preserveState = false }: { preserveState?: boolean }) => {
  const { slideUpMenuLvl1 } = useSlideUpMenuLvl1.getState();

  if(slideUpMenuLvl1.isOpened === false) {
    return;
  }

  useSlideUpMenuLvl1.setState({
    slideUpMenuLvl1: {
      ...slideUpMenuLvl1,
      isOpened: false,
    },
  });
  if(useIsDesktopMenu.getState().isDesktopMenu === false) {
    await wait(animationDuration);
  }

  if(preserveState === false) {
    useSlideUpMenuLvl1.setState(useSlideUpMenuLvl1.getInitialState());

    await wait(0);
  }
};

export const showSlideUpMenuLvl1 = () => {
  const {
    type,
    wallId,
    isOpened,
    furnitureId,
    spaceId,
    spaceIds,
    customModelId,
    stairId,
    roofId,
    dormerId,
    asset2DId,
    replacementElement,
    imageCategoryId,
  } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;

  switch(type) {
    case '__RESET_STATE_DUMMY__':
      throw new Error('Should not happen. |fz1438|');
    case 'globalSettings':
    case 'levels':
    case 'visibilitySettings':
    case 'catalog':
    case 'aiTools':
      useSlideUpMenuLvl1.setState({
        slideUpMenuLvl1: {
          type,
          isOpened: true,
        },
      });
      break;
    case 'wall':
      if(isNull(wallId) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl1.setState({
        slideUpMenuLvl1: {
          type,
          wallId,
          isOpened: true,
        },
      });
      break;
    case 'door':
    case 'window':
      if(isNull(furnitureId) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl1.setState({
        slideUpMenuLvl1: {
          type,
          isOpened: true,
          furnitureId,
        },
      });
      break;
    case 'floor':
    case 'ceiling':
    case 'space':
      if(isNull(spaceId) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl1.setState({
        slideUpMenuLvl1: {
          type,
          isOpened: true,
          spaceId,
        },
      });
      break;
    case 'roof':
      if(isNull(roofId) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl1.setState({
        slideUpMenuLvl1: {
          type,
          isOpened: true,
          roofId,
        },
      });
      break;
    case 'customModel':
      if(isNull(customModelId) || isOpened === true) {
        return;
      }
      useSlideUpMenuLvl1.setState({
        slideUpMenuLvl1: {
          type,
          isOpened: true,
          customModelId,
        },
      });
      break;
    case 'asset2DSettings':
      if(isNull(asset2DId) || isOpened === true) {
        return;
      }
      useSlideUpMenuLvl1.setState({
        slideUpMenuLvl1: {
          type,
          isOpened: true,
          asset2DId,
        },
      });
      break;
    case 'stairSettings':
      if(isNull(stairId) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl1.setState({
        slideUpMenuLvl1: {
          type,
          isOpened: true,
          stairId,
        },
      });
      break;
    case 'roofDormer':
      if(isNull(dormerId) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl1.setState({
        slideUpMenuLvl1: {
          type,
          isOpened: true,
          dormerId,
        },
      });
      break;
    case 'replaceElementCatalog':
      if(isNull(replacementElement) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl1.setState({
        slideUpMenuLvl1: {
          type: 'replaceElementCatalog',
          isOpened: true,
          replacementElement,
        },
      });
      break;
    case 'imageAssetCatalog':
      if(isNull(imageCategoryId) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl1.setState({
        slideUpMenuLvl1: {
          type: 'imageAssetCatalog',
          isOpened: true,
          imageCategoryId,
        },
      });
      break;
    case 'associatedObjects':
      if(isNull(spaceIds) || isOpened === true) {
        return;
      }

      useSlideUpMenuLvl1.setState({
        slideUpMenuLvl1: {
          type: 'associatedObjects',
          isOpened: true,
          spaceIds,
        },
      });
      break;
    default:
      ((e: never) => e)(type);
      throw new Error('This should never happen. |s68xr9|');
  }
};
