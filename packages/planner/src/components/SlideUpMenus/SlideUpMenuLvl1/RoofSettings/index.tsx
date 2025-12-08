import { IconButton, InfoRow, Material, MenuItem, MenuSection, SettingsSpaceTitle, SwitchRow, TextField } from '@draw-house/ui/dist/components';
import assert from 'assert';
import { getNotUndefined, isNull, isNullish } from '@arthurka/ts-utils';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { AnimatePresence } from 'framer-motion';
import { isPositive } from '@draw-house/common/dist/brands';
import { closeSlideUpMenuLvl1, openSlideUpMenuLvl2, SlideUpMenuLvl1Store, useGlobalSettings, useLevels, useSpaces, useWalls } from '../../../../zustand';
import { lang } from '../../../../lang';
import { getImageWithDefault, getRoofType, measurements } from '../../../../utils';
import { compositeOperations, defaultHipRoofSlope, defaultRoofHeightFromBase, defaultRoofOverhang, defaultRoofThickness, defaultSlantedRoofSlope } from '../../../../constants';
import { Animations } from '../../../animations';
import { SlideUpAndFloatingMenusWrapper } from '../../../SlideUpAndFloatingMenusWrapper';
import { setRoofParams, useRoofs } from '../../../../zustand/useRoofs';
import { MeasurementPairedInputRow } from '../../../MeasurementPairedInputRow';
import { measurementSystemUtils } from '../../../../utils/measurementSystemUtils';
import { useAppearanceColor } from '../../../../zustand/useAppearanceColor';
import { useTexturesMixedWithColor } from '../../../../customHooks/useTextureMixedWithColor';
import { RoofTypeSwitcher } from './RoofType';
import { openSpaceSettingsSlideUpMenu } from '../../../../utils/handlerHelpers/openSpaceSettingsSlideUpMenu';
import { calculateRoofAreaById } from '../../../../utils/calculateRoofAreaById';

export type RoofSettingsProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'roof' }>;
};

export const RoofSettings: React.FC<RoofSettingsProps> = ({ slideUpMenuLvl1: { isOpened, roofId } }) => {
  checkIsNotNever(isOpened);

  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const { roofs } = useRoofs();
  const { walls } = useWalls();
  const { spaces } = useSpaces();
  const { levels } = useLevels();

  const targetRoof = isNull(roofId) ? null : roofs.find(e => e.id === roofId);

  const targetSpace = isNullish(targetRoof) ? null : spaces.find(e => e.roofId === targetRoof.id);
  const targetLevel = (() => {
    const targetWallId = isNullish(targetSpace) ? null : targetSpace.walls[0];
    const targetWall = (
      isNullish(targetWallId)
        ? null
        : getNotUndefined(walls.find(e => e.id === targetWallId), 'Something went wrong. |1c4ej2|')
    );

    return isNull(targetWall) ? null : levels.find(e => e.id === targetWall.levelId);
  })();
  const sharedRoofSpaces = isNullish(targetRoof) ? [] : spaces.filter(e => e.roofId === targetRoof.id);

  const targetRoofType = getRoofType(targetRoof);

  const [topTextureMixedWithColor, bottomTextureMixedWithColor, edgeTextureMixedWithColor] = useTexturesMixedWithColor([
    {
      originalImageSrc: getImageWithDefault(targetRoof?.roofData.topTexture.attributes.preview.data?.attributes.formats?.thumbnail.url),
      compositeOperation: isNullish(targetRoof) ? compositeOperations[0] : targetRoof.roofData.topCompositeOperation,
      overlayColor: (
        isNullish(targetRoof) || isNull(targetRoof.roofData.topColorOverlay) ? null : targetRoof.roofData.topColorOverlay.value.hexa()
      ),
    },
    {
      originalImageSrc: getImageWithDefault(targetRoof?.roofData.bottomTexture.attributes.preview.data?.attributes.formats?.thumbnail.url),
      compositeOperation: isNullish(targetRoof) ? compositeOperations[0] : targetRoof.roofData.bottomCompositeOperation,
      overlayColor: (
        isNullish(targetRoof) || isNull(targetRoof.roofData.bottomColorOverlay) ? null : targetRoof.roofData.bottomColorOverlay.value.hexa()
      ),
    },
    {
      originalImageSrc: getImageWithDefault(targetRoof?.roofData.edgeTexture.attributes.preview.data?.attributes.formats?.thumbnail.url),
      compositeOperation: isNullish(targetRoof) ? compositeOperations[0] : targetRoof.roofData.edgeCompositeOperation,
      overlayColor: (
        isNullish(targetRoof) || isNull(targetRoof.roofData.edgeColorOverlay) ? null : targetRoof.roofData.edgeColorOverlay.value.hexa()
      ),
    },
  ]);

  const targetRoofArea = isNullish(targetRoof) ? 0 : calculateRoofAreaById(targetRoof.id);

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.roofSettings.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
    >
      <MenuSection
        title={lang.slideUpMenus.roofSettings.sharedRoofHint}
        type='collapsible'
        titleVariant='pale'
        titleSize='14px'
        icon='hint'
        divider='content'
      >
        {
          sharedRoofSpaces.map(({ id, name }) => (
            <MenuItem key={id} paddingHorizontal spaceBetween>
              <SettingsSpaceTitle>{name}</SettingsSpaceTitle>
              <IconButton
                icon='gear'
                variant='text'
                size='sm'
                state='active'
                onClick={async () => {
                  await openSpaceSettingsSlideUpMenu(id);
                }}
              />
            </MenuItem>
          ))
        }
      </MenuSection>
      <RoofTypeSwitcher targetRoof={targetRoof} />
      <MenuSection type='collapsible' defaultExpanded title={lang.slideUpMenus.appearance.title}>
        <MenuItem divider>
          <Material
            text={lang.slideUpMenus.roofSettings.topMaterial}
            image={topTextureMixedWithColor}
            onClick={async () => {
              assert(!isNullish(targetRoof), 'This should never happen. |f9e5i8|');

              await closeSlideUpMenuLvl1({ preserveState: true });
              useAppearanceColor.setState({
                appearanceColor: {
                  type: 'roofAppearance',
                  color: targetRoof.roofData.topColorOverlay,
                },
              });
              await openSlideUpMenuLvl2({
                type: 'roofAppearance',
                isOpened: true,
                roofId: targetRoof.id,
                textureType: 'top',
                applyToAll: {
                  isActive: false,
                  type: 'sameLevelRoofs',
                },
              });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <Material
            text={lang.slideUpMenus.roofSettings.edgeMaterial}
            image={edgeTextureMixedWithColor}
            onClick={async () => {
              assert(!isNullish(targetRoof), 'This should never happen. |c9p7wy|');

              await closeSlideUpMenuLvl1({ preserveState: true });
              useAppearanceColor.setState({
                appearanceColor: {
                  type: 'roofAppearance',
                  color: targetRoof.roofData.edgeColorOverlay,
                },
              });
              await openSlideUpMenuLvl2({
                type: 'roofAppearance',
                isOpened: true,
                roofId: targetRoof.id,
                textureType: 'edge',
                applyToAll: {
                  isActive: false,
                  type: 'sameLevelRoofs',
                },
              });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <Material
            text={lang.slideUpMenus.roofSettings.bottomMaterial}
            image={bottomTextureMixedWithColor}
            onClick={async () => {
              assert(!isNullish(targetRoof), 'This should never happen. |0f5vui|');

              await closeSlideUpMenuLvl1({ preserveState: true });
              useAppearanceColor.setState({
                appearanceColor: {
                  type: 'roofAppearance',
                  color: targetRoof.roofData.bottomColorOverlay,
                },
              });
              await openSlideUpMenuLvl2({
                type: 'roofAppearance',
                isOpened: true,
                roofId: targetRoof.id,
                textureType: 'bottom',
                applyToAll: {
                  isActive: false,
                  type: 'sameLevelRoofs',
                },
              });
            }}
          />
        </MenuItem>
        <AnimatePresence>
          {
            targetRoofType === 'hip-with-all-gable-corners' && (
              <Animations.collapseRow>
                <MenuItem>
                  <SwitchRow
                    title={lang.slideUpMenus.roofSettings.closedGableToggle}
                    checked={isNullish(targetRoof) ? false : targetRoof.roofData.isClosedGable}
                    onClick={() => {
                      assert(!isNullish(targetRoof), 'This should never happen. |3j7tw0|');

                      setRoofParams(targetRoof.id, null, {
                        isClosedGable: targetRoof.roofData.isClosedGable === false,
                      });
                    }}
                  />
                </MenuItem>
              </Animations.collapseRow>
            )
          }
        </AnimatePresence>
      </MenuSection>
      <MenuSection type='collapsible' defaultExpanded title={lang.settings}>
        <MenuItem>
          <MeasurementPairedInputRow
            name='roof-settings-thickness'
            label={lang.thickness}
            measurementSystem={measurementSystem}
            min={measurements.to(0.001, measurementSystem)}
            max={measurements.to(3, measurementSystem)}
            value={
              measurements.to(
                isNullish(targetRoof) ? defaultRoofThickness : targetRoof.roofData.thickness,
                measurementSystem,
              )
            }
            onChange={value => {
              assert(!isNullish(targetRoof), 'This should never happen. |t1jn77|');

              const thickness = measurements.from(value, measurementSystem);
              if(!isPositive(thickness)) {
                return;
              }

              setRoofParams(targetRoof.id, null, { thickness });
            }}
          />
        </MenuItem>
        <AnimatePresence>
          {
            (targetRoofType === 'hip' || targetRoofType === 'hip-with-all-gable-corners') && (
              <Animations.collapseRow>
                <MenuItem paddingHorizontal>
                  <TextField
                    type='number'
                    label={lang.slideUpMenus.roofSettings.slope}
                    size='sm'
                    adornment='°'
                    min={10}
                    max={60}
                    value={(isNullish(targetRoof) ? defaultHipRoofSlope : targetRoof.roofData.hipSlope).toString()}
                    onChange={value => {
                      assert(!isNullish(targetRoof), 'This should never happen. |971dzl|');

                      setRoofParams(targetRoof.id, null, {
                        hipSlope: +value,
                      });
                    }}
                  />
                </MenuItem>
              </Animations.collapseRow>
            )
          }
        </AnimatePresence>
        <AnimatePresence>
          {
            targetRoofType === 'slanted' && (
              <Animations.collapseRow>
                <MenuItem paddingHorizontal>
                  <TextField
                    type='number'
                    label={lang.slideUpMenus.roofSettings.slope}
                    size='sm'
                    adornment='°'
                    min={1}
                    max={89.9}
                    value={(isNullish(targetRoof) ? defaultSlantedRoofSlope : targetRoof.roofData.slantedSlope).toString()}
                    onChange={value => {
                      assert(!isNullish(targetRoof), 'This should never happen. |r6u51x|');

                      setRoofParams(targetRoof.id, null, {
                        slantedSlope: +value,
                      });
                    }}
                  />
                </MenuItem>
              </Animations.collapseRow>
            )
          }
        </AnimatePresence>
        <AnimatePresence>
          <Animations.collapseRow>
            <MenuItem>
              <MeasurementPairedInputRow
                name='roof-settings-overhang'
                label={lang.slideUpMenus.roofSettings.overhang}
                measurementSystem={measurementSystem}
                min={measurements.to(0, measurementSystem)}
                value={
                  measurements.to(
                    isNullish(targetRoof) ? defaultRoofOverhang : targetRoof.roofData.overhang,
                    measurementSystem,
                  )
                }
                onChange={value => {
                  assert(!isNullish(targetRoof), 'This should never happen. |l7l04f|');

                  setRoofParams(targetRoof.id, null, {
                    overhang: measurements.from(value, measurementSystem),
                  });
                }}
              />
            </MenuItem>
          </Animations.collapseRow>
        </AnimatePresence>
        <AnimatePresence>
          <Animations.collapseRow>
            <MenuItem>
              <MeasurementPairedInputRow
                name='roof-settings-height-from-base'
                label={lang.slideUpMenus.roofSettings.heightFromBase}
                measurementSystem={measurementSystem}
                allowNegative
                min={measurementSystemUtils.roofHeightFromBaseMinLimit(measurementSystem)}
                max={measurements.to(2, measurementSystem)}
                value={
                  measurements.to(
                    isNullish(targetRoof) ? defaultRoofHeightFromBase : targetRoof.roofData.heightFromBase,
                    measurementSystem,
                  )
                }
                onChange={value => {
                  assert(!isNullish(targetRoof), 'This should never happen. |faw2dj|');

                  setRoofParams(targetRoof.id, null, {
                    heightFromBase: measurements.from(value, measurementSystem),
                  });
                }}
              />
            </MenuItem>
          </Animations.collapseRow>
        </AnimatePresence>
        <MenuItem divider>
          <InfoRow title={lang.slideUpMenus.roofSettings.roofArea} value={measurements.pretty.sqMSqFt(targetRoofArea, measurementSystem)} />
        </MenuItem>
        <MenuItem divider>
          <InfoRow
            title={lang.baseLevel}
            value={isNullish(targetLevel) ? '' : targetLevel.name}
          />
        </MenuItem>
      </MenuSection>
    </SlideUpAndFloatingMenusWrapper>
  );
};
