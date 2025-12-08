import { CatalogMenuContent, MenuItem, SearchInput } from '@draw-house/ui/dist/components';
import { checkIsNotNever, escapeRegExp } from '@draw-house/common/dist/utils';
import { useState } from 'react';
import { isNull } from '@arthurka/ts-utils';
import assert from 'assert';
import { closeSlideUpMenuLvl2, showSlideUpMenuLvl1, SlideUpMenuLvl2Store, useNewCustomModelUploadData } from '../../../zustand';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { getFileExtension, getImageWithDefaultNull, sortCatalogPage } from '../../../utils';
import { useFullCatalog } from '../../../customHooks/useFullCatalog';
import { isCategoryForUpload } from '../../../utils/isCategoryForUpload';

export type NewCustomModelCategoryPickerProps = {
  slideUpMenuLvl2: Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'newCustomModelCategoryPicker' }>;
};

export const NewCustomModelCategoryPicker: React.FC<NewCustomModelCategoryPickerProps> = ({
  slideUpMenuLvl2: { isOpened },
}) => {
  checkIsNotNever(isOpened);

  const [searchText, setSearchText] = useState('');
  const { fullCatalog } = useFullCatalog();
  const { newCustomModelUploadData } = useNewCustomModelUploadData();

  const typeRestrictedCatalogPage = (
    isNull(newCustomModelUploadData)
      ? []
      : (() => {
        const ext = getFileExtension(newCustomModelUploadData.file.name);
        const uploadCategories = fullCatalog.filter(isCategoryForUpload(ext));

        return sortCatalogPage(uploadCategories);
      })()
  );

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.newCustomModelCategoryPicker.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl2({});
      }}
      headerSpacing={{ bottom: 'sm' }}
      onBack={async () => {
        await closeSlideUpMenuLvl2({});
        showSlideUpMenuLvl1();
      }}
      header={
        <MenuItem paddingVertical='md' paddingHorizontal>
          <SearchInput
            placeholder={lang.search}
            value={searchText}
            setValue={setSearchText}
          />
        </MenuItem>
      }
    >
      <CatalogMenuContent
        items={
          typeRestrictedCatalogPage
            .filter(e => searchText === '' || new RegExp(escapeRegExp(searchText), 'i').test(e.name))
            .map(e => ({
              icon: getImageWithDefaultNull(e.image),
              title: e.name,
              showArrowIcon: false,
              async onClick() {
                assert(e.subcategories.length === 0, 'This should never happen. |qa03xg|');
                setSearchText('');

                const { newCustomModelUploadData } = useNewCustomModelUploadData.getState();
                assert(!isNull(newCustomModelUploadData), 'This should never happen. |yd5e10|');

                useNewCustomModelUploadData.setState({
                  newCustomModelUploadData: {
                    ...newCustomModelUploadData,
                    category: e.id,
                  },
                });

                await closeSlideUpMenuLvl2({});
                showSlideUpMenuLvl1();
              },
            }))
        }
      />
    </SlideUpAndFloatingMenusWrapper>
  );
};
