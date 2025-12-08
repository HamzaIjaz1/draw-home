import { checkIsNotNever, StrictExclude } from '@draw-house/common/dist/utils';
import { isNull, isNullish, ObjEntries } from '@arthurka/ts-utils';
import { ButtonOptionsRow, IconPickerRow, MainButton, MenuItem, MenuSection, SelectRow, SwitchRow, TextField } from '@draw-house/ui/dist/components';
import { useTheme } from '@mui/material';
import assert from 'assert';
import { StairsLegendIcon } from '@draw-house/ui/dist/components/Icons';
import { isPositive } from '@draw-house/common/dist/brands';
import { AnimatePresence } from 'framer-motion';
import { closeSlideUpMenuLvl1, SlideUpMenuLvl1Store, useGlobalSettings, useLevels } from '../../../zustand';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { removeStair, setStairParams, setStairRailingLocation, setStairStringerLocations, useStairs } from '../../../zustand/useStairs';
import { MeasurementPairedInputRow } from '../../MeasurementPairedInputRow';
import { measurements } from '../../../utils';
import { useCatalogDataResolved } from '../../../zustand/useCatalogData';
import { Animations } from '../../animations';
import { Stair } from '../../../zod/Stairs';

export type StairSettingsProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'stairSettings' }>;
};

export const StairSettings: React.FC<StairSettingsProps> = ({
  slideUpMenuLvl1: {
    isOpened,
    stairId,
  },
}) => {
  checkIsNotNever(isOpened);

  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const { stairs } = useStairs();
  const theme = useTheme();
  const { levels } = useLevels();
  const { catalogData } = useCatalogDataResolved();

  const targetStair = isNull(stairId) ? null : stairs.find(e => e.id === stairId);
  const stairsTypeToName = new Map(
    catalogData.models
      .map(e => [e.stairType, e.name] as const)
      .filter((e): e is [StrictExclude<typeof e[0], null>, typeof e[1]] => !isNull(e[0])),
  );

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.stairSettings.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
    >
      <MenuSection
        type='collapsible'
        title={lang.slideUpMenus.stairSettings.hint}
        titleVariant='pale'
        icon='hint'
        divider='content'
        defaultExpanded
      >
        <MenuItem center>
          <StairsLegendIcon />
        </MenuItem>
      </MenuSection>
      <MenuSection
        type='collapsible'
        title={lang.slideUpMenus.stairSettings.typeSection}
        divider='content'
        defaultExpanded
      >
        <MenuItem divider>
          <IconPickerRow
            items={[
              {
                icon: 'straightStairs',
                size: 'lg',
                id: 'straight',
                state: !isNullish(targetStair) && targetStair.type === 'straight' ? 'active' : 'default',
                label: stairsTypeToName.get('straight'),
              },
              {
                icon: 'LShapedStairs',
                size: 'lg',
                id: 'l-shaped',
                state: !isNullish(targetStair) && targetStair.type === 'l-shaped' ? 'active' : 'default',
                label: stairsTypeToName.get('L-shaped'),
              },
              {
                icon: 'UShapedStairs',
                size: 'lg',
                id: 'u-shaped',
                state: !isNullish(targetStair) && targetStair.type === 'u-shaped' ? 'active' : 'default',
                label: stairsTypeToName.get('U-shaped'),
              },
              {
                icon: 'spiralStairs',
                size: 'lg',
                id: 'spiral',
                state: !isNullish(targetStair) && targetStair.type === 'spiral' ? 'active' : 'default',
                label: stairsTypeToName.get('spiral'),
              },
            ]}
            onClick={type => {
              assert(!isNullish(targetStair), 'This should never happen. |yqg8ys|');

              setStairParams(targetStair.id, { type });
            }}
          />
        </MenuItem>
        <MenuItem paddingHorizontal>
          <TextField
            type='text'
            label={lang.slideUpMenus.stairSettings.name}
            size='lg'
            value={isNullish(targetStair) ? '' : targetStair.commentName}
            onChange={commentName => {
              assert(!isNullish(targetStair), 'This should never happen. |zhe9ea|');

              setStairParams(targetStair.id, { commentName });
            }}
          />
        </MenuItem>
      </MenuSection>
      <MenuSection
        type='collapsible'
        title={lang.settings}
        defaultExpanded
      >
        <MenuItem divider>
          <ButtonOptionsRow
            label={lang.slideUpMenus.stairSettings.railingsLocation}
            options={[
              {
                icon: 'railingsLeft',
                state: 'active',
                selected: isNullish(targetStair) ? false : targetStair.railingLocation.left,
                onClick() {
                  assert(!isNullish(targetStair), 'This should never happen. |pgv3pz|');

                  setStairRailingLocation(targetStair.id, {
                    ...targetStair.railingLocation,
                    left: targetStair.railingLocation.left === false,
                  });
                },
              },
              {
                icon: 'railingsRight',
                state: 'default',
                selected: isNullish(targetStair) ? false : targetStair.railingLocation.right,
                onClick() {
                  assert(!isNullish(targetStair), 'This should never happen. |tcx89a|');

                  setStairRailingLocation(targetStair.id, {
                    ...targetStair.railingLocation,
                    right: targetStair.railingLocation.right === false,
                  });
                },
              },
            ]}
          />
        </MenuItem>
        <MenuItem divider>
          <ButtonOptionsRow
            label={lang.slideUpMenus.stairSettings.stringerLocation}
            options={[
              {
                icon: 'stringerLeft',
                state: 'default',
                selected: isNullish(targetStair) ? false : targetStair.stringerLocations.left,
                onClick() {
                  assert(!isNullish(targetStair), 'This should never happen. |ovs6o0|');

                  setStairStringerLocations(targetStair.id, {
                    ...targetStair.stringerLocations,
                    left: targetStair.stringerLocations.left === false,
                  });
                },
              },
              {
                icon: 'stringerCenter',
                state: 'active',
                selected: isNullish(targetStair) ? false : targetStair.stringerLocations.middle,
                onClick() {
                  assert(!isNullish(targetStair), 'This should never happen. |cek84a|');

                  setStairStringerLocations(targetStair.id, {
                    ...targetStair.stringerLocations,
                    middle: targetStair.stringerLocations.middle === false,
                  });
                },
              },
              {
                icon: 'stringerRight',
                state: 'active',
                selected: isNullish(targetStair) ? false : targetStair.stringerLocations.right,
                onClick() {
                  assert(!isNullish(targetStair), 'This should never happen. |5ol57l|');

                  setStairStringerLocations(targetStair.id, {
                    ...targetStair.stringerLocations,
                    right: targetStair.stringerLocations.right === false,
                  });
                },
              },
            ]}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='stair-width'
            label={lang.slideUpMenus.stairSettings.width}
            measurementSystem={measurementSystem}
            value={measurements.to(isNullish(targetStair) ? 0 : targetStair.width, measurementSystem)}
            min={measurements.to(0.001, measurementSystem)}
            onChange={value => {
              assert(!isNullish(targetStair), 'This should never happen. |2q31it|');

              const width = measurements.from(value, measurementSystem);
              if(!isPositive(width)) {
                return;
              }

              setStairParams(targetStair.id, { width });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='stair-height'
            label={lang.height}
            measurementSystem={measurementSystem}
            value={measurements.to(isNullish(targetStair) ? 0 : targetStair.height, measurementSystem)}
            min={measurements.to(0.001, measurementSystem)}
            onChange={value => {
              assert(!isNullish(targetStair), 'This should never happen. |2746vg|');

              const height = measurements.from(value, measurementSystem);
              if(!isPositive(height)) {
                return;
              }

              setStairParams(targetStair.id, { height });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='stair-rise'
            label={lang.slideUpMenus.stairSettings.rise}
            measurementSystem={measurementSystem}
            value={measurements.to(isNullish(targetStair) ? 0 : targetStair.rise, measurementSystem)}
            min={measurements.to(0.001, measurementSystem)}
            onChange={value => {
              assert(!isNullish(targetStair), 'This should never happen. |qau8s8|');

              const rise = measurements.from(value, measurementSystem);
              if(!isPositive(rise)) {
                return;
              }

              setStairParams(targetStair.id, { rise });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='stair-run'
            label={lang.slideUpMenus.stairSettings.run}
            measurementSystem={measurementSystem}
            value={measurements.to(isNullish(targetStair) ? 0 : targetStair.run, measurementSystem)}
            min={measurements.to(0.001, measurementSystem)}
            onChange={value => {
              assert(!isNullish(targetStair), 'This should never happen. |5sx0ll|');

              const run = measurements.from(value, measurementSystem);
              if(!isPositive(run)) {
                return;
              }

              setStairParams(targetStair.id, { run });
            }}
          />
        </MenuItem>
        <MenuItem>
          <SelectRow
            label={lang.baseLevel}
            value={isNullish(targetStair) ? '' : targetStair.levelId}
            options={levels.map(e => ({ label: e.name, value: e.id }))}
            onChange={levelId => {
              assert(!isNullish(targetStair), 'This should never happen. |dsd82j|');

              setStairParams(targetStair.id, { levelId });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <SwitchRow
            title={lang.slideUpMenus.stairSettings.topLanding}
            checked={isNullish(targetStair) ? false : targetStair.includeTopLanding}
            onClick={() => {
              assert(!isNullish(targetStair), 'This should never happen. |tl001a|');

              setStairParams(targetStair.id, {
                includeTopLanding: targetStair.includeTopLanding === false,
              });
            }}
          />
        </MenuItem>
        <AnimatePresence>
          {
            !isNullish(targetStair) && targetStair.includeTopLanding === true && (
              <Animations.collapseBlock>
                <MenuItem divider>
                  <ButtonOptionsRow
                    label={lang.slideUpMenus.stairSettings.railingOrientation}
                    options={
                      ObjEntries({
                        L: 'outerLeft',
                        M: 'middle',
                        R: 'outerRight',
                      } satisfies Record<string, Stair['topLandingRailingOrientation']>).map(([text, topLandingRailingOrientation]) => ({
                        text,
                        selected: targetStair.topLandingRailingOrientation === topLandingRailingOrientation,
                        onClick() {
                          setStairParams(targetStair.id, { topLandingRailingOrientation });
                        },
                      }))
                    }
                  />
                </MenuItem>
              </Animations.collapseBlock>
            )
          }
        </AnimatePresence>
      </MenuSection>
      <MenuSection
        type='collapsible'
        title={lang.slideUpMenus.stairSettings.assembly}
        defaultExpanded
      >
        <MenuItem divider paddingHorizontal>
          <TextField
            type='text'
            label={lang.slideUpMenus.stairSettings.stairs}
            size='lg'
            value={isNullish(targetStair) ? '' : targetStair.commentStairs}
            onChange={commentStairs => {
              assert(!isNullish(targetStair), 'This should never happen. |q8b08d|');

              setStairParams(targetStair.id, { commentStairs });
            }}
          />
        </MenuItem>
        <MenuItem divider paddingHorizontal>
          <TextField
            type='text'
            label={lang.slideUpMenus.stairSettings.stringer}
            size='lg'
            value={isNullish(targetStair) ? '' : targetStair.commentStringer}
            onChange={commentStringer => {
              assert(!isNullish(targetStair), 'This should never happen. |b15i5o|');

              setStairParams(targetStair.id, { commentStringer });
            }}
          />
        </MenuItem>
        <MenuItem divider paddingHorizontal>
          <TextField
            type='text'
            label={lang.slideUpMenus.stairSettings.railings}
            size='lg'
            value={isNullish(targetStair) ? '' : targetStair.commentRailings}
            onChange={commentRailings => {
              assert(!isNullish(targetStair), 'This should never happen. |8m0qq1|');

              setStairParams(targetStair.id, { commentRailings });
            }}
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
            assert(!isNullish(targetStair), 'This should never happen. |9t30ii|');

            removeStair(targetStair.id);
          }}
        />
      </MenuItem>
    </SlideUpAndFloatingMenusWrapper>
  );
};
