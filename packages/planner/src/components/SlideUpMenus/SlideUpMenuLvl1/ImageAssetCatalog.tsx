import { MaterialPicker, Upload2DAssetsMenuContent } from '@draw-house/ui/dist/components';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import assert from 'assert';
import { encodeSvgAsDataUri } from '@draw-house/ui/dist/utils';
import { getPlusCircledSvgString } from '@draw-house/ui/dist/components/Icons/string';
import { useTheme } from '@mui/material';
import { StrapiCustomModelId } from '@draw-house/common/dist/brands';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { closeSlideUpMenuLvl1, openSlideUpMenuLvl2, SlideUpMenuLvl1Store } from '../../../zustand';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { getImageWithDefaultNull } from '../../../utils';
import { catalogCustomModelClick } from '../../../utils/catalogCustomModelClick';
import { useFullCatalog } from '../../../customHooks/useFullCatalog';
import { useTouchScreen } from '../../../zustand/useTouchScreen';

export type ImageAssetCatalogProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'imageAssetCatalog' }>;
};

export const ImageAssetCatalog: React.FC<ImageAssetCatalogProps> = ({
  slideUpMenuLvl1: {
    isOpened,
    imageCategoryId,
  },
}) => {
  checkIsNotNever(isOpened);
  assert(!isNull(imageCategoryId), 'Something went wrong. |3m5rbj|');

  const theme = useTheme();
  const { fullCatalog } = useFullCatalog();
  const imageCategory = fullCatalog.find(e => e.id === imageCategoryId);
  assert(!isUndefined(imageCategory) && !isNull(imageCategory.userAssetMenuTexts), 'Something went wrong. |zqo0cj|');

  return (
    <SlideUpAndFloatingMenusWrapper
      title={imageCategory.userAssetMenuTexts.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
      noDivider
    >
      <Upload2DAssetsMenuContent
        description={imageCategory.userAssetMenuTexts.description}
        title={imageCategory.userAssetMenuTexts.subtitle}
      >
        <MaterialPicker<StrapiCustomModelId | 'add-new'>
          shape='round'
          onClick={async id => {
            const { isTouchScreen } = useTouchScreen.getState();

            if(id === 'add-new') {
              await closeSlideUpMenuLvl1({ preserveState: true });
              await openSlideUpMenuLvl2({
                type: 'imageUpload',
                modelCategoryId: imageCategory.id,
                isOpened: true,
              });

              return;
            }

            catalogCustomModelClick({
              id,
              childrenType: imageCategory.childrenType,
              targetModels: imageCategory.items,
            });

            if(isTouchScreen === true) {
              await closeSlideUpMenuLvl1({ preserveState: true });
            }
          }}
          options={
            [
              {
                id: 'add-new',
                name: lang.importModel.addNew,
                image: encodeSvgAsDataUri(getPlusCircledSvgString(theme.palette.primary.main)),
                noBorder: true,
                textColor: theme.palette.primary.main,
              },
              ...imageCategory.items.map(({ id, name, thumbnail }) => ({
                id,
                name,
                image: getImageWithDefaultNull(thumbnail),
              })),
            ]
          }
        />
      </Upload2DAssetsMenuContent>
    </SlideUpAndFloatingMenusWrapper>
  );
};
