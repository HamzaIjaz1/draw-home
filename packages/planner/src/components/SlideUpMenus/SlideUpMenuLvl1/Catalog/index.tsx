import { AppearanceIconButton, MenuItem, SearchInput } from '@draw-house/ui/dist/components';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { useCallback, useState } from 'react';
import { isNull } from '@arthurka/ts-utils';
import { useDebounce } from 'use-debounce';
import { AnimatePresence } from 'framer-motion';
import { StrapiCustomModelCategoryId, StrapiCustomModelId } from '@draw-house/common/dist/brands';
import { closeSlideUpMenuLvl1, openSlideUpMenuLvl2, SlideUpMenuLvl1Store, useNewCustomModelUploadData } from '../../../../zustand';
import { lang } from '../../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../../SlideUpAndFloatingMenusWrapper';
import { useCatalogPage } from '../../../../customHooks/useCatalogPage';
import { RootCatalogPage } from './RootCatalogPage';
import { LeafCatalogPage } from './LeafCatalogPage';
import { SearchCatalogPage } from './SearchCatalogPage';
import { ImportPage } from './ImportPage';
import { useTouchScreen } from '../../../../zustand/useTouchScreen';
import { catalogCustomModelClick } from '../../../../utils/catalogCustomModelClick';
import { CatalogNode } from '../../../../utils';

export type CatalogProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'catalog' }>;
};

export const Catalog: React.FC<CatalogProps> = ({ slideUpMenuLvl1: { isOpened } }) => {
  checkIsNotNever(isOpened);

  const [showImport, setShowImport] = useState(false);
  const [leafCategoryId, setLeafCategoryId] = useState<StrapiCustomModelCategoryId | null>(null);
  const [searchText, setSearchText] = useState('');
  const [_searchTextDebounced] = useDebounce(searchText, 300, {
    leading: false,
    trailing: true,
  });

  const searchTextDebounced = _searchTextDebounced.trim();

  const {
    fullCatalog,
    catalogPage,
    enterLeafCatalogPage,
    exitLeafCatalogPage,
  } = useCatalogPage({
    searchText: searchTextDebounced,
  });

  const { newCustomModelUploadData } = useNewCustomModelUploadData();

  const chooseModel = useCallback(async (id: StrapiCustomModelId, category: CatalogNode) => {
    const { isTouchScreen } = useTouchScreen.getState();

    catalogCustomModelClick({
      id,
      childrenType: category.childrenType,
      targetModels: category.items,
    });
    setSearchText('');

    if(isTouchScreen === true) {
      await closeSlideUpMenuLvl1({ preserveState: true });
    }
  }, []);

  return (
    <SlideUpAndFloatingMenusWrapper
      title={catalogPage.type === 'leaf' ? catalogPage.data.name : lang.slideUpMenus.catalog.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
        setLeafCategoryId(null);
      }}
      headerSpacing={{ bottom: 'sm' }}
      onBack={isNull(exitLeafCatalogPage) || searchTextDebounced !== '' ? undefined : () => {
        exitLeafCatalogPage();
        setLeafCategoryId(null);
      }}
      header={
        !isNull(newCustomModelUploadData) ? null : (
          <MenuItem paddingVertical='md' paddingHorizontal gap={10}>
            <SearchInput
              placeholder={lang.search}
              value={searchText}
              setValue={setSearchText}
            />
            {
              catalogPage.type === 'root' && (
                <>
                  <AppearanceIconButton
                    icon='arrowToHeart'
                    onClick={async () => {
                      await closeSlideUpMenuLvl1({ preserveState: true });
                      await openSlideUpMenuLvl2({
                        type: 'myAssets',
                        isOpened: true,
                        only2D: false,
                      });
                    }}
                  />
                  <AppearanceIconButton
                    icon='plus'
                    onClick={() => {
                      setShowImport(e => e === false);
                    }}
                  />
                </>
              )
            }
          </MenuItem>
        )
      }
      noDivider
    >
      <AnimatePresence>
        {
          (showImport === true || !isNull(newCustomModelUploadData)) && (
            <ImportPage onClose={() => setShowImport(false)} />
          )
        }
      </AnimatePresence>
      {
        isNull(newCustomModelUploadData) && (() => {
          switch(catalogPage.type) {
            case 'root':
              return (
                <RootCatalogPage
                  catalogPage={catalogPage}
                  enterLeafPage={ids => {
                    enterLeafCatalogPage(ids);
                    setSearchText('');
                  }}
                />
              );
            case 'leaf':
              return (
                <LeafCatalogPage
                  catalogPage={catalogPage}
                  onChooseModel={chooseModel}
                  leafCategoryId={leafCategoryId}
                  setLeafCategoryId={setLeafCategoryId}
                />
              );
            case 'search':
              return (
                <SearchCatalogPage
                  fullCatalog={fullCatalog}
                  catalogPage={catalogPage}
                  setLeafCategoryId={setLeafCategoryId}
                  enterLeafPage={ids => {
                    enterLeafCatalogPage(ids);
                    setSearchText('');
                  }}
                  onChooseModel={chooseModel}
                />
              );
            default:
              ((e: never) => e)(catalogPage);
              throw new Error('This should never happen. |do1oz9|');
          }
        })()
      }
    </SlideUpAndFloatingMenusWrapper>
  );
};
