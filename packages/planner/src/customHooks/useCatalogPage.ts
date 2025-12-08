import assert from 'assert';
import { useCallback, useMemo, useState } from 'react';
import { isArrayLength, isNull, isUndefined } from '@arthurka/ts-utils';
import { StrapiCustomModelCategoryId } from '@draw-house/common/dist/brands';
import fuzzysort from 'fuzzysort';
import { useFullCatalog } from './useFullCatalog';
import { CatalogNode, filterCatalogLeaves, traverseCatalogBreadthFirst } from '../utils';

export const selectCatalogLevel = (
  catalog: CatalogNode[],
  chosenCategoryIds: [CatalogNode['id'], ...Array<CatalogNode['id']>],
): CatalogNode => {
  let node: CatalogNode | null = null;

  for(const id of chosenCategoryIds) {
    const categories: CatalogNode[] = isNull(node) ? catalog : node.subcategories;
    const category = categories.find(e => e.id === id);
    assert(!isUndefined(category), 'Something went wrong. |3s81e3|');

    node = category;
  }

  assert(!isNull(node), 'Something went wrong. |a7ymo2|');

  return node;
};

export type CatalogPageRoot = {
  type: 'root';
  data: CatalogNode[];
};

export type CatalogPageLeaf = {
  type: 'leaf';
  data: CatalogNode;
};

export type SearchCategoryItem = (
  & CatalogNode
  & {
    type: 'category';
    ancestorIds: (
      | [StrapiCustomModelCategoryId]
      | [StrapiCustomModelCategoryId, StrapiCustomModelCategoryId]
    );
  }
);

export type SearchModelItem = (
  & CatalogNode['items'][number]
  & {
    type: 'model';
    ancestorIds: (
      | [StrapiCustomModelCategoryId, StrapiCustomModelCategoryId]
      | [StrapiCustomModelCategoryId, StrapiCustomModelCategoryId, StrapiCustomModelCategoryId]
    );
  }
);

export type SearchItem = (
  | SearchCategoryItem
  | SearchModelItem
);

export type CatalogPageSearch = {
  type: 'search';
  data: Array<SearchItem & { score: number }>;
};

type Props = {
  searchText: string;
};

const warnLogCache = new Set<string>();

export const useCatalogPage = ({ searchText }: Props) => {
  const [chosenCategoryIds, setChosenCategoryIds] = useState<[StrapiCustomModelCategoryId, StrapiCustomModelCategoryId] | []>([]);
  const { fullCatalog } = useFullCatalog();

  const catalog = useMemo(() => {
    const nonUserCategories = fullCatalog.filter(e => e.userUpload === 'forbidden');
    return filterCatalogLeaves(nonUserCategories, e => e.items.length > 0);
  }, [fullCatalog]);

  const catalogForSearch = useMemo(() => {
    const catalogForSearch: SearchItem[] = [];

    const deeplyNestedCategories: StrapiCustomModelCategoryId[] = [];

    traverseCatalogBreadthFirst(catalog, (node, ancestorIds) => {
      switch(true) {
        case isArrayLength(ancestorIds, '===', 0):
          return;
        case isArrayLength(ancestorIds, '===', 1):
        case isArrayLength(ancestorIds, '===', 2):
          if(node.subcategories.length === 0) {
            for(const model of node.items) {
              catalogForSearch.push({
                ...model,
                type: 'model',
                ancestorIds: [...ancestorIds, node.id],
              });
            }
          }

          catalogForSearch.push({
            ...node,
            type: 'category',
            ancestorIds,
          });
          return;
        default:
          deeplyNestedCategories.push(node.id);
      }
    });

    if(deeplyNestedCategories.length > 0 && !warnLogCache.has(JSON.stringify(deeplyNestedCategories))) {
      warnLogCache.add(JSON.stringify(deeplyNestedCategories));
      console.warn('|zh3p0x| These model categories are nested too deeply:', deeplyNestedCategories);
    }

    return catalogForSearch;
  }, [catalog]);

  const searchResults = useMemo(() => {
    if(searchText === '') {
      return null;
    }

    const result = fuzzysort.go(searchText, catalogForSearch, {
      key: e => e.name,
      limit: 20,
      threshold: 0.2,
    });

    const arr: Array<SearchItem & { score: number }> = [];
    for(const { score, obj } of result) {
      arr.push({ ...obj, score });
    }

    return arr;
  }, [catalogForSearch, searchText]);

  const exitLeafCatalogPage = useCallback(() => {
    setChosenCategoryIds([]);
  }, []);

  const catalogPage: CatalogPageRoot | CatalogPageLeaf | CatalogPageSearch = (
    !isNull(searchResults)
      ? {
        type: 'search',
        data: searchResults,
      }
      : isArrayLength(chosenCategoryIds, '>', 0)
        ? {
          type: 'leaf',
          data: selectCatalogLevel(catalog, chosenCategoryIds),
        }
        : {
          type: 'root',
          data: catalog,
        }
  );

  return {
    fullCatalog: catalog,
    catalogPage,
    enterLeafCatalogPage: (ids: [StrapiCustomModelCategoryId, StrapiCustomModelCategoryId]) => setChosenCategoryIds(ids),
    exitLeafCatalogPage: chosenCategoryIds.length === 0 ? null : exitLeafCatalogPage,
  };
};
