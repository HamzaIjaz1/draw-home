import { HexColorPicker } from 'react-colorful';
import Color, { ColorInstance } from 'color';
import { useEffect, useState } from 'react';
import { AppearanceContainer, HexRgbColorInput, MenuItem, Palette, SliderRow, Tab, Tabs } from '@draw-house/ui/dist/components';
import { colorPickerBlue, colorPickerGreen, colorPickerRed } from '@draw-house/ui/dist/theme';
import { AnimatePresence } from 'framer-motion';
import assert from 'assert';
import { isNull } from '@arthurka/ts-utils';
import { lang } from '../../../lang';
import { Animations } from '../../animations';
import { setAppearanceColorWithUpdate, useAppearanceColor } from '../../../zustand/useAppearanceColor';

export type ColorPickerProps = {
  type: `${'wall' | 'ceiling' | 'floor' | 'roof' | 'customModel' | 'wallFurniture'}Appearance`;
  value: ColorInstance;
  onChange: (c: ColorInstance) => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({ type, value, onChange }) => {
  const [alpha, setAlpha] = useState(value.alpha());
  const [chosenTabIndex, setChosenTabIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const { appearanceColor } = useAppearanceColor();
  assert(!isNull(appearanceColor) && appearanceColor.type === type, 'Something went wrong. |dx794d|');

  const [paletteValue, setPaletteValue] = useState(isNull(appearanceColor.color) ? null : value.hex());

  useEffect(() => {
    setPaletteValue(!isNull(appearanceColor.color) ? value.hex() : null);
  }, [appearanceColor.color, value]);

  useEffect(() => {
    setAlpha(value.alpha());
  }, [value]);

  const applyHexFromPalette = (hex: string) => {
    setErrorMsg('');
    onChange(new Color(hex).alpha(alpha));
  };

  return (
    <>
      <AppearanceContainer>
        <MenuItem minHeight='unset'>
          <Tabs
            stretch
            chosenTab={chosenTabIndex}
            onClick={setChosenTabIndex}
          >
            <Tab label={lang.slideUpMenus.appearance.labels.palette} />
            <Tab label={lang.slideUpMenus.appearance.labels.spectrum} />
            <Tab label={lang.slideUpMenus.appearance.labels.slider} />
          </Tabs>
        </MenuItem>
      </AppearanceContainer>
      <AnimatePresence>
        <Animations.collapseBlock key={chosenTabIndex}>
          {
            chosenTabIndex === 0 && (
              <MenuItem paddingHorizontal paddingVertical='md'>
                <Palette
                  value={paletteValue}
                  noneOptionImage='/none.png'
                  onChange={hex => {
                    setPaletteValue(hex);
                    applyHexFromPalette(hex);
                  }}
                  noneOptionClick={() => {
                    setPaletteValue(null);
                    setAppearanceColorWithUpdate(true, type, null);
                  }}
                />
              </MenuItem>
            )
          }
          {
            chosenTabIndex === 1 && (
              <MenuItem paddingHorizontal paddingVertical='md'>
                <div style={{ width: '100%' }}>
                  <HexColorPicker
                    style={{ width: '100%' }}
                    color={value.hex()}
                    onChange={hex => {
                      setErrorMsg('');
                      onChange(new Color(hex).alpha(alpha));
                    }}
                  />
                </div>
              </MenuItem>
            )
          }
          {
            chosenTabIndex === 2 && (
              <>
                <MenuItem paddingHorizontal paddingVertical='md'>
                  <SliderRow
                    label='Red'
                    color={colorPickerRed}
                    min={0}
                    max={255}
                    step={1}
                    value={value.red()}
                    onChange={e => {
                      setErrorMsg('');
                      onChange(value.red(e).alpha(alpha));
                    }}
                  />
                </MenuItem>
                <MenuItem paddingHorizontal paddingVertical='md'>
                  <SliderRow
                    label='Green'
                    color={colorPickerGreen}
                    min={0}
                    max={255}
                    step={1}
                    value={value.green()}
                    onChange={e => {
                      setErrorMsg('');
                      onChange(value.green(e).alpha(alpha));
                    }}
                  />
                </MenuItem>
                <MenuItem paddingHorizontal paddingVertical='md'>
                  <SliderRow
                    label='Blue'
                    color={colorPickerBlue}
                    min={0}
                    max={255}
                    step={1}
                    value={value.blue()}
                    onChange={e => {
                      setErrorMsg('');
                      onChange(value.blue(e).alpha(alpha));
                    }}
                  />
                </MenuItem>
              </>
            )
          }
        </Animations.collapseBlock>
      </AnimatePresence>
      <MenuItem paddingHorizontal paddingVertical='md'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
          <HexRgbColorInput
            value={value}
            alpha={alpha}
            onChange={onChange}
            setErrorMsg={setErrorMsg}
          />
          {
            errorMsg !== '' && (
              <div
                role='alert'
                style={{
                  fontSize: 12,
                  lineHeight: '16px',
                  color: '#e74c3c',
                  paddingLeft: 2,
                }}
              >
                {errorMsg}
              </div>
            )
          }
        </div>
      </MenuItem>
    </>
  );
};
