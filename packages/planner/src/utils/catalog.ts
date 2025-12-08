import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { SafeOmit } from '@draw-house/common/dist/utils';
import { CatalogNode } from './makeCatalog';

type FindInCatalogCb<T> = (node: CatalogNode, parentNode: null | CatalogNode) => (
  | ['found', T]
  | ['not-found']
);

const findInCatalog = <T>(catalog: CatalogNode[], cb: FindInCatalogCb<T>, empty: T): T => {
  type StackItem = {
    node: CatalogNode;
    parentNode: null | CatalogNode;
  };
  const stack = catalog.map((root): StackItem => ({
    node: root,
    parentNode: null,
  }));

  while(stack.length > 0) {
    const { node, parentNode } = getNotUndefined(stack.pop(), 'This should never happen. |6149vg|');

    const [result, payload] = cb(node, parentNode);
    if(result === 'found') {
      return payload;
    }

    for(const sub of node.subcategories) {
      stack.push({ node: sub, parentNode: node });
    }
  }

  return empty;
};

type FindByUrlRes = Record<'current' | 'parent', null | CatalogNode>;

export const findCatalogNodeByModelUrl = (catalog: CatalogNode[], modelUrl: string): FindByUrlRes => (
  findInCatalog<FindByUrlRes>(
    catalog,
    (node, parent) => (
      node.items.some(e => e.url === modelUrl)
        ? ['found', { current: node, parent }]
        : ['not-found']
    ),
    { current: null, parent: null },
  )
);

export const traverseCatalogBreadthFirst = (
  roots: CatalogNode[],
  callback: (node: CatalogNode, ancestorIds: Array<CatalogNode['id']>) => void,
): void => {
  type StackItem = { node: CatalogNode; ancestorIds: Array<CatalogNode['id']> };
  const stack = roots.map((root): StackItem => ({
    node: root,
    ancestorIds: [],
  }));

  while(stack.length > 0) {
    const { node, ancestorIds } = getNotUndefined(stack.pop(), 'This should never happen. |o6ne7l|');

    callback(node, ancestorIds);

    for(const sub of node.subcategories) {
      stack.push({ node: sub, ancestorIds: [...ancestorIds, node.id] });
    }
  }
};

type MarkedCatalogNode = (
  & SafeOmit<CatalogNode, 'subcategories'>
  & {
    subcategories: MarkedCatalogNode[];
    _isLeaf: boolean;
  }
);

const markLeaves = (e: CatalogNode): MarkedCatalogNode => ({
  ...e,
  subcategories: e.subcategories.map(markLeaves),
  _isLeaf: e.subcategories.length === 0,
});
const unmarkLeaves = ({ _isLeaf, ...e }: MarkedCatalogNode): CatalogNode => ({
  ...e,
  subcategories: e.subcategories.map(unmarkLeaves),
});
const filterTree = (node: MarkedCatalogNode, predicate: (e: CatalogNode) => boolean): null | MarkedCatalogNode => {
  if(node._isLeaf === true && predicate(node) === false) {
    return null;
  }

  const subcategories = (
    node.subcategories
      .map(e => filterTree(e, predicate))
      .filter(e => !isNull(e))
  );

  return node._isLeaf === false && subcategories.length === 0 ? null : {
    ...node,
    subcategories,
  };
};

/**
 * Filters the catalog by applying the predicate to leaves only. \
 * Non-leaf nodes are kept only if they contain surviving leaves.
 */
export const filterCatalogLeaves = (catalog: CatalogNode[], predicate: (e: CatalogNode) => boolean) => (
  catalog
    .map(markLeaves)
    .map(e => filterTree(e, predicate))
    .filter(e => !isNull(e))
    .map(unmarkLeaves)
);

export const catalogCompare = <K extends { order: number; name: string }>(a: K, b: K) => (
  a.order - b.order || a.name.localeCompare(b.name)
);

export const sortCatalogPage = <T extends CatalogNode>(catalog: T[]): T[] => (
  catalog
    .toSorted(catalogCompare)
    .map(e => ({
      ...e,
      subcategories: e.subcategories.toSorted(catalogCompare),
      items: e.items.toSorted(catalogCompare),
    }))
);
