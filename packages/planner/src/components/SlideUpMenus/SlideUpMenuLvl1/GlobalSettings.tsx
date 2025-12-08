import { IconPickerRow, MenuItem, MenuSection, SwitchRow, TextField, TextOptionRow } from '@draw-house/ui/dist/components';
import { isPositive } from '@draw-house/common/dist/brands';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { AnimatePresence } from 'framer-motion';
import { closeSlideUpMenuLvl1, openSlideUpMenuLvl2, SlideUpMenuLvl1Store, useCreationModeConfig, useGlobalSettings } from '../../../zustand';
import { lang } from '../../../lang';
import { measurements } from '../../../utils';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { MeasurementPairedInputRow } from '../../MeasurementPairedInputRow';
import { ComingSoonWrapper } from '../../ComingSoonWrapper';
import { OutlineSettings } from '../OutlineSettings';
import { Animations } from '../../animations';
import { useStrapiAppConfigResolved } from '../../../zustand/useStrapiAppConfig';

export type GlobalSettingsProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'globalSettings' }>;
};

export const GlobalSettings: React.FC<GlobalSettingsProps> = ({ slideUpMenuLvl1: { isOpened } }) => {
  checkIsNotNever(isOpened);

  const projectName = useGlobalSettings(s => s.projectName);
  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const isGridShown = useGlobalSettings(s => s.isGridShown);
  const isZoomToSelectionActive = useGlobalSettings(s => s.isZoomToSelectionActive);
  const gridSpacing = useGlobalSettings(s => s.gridSpacing);
  const defaultRoof = useGlobalSettings(s => s.defaultRoof);
  const isOutlinesTurnedOn = useGlobalSettings(s => s.isOutlinesTurnedOn);
  const defaultExteriorWallThickness = useGlobalSettings(s => s.defaultExteriorWallThickness);
  const defaultInteriorWallThickness = useGlobalSettings(s => s.defaultInteriorWallThickness);
  const { strapiAppConfig } = useStrapiAppConfigResolved();

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.globalSettings.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
    >
      <MenuItem divider>
        <ComingSoonWrapper>
          <TextOptionRow
            label={lang.slideUpMenus.globalSettings.language}
            value={lang.slideUpMenus.globalSettings.languageValue}
            disabled
            onClick={() => {}}
          />
        </ComingSoonWrapper>
      </MenuItem>
      <MenuItem divider paddingHorizontal>
        <TextField
          type='text'
          label={lang.slideUpMenus.globalSettings.projectName}
          size='lg'
          value={projectName}
          onChange={projectName => {
            useGlobalSettings.setState({ projectName });
          }}
        />
      </MenuItem>
      {
        strapiAppConfig.enableOutlinesFeature === true && (
          <>
            <MenuItem divider>
              <SwitchRow
                title={lang.slideUpMenus.globalSettings.outlines}
                checked={isOutlinesTurnedOn}
                onClick={() => {
                  useGlobalSettings.setState({
                    isOutlinesTurnedOn: isOutlinesTurnedOn === false,
                  });
                }}
              />
            </MenuItem>
            <AnimatePresence>
              {
                isOutlinesTurnedOn === true && (
                  <Animations.collapseBlock>
                    <OutlineSettings />
                  </Animations.collapseBlock>
                )
              }
            </AnimatePresence>
          </>
        )
      }
      <MenuItem divider>
        <SwitchRow
          title={lang.slideUpMenus.globalSettings.backgroundGrid}
          checked={isGridShown}
          onClick={() => {
            useGlobalSettings.setState({
              isGridShown: isGridShown === false,
            });
          }}
        />
      </MenuItem>
      <MenuItem divider>
        <SwitchRow
          title={lang.slideUpMenus.globalSettings.zoomToSelection}
          checked={isZoomToSelectionActive}
          onClick={() => {
            useGlobalSettings.setState({
              isZoomToSelectionActive: isZoomToSelectionActive === false,
            });
          }}
        />
      </MenuItem>
      <MenuItem divider>
        <MeasurementPairedInputRow
          name='grid-spacing'
          label={lang.slideUpMenus.globalSettings.gridSpacing}
          measurementSystem={measurementSystem}
          value={measurements.to(gridSpacing, measurementSystem)}
          min={measurements.to(0.01, measurementSystem)}
          max={measurements.to(30, measurementSystem)}
          onChange={value => {
            const gridSpacing = measurements.from(value, measurementSystem);
            if(!isPositive(gridSpacing)) {
              return;
            }

            useGlobalSettings.setState({ gridSpacing });
          }}
        />
      </MenuItem>
      <MenuItem divider>
        <TextOptionRow
          label={lang.slideUpMenus.globalSettings.snapConditions}
          value={lang.slideUpMenus.globalSettings.snapConditionsValue}
          onClick={async () => {
            await closeSlideUpMenuLvl1({ preserveState: true });
            await openSlideUpMenuLvl2({
              type: 'snapSettings',
              isOpened: true,
            });
          }}
        />
      </MenuItem>
      <MenuSection
        title={lang.slideUpMenus.globalSettings.autoGeneratedRoofStyle}
        type='static'
        divider='content'
        titleVariant='pale'
      >
        <MenuItem>
          <IconPickerRow
            items={[
              {
                id: 'hip-with-all-gable-corners',
                icon: 'gableRoof',
                state: defaultRoof.isVisible === true && defaultRoof.type === 'hip-with-all-gable-corners' ? 'active' : 'default',
                label: lang.roofType('hip-with-all-gable-corners'),
              },
              {
                id: 'hip',
                icon: 'hipRoof',
                state: defaultRoof.isVisible === true && defaultRoof.type === 'hip' ? 'active' : 'default',
                label: lang.roofType('hip'),
              },
              {
                id: 'wraparound',
                icon: 'wraparoundRoof',
                state: defaultRoof.isVisible === true && defaultRoof.type === 'wraparound' ? 'active' : 'default',
                label: lang.roofType('wraparound'),
              },
              {
                id: 'slanted',
                icon: 'slantedRoof',
                state: defaultRoof.isVisible === true && defaultRoof.type === 'slanted' ? 'active' : 'default',
                label: lang.roofType('slanted'),
              },
              {
                id: 'flat',
                icon: 'flatRoof',
                state: defaultRoof.isVisible === true && defaultRoof.type === 'flat' ? 'active' : 'default',
                label: lang.roofType('flat'),
              },
              {
                id: 'none',
                icon: 'noRoof',
                state: defaultRoof.isVisible === false ? 'active' : 'default',
                label: lang.roofType('none'),
              },
            ]}
            onClick={type => {
              const { creationModeConfig } = useCreationModeConfig.getState();

              switch(type) {
                case 'none':
                  useGlobalSettings.setState({
                    defaultRoof: {
                      ...defaultRoof,
                      isVisible: false,
                    },
                  });
                  useCreationModeConfig.setState({
                    creationModeConfig: {
                      ...creationModeConfig,
                      isCeilingVisible: false,
                    },
                  });

                  break;
                case 'hip-with-all-gable-corners':
                case 'hip':
                case 'flat':
                case 'slanted':
                case 'wraparound':
                  useGlobalSettings.setState({
                    defaultRoof: {
                      isVisible: true,
                      type,
                    },
                  });
                  useCreationModeConfig.setState({
                    creationModeConfig: {
                      ...creationModeConfig,
                      isCeilingVisible: true,
                    },
                  });

                  break;
                default:
                  ((e: never) => e)(type);
                  throw new Error('This should never happen. |clt2lh|');
              }
            }}
          />
        </MenuItem>
      </MenuSection>
      <MenuItem divider>
        <MeasurementPairedInputRow
          name='default-exterior-wall-thickness'
          label={lang.slideUpMenus.globalSettings.defaultWallThickness('exterior')}
          measurementSystem={measurementSystem}
          value={measurements.to(defaultExteriorWallThickness, measurementSystem)}
          min={measurements.to(0.01, measurementSystem)}
          max={measurements.to(30, measurementSystem)}
          onChange={value => {
            const defaultExteriorWallThickness = measurements.from(value, measurementSystem);
            if(!isPositive(defaultExteriorWallThickness)) {
              return;
            }

            useGlobalSettings.setState({ defaultExteriorWallThickness });
          }}
        />
      </MenuItem>
      <MenuItem divider>
        <MeasurementPairedInputRow
          name='default-interior-wall-thickness'
          label={lang.slideUpMenus.globalSettings.defaultWallThickness('interior')}
          measurementSystem={measurementSystem}
          value={measurements.to(defaultInteriorWallThickness, measurementSystem)}
          min={measurements.to(0.01, measurementSystem)}
          max={measurements.to(30, measurementSystem)}
          onChange={value => {
            const defaultInteriorWallThickness = measurements.from(value, measurementSystem);
            if(!isPositive(defaultInteriorWallThickness)) {
              return;
            }

            useGlobalSettings.setState({ defaultInteriorWallThickness });
          }}
        />
      </MenuItem>
    </SlideUpAndFloatingMenusWrapper>
  );
};
