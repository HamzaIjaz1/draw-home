import { InfoRow, Material, MenuItem, MenuSection, TextField } from '@draw-house/ui/dist/components';
import assert from 'assert';
import { getNotUndefined, isNull, isNullish, isUndefined } from '@arthurka/ts-utils';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { isPositive } from '@draw-house/common/dist/brands';
import {
  clearFutureWalls,
  closeSlideUpMenuLvl1,
  openSlideUpMenuLvl2,
  setCeilingParams,
  SlideUpMenuLvl1Store,
  useGlobalSettings,
  useLevels,
  useSpaces,
  useTempWalls,
  useWalls,
} from '../../../zustand';
import { lang } from '../../../lang';
import { getImageWithDefault, getSpaceAreaWithUnits, measurements } from '../../../utils';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { compositeOperations, defaultCeilingThickness, levelMaxHeight } from '../../../constants';
import { MeasurementPairedInputRow } from '../../MeasurementPairedInputRow';
import { useAppearanceColor } from '../../../zustand/useAppearanceColor';
import { useTexturesMixedWithColor } from '../../../customHooks/useTextureMixedWithColor';

export type CeilingSettingsProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'ceiling' }>;
};

export const CeilingSettings: React.FC<CeilingSettingsProps> = ({ slideUpMenuLvl1: { isOpened, spaceId } }) => {
  checkIsNotNever(isOpened);

  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const { spaces } = useSpaces();
  const { levels } = useLevels();
  const { walls } = useWalls();
  const { tempWalls } = useTempWalls();

  const targetSpace = isNull(spaceId) ? null : spaces.find(e => e.id === spaceId);
  const targetLevel = (() => {
    if(isNullish(targetSpace)) {
      return null;
    }

    const wallId = getNotUndefined(targetSpace.walls[0], 'Something went wrong. |647p1s|');
    const { levelId } = getNotUndefined(walls.find(e => e.id === wallId), 'Something went wrong. |d4d1iq|');

    return getNotUndefined(levels.find(e => e.id === levelId), 'Something went wrong. |4pg7cy|');
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
      originalImageSrc: getImageWithDefault(targetSpace?.ceilingData.topTexture.attributes.preview.data?.attributes.formats?.thumbnail.url),
      compositeOperation: isNullish(targetSpace) ? compositeOperations[0] : targetSpace.ceilingData.topCompositeOperation,
      overlayColor: (
        isNullish(targetSpace) || isNull(targetSpace.ceilingData.topColorOverlay) ? null : targetSpace.ceilingData.topColorOverlay.value.hexa()
      ),
    },
    {
      originalImageSrc: getImageWithDefault(targetSpace?.ceilingData.bottomTexture.attributes.preview.data?.attributes.formats?.thumbnail.url),
      compositeOperation: isNullish(targetSpace) ? compositeOperations[0] : targetSpace.ceilingData.bottomCompositeOperation,
      overlayColor: (
        isNullish(targetSpace) || isNull(targetSpace.ceilingData.bottomColorOverlay) ? null : targetSpace.ceilingData.bottomColorOverlay.value.hexa()
      ),
    },
    {
      originalImageSrc: getImageWithDefault(targetSpace?.ceilingData.edgeTexture.attributes.preview.data?.attributes.formats?.thumbnail.url),
      compositeOperation: isNullish(targetSpace) ? compositeOperations[0] : targetSpace.ceilingData.edgeCompositeOperation,
      overlayColor: (
        isNullish(targetSpace) || isNull(targetSpace.ceilingData.edgeColorOverlay) ? null : targetSpace.ceilingData.edgeColorOverlay.value.hexa()
      ),
    },
  ]);

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.ceilingSettings.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
    >
      <MenuItem divider paddingHorizontal>
        <TextField
          type='text'
          label={lang.slideUpMenus.ceilingSettings.name}
          size='lg'
          value={isNullish(targetSpace) ? '' : targetSpace.ceilingData.commentName}
          onChange={commentName => {
            assert(!isNull(spaceId), 'This should never happen. |fz0jjg|');

            setCeilingParams(spaceId, null, { commentName });
          }}
        />
      </MenuItem>
      <MenuSection type='collapsible' defaultExpanded title={lang.slideUpMenus.appearance.title}>
        <MenuItem divider>
          <Material
            text={lang.slideUpMenus.ceilingSettings.topMaterial}
            image={topTextureMixedWithColor}
            onClick={async () => {
              assert(!isNullish(targetSpace), 'This should never happen. |6p3lrm|');

              await closeSlideUpMenuLvl1({ preserveState: true });
              useAppearanceColor.setState({
                appearanceColor: {
                  type: 'ceilingAppearance',
                  color: targetSpace.ceilingData.topColorOverlay,
                },
              });
              await openSlideUpMenuLvl2({
                type: 'ceilingAppearance',
                isOpened: true,
                spaceId: targetSpace.id,
                textureType: 'top',
                applyToAll: {
                  isActive: false,
                  type: 'sameLevelCeilings',
                },
              });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <Material
            text={lang.slideUpMenus.ceilingSettings.bottomMaterial}
            image={bottomTextureMixedWithColor}
            onClick={async () => {
              assert(!isNullish(targetSpace), 'This should never happen. |sxi7sy|');

              await closeSlideUpMenuLvl1({ preserveState: true });
              useAppearanceColor.setState({
                appearanceColor: {
                  type: 'ceilingAppearance',
                  color: targetSpace.ceilingData.bottomColorOverlay,
                },
              });
              await openSlideUpMenuLvl2({
                type: 'ceilingAppearance',
                isOpened: true,
                spaceId: targetSpace.id,
                textureType: 'bottom',
                applyToAll: {
                  isActive: false,
                  type: 'sameLevelCeilings',
                },
              });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <Material
            text={lang.slideUpMenus.ceilingSettings.edgeMaterial}
            image={edgeTextureMixedWithColor}
            onClick={async () => {
              assert(!isNullish(targetSpace), 'This should never happen. |i74t9d|');

              await closeSlideUpMenuLvl1({ preserveState: true });
              useAppearanceColor.setState({
                appearanceColor: {
                  type: 'ceilingAppearance',
                  color: targetSpace.ceilingData.edgeColorOverlay,
                },
              });
              await openSlideUpMenuLvl2({
                type: 'ceilingAppearance',
                isOpened: true,
                spaceId: targetSpace.id,
                textureType: 'edge',
                applyToAll: {
                  isActive: false,
                  type: 'sameLevelCeilings',
                },
              });
            }}
          />
        </MenuItem>
      </MenuSection>
      <MenuSection type='collapsible' defaultExpanded title={lang.settings}>
        <MenuItem>
          <MeasurementPairedInputRow
            name='ceiling-thickness'
            label={lang.thickness}
            measurementSystem={measurementSystem}
            min={measurements.to(0.001, measurementSystem)}
            max={measurements.to(3, measurementSystem)}
            value={
              measurements.to(
                isNullish(targetSpace) ? defaultCeilingThickness : targetSpace.ceilingData.thickness,
                measurementSystem,
              )
            }
            onChange={value => {
              assert(!isNullish(targetSpace), 'This should never happen. |fig0jt|');

              const thickness = measurements.from(value, measurementSystem);
              if(!isPositive(thickness)) {
                return;
              }

              setCeilingParams(targetSpace.id, null, { thickness });
            }}
          />
        </MenuItem>
        <MenuItem>
          <MeasurementPairedInputRow
            name='ceiling-distance-from-top'
            label={lang.slideUpMenus.ceilingSettings.heightFromBottom}
            measurementSystem={measurementSystem}
            min={measurements.to(0, measurementSystem)}
            max={measurements.to(levelMaxHeight, measurementSystem)}
            value={
              measurements.to(
                isNullish(targetSpace) || isNull(targetLevel)
                  ? 0
                  : targetLevel.height - targetSpace.ceilingData.distanceFromTop,
                measurementSystem,
              )
            }
            onChange={e => {
              assert(!isNullish(targetSpace) && !isNull(targetLevel), 'This should never happen. |u2oe0g|');

              const value = measurements.from(e, measurementSystem);

              setCeilingParams(targetSpace.id, null, {
                distanceFromTop: targetLevel.height - value,
              });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <InfoRow title={lang.slideUpMenus.ceilingSettings.ceilingArea} value={spaceArea} />
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
