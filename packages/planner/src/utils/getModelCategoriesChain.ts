import { getNotUndefined, isNull, isUndefined } from '@arthurka/ts-utils';
import { useCatalogDataResolved } from '../zustand/useCatalogData';
import { CustomModelCategory } from '../zod/CustomModelCategory';

export const getModelCategoriesChain = (url: string) => {
  const { models, categories } = useCatalogDataResolved.getState().catalogData;

  const model = models.find(e => e.url === url);
  if(isUndefined(model)) {
    return [];
  }

  const result: [CustomModelCategory, ...CustomModelCategory[]] = [
    getNotUndefined(categories.find(e => e.id === model.category.id), 'This should never happen. |pj27p8|'),
  ];

  let parentId = result[0].parentId;

  while(!isNull(parentId)) {
    const _parentId = parentId;
    const parentCategory = getNotUndefined(categories.find(e => e.id === _parentId), 'This should never happen. |aeq2jf|');

    result.push(parentCategory);
    parentId = parentCategory.parentId;
  }

  return result;
};
