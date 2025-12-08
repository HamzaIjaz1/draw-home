import { FieldButton, InfoRow, MainButton, MenuItem, MenuSection } from '@draw-house/ui/dist/components';
import assert from 'assert';
import { getNotUndefined, isNull, isNullish, isUndefined, ObjEntries } from '@arthurka/ts-utils';
import { Material } from '@draw-house/ui/dist/components/Material';
import { checkIsNotNever, clamp } from '@draw-house/common/dist/utils';
import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { Box3, Vector3 } from 'three';
import { isPositive, NonNegative } from '@draw-house/common/dist/brands';
import { useTheme } from '@mui/material';
import {
  closeSlideUpMenuLvl1,
  openSlideUpMenuLvl2,
  removeWallFurniture,
  setWallFurnitureParams,
  SlideUpMenuLvl1Store,
  useGlobalSettings,
  useLevels,
  useWalls,
} from '../../../zustand';
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
import { calculateFurnitureReplacementYPosition } from '../../../utils/calculateFurnitureYPosition';
import { loadGltf } from '../../../utils/loadGltf';

export type WallFurnitureSettingsProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'door' | 'window' }>;
};

export const WallFurnitureSettings: React.FC<WallFurnitureSettingsProps> = SuspenseHOC(({
  slideUpMenuLvl1: {
    type,
    isOpened,
    furnitureId,
  },
}) => {
  checkIsNotNever(isOpened);

  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const theme = useTheme();
  const { walls } = useWalls();
  const { levels } = useLevels();
  const { modelMaterials, modelMaterialPreviews } = useModelMaterials();

  const targetWallFurniture = isNull(furnitureId) ? null : walls.flatMap(e => e.furnitures).find(e => e.id === furnitureId);

  const { catalogData } = useCatalogDataResolved();
  const catalog = useMemo(() => makeCatalog(catalogData), [catalogData]);

  const { catalogCategory, parentCatalogCategory } = (() => {
    if(isNullish(targetWallFurniture)) {
      return {
        catalogCategory: null,
        parentCatalogCategory: null,
      };
    }

    const { current, parent } = findCatalogNodeByModelUrl(catalog, targetWallFurniture.url);

    return {
      catalogCategory: current,
      parentCatalogCategory: isNull(parent) ? null : {
        ...parent,
        subcategories: parent.subcategories.filter(({ childrenType }) => (
          childrenType === `${targetWallFurniture.type}s` as const
        )),
      },
    };
  })();

  const targetLevel = (() => {
    const wall = walls.find(e => !isUndefined(e.furnitures.find(e => e.id === furnitureId)));

    return isUndefined(wall) ? null : levels.find(e => e.id === wall.levelId);
  })();

  const { height: levelHeight } = getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |3dn5zj|');

  const { scene } = useGLTF(!isNullish(targetWallFurniture) ? targetWallFurniture.url : '/stub.glb');
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

  const wallFurnitureHeight = (
    isNullish(targetWallFurniture) || isNull(targetWallFurniture.height)
      ? defaultSizes.height
      : targetWallFurniture.height
  );

  useEffect(() => {
    useModelMaterials.setState({
      modelMaterials: extractMaterialsFromScene(scene),
    });
  }, [scene]);

  const getMaterialPreviewImage = (name: string) => {
    if(!isNullish(targetWallFurniture) && !isNull(targetWallFurniture.overrideMaterials)) {
      const e = targetWallFurniture.overrideMaterials[name];

      if(!isUndefined(e)) {
        return getImageWithDefault(e.texture.attributes.preview.data?.attributes.url);
      }
    }

    return getImageWithDefault(modelMaterialPreviews[name]);
  };

  const texturesMixedWithColors = useTexturesMixedWithColor(
    ObjEntries(modelMaterials).map(([name]) => {
      const overrideMaterial = (
        isNullish(targetWallFurniture) || isNull(targetWallFurniture.overrideMaterials) ? null : targetWallFurniture.overrideMaterials[name]
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
      title={lang.slideUpMenus.wallFurnitureSettings.title(type)}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
    >
      {
        !isNullish(targetWallFurniture) && !isNull(catalogCategory) && !isNull(parentCatalogCategory) && (
          <ReplaceCustomModel
            modelCategoryId={catalogCategory.id}
            parentSubcategories={parentCatalogCategory.subcategories}
            targetModel={targetWallFurniture}
            replaceModel={async ({ url }, modelSize) => {
              const wall = getNotUndefined(walls.find(e => e.furnitures.some(e => e.id === targetWallFurniture.id)), 'Something went wrong. |8b2nn9|');
              const levelHeight = getNotUndefined(useLevels.getState().levels.find(e => e.id === wall.levelId), 'Something went wrong. |qu04um|').height;
              const currentFurnitureHeight = await (async () => {
                try {
                  const { scene } = await loadGltf(targetWallFurniture.url);
                  return new Box3().setFromObject(scene).getSize(new Vector3()).y;
                } catch(e) {
                  console.warn('Failed to load model |fj5j5b|');
                  return null;
                }
              })();

              const onWallCoordinateY = calculateFurnitureReplacementYPosition(
                isNull(targetWallFurniture.height) ? currentFurnitureHeight : targetWallFurniture.height,
                modelSize.y,
                targetWallFurniture.onWallCoordinateY,
                isNull(wall.height) ? levelHeight : wall.height,
              );
              setWallFurnitureParams(targetWallFurniture.id, null, { url, onWallCoordinateY });
            }}
          />
        )
      }
      <MenuItem divider grow spaceBetween paddingHorizontal>
        <FieldButton
          icon='flipHorizontal'
          text={lang.slideUpMenus.wallFurnitureSettings.flipHorizontal}
          onClick={() => {
            assert(!isNull(furnitureId), 'This should never happen. |4anm52|');
            assert(!isNullish(targetWallFurniture), 'This should never happen. |y98djf|');

            setWallFurnitureParams(furnitureId, null, {
              isFlippedHorizontal: targetWallFurniture.isFlippedHorizontal === false,
            });
          }}
        />
        <FieldButton
          icon='flipVertical'
          text={lang.slideUpMenus.wallFurnitureSettings.mirror}
          onClick={() => {
            assert(!isNull(furnitureId), 'This should never happen. |3vz7cq|');
            assert(!isNullish(targetWallFurniture), 'This should never happen. |827x4d|');

            setWallFurnitureParams(furnitureId, null, {
              isMirrored: targetWallFurniture.isMirrored === false,
            });
          }}
        />
      </MenuItem>
      <MenuSection
        type='collapsible'
        defaultExpanded
        title={lang.slideUpMenus.appearance.title}
      >
        {
          ObjEntries(modelMaterials).map(([name], i) => (
            <MenuItem key={name} divider spaceBetween>
              <Material
                text={name === '' || name.trim() !== name ? `"${name}"` : name}
                image={texturesMixedWithColors[i] ?? getMaterialPreviewImage(name)}
                onClick={async () => {
                  assert(!isNullish(targetWallFurniture), 'This should never happen. |6p2ftd|');

                  const overrideMaterial = isNull(targetWallFurniture.overrideMaterials) ? null : targetWallFurniture.overrideMaterials[name];

                  await closeSlideUpMenuLvl1({ preserveState: true });
                  useAppearanceColor.setState({
                    appearanceColor: {
                      type: 'wallFurnitureAppearance',
                      color: isNullish(overrideMaterial) ? null : overrideMaterial.colorOverlay,
                    },
                  });
                  await openSlideUpMenuLvl2({
                    type: 'wallFurnitureAppearance',
                    isOpened: true,
                    wallFurnitureId: targetWallFurniture.id,
                    overrideMaterialName: name,
                    applyToAll: {
                      isActive: false,
                      type: 'sameLevelSameWallFurnitures',
                    },
                  });
                }}
              />
            </MenuItem>
          ))
        }
      </MenuSection>
      <MenuSection
        type='collapsible'
        defaultExpanded
        title={lang.settings}
      >
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='wall-furniture-width'
            label={lang.width}
            measurementSystem={measurementSystem}
            value={
              measurements.to(
                isNullish(targetWallFurniture) || isNull(targetWallFurniture.width)
                  ? defaultSizes.width
                  : targetWallFurniture.width,
                measurementSystem,
              )
            }
            onChange={value => {
              assert(!isNull(furnitureId), 'This should never happen. |030mdf|');

              const width = measurements.from(value, measurementSystem);

              setWallFurnitureParams(furnitureId, null, {
                width: !isPositive(width) || width === defaultSizes.width ? null : width,
              });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='wall-furniture-height'
            label={lang.height}
            measurementSystem={measurementSystem}
            value={measurements.to(wallFurnitureHeight, measurementSystem)}
            onChange={value => {
              assert(!isNull(furnitureId), 'This should never happen. |drr2dn|');

              const height = measurements.from(value, measurementSystem);

              setWallFurnitureParams(furnitureId, null, {
                height: !isPositive(height) || height === defaultSizes.height ? null : height,
              });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='wall-furniture-depth'
            label={lang.depth}
            measurementSystem={measurementSystem}
            value={
              measurements.to(
                isNullish(targetWallFurniture) || isNull(targetWallFurniture.depth)
                  ? defaultSizes.depth
                  : targetWallFurniture.depth,
                measurementSystem,
              )
            }
            onChange={value => {
              assert(!isNull(furnitureId), 'This should never happen. |lcp4jd|');

              const depth = measurements.from(value, measurementSystem);

              setWallFurnitureParams(furnitureId, null, {
                depth: !isPositive(depth) || depth === defaultSizes.depth ? null : depth,
              });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='wall-furniture-distanceToCeiling'
            label={lang.slideUpMenus.wallFurnitureSettings.distanceToCeiling}
            measurementSystem={measurementSystem}
            value={
              measurements.to(
                isNullish(targetWallFurniture) ? 0 : levelHeight - targetWallFurniture.onWallCoordinateY - wallFurnitureHeight,
                measurementSystem,
              )
            }
            onChange={value => {
              assert(!isNullish(targetWallFurniture), 'This should never happen. |wcd4dl|');

              const distanceToCeiling = measurements.from(value, measurementSystem);
              const newOnWallCoordinateY = Math.max(0, levelHeight - distanceToCeiling - wallFurnitureHeight);

              setWallFurnitureParams(targetWallFurniture.id, null, {
                onWallCoordinateY: NonNegative(newOnWallCoordinateY),
              });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='wall-furniture-distanceToFloor'
            label={lang.slideUpMenus.wallFurnitureSettings.distanceToFloor}
            measurementSystem={measurementSystem}
            value={measurements.to(isNullish(targetWallFurniture) ? 0 : targetWallFurniture.onWallCoordinateY, measurementSystem)}
            onChange={e => {
              assert(!isNullish(targetWallFurniture), 'This should never happen. |p53agc|');

              const value = measurements.from(e, measurementSystem);
              const newOnWallCoordinateY = clamp(0, value, levelHeight - wallFurnitureHeight);

              setWallFurnitureParams(targetWallFurniture.id, null, {
                onWallCoordinateY: NonNegative(newOnWallCoordinateY),
              });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <InfoRow
            title={lang.baseLevel}
            value={isNullish(targetLevel) ? '' : targetLevel.name}
          />
        </MenuItem>
      </MenuSection>
      <MenuItem paddingHorizontal='row 3/4'>
        <MainButton
          icon='bin'
          text={lang.deleteItem}
          padding='row 1/4'
          variant='text'
          width='fit-content'
          height='md'
          iconColors={{ default: theme.palette.primary.main }}
          textColors={{ default: theme.palette.primary.main }}
          onClick={() => {
            assert(!isNullish(targetWallFurniture), 'This should never happen. |6yrl99|');

            removeWallFurniture(targetWallFurniture.id);
          }}
        />
      </MenuItem>
    </SlideUpAndFloatingMenusWrapper>
  );
});
