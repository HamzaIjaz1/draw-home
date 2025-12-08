import { StrapiCustomModelCategoryId } from '@draw-house/common/dist/brands';
import { getNotUndefined } from '@arthurka/ts-utils';
import { useCatalogDataResolved } from '../zustand/useCatalogData';
import { CustomModelCategory } from '../zod/CustomModelCategory';

export const extractAllCategoriesAndSubcategories = (targetCategoryIds: StrapiCustomModelCategoryId[]) => {
  const { categories } = useCatalogDataResolved.getState().catalogData;

  const targetCategories = targetCategoryIds.map(id => getNotUndefined(categories.find(e => e.id === id), 'Something went wrong. |ky8ovs|'));

  return targetCategories.flatMap(function recursive(e): CustomModelCategory[] {
    return [
      e,
      ...categories.filter(({ parentId }) => e.id === parentId).flatMap(recursive),
    ];
  });
};
