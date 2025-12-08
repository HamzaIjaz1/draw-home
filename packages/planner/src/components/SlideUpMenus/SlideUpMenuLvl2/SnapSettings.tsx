import { MeasurementInputRow, MenuItem, SwitchRow } from '@draw-house/ui/dist/components';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { isPositive } from '@draw-house/common/dist/brands';
import { closeSlideUpMenuLvl2, showSlideUpMenuLvl1, SlideUpMenuLvl2Store, useCreationMode, useGlobalSettings, useNewLevelData } from '../../../zustand';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { getHoldingModifiers, useModifierKeysHolding } from '../../../zustand/useModifierKeysHolding';

export type SnapSettingsProps = {
  slideUpMenuLvl2: Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'snapSettings' }>;
};

export const SnapSettings: React.FC<SnapSettingsProps> = ({ slideUpMenuLvl2: { isOpened } }) => {
  checkIsNotNever(isOpened);

  const snapToWallEnd = useGlobalSettings(s => s.snapToWallEnd);
  const snapToWallLine = useGlobalSettings(s => s.snapToWallLine);
  const snapToGrid = useGlobalSettings(s => s.snapToGrid);
  const snapToLockedAxis = useGlobalSettings(s => s.snapToLockedAxis);
  const snapDistanceFactor = useGlobalSettings(s => s.snapDistanceFactor);
  const { creationMode } = useCreationMode();
  const { modifierKeysHolding } = useModifierKeysHolding();

  const holdingModifiers = getHoldingModifiers(modifierKeysHolding);

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.globalSettings.snapConditions}
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
      <MenuItem divider>
        <MeasurementInputRow
          label={lang.slideUpMenus.globalSettings.snapDistance}
          firstInput={{
            name: 'snap-distance',
            value: snapDistanceFactor.toString(),
            adornment: '',
            min: 1,
            max: 10,
            onChange(value) {
              const snapDistanceFactor = +value;
              if(!isPositive(snapDistanceFactor)) {
                return;
              }

              useGlobalSettings.setState({ snapDistanceFactor });
            },
          }}
        />
      </MenuItem>
      <MenuItem divider>
        <SwitchRow
          title={lang.slideUpMenus.snapSettings.wallEnd}
          checked={snapToWallEnd === true}
          onClick={() => {
            useGlobalSettings.setState({
              snapToWallEnd: snapToWallEnd === false,
            });
          }}
        />
      </MenuItem>
      <MenuItem divider>
        <SwitchRow
          title={lang.slideUpMenus.snapSettings.snapToWallLine}
          checked={snapToWallLine === true}
          onClick={() => {
            useGlobalSettings.setState({
              snapToWallLine: snapToWallLine === false,
            });
          }}
        />
      </MenuItem>
      <MenuItem divider>
        {
          (() => {
            const isInteractive = creationMode !== 'walls' || holdingModifiers !== 'shift' && holdingModifiers !== 'ctrl+shift';

            return (
              <SwitchRow
                disabled={isInteractive === false}
                title={lang.slideUpMenus.snapSettings.grid}
                checked={snapToGrid === isInteractive}
                onClick={() => {
                  useGlobalSettings.setState({
                    snapToGrid: snapToGrid === false,
                  });
                }}
              />
            );
          })()
        }
      </MenuItem>
      <MenuItem>
        {
          (() => {
            const isInteractive = creationMode !== 'walls' || holdingModifiers !== 'ctrl' && holdingModifiers !== 'ctrl+shift';

            return (
              <SwitchRow
                disabled={isInteractive === false}
                title={lang.slideUpMenus.snapSettings.axis}
                checked={snapToLockedAxis === isInteractive}
                onClick={() => {
                  useGlobalSettings.setState({
                    snapToLockedAxis: snapToLockedAxis === false,
                  });
                }}
              />
            );
          })()
        }
      </MenuItem>
    </SlideUpAndFloatingMenusWrapper>
  );
};
