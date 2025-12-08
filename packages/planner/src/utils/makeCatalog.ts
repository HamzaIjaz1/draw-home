import { SafeOmit } from '@draw-house/common/dist/utils';
import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { CustomModelCategory } from '../zod/CustomModelCategory';
import { useCatalogDataResolved } from '../zustand/useCatalogData';
import { CustomModel } from '../zod';

export type CatalogNode = (
  & SafeOmit<CustomModelCategory, 'parentId'>
  & {
    items: Array<SafeOmit<CustomModel, 'category'>>;
    subcategories: CatalogNode[];
  }
);

export const makeCatalog = ({ models, categories: _categories }: ReturnType<typeof useCatalogDataResolved>['catalogData']): CatalogNode[] => {
  const categories = _categories.map(e => ({
    ...e,
    items: ((e: CatalogNode['items']) => e)([]),
    subcategories: ((e: CatalogNode[]) => e)([]),
  }));

  for(const { category: { id }, ...rest } of models) {
    const category = getNotUndefined(categories.find(e => e.id === id), 'Something went wrong. |e1m5y4|');

    category.items.push(rest);
  }

  for(const { parentId, ...rest } of categories) {
    if(isNull(parentId)) {
      continue;
    }

    const parentCategory = getNotUndefined(categories.find(e => e.id === parentId), 'Something went wrong. |x4ml5d|');

    parentCategory.subcategories.push(rest);
  }

  return (
    categories
      .filter(e => isNull(e.parentId))
      .map(({ parentId, ...rest }) => rest)
  );
};
