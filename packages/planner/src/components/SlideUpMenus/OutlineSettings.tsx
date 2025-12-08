import { ButtonOptionsRow, MenuItem, TextField } from '@draw-house/ui/dist/components';
import { round } from '@arthurka/ts-utils';
import { useGlobalSettings } from '../../zustand';
import { lang } from '../../lang';

export const OutlineSettings: React.FC = () => {
  const outlinesSettings = useGlobalSettings(s => s.outlinesSettings);

  return (
    <>
      <MenuItem divider paddingHorizontal>
        <TextField
          type='number'
          label={lang.slideUpMenus.globalSettings.outlinesSettings.depthBias}
          size='sm'
          min={0.01}
          max={5000}
          value={outlinesSettings.depthBias.toString()}
          onChange={value => {
            useGlobalSettings.setState({
              outlinesSettings: {
                ...outlinesSettings,
                depthBias: round(+value, 2),
              },
            });
          }}
        />
      </MenuItem>
      <MenuItem divider paddingHorizontal>
        <TextField
          type='number'
          label={lang.slideUpMenus.globalSettings.outlinesSettings.depthMultiplier}
          size='sm'
          min={0.01}
          max={5000}
          value={outlinesSettings.depthMultiplier.toString()}
          onChange={value => {
            useGlobalSettings.setState({
              outlinesSettings: {
                ...outlinesSettings,
                depthMultiplier: round(+value, 2),
              },
            });
          }}
        />
      </MenuItem>
      <MenuItem divider paddingHorizontal>
        <TextField
          type='number'
          label={lang.slideUpMenus.globalSettings.outlinesSettings.normalBias}
          size='sm'
          min={0.01}
          max={5000}
          value={outlinesSettings.normalBias.toString()}
          onChange={value => {
            useGlobalSettings.setState({
              outlinesSettings: {
                ...outlinesSettings,
                normalBias: round(+value, 2),
              },
            });
          }}
        />
      </MenuItem>
      <MenuItem divider paddingHorizontal>
        <TextField
          type='number'
          label={lang.slideUpMenus.globalSettings.outlinesSettings.normalMultiplier}
          size='sm'
          min={0.01}
          max={5000}
          value={outlinesSettings.normalMultiplier.toString()}
          onChange={value => {
            useGlobalSettings.setState({
              outlinesSettings: {
                ...outlinesSettings,
                normalMultiplier: round(+value, 2),
              },
            });
          }}
        />
      </MenuItem>
      <MenuItem divider paddingHorizontal>
        <TextField
          type='text'
          label={lang.slideUpMenus.globalSettings.outlinesSettings.outlineColor}
          size='sm'
          value={outlinesSettings.outlineColor}
          onChange={value => {
            useGlobalSettings.setState({
              outlinesSettings: {
                ...outlinesSettings,
                outlineColor: value,
              },
            });
          }}
        />
      </MenuItem>
      <MenuItem divider>
        <ButtonOptionsRow
          label={lang.slideUpMenus.globalSettings.outlinesSettings.debugVisualize}
          options={[
            {
              text: 'all',
              selected: outlinesSettings.debugVisualize === 0,
              onClick() {
                useGlobalSettings.setState({
                  outlinesSettings: {
                    ...outlinesSettings,
                    debugVisualize: 0,
                  },
                });
              },
            },
            {
              text: 'c',
              selected: outlinesSettings.debugVisualize === 1,
              onClick() {
                useGlobalSettings.setState({
                  outlinesSettings: {
                    ...outlinesSettings,
                    debugVisualize: 1,
                  },
                });
              },
            },
            {
              text: 'd',
              selected: outlinesSettings.debugVisualize === 2,
              onClick() {
                useGlobalSettings.setState({
                  outlinesSettings: {
                    ...outlinesSettings,
                    debugVisualize: 2,
                  },
                });
              },
            },
            {
              text: 'n',
              selected: outlinesSettings.debugVisualize === 3,
              onClick() {
                useGlobalSettings.setState({
                  outlinesSettings: {
                    ...outlinesSettings,
                    debugVisualize: 3,
                  },
                });
              },
            },
            {
              text: 'o',
              selected: outlinesSettings.debugVisualize === 4,
              onClick() {
                useGlobalSettings.setState({
                  outlinesSettings: {
                    ...outlinesSettings,
                    debugVisualize: 4,
                  },
                });
              },
            },
          ]}
        />
      </MenuItem>
    </>
  );
};
