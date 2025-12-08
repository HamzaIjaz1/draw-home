import { MenuItem, MenuSection, SelectRow, TextField } from '@draw-house/ui/dist/components';
import { useEffect, useMemo } from 'react';
import { Material } from '@draw-house/ui/dist/components/Material';
import assert from 'assert';
import { getNotUndefined, isNull, isNullish, isUndefined, ObjEntries } from '@arthurka/ts-utils';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { Box3, Vector3 } from 'three';
import { isPositive } from '@draw-house/common/dist/brands';
import { AnimatePresence } from 'framer-motion';
import { closeSlideUpMenuLvl1, openSlideUpMenuLvl2, setCustomModelParams, SlideUpMenuLvl1Store, useCustomModels, useGlobalSettings, useLevels } from '../../../zustand';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { findCatalogNodeByModelUrl, getImageWithDefault, makeCatalog, measurements } from '../../../utils';
import { SuspenseHOC } from '../../SuspenseHOC';
import { MeasurementPairedInputRow } from '../../MeasurementPairedInputRow';
import { useModelMaterials } from '../../../zustand/useModelMaterials';
import { extractMaterialsFromScene } from '../../../utils/extractMaterialsFromScene';
import { ReplaceCustomModel } from '../../ReplaceCustomModel';
import { useCatalogDataResolved } from '../../../zustand/useCatalogData';
import { useAppearanceColor } from '../../../zustand/useAppearanceColor';
import { useTexturesMixedWithColor } from '../../../customHooks/useTextureMixedWithColor';
import { compositeOperations } from '../../../constants';
import { Animations } from '../../animations';

export type CustomModelSettingsProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'customModel' }>;
};

export const CustomModelSettings: React.FC<CustomModelSettingsProps> = SuspenseHOC(({
  slideUpMenuLvl1: {
    isOpened,
    customModelId,
  },
}) => {
  checkIsNotNever(isOpened);

  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const { customModels } = useCustomModels();
  const { modelMaterials, modelMaterialPreviews } = useModelMaterials();
  const { levels } = useLevels();

  const targetCustomModel = isNull(customModelId) ? null : customModels.find(e => e.id === customModelId);
  // Note: optional chaining is critical here
  assert(isNullish(targetCustomModel) || targetCustomModel?.type === 'regular' || targetCustomModel?.type === 'column', 'Something went wrong. |9c0eyr|');

  const targetLevel = isNullish(targetCustomModel) ? null : getNotUndefined(levels.find(e => e.id === targetCustomModel.levelId), 'This should never happen. |kd7ufz|');
  const filteredModelMaterials = ObjEntries(modelMaterials).filter(([name]) => (
    isNullish(targetCustomModel)
      ? false
      : targetCustomModel.appearanceOptionsExceptionTextureNames.includes(name) !== targetCustomModel.appearanceOptionsShown
  ));

  const { scene } = useGLTF(!isNullish(targetCustomModel) ? targetCustomModel.url : '/stub.glb');
  const defaultSizes = useMemo(() => {
    const clonedScene = clone(scene);
    const box = new Box3().setFromObject(clonedScene);

    const size = box.getSize(new Vector3());

    return {
      width: size.x,
      height: size.y,
      depth: size.z,
    };
  }, [scene]);

  const customModelHeight = (
    isNullish(targetCustomModel) || isNull(targetCustomModel.height)
      ? defaultSizes.height
      : targetCustomModel.height
  );

  const { catalogData } = useCatalogDataResolved();
  const catalog = useMemo(() => makeCatalog(catalogData), [catalogData]);

  const { catalogCategory, parentCatalogCategory } = (() => {
    if(isNullish(targetCustomModel)) {
      return {
        catalogCategory: null,
        parentCatalogCategory: null,
      };
    }

    const { current, parent } = findCatalogNodeByModelUrl(catalog, targetCustomModel.url);

    return {
      catalogCategory: current,
      parentCatalogCategory: isNull(parent) ? null : {
        ...parent,
        subcategories: parent.subcategories.filter(e => {
          switch(targetCustomModel.type) {
            case 'regular':
              return isNull(e.childrenType);
            case 'column':
              return e.childrenType === 'columns';
            default:
              ((e: never) => e)(targetCustomModel);
              throw new Error('This should never happen. |2i5fth|');
          }
        }),
      },
    };
  })();

  useEffect(() => {
    useModelMaterials.setState({
      modelMaterials: extractMaterialsFromScene(scene),
    });
  }, [scene]);

  const getMaterialPreviewImage = (name: string) => {
    if(!isNullish(targetCustomModel) && !isNull(targetCustomModel.overrideMaterials)) {
      const e = targetCustomModel.overrideMaterials[name];

      if(!isUndefined(e)) {
        return getImageWithDefault(e.texture.attributes.preview.data?.attributes.formats?.thumbnail.url);
      }
    }

    return getImageWithDefault(modelMaterialPreviews[name]);
  };

  const texturesMixedWithColors = useTexturesMixedWithColor(
    ObjEntries(modelMaterials).map(([name]) => {
      const overrideMaterial = (
        isNullish(targetCustomModel) || isNull(targetCustomModel.overrideMaterials) ? null : targetCustomModel.overrideMaterials[name]
      );

      return {
        originalImageSrc: getMaterialPreviewImage(name),
        overlayColor: isNullish(overrideMaterial) || isNull(overrideMaterial.colorOverlay) ? null : overrideMaterial.colorOverlay.value.hexa(),
        compositeOperation: isNullish(overrideMaterial) ? compositeOperations[0] : overrideMaterial.compositeOperation,
      };
    }),
  );

  return (
    <SlideUpAndFloatingMenusWrapper
      title={
        lang.slideUpMenus.customModelSettings.title(
          isNull(parentCatalogCategory) ? '' : parentCatalogCategory.name,
        )
      }
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
    >
      {
        !isNullish(targetCustomModel) && !isNull(catalogCategory) && !isNull(parentCatalogCategory) && (
          <ReplaceCustomModel
            modelCategoryId={catalogCategory.id}
            parentSubcategories={parentCatalogCategory.subcategories}
            targetModel={targetCustomModel}
            replaceModel={({ url, appearanceOptionsShown, appearanceOptionsExceptionTextureNames }) => {
              setCustomModelParams(targetCustomModel.id, { url, appearanceOptionsShown, appearanceOptionsExceptionTextureNames });
            }}
          />
        )
      }
      <MenuItem paddingHorizontal divider>
        <TextField
          type='text'
          label={lang.slideUpMenus.customModelSettings.commentName}
          size='lg'
          value={isNullish(targetCustomModel) ? '' : targetCustomModel.commentName}
          onChange={commentName => {
            assert(!isNullish(targetCustomModel), 'This should never happen. |o50tac|');

            setCustomModelParams(targetCustomModel.id, { commentName });
          }}
        />
      </MenuItem>
      <AnimatePresence>
        {
          filteredModelMaterials.length > 0 && (
            <Animations.collapseBlock>
              <MenuSection
                type='collapsible'
                defaultExpanded
                title={lang.slideUpMenus.appearance.title}
              >
                {
                  filteredModelMaterials.map(([name], i) => (
                    <MenuItem key={name} divider spaceBetween>
                      <Material
                        text={name === '' || name.trim() !== name ? `"${name}"` : name}
                        image={texturesMixedWithColors[i] ?? getMaterialPreviewImage(name)}
                        onClick={async () => {
                          assert(!isNullish(targetCustomModel), 'This should never happen. |h9ghz3|');

                          const overrideMaterial = isNull(targetCustomModel.overrideMaterials) ? null : targetCustomModel.overrideMaterials[name];

                          await closeSlideUpMenuLvl1({ preserveState: true });
                          useAppearanceColor.setState({
                            appearanceColor: {
                              type: 'customModelAppearance',
                              color: isNullish(overrideMaterial) ? null : overrideMaterial.colorOverlay,
                            },
                          });
                          await openSlideUpMenuLvl2({
                            type: 'customModelAppearance',
                            isOpened: true,
                            customModelId: targetCustomModel.id,
                            overrideMaterialName: name,
                            applyToAll: {
                              isActive: false,
                              type: 'sameLevelSameCustomModels',
                            },
                          });
                        }}
                      />
                    </MenuItem>
                  ))
                }
              </MenuSection>
            </Animations.collapseBlock>
          )
        }
      </AnimatePresence>
      <MenuSection type='collapsible' defaultExpanded title={lang.settings}>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='custom-model-height'
            label={lang.height}
            measurementSystem={measurementSystem}
            value={
              isNullish(targetCustomModel) || isNull(targetLevel)
                ? 0
                : targetCustomModel.type === 'column'
                  ? measurements.to(!isNull(targetCustomModel.height) ? targetCustomModel.height : targetLevel.height, measurementSystem)
                  : measurements.to(isNull(targetCustomModel.height) ? defaultSizes.height : targetCustomModel.height, measurementSystem)
            }
            onChange={value => {
              assert(!isNull(customModelId), 'This should never happen. |8dr5u7|');

              const height = measurements.from(value, measurementSystem);
              if(!isPositive(height)) {
                return;
              }

              setCustomModelParams(customModelId, { height });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='custom-model-width'
            label={lang.width}
            measurementSystem={measurementSystem}
            value={
              measurements.to(
                isNullish(targetCustomModel) || isNull(targetCustomModel.width)
                  ? defaultSizes.width
                  : targetCustomModel.width,
                measurementSystem,
              )
            }
            onChange={value => {
              assert(!isNull(customModelId), 'This should never happen. |ne5atf|');

              const width = measurements.from(value, measurementSystem);
              if(!isPositive(width)) {
                return;
              }

              setCustomModelParams(customModelId, { width });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='custom-model-length'
            label={lang.length}
            measurementSystem={measurementSystem}
            value={
              measurements.to(
                isNullish(targetCustomModel) || isNull(targetCustomModel.depth)
                  ? defaultSizes.depth
                  : targetCustomModel.depth,
                measurementSystem,
              )
            }
            onChange={value => {
              assert(!isNull(customModelId), 'This should never happen. |o5c15x|');

              const depth = measurements.from(value, measurementSystem);
              if(!isPositive(depth)) {
                return;
              }

              setCustomModelParams(customModelId, { depth });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='custom-model-distanceToCeiling'
            label={lang.slideUpMenus.customModelSettings.distanceToCeiling}
            measurementSystem={measurementSystem}
            value={
              measurements.to(
                isNullish(targetCustomModel) || isNull(targetLevel)
                  ? 0
                  : targetLevel.elevation + targetLevel.height - targetCustomModel.position.y - customModelHeight,
                measurementSystem,
              )
            }
            onChange={value => {
              assert(!isNullish(targetCustomModel) && !isNull(targetLevel), 'This should never happen. |yx832m|');

              const distanceToCeiling = measurements.from(value, measurementSystem);
              const { x, z } = targetCustomModel.position;

              setCustomModelParams(targetCustomModel.id, {
                position: new Vector3(x, targetLevel.elevation + targetLevel.height - distanceToCeiling - customModelHeight, z),
              });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='custom-model-distanceToFloor'
            label={lang.slideUpMenus.customModelSettings.distanceToFloor}
            measurementSystem={measurementSystem}
            value={
              measurements.to(
                isNullish(targetCustomModel) || isNull(targetLevel) ? 0 : targetCustomModel.position.y - targetLevel.elevation,
                measurementSystem,
              )
            }
            onChange={e => {
              assert(!isNullish(targetCustomModel) && !isNull(targetLevel), 'This should never happen. |jn3en2|');

              const distanceToFloor = measurements.from(e, measurementSystem);
              const { x, z } = targetCustomModel.position;

              setCustomModelParams(targetCustomModel.id, {
                position: new Vector3(x, distanceToFloor + targetLevel.elevation, z),
              });
            }}
          />
        </MenuItem>
        <MenuItem>
          <SelectRow
            label={lang.baseLevel}
            value={isNullish(targetCustomModel) ? '' : targetCustomModel.levelId}
            options={levels.map(e => ({ label: e.name, value: e.id }))}
            onChange={levelId => {
              assert(!isNull(customModelId), 'This should never happen. |wxq2eq|');

              setCustomModelParams(customModelId, { levelId });
            }}
          />
        </MenuItem>
      </MenuSection>
    </SlideUpAndFloatingMenusWrapper>
  );
});
