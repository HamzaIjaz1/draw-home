import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { useMemo, useState } from 'react';
import { getNotUndefined, isArrayLength, isNull } from '@arthurka/ts-utils';
import assert from 'assert';
import { Box3, Vector3 } from 'three';
import { closeSlideUpMenuLvl1, setCustomModelParams, setWallFurnitureParams, SlideUpMenuLvl1Store, useCustomModels, useLevels, useWalls } from '../../../zustand';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { useCatalogDataResolved } from '../../../zustand/useCatalogData';
import { CatalogNode, filterCatalogLeaves, findCatalogNodeByModelUrl, makeCatalog } from '../../../utils';
import { ReplaceCustomModel } from '../../ReplaceCustomModel';
import { lang } from '../../../lang';
import { calculateFurnitureReplacementYPosition } from '../../../utils/calculateFurnitureYPosition';
import { loadGltf } from '../../../utils/loadGltf';
import { RootCatalogPage } from './Catalog/RootCatalogPage';
import { selectCatalogLevel } from '../../../customHooks/useCatalogPage';

type CatalogNodeWithParent = (
  & CatalogNode
  & {
    parent: CatalogNode;
  }
);

type ReplaceModelCatalogProps = {
  replacementElement: NonNullable<ReplaceElementCatalogProps['slideUpMenuLvl1']['replacementElement']>;
  replacementParent: null | CatalogNodeWithParent;
  catalog: CatalogNode[];
};

const ReplaceModelCatalog: React.FC<ReplaceModelCatalogProps> = ({
  replacementElement,
  replacementParent,
  catalog,
}) => {
  const { customModels } = useCustomModels();
  const { walls } = useWalls();

  const { targetElement, modelCategoryId, parentSubcategories, newChildrenType } = useMemo(() => {
    const targetElement = (() => {
      switch(replacementElement.type) {
        case 'customModel':
        case 'column':
          return getNotUndefined(customModels.find(e => e.id === replacementElement.id), 'Something went wrong. |zuf8wa|');
        case 'door':
        case 'window':
          return getNotUndefined(walls.flatMap(wall => wall.furnitures).find(e => e.id === replacementElement.id), 'Something went wrong. |kzj4c7|');
        default:
          ((e: never) => e)(replacementElement);
          throw new Error('This should never happen. |a0d8o1|');
      }
    })();

    if(!isNull(replacementParent)) {
      const { parent, ...child } = replacementParent;

      if(isArrayLength(child.subcategories, '>', 0)) {
        return {
          targetElement,
          modelCategoryId: child.subcategories[0].id,
          newChildrenType: child.subcategories[0].childrenType,
          parentSubcategories: child.subcategories,
        };
      }

      return {
        targetElement,
        modelCategoryId: child.id,
        newChildrenType: child.childrenType,
        parentSubcategories: parent.subcategories,
      };
    }

    const { current, parent } = findCatalogNodeByModelUrl(catalog, targetElement.url);

    return {
      targetElement,
      modelCategoryId: isNull(current) ? null : current.id,
      newChildrenType: null,
      parentCategoryName: isNull(parent) ? null : parent.name,
      parentSubcategories: isNull(parent) ? null : (
        parent.subcategories.filter(e => {
          switch(replacementElement.type) {
            case 'customModel':
              return (
                targetElement.type === 'regular'
                  ? isNull(e.childrenType)
                  : targetElement.type === 'column'
                    ? e.childrenType === 'columns'
                    : false
              );
            case 'column':
              return e.childrenType === 'columns';
            case 'door':
              return e.childrenType === 'doors';
            case 'window':
              return e.childrenType === 'windows';
            default:
              ((e: never) => e)(replacementElement);
              throw new Error('This should never happen. |7d5805|');
          }
        })
      ),
    };
  }, [replacementElement, replacementParent, customModels, walls, catalog]);

  if(isNull(modelCategoryId) || isNull(parentSubcategories)) {
    return null;
  }

  return (
    <ReplaceCustomModel
      modelCategoryId={modelCategoryId}
      parentSubcategories={parentSubcategories}
      targetModel={targetElement}
      replaceModel={async ({ url }, modelSize) => {
        switch(replacementElement.type) {
          case 'customModel':
          case 'column':
            setCustomModelParams(replacementElement.id, { url });
            break;
          case 'door':
          case 'window': {
            assert(targetElement.type === 'window' || targetElement.type === 'door', 'This should never happen. |iy8r5m|');

            const wall = getNotUndefined(walls.find(e => e.furnitures.some(e => e.id === replacementElement.id)), 'Something went wrong. |us4mvs|');
            const { height } = getNotUndefined(useLevels.getState().levels.find(e => e.id === wall.levelId), 'Something went wrong. |820is7|');
            const currentFurnitureHeight = await (async () => {
              try {
                const { scene } = await loadGltf(targetElement.url);
                return new Box3().setFromObject(scene).getSize(new Vector3()).y;
              } catch(e) {
                console.warn('Failed to load model |u6fau8|');
                return null;
              }
            })();

            const onWallCoordinateY = calculateFurnitureReplacementYPosition(
              isNull(targetElement.height) ? currentFurnitureHeight : targetElement.height,
              modelSize.y,
              targetElement.onWallCoordinateY,
              isNull(wall.height) ? height : wall.height,
            );

            const type: typeof replacementElement.type = (
              isNull(newChildrenType)
                ? replacementElement.type
                : (() => {
                  switch(newChildrenType) {
                    case 'doors':
                      return 'door';
                    case 'windows':
                      return 'window';
                    case 'assets-2d':
                    case 'columns':
                    case 'stairs':
                      throw new Error('This should never happen. |dv6kp3|');
                    default:
                      ((e: never) => e)(newChildrenType);
                      throw new Error('This should never happen. |p1je6e|');
                  }
                })()
            );

            setWallFurnitureParams(replacementElement.id, null, {
              type,
              url,
              onWallCoordinateY,
            });
            break;
          }
          default:
            ((e: never) => e)(replacementElement);
            throw new Error('This should never happen. |d7l8ix|');
        }
      }}
    />
  );
};

export type ReplaceElementCatalogProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'replaceElementCatalog' }>;
};

export const ReplaceElementCatalog: React.FC<ReplaceElementCatalogProps> = ({
  slideUpMenuLvl1: {
    isOpened,
    replacementElement,
  },
}) => {
  checkIsNotNever(isOpened);
  assert(!isNull(replacementElement), 'This should never happen. |e1bn5l|');

  const [showParentCatalog, setShowParentCatalog] = useState(false);
  const [replacementParent, setReplacementParent] = useState<CatalogNodeWithParent | null>(null);

  const { catalogData } = useCatalogDataResolved();
  const catalog = useMemo(() => makeCatalog(catalogData), [catalogData]);

  const typeFilter = ((): null | ((e: CatalogNode) => boolean) => {
    switch(replacementElement.type) {
      case 'customModel':
        return e => isNull(e.childrenType);
      case 'door':
      case 'window':
        return e => e.childrenType === 'doors' || e.childrenType === 'windows';
      case 'column':
        return null;
      default:
        ((e: never) => e)(replacementElement);
        throw new Error('This should never happen. |czc5g9|');
    }
  })();

  const typeRestrictedCatalog = (
    isNull(typeFilter)
      ? null
      : filterCatalogLeaves(catalog, e => typeFilter(e) && e.items.length > 0)
  );

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.replaceElementCatalog.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
      onBack={
        showParentCatalog === false && !isNull(typeRestrictedCatalog)
          ? () => setShowParentCatalog(true)
          : undefined
      }
    >
      {
        showParentCatalog === false
          ? (
            <ReplaceModelCatalog
              replacementElement={replacementElement}
              replacementParent={replacementParent}
              catalog={catalog}
            />
          )
          : (() => {
            assert(!isNull(typeRestrictedCatalog), 'This should never happen. |az6fgn|');

            return (
              <RootCatalogPage
                catalogPage={{
                  type: 'root',
                  data: typeRestrictedCatalog,
                }}
                enterLeafPage={([id1, id2]) => {
                  setShowParentCatalog(false);
                  setReplacementParent({
                    ...selectCatalogLevel(typeRestrictedCatalog, [id1, id2]),
                    parent: selectCatalogLevel(typeRestrictedCatalog, [id1]),
                  });
                }}
              />
            );
          })()
      }
    </SlideUpAndFloatingMenusWrapper>
  );
};
