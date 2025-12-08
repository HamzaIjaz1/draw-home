import { StrapiCustomModelCategoryId, StrapiCustomModelId } from '@draw-house/common/dist/brands';
import { Box, Divider, MaterialCategoryPicker, MaterialPicker } from '@draw-house/ui/dist/components';
import { getNotUndefined, isNull, isUndefined } from '@arthurka/ts-utils';
import { CatalogPageLeaf } from '../../../../customHooks/useCatalogPage';
import { catalogCompare, CatalogNode, getImageWithDefaultNull, sortCatalogPage } from '../../../../utils';

export type LeafCatalogPageProps = {
  catalogPage: CatalogPageLeaf;
  onChooseModel: (modelId: StrapiCustomModelId, category: CatalogNode) => void;
  leafCategoryId: null | StrapiCustomModelCategoryId;
  setLeafCategoryId: (id: StrapiCustomModelCategoryId) => void;
};

export const LeafCatalogPage: React.FC<LeafCatalogPageProps> = ({
  catalogPage,
  onChooseModel,
  leafCategoryId,
  setLeafCategoryId,
}) => {
  const subcategories = sortCatalogPage(catalogPage.data.subcategories);
  const category = (
    isNull(leafCategoryId)
      ? subcategories[0]
      : (
        getNotUndefined(
          subcategories.find(e => e.id === leafCategoryId),
          'This should never happen. |w48uc5|',
        )
      )
  );
  const items = isUndefined(category) ? catalogPage.data.items : category.items;

  return (
    <Box column gap={4}>
      {
        !isUndefined(category) && (
          <>
            <MaterialCategoryPicker
              chosenOption={isNull(leafCategoryId) ? category.id : leafCategoryId}
              onClick={id => {
                setLeafCategoryId(id);
              }}
              options={subcategories.map(({ id, name, image }) => ({
                id,
                name,
                image: getImageWithDefaultNull(image),
              }))}
              squareImages
              highlightVariant='background'
              size='sm'
            />
            <Divider />
          </>
        )
      }
      <MaterialPicker
        shape='round'
        onClick={id => {
          const modelCategory = !isUndefined(category) ? category : catalogPage.data;
          onChooseModel(id, modelCategory);
        }}
        options={
          items
            .toSorted(catalogCompare)
            .map(({ id, name, image }) => ({
              id,
              name,
              image: getImageWithDefaultNull(image),
              noBorder: true,
            }))
        }
      />
    </Box>
  );
};
