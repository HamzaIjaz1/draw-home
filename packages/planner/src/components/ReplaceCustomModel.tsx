import { useEffect, useState } from 'react';
import assert from 'assert';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { MaterialCategoryPicker, MenuSection } from '@draw-house/ui/dist/components';
import { Vector3 } from 'three';
import { CatalogNode, getImageWithDefaultNull } from '../utils';
import { lang } from '../lang';
import { useLoadModelSize } from '../customHooks/useLoadModelSize';
import { CustomModelsStore, WallsStore } from '../zustand';

export type ReplaceCustomModelProps = {
  modelCategoryId: CatalogNode['id'];
  parentSubcategories: CatalogNode['subcategories'];
  targetModel: WallsStore['walls'][number]['furnitures'][number] | CustomModelsStore['customModels'][number];
  replaceModel: (model: CatalogNode['items'][number], size: Vector3) => void;
};

export const ReplaceCustomModel: React.FC<ReplaceCustomModelProps> = ({
  modelCategoryId,
  parentSubcategories,
  targetModel,
  replaceModel,
}) => {
  const [chosenCategoryId, setChosenCategoryId] = useState(modelCategoryId);
  const [replacementUrl, setReplacementUrl] = useState<string | null>(null);
  const modelSize = useLoadModelSize(replacementUrl);

  useEffect(() => {
    setChosenCategoryId(modelCategoryId);
  }, [modelCategoryId]);
  useEffect(() => {
    setReplacementUrl(null);
  }, [chosenCategoryId]);

  useEffect(() => {
    if(!isNull(replacementUrl) && !isNull(modelSize)) {
      const categories = parentSubcategories.filter(e => e.items.length > 0 && e.subcategories.length === 0);
      const chosenCategory = categories.find(e => e.id === chosenCategoryId);

      if(!isUndefined(chosenCategory)) {
        const item = chosenCategory.items.find(e => e.url === replacementUrl);

        if(!isUndefined(item)) {
          const width = isNull(targetModel.width) ? modelSize.x : targetModel.width;
          const height = isNull(targetModel.height) ? modelSize.y : targetModel.height;
          const depth = isNull(targetModel.depth) ? modelSize.z : targetModel.depth;

          replaceModel(item, new Vector3(width, height, depth));
          setReplacementUrl(null);
        }
      }
    }
  }, [modelSize, replacementUrl, chosenCategoryId, parentSubcategories, replaceModel, targetModel]);

  const categories = (
    parentSubcategories
      .filter(e => e.items.length > 0 && e.subcategories.length === 0)
      .toSorted((a, b) => a.order - b.order)
  );

  const chosenCategory = categories.find(e => e.id === chosenCategoryId);
  if(isUndefined(chosenCategory)) {
    return null;
  }

  const chosenItem = chosenCategory.items.find(e => e.url === targetModel.url);

  return (
    <MenuSection
      title={lang.slideUpMenus.customModelSettings.quickReplace}
      type='collapsible'
      defaultExpanded
      divider='content'
      titleVariant='primary-500'
    >
      <MaterialCategoryPicker
        chosenOption={chosenCategoryId}
        options={
          categories.map(e => ({
            id: e.id,
            name: e.name,
            image: getImageWithDefaultNull(e.image),
          }))
        }
        onClick={setChosenCategoryId}
        squareImages
        highlightVariant='background'
        size='sm'
      />
      <MaterialCategoryPicker
        chosenOption={isUndefined(chosenItem) ? undefined : chosenItem.id}
        options={
          chosenCategory.items
            .toSorted((a, b) => a.order - b.order)
            .map(e => ({
              id: e.id,
              name: e.name,
              image: getImageWithDefaultNull(e.thumbnail),
            }))
        }
        onClick={id => {
          const item = chosenCategory.items.find(e => e.id === id);
          assert(!isUndefined(item), 'This should never happen. |dx27p6|');
          setReplacementUrl(item.url);
        }}
        squareImages
      />
    </MenuSection>
  );
};
