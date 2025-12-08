import { CatalogMenuContent, MaterialPicker } from '@draw-house/ui/dist/components';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { useTheme } from '@mui/material';
import { StrapiCustomModelCategoryId, StrapiCustomModelId } from '@draw-house/common/dist/brands';
import { encodeSvgAsDataUri } from '@draw-house/ui/dist/utils';
import { getPlusCircledSvgString } from '@draw-house/ui/dist/components/Icons/string';
import { closeSlideUpMenuLvl2, openSlideUpMenuLvl3, showSlideUpMenuLvl1, SlideUpMenuLvl2Store } from '../../../zustand';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { getImageWithDefaultNull } from '../../../utils';
import { catalogCustomModelClick } from '../../../utils/catalogCustomModelClick';
import { useFullCatalog } from '../../../customHooks/useFullCatalog';
import { useSet } from '../../../customHooks/useSet';
import { useTouchScreen } from '../../../zustand/useTouchScreen';

export type MyAssetsProps = {
  slideUpMenuLvl2: Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'myAssets' }>;
};

export const MyAssets: React.FC<MyAssetsProps> = ({
  slideUpMenuLvl2: {
    isOpened,
    only2D,
  },
}) => {
  checkIsNotNever(isOpened);

  const theme = useTheme();
  const { fullCatalog } = useFullCatalog();
  const [expandedCategories, expandedCategoriesActions] = useSet<StrapiCustomModelCategoryId>([]);

  const userCategories = fullCatalog.filter(e => (
    (only2D === false || e.childrenType === 'assets-2d') && e.userUpload !== 'forbidden'
  ));

  return (
    <SlideUpAndFloatingMenusWrapper
      title={
        only2D === true
          ? lang.slideUpMenus.myAssets.title2D
          : lang.slideUpMenus.myAssets.titleAll
      }
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl2({});
      }}
      onBack={async () => {
        await closeSlideUpMenuLvl2({});
        showSlideUpMenuLvl1();
      }}
    >
      <CatalogMenuContent
        items={
          userCategories.map(({ id, name, image, items, childrenType }) => ({
            icon: getImageWithDefaultNull(image),
            title: name,
            expanded: expandedCategories.has(id),
            onChange() {
              expandedCategoriesActions.toggle(id);
            },
            children: (
              <MaterialPicker<StrapiCustomModelId | 'add-new'>
                shape='round'
                options={[
                  {
                    id: 'add-new',
                    name: lang.importModel.addNew,
                    image: encodeSvgAsDataUri(getPlusCircledSvgString(theme.palette.primary.main)),
                    noBorder: true,
                    textColor: theme.palette.primary.main,
                  },
                  ...items.map(({ id, name, thumbnail }) => ({
                    id,
                    name,
                    image: getImageWithDefaultNull(thumbnail),
                  })),
                ]}
                onClick={async optionId => {
                  const { isTouchScreen } = useTouchScreen.getState();

                  if(optionId === 'add-new') {
                    await closeSlideUpMenuLvl2({});
                    await openSlideUpMenuLvl3({
                      type: 'myAssetsImport',
                      modelCategoryId: id,
                      isOpened: true,
                    });

                    return;
                  }

                  catalogCustomModelClick({
                    id: optionId,
                    childrenType,
                    targetModels: items,
                  });

                  if(isTouchScreen === true) {
                    await closeSlideUpMenuLvl2({});
                  }
                }}
              />
            ),
          }))
        }
      />
    </SlideUpAndFloatingMenusWrapper>
  );
};
