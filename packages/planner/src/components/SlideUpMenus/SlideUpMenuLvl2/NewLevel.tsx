import { MainButton, MenuItem, TextField } from '@draw-house/ui/dist/components';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { isPositive } from '@draw-house/common/dist/brands';
import { closeSlideUpMenuLvl2, createLevelFromNewLevelData, showSlideUpMenuLvl1, SlideUpMenuLvl2Store, useGlobalSettings, useNewLevelData } from '../../../zustand';
import { lang } from '../../../lang';
import { measurements } from '../../../utils';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { MeasurementPairedInputRow } from '../../MeasurementPairedInputRow';
import { levelMaxHeight } from '../../../constants';

export type NewLevelSettingsProps = {
  slideUpMenuLvl2: Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'newLevel' }>;
};

export const NewLevelSettings: React.FC<NewLevelSettingsProps> = ({ slideUpMenuLvl2: { isOpened } }) => {
  checkIsNotNever(isOpened);

  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const { elevation, height, name } = useNewLevelData().newLevelData;

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.levelsSettings.newLevel}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl2({});
        useNewLevelData.setState(useNewLevelData.getInitialState());
      }}
      onBack={async () => {
        await closeSlideUpMenuLvl2({});
        useNewLevelData.setState(useNewLevelData.getInitialState());
        showSlideUpMenuLvl1();
      }}
    >
      <MenuItem divider paddingHorizontal>
        <TextField
          type='text'
          size='lg'
          label={lang.slideUpMenus.levelsSettings.levelName}
          value={name}
          onChange={name => {
            useNewLevelData.setState({
              newLevelData: {
                name,
                elevation,
                height,
              },
            });
          }}
        />
      </MenuItem>
      <MenuItem divider>
        <MeasurementPairedInputRow
          name='level-elevation'
          icon='levelElevationHint'
          label={lang.slideUpMenus.levelsSettings.levelElevation}
          measurementSystem={measurementSystem}
          value={measurements.to(elevation, measurementSystem)}
          allowNegative
          min={measurements.to(-20, measurementSystem)}
          max={measurements.to(30, measurementSystem)}
          onChange={value => {
            useNewLevelData.setState({
              newLevelData: {
                name,
                height,
                elevation: measurements.from(value, measurementSystem),
              },
            });
          }}
        />
      </MenuItem>
      <MenuItem divider>
        <MeasurementPairedInputRow
          name='level-height'
          icon='floorHeightHint'
          label={lang.slideUpMenus.levelsSettings.levelHeight}
          measurementSystem={measurementSystem}
          value={measurements.to(height, measurementSystem)}
          min={measurements.to(0.5, measurementSystem)}
          max={measurements.to(levelMaxHeight, measurementSystem)}
          onChange={value => {
            const height = measurements.from(value, measurementSystem);
            if(!isPositive(height)) {
              return;
            }

            useNewLevelData.setState({
              newLevelData: {
                name,
                elevation,
                height,
              },
            });
          }}
        />
      </MenuItem>
      <MenuItem spaceBetween paddingVertical='lg' paddingHorizontal>
        <MainButton
          variant='text'
          text={lang.cancel}
          width='lg'
          height='md'
          onClick={async () => {
            await closeSlideUpMenuLvl2({});
            useNewLevelData.setState(useNewLevelData.getInitialState());
            showSlideUpMenuLvl1();
          }}
        />
        <MainButton
          text={lang.slideUpMenus.levelsSettings.createLevel}
          width='lg'
          height='md'
          shadowless
          onClick={async () => {
            await closeSlideUpMenuLvl2({});
            createLevelFromNewLevelData();
            showSlideUpMenuLvl1();
          }}
        />
      </MenuItem>
    </SlideUpAndFloatingMenusWrapper>
  );
};
