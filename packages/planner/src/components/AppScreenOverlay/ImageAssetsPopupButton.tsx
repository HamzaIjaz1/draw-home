import { AnchoredMenu, Divider, DropdownItem, IconButton } from '@draw-house/ui/dist/components';
import { Fragment, useEffect } from 'react';
import { isNull } from '@arthurka/ts-utils';
import { closeSlideUpMenuLvl1, closeSlideUpMenuLvl2, openSlideUpMenuLvl1, openSlideUpMenuLvl2, useSlideUpMenuLvl1, useSlideUpMenuLvl2 } from '../../zustand';
import { useCatalogDataResolved } from '../../zustand/useCatalogData';
import { getImageWithDefaultNull } from '../../utils';
import { lang } from '../../lang';
import { toggleIsImageAssetsPopupButtonOpened, useIsImageAssetsPopupButtonOpened } from '../../zustand/useIsImageAssetsPopupButtonOpened';
import { closeSlideUpMenus } from '../../utils/closeSlideUpMenus';
import { Hotkey } from '../Hotkey';
import { Tooltip } from '../Tooltip';

export const ImageAssetsPopupButton: React.FC = () => {
  const { isImageAssetsPopupButtonOpened } = useIsImageAssetsPopupButtonOpened();
  const { catalogData } = useCatalogDataResolved();

  const imageUploadCategories = (
    catalogData.categories
      .filter(e => e.userUpload === 'allowed-image-upload-tool' && e.childrenType === 'assets-2d')
      .map(({ userAssetMenuTexts, ...rest }) => (
        isNull(userAssetMenuTexts)
          ? null
          : ({
            ...rest,
            popupTitle: userAssetMenuTexts.popupTitle,
          })
      ))
      .filter(e => !isNull(e))
      .sort((a, b) => a.order - b.order)
  );

  useEffect(() => {
    if(isImageAssetsPopupButtonOpened === false) {
      return;
    }

    const handler = () => {
      useIsImageAssetsPopupButtonOpened.setState({ isImageAssetsPopupButtonOpened: false });
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [isImageAssetsPopupButtonOpened]);

  return (
    <AnchoredMenu
      open={isImageAssetsPopupButtonOpened}
      onClose={() => {
        useIsImageAssetsPopupButtonOpened.setState({ isImageAssetsPopupButtonOpened: false });
      }}
      TriggerComp={
        <Hotkey position='left' label={lang.tooltips.imageToolsButton.hotkey}>
          <Tooltip position='left' content={lang.tooltips.imageToolsButton}>
            <IconButton
              icon='landscape'
              state={isImageAssetsPopupButtonOpened === true ? 'active' : 'default'}
              onClick={toggleIsImageAssetsPopupButtonOpened}
            />
          </Tooltip>
        </Hotkey>
      }
    >
      {
        imageUploadCategories.map(({ id, popupTitle, image }) => (
          <Fragment key={id}>
            <DropdownItem
              label={popupTitle}
              image={getImageWithDefaultNull(image)}
              onClick={async () => {
                useIsImageAssetsPopupButtonOpened.setState({ isImageAssetsPopupButtonOpened: false });

                const { type, isOpened, imageCategoryId } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;

                await closeSlideUpMenus({ except: 'lvl1' });
                if(isOpened === true) {
                  if(type === 'imageAssetCatalog' && imageCategoryId === id) {
                    return;
                  }

                  await closeSlideUpMenuLvl1({});
                }

                await openSlideUpMenuLvl1({
                  type: 'imageAssetCatalog',
                  imageCategoryId: id,
                  isOpened: true,
                });
              }}
            />
            <Divider fullWidth />
          </Fragment>
        ))
      }
      <DropdownItem
        label={lang.slideUpMenus.myAssets.title2D}
        icon='myAssets'
        onClick={async () => {
          useIsImageAssetsPopupButtonOpened.setState({ isImageAssetsPopupButtonOpened: false });

          const { type, isOpened } = useSlideUpMenuLvl2.getState().slideUpMenuLvl2;

          await closeSlideUpMenus({ except: 'lvl2' });
          if(isOpened === true) {
            if(type === 'myAssets') {
              return;
            }

            await closeSlideUpMenuLvl2({});
          }

          await openSlideUpMenuLvl2({
            type: 'myAssets',
            isOpened: true,
            only2D: true,
          });
          useSlideUpMenuLvl1.setState({
            slideUpMenuLvl1: {
              type: 'catalog',
              isOpened: false,
            },
          });
        }}
      />
    </AnchoredMenu>
  );
};
