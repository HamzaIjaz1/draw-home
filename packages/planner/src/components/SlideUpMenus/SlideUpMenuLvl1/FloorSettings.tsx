import { InfoRow, Material, MenuItem, MenuSection } from '@draw-house/ui/dist/components';
import assert from 'assert';
import { getNotUndefined, isNull, isNullish, isUndefined } from '@arthurka/ts-utils';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { isPositive } from '@draw-house/common/dist/brands';
import { clearFutureWalls, closeSlideUpMenuLvl1, openSlideUpMenuLvl2, setFloorParams, SlideUpMenuLvl1Store, useGlobalSettings, useLevels, useSpaces, useTempWalls, useWalls } from '../../../zustand';
import { lang } from '../../../lang';
import { getImageWithDefault, getSpaceAreaWithUnits, measurements } from '../../../utils';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { compositeOperations, defaultFloorThickness } from '../../../constants';
import { MeasurementPairedInputRow } from '../../MeasurementPairedInputRow';
import { useAppearanceColor } from '../../../zustand/useAppearanceColor';
import { useTexturesMixedWithColor } from '../../../customHooks/useTextureMixedWithColor';

export type FloorSettingsProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'floor' }>;
};

export const FloorSettings: React.FC<FloorSettingsProps> = ({ slideUpMenuLvl1: { isOpened, spaceId } }) => {
  checkIsNotNever(isOpened);

  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const { tempWalls } = useTempWalls();
  const { spaces } = useSpaces();
  const targetSpace = isNull(spaceId) ? null : spaces.find(e => e.id === spaceId);

  const { walls } = useWalls();
  const { levels } = useLevels();
  const targetLevel = (() => {
    if(isNullish(targetSpace)) {
      return null;
    }

    const wallId = getNotUndefined(targetSpace.walls[0], 'Something went wrong. |mb0bgl|');
    const { levelId } = getNotUndefined(walls.find(e => e.id === wallId), 'Something went wrong. |ien1c3|');

    return getNotUndefined(levels.find(e => e.id === levelId), 'Something went wrong. |qyl3kd|');
  })();

  const futureWalls = clearFutureWalls([...walls, ...tempWalls]);
  const spaceWalls = (
    isNullish(targetSpace)
      ? []
      : targetSpace.walls.map(id => futureWalls.find(e => e.id === id)).filter(e => !isUndefined(e))
  );
  const spaceArea = isNullish(targetSpace) ? '0' : getSpaceAreaWithUnits(targetSpace.id, spaceWalls, measurementSystem);

  const [topTextureMixedWithColor, bottomTextureMixedWithColor, edgeTextureMixedWithColor] = useTexturesMixedWithColor([
    {
      originalImageSrc: getImageWithDefault(targetSpace?.floorData.topTexture.attributes.preview.data?.attributes.formats?.thumbnail.url),
      compositeOperation: isNullish(targetSpace) ? compositeOperations[0] : targetSpace.floorData.topCompositeOperation,
      overlayColor: (
        isNullish(targetSpace) || isNull(targetSpace.floorData.topColorOverlay) ? null : targetSpace.floorData.topColorOverlay.value.hexa()
      ),
    },
    {
      originalImageSrc: getImageWithDefault(targetSpace?.floorData.bottomTexture.attributes.preview.data?.attributes.formats?.thumbnail.url),
      compositeOperation: isNullish(targetSpace) ? compositeOperations[0] : targetSpace.floorData.bottomCompositeOperation,
      overlayColor: (
        isNullish(targetSpace) || isNull(targetSpace.floorData.bottomColorOverlay) ? null : targetSpace.floorData.bottomColorOverlay.value.hexa()
      ),
    },
    {
      originalImageSrc: getImageWithDefault(targetSpace?.floorData.edgeTexture.attributes.preview.data?.attributes.formats?.thumbnail.url),
      compositeOperation: isNullish(targetSpace) ? compositeOperations[0] : targetSpace.floorData.edgeCompositeOperation,
      overlayColor: (
        isNullish(targetSpace) || isNull(targetSpace.floorData.edgeColorOverlay) ? null : targetSpace.floorData.edgeColorOverlay.value.hexa()
      ),
    },
  ]);

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.floorSettings.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
    >
      <MenuSection type='collapsible' defaultExpanded title={lang.slideUpMenus.appearance.title}>
        <MenuItem divider>
          <Material
            text={lang.slideUpMenus.floorSettings.topMaterial}
            image={topTextureMixedWithColor}
            onClick={async () => {
              assert(!isNullish(targetSpace), 'This should never happen. |mh1pg0|');

              await closeSlideUpMenuLvl1({ preserveState: true });
              useAppearanceColor.setState({
                appearanceColor: {
                  type: 'floorAppearance',
                  color: targetSpace.floorData.topColorOverlay,
                },
              });
              await openSlideUpMenuLvl2({
                type: 'floorAppearance',
                isOpened: true,
                spaceId: targetSpace.id,
                textureType: 'top',
                applyToAll: {
                  isActive: false,
                  type: 'sameLevelFloors',
                },
              });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <Material
            text={lang.slideUpMenus.floorSettings.bottomMaterial}
            image={bottomTextureMixedWithColor}
            onClick={async () => {
              assert(!isNullish(targetSpace), 'This should never happen. |fr3ark|');

              await closeSlideUpMenuLvl1({ preserveState: true });
              useAppearanceColor.setState({
                appearanceColor: {
                  type: 'floorAppearance',
                  color: targetSpace.floorData.bottomColorOverlay,
                },
              });
              await openSlideUpMenuLvl2({
                type: 'floorAppearance',
                isOpened: true,
                spaceId: targetSpace.id,
                textureType: 'bottom',
                applyToAll: {
                  isActive: false,
                  type: 'sameLevelFloors',
                },
              });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <Material
            text={lang.slideUpMenus.floorSettings.edgeMaterial}
            image={edgeTextureMixedWithColor}
            onClick={async () => {
              assert(!isNullish(targetSpace), 'This should never happen. |uot4df|');

              await closeSlideUpMenuLvl1({ preserveState: true });
              useAppearanceColor.setState({
                appearanceColor: {
                  type: 'floorAppearance',
                  color: targetSpace.floorData.edgeColorOverlay,
                },
              });
              await openSlideUpMenuLvl2({
                type: 'floorAppearance',
                isOpened: true,
                spaceId: targetSpace.id,
                textureType: 'edge',
                applyToAll: {
                  isActive: false,
                  type: 'sameLevelFloors',
                },
              });
            }}
          />
        </MenuItem>
      </MenuSection>
      <MenuSection type='collapsible' defaultExpanded title={lang.settings}>
        <MenuItem>
          <MeasurementPairedInputRow
            name='floor-thickness'
            label={lang.thickness}
            measurementSystem={measurementSystem}
            min={measurements.to(0.001, measurementSystem)}
            max={measurements.to(3, measurementSystem)}
            value={
              measurements.to(
                isNullish(targetSpace) ? defaultFloorThickness : targetSpace.floorData.thickness,
                measurementSystem,
              )
            }
            onChange={value => {
              assert(!isNullish(targetSpace), 'This should never happen. |s2bm2j|');

              const thickness = measurements.from(value, measurementSystem);
              if(!isPositive(thickness)) {
                return;
              }

              setFloorParams(targetSpace.id, null, { thickness });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <InfoRow
            title={`${isNullish(targetSpace) ? '' : `${targetSpace.name} `}${lang.slideUpMenus.floorSettings.floorArea}`}
            value={spaceArea}
          />
        </MenuItem>
        <MenuItem divider>
          <InfoRow
            title={lang.baseLevel}
            value={isNull(targetLevel) ? '' : targetLevel.name}
          />
        </MenuItem>
      </MenuSection>
    </SlideUpAndFloatingMenusWrapper>
  );
};
