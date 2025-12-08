import { MaterialPicker, MenuSection } from '@draw-house/ui/dist/components';
import { isArrayLength, isUndefined } from '@arthurka/ts-utils';
import { useMemo } from 'react';
import assert from 'assert';
import { StrapiCustomModelCategoryId, StrapiCustomModelId } from '@draw-house/common/dist/brands';
import { CatalogPageSearch, SearchCategoryItem, SearchItem, SearchModelItem, selectCatalogLevel } from '../../../../customHooks/useCatalogPage';
import { CatalogNode, getImageWithDefaultNull } from '../../../../utils';

const round = (score: number): number => {
  const x = 10;
  return Math.floor(score * x) / x;
};
const rankType = (type: SearchItem['type']): number => ({
  category: 0,
  model: 1,
} satisfies Record<typeof type, number>)[type];

export type SearchCatalogPageProps = {
  fullCatalog: CatalogNode[];
  catalogPage: CatalogPageSearch;
  enterLeafPage: (ids: [StrapiCustomModelCategoryId, StrapiCustomModelCategoryId]) => void;
  onChooseModel: (modelId: StrapiCustomModelId, category: CatalogNode) => void;
  setLeafCategoryId: (id: StrapiCustomModelCategoryId) => void;
};

export const SearchCatalogPage: React.FC<SearchCatalogPageProps> = ({
  fullCatalog,
  catalogPage: { data },
  enterLeafPage,
  onChooseModel,
  setLeafCategoryId,
}) => {
  const grouped = useMemo(() => {
    type CategoryGroup = { type: 'category'; data: SearchCategoryItem[] };
    type ModelGroup = { type: 'model'; data: SearchModelItem[] };
    const grouped: Array<CategoryGroup | ModelGroup> = [];

    let prevItemType: null | SearchItem['type'] = null;

    data
      .map(e => ({ ...e, _score: round(e.score) }))
      .toSorted((a, b) => b._score - a._score || rankType(b.type) - rankType(a.type) || a.order - b.order)
      .forEach(item => {
        if(item.type === prevItemType) {
          const lastGroup = grouped[grouped.length - 1];
          assert(!isUndefined(lastGroup), 'This should never happen. |r7xwn6|');

          switch(lastGroup.type) {
            case 'category':
              assert(item.type === 'category', 'This should never happen. |13c85t|');
              lastGroup.data.push(item);
              break;
            case 'model':
              assert(item.type === 'model', 'This should never happen. |vg7sos|');
              lastGroup.data.push(item);
              break;
            default:
              ((e: never) => e)(lastGroup);
              throw new Error('This should never happen. |l5v0t8|');
          }
        } else {
          switch(item.type) {
            case 'category':
              grouped.push({ type: item.type, data: [item] });
              break;
            case 'model':
              grouped.push({ type: item.type, data: [item] });
              break;
            default:
              ((e: never) => e)(item);
              throw new Error('This should never happen. |mh1tv9|');
          }
        }

        prevItemType = item.type;
      });

    return grouped;
  }, [data]);

  return grouped.map(({ type, data }) => {
    switch(type) {
      case 'category':
        return data.map(({ id, name, image, ancestorIds }) => (
          <MenuSection
            key={id}
            title={name}
            type='buttonlike'
            titleVariant='pale'
            image={getImageWithDefaultNull(image)}
            onClick={() => {
              if(isArrayLength(ancestorIds, '===', 1)) {
                enterLeafPage([ancestorIds[0], id]);
                return;
              }

              enterLeafPage(ancestorIds);
              setLeafCategoryId(id);
            }}
          />
        ));
      case 'model':
        return (
          <MaterialPicker
            key={data.map(e => e.id).join('')}
            shape='round'
            onClick={id => {
              const model = data.find(e => e.id === id);
              assert(!isUndefined(model), 'This should never happen. |0109ht|');
              const category = selectCatalogLevel(fullCatalog, model.ancestorIds);
              onChooseModel(id, category);
            }}
            options={
              data.map(({ id, name, image }) => ({
                id,
                name,
                image: getImageWithDefaultNull(image),
                noBorder: true,
              }))
            }
          />
        );
      default:
        ((e: never) => e)(type);
        throw new Error('This should never happen. |vy17jr|');
    }
  });
};
