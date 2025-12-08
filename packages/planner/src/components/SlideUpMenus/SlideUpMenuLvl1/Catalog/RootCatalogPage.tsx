import { StrapiCustomModelCategoryId } from '@draw-house/common/dist/brands';
import { MenuSection } from '@draw-house/ui/dist/components';
import { CatalogPageRoot } from '../../../../customHooks/useCatalogPage';
import { getImageWithDefaultNull, sortCatalogPage } from '../../../../utils';

export type RootCatalogPageProps = {
  catalogPage: CatalogPageRoot;
  enterLeafPage: (ids: [StrapiCustomModelCategoryId, StrapiCustomModelCategoryId]) => void;
};

export const RootCatalogPage: React.FC<RootCatalogPageProps> = ({ catalogPage, enterLeafPage }) => (
  sortCatalogPage(catalogPage.data).map(({ id, name, subcategories }) => (
    <MenuSection
      key={id}
      title={name}
      type='collapsible'
      divider='summary'
      defaultExpanded
    >
      {
        subcategories.map(({ id: subcategoryId, name, image }) => (
          <MenuSection
            key={subcategoryId}
            title={name}
            type='buttonlike'
            titleVariant='pale'
            image={getImageWithDefaultNull(image)}
            onClick={() => {
              enterLeafPage([id, subcategoryId]);
            }}
          />
        ))
      }
    </MenuSection>
  ))
);
