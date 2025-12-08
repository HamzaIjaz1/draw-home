import { ButtonOptionsRow, MenuItem, MenuSection } from '@draw-house/ui/dist/components';
import assert from 'assert';
import { isNull, isNullish } from '@arthurka/ts-utils';
import { isPositive, Positive } from '@draw-house/common/dist/brands';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { closeSlideUpMenuLvl1, setDormerParams, SlideUpMenuLvl1Store, useGlobalSettings, useRoofs } from '../../../zustand';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { measurements } from '../../../utils';
import { SuspenseHOC } from '../../SuspenseHOC';
import { MeasurementPairedInputRow } from '../../MeasurementPairedInputRow';

export type RoofDormerSettingsProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'roofDormer' }>;
};

export const RoofDormerSettings: React.FC<RoofDormerSettingsProps> = SuspenseHOC(({
  slideUpMenuLvl1: {
    isOpened,
    dormerId,
  },
}) => {
  checkIsNotNever(isOpened);

  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const { roofs } = useRoofs();

  const targetDormer = (
    isNull(dormerId)
      ? null
      : roofs.flatMap(e => e.roofData.dormers).find(e => e.id === dormerId)
  );

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.roofDormerSettings.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
    >
      <MenuSection
        type='collapsible'
        defaultExpanded
        title={lang.slideUpMenus.roofDormerSettings.dormerType}
      >
        <MenuItem divider>
          <ButtonOptionsRow
            label={lang.slideUpMenus.roofDormerSettings.dormerType}
            options={[
              {
                icon: 'gableDormer',
                state: isNullish(targetDormer) ? 'default' : targetDormer.type === 'gable' ? 'active' : 'default',
                selected: isNullish(targetDormer) ? false : targetDormer.type === 'gable',
                onClick() {
                  assert(!isNull(dormerId), 'This should never happen. |z3zq1b|');

                  setDormerParams(dormerId, {
                    type: 'gable',
                  });
                },
              },
              {
                icon: 'hipDormer',
                state: isNullish(targetDormer) ? 'default' : targetDormer.type === 'hip' ? 'active' : 'default',
                selected: isNullish(targetDormer) ? false : targetDormer.type === 'hip',
                onClick() {
                  assert(!isNull(dormerId), 'This should never happen. |b3s737|');

                  setDormerParams(dormerId, {
                    type: 'hip',
                  });
                },
              },
              {
                icon: 'shedDormer',
                state: isNullish(targetDormer) ? 'default' : targetDormer.type === 'shed' ? 'active' : 'default',
                selected: isNullish(targetDormer) ? false : targetDormer.type === 'shed',
                onClick() {
                  assert(!isNull(dormerId), 'This should never happen. |sjf2s0|');

                  setDormerParams(dormerId, {
                    type: 'shed',
                  });
                },
              },
            ]}
          />
        </MenuItem>
      </MenuSection>
      <MenuSection type='collapsible' defaultExpanded title={lang.settings}>
        <MenuItem>
          <MeasurementPairedInputRow
            name='dormer-width'
            label={lang.width}
            measurementSystem={measurementSystem}
            value={
              measurements.to(
                isNullish(targetDormer) ? 0 : targetDormer.width,
                measurementSystem,
              )
            }
            onChange={value => {
              assert(!isNull(dormerId), 'This should never happen. |pw32wc|');

              const width = measurements.from(value, measurementSystem);

              if(isPositive(width)) {
                setDormerParams(dormerId, {
                  width: Positive(width),
                });
              }
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='dormer-depth'
            label={lang.depth}
            measurementSystem={measurementSystem}
            value={
              measurements.to(
                isNullish(targetDormer) ? 0 : targetDormer.depth,
                measurementSystem,
              )
            }
            onChange={value => {
              assert(!isNull(dormerId), 'This should never happen. |7o48vm|');

              const depth = measurements.from(value, measurementSystem);

              if(isPositive(depth)) {
                setDormerParams(dormerId, {
                  depth: Positive(depth),
                });
              }
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='dormer-height'
            label={lang.height}
            measurementSystem={measurementSystem}
            value={
              measurements.to(
                isNullish(targetDormer) ? 0 : targetDormer.height,
                measurementSystem,
              )
            }
            onChange={value => {
              assert(!isNull(dormerId), 'This should never happen. |kw6sxs|');

              const height = measurements.from(value, measurementSystem);

              if(isPositive(height)) {
                setDormerParams(dormerId, {
                  height: Positive(height),
                });
              }
            }}
          />
        </MenuItem>
      </MenuSection>
    </SlideUpAndFloatingMenusWrapper>
  );
});
