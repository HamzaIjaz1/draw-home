import { MainButton, MenuItem, TextField } from '@draw-house/ui/dist/components';
import assert from 'assert';
import { isNull, isNullish } from '@arthurka/ts-utils';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { isPositive } from '@draw-house/common/dist/brands';
import { useTheme } from '@mui/material';
import { closeSlideUpMenuLvl2, deleteLevel, setLevelParams, showSlideUpMenuLvl1, SlideUpMenuLvl2Store, useGlobalSettings, useLevels } from '../../../zustand';
import { lang } from '../../../lang';
import { measurements } from '../../../utils';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { MeasurementPairedInputRow } from '../../MeasurementPairedInputRow';
import { levelMaxHeight } from '../../../constants';

export type LevelSettingsProps = {
  slideUpMenuLvl2: Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'levelSettings' }>;
};

export const LevelSettings: React.FC<LevelSettingsProps> = ({
  slideUpMenuLvl2: {
    isOpened,
    levelId,
  },
}) => {
  checkIsNotNever(isOpened);

  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const theme = useTheme();
  const { levels } = useLevels();

  const targetLevel = isNull(levelId) ? null : levels.find(e => e.id === levelId);

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.levelsSettings.levelSettings}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl2({});
      }}
      onBack={async () => {
        await closeSlideUpMenuLvl2({});
        showSlideUpMenuLvl1();
      }}
    >
      <MenuItem divider paddingHorizontal>
        <TextField
          type='text'
          size='lg'
          label={lang.slideUpMenus.levelsSettings.levelName}
          value={isNullish(targetLevel) ? '' : targetLevel.name}
          onChange={name => {
            assert(!isNull(levelId), 'This should never happen. |llh9t5|');

            setLevelParams(levelId, { name });
          }}
        />
      </MenuItem>
      <MenuItem divider>
        <MeasurementPairedInputRow
          name='level-elevation'
          icon='levelElevationHint'
          label={lang.slideUpMenus.levelsSettings.levelElevation}
          measurementSystem={measurementSystem}
          value={measurements.to(isNullish(targetLevel) ? 0 : targetLevel.elevation, measurementSystem)}
          allowNegative
          min={measurements.to(-20, measurementSystem)}
          max={measurements.to(30, measurementSystem)}
          onChange={value => {
            assert(!isNull(levelId), 'This should never happen. |d9m1t5|');

            setLevelParams(levelId, {
              elevation: measurements.from(value, measurementSystem),
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
          value={measurements.to(isNullish(targetLevel) ? 0 : targetLevel.height, measurementSystem)}
          min={measurements.to(0.5, measurementSystem)}
          max={measurements.to(levelMaxHeight, measurementSystem)}
          onChange={value => {
            assert(!isNull(levelId), 'This should never happen. |7gu53y|');

            const height = measurements.from(value, measurementSystem);
            if(!isPositive(height)) {
              return;
            }

            setLevelParams(levelId, { height });
          }}
        />
      </MenuItem>
      <MenuItem paddingHorizontal='row 3/4'>
        <MainButton
          variant='text'
          text={lang.slideUpMenus.levelsSettings.deleteLevel}
          icon='bin'
          padding='row 1/4'
          height='md'
          iconColors={{ default: theme.palette.primary.main }}
          textColors={{ default: theme.palette.primary.main }}
          onClick={async () => {
            assert(!isNull(levelId), 'This should never happen. |d85212|');

            await closeSlideUpMenuLvl2({});
            deleteLevel(levelId);
            showSlideUpMenuLvl1();
          }}
        />
      </MenuItem>
    </SlideUpAndFloatingMenusWrapper>
  );
};
