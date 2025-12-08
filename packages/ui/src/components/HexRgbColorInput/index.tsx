import { WithClassName } from '@draw-house/common/dist/utils';
import Color from 'color';
import { styled } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { isNull } from '@arthurka/ts-utils';
import { theme } from '../../theme';
import { TextField } from '../TextField';

const HexRgbColorInputWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ModeSwitch = styled('div')`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const ModeButton = styled('button')<{ $active?: boolean }>`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font-weight: 700;
  line-height: 1;
  color: ${({ $active }) => ($active ? theme.palette.primary.main : 'inherit')};
  opacity: ${({ $active }) => ($active ? 1 : 0.75)};
`;

const Slash = styled('span')`
  user-select: none;
  pointer-events: none;
  opacity: 0.5;
`;

type Mode = 'HEX' | 'RGB';

export type HexRgbColorInputProps = {
  value: InstanceType<typeof Color>;
  alpha: number;
  setErrorMsg: (message: string) => void;
  onChange: (c: InstanceType<typeof Color>) => void;
};

export const HexRgbColorInput = ({
  className,
  value,
  alpha,
  setErrorMsg,
  onChange,
}: HexRgbColorInputProps & WithClassName) => {
  const [mode, setMode] = useState<Mode>('HEX');
  const [inputValue, setInputValue] = useState('');

  const formatHex = (c: InstanceType<typeof Color>) => c.hex().toUpperCase();
  const formatRgb = (c: InstanceType<typeof Color>) => `${c.red()}, ${c.green()}, ${c.blue()}`;

  const syncInputFromColor = useCallback((m: Mode, c: InstanceType<typeof Color>) => {
    setInputValue(m === 'HEX' ? formatHex(c) : formatRgb(c));
    setErrorMsg('');
  }, [setErrorMsg]);

  useEffect(() => {
    syncInputFromColor(mode, value);
  }, [value, mode, syncInputFromColor]);

  const applyHexMasked = (raw: string) => {
    const cleaned = raw
      .replace(/[^#0-9a-f]/gi, '')
      .replace(/^([^#])/, '#$1')
      .slice(0, 7);

    setInputValue(cleaned);

    const hexNoHash = cleaned.replace('#', '');

    if(hexNoHash.length === 0) {
      setErrorMsg('');
      return;
    }

    if(!/^[0-9a-fA-F]*$/.test(hexNoHash)) {
      setErrorMsg('Only hex digits 0–9 and A–F are allowed.');
      return;
    }

    if(hexNoHash.length !== 6) {
      setErrorMsg('Enter exactly 6 hex digits (e.g., #a1b2c3).');
      return;
    }

    try {
      setErrorMsg('');
      onChange(Color(`#${hexNoHash}`).alpha(alpha));
    } catch(e) {
      setErrorMsg('Invalid hex color.');
    }
  };

  const applyRgbMasked = (raw: string) => {
    const cleaned = raw.replace(/[^0-9,\s]/g, '');
    setInputValue(cleaned);

    if(cleaned.trim().length === 0) {
      setErrorMsg('');
      return;
    }

    if(!/^[0-9,\s]*$/.test(cleaned)) {
      setErrorMsg('Only numbers, commas, and spaces are allowed.');
      return;
    }

    const match = cleaned.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/);

    if(isNull(match)) {
      setErrorMsg('Use the format: r, g, b (e.g., 12, 128, 255).');
      return;
    }

    const [r, g, b] = ([match[1], match[2], match[3]] as const).map(e => Number(e));

    const isInRange = [r, g, b].every(e => e >= 0 && e <= 255);
    if(isInRange === false) {
      setErrorMsg('Each RGB value must be between 0 and 255.');
      return;
    }

    setErrorMsg('');
    onChange(Color({ r, g, b }).alpha(alpha));
  };

  const onInputChange = (e: string) => {
    if(mode === 'HEX') {
      applyHexMasked(e);
    } else {
      applyRgbMasked(e);
    }
  };

  return (
    <HexRgbColorInputWrapper className={className}>
      <ModeSwitch role='tablist' aria-label='Color input mode'>
        <ModeButton
          type='button'
          role='tab'
          aria-selected={mode === 'HEX'}
          $active={mode === 'HEX'}
          onClick={() => {
            setMode('HEX');
          }}
        >
          HEX
        </ModeButton>
        <Slash>/</Slash>
        <ModeButton
          type='button'
          role='tab'
          aria-selected={mode === 'RGB'}
          $active={mode === 'RGB'}
          onClick={() => {
            setMode('RGB');
          }}
        >
          RGB
        </ModeButton>
      </ModeSwitch>
      <TextField
        type='text'
        size='lg'
        value={inputValue}
        onChange={onInputChange}
      />
    </HexRgbColorInputWrapper>
  );
};
