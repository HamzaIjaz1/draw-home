import { create } from 'zustand';
import { Union, wait } from '@arthurka/ts-utils';
import { animationDuration } from '@draw-house/ui/dist/components/Menu/SlideUpMenu/styles';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { StrapiCustomModelCategoryId } from '@draw-house/common/dist/brands';
import { useIsDesktopMenu } from '../useIsDesktopMenu';
import { Menu } from '../../utils/types';

export type SlideUpMenuLvl3Store = {
  slideUpMenuLvl3: Union<
    | {
      type: '__RESET_STATE_DUMMY__';
      isOpened: false;
    }
    | (
      & {
        type: 'myAssetsImport';
      }
      & Menu<'modelCategoryId', StrapiCustomModelCategoryId>
    )
  >;
};

export const useSlideUpMenuLvl3 = create<SlideUpMenuLvl3Store>(() => ({
  slideUpMenuLvl3: {
    type: '__RESET_STATE_DUMMY__',
    isOpened: false,
  },
}));

export const openSlideUpMenuLvl3 = async (
  slideUpMenuLvl3: Exclude<SlideUpMenuLvl3Store['slideUpMenuLvl3'], { isOpened: false }>,
) => {
  checkIsNotNever(slideUpMenuLvl3);

  useSlideUpMenuLvl3.setState({
    slideUpMenuLvl3: {
      ...slideUpMenuLvl3,
      isOpened: false,
    },
  });

  await wait(0.05);

  useSlideUpMenuLvl3.setState({
    slideUpMenuLvl3: {
      ...slideUpMenuLvl3,
      isOpened: true,
    },
  });
};

export const closeSlideUpMenuLvl3 = async ({ preserveState = false }: { preserveState?: boolean }) => {
  const { slideUpMenuLvl3 } = useSlideUpMenuLvl3.getState();

  if(slideUpMenuLvl3.isOpened === false) {
    return;
  }

  useSlideUpMenuLvl3.setState({
    slideUpMenuLvl3: {
      ...slideUpMenuLvl3,
      isOpened: false,
    },
  });
  if(useIsDesktopMenu.getState().isDesktopMenu === false) {
    await wait(animationDuration);
  }

  if(preserveState === false) {
    useSlideUpMenuLvl3.setState(useSlideUpMenuLvl3.getInitialState());

    await wait(0);
  }

  useSlideUpMenuLvl3.setState({
    slideUpMenuLvl3: {
      ...slideUpMenuLvl3,
      isOpened: false,
    },
  });
};
