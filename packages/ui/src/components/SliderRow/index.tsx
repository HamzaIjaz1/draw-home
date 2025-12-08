import { useId } from 'react';
import { WithClassName } from '@draw-house/common/dist/utils';
import { useTheme } from '@mui/material';
import { Input } from '../TextField';
import { setCssVarInline } from '../../utils/styles';
import { Label, Row, Slider, sliderColorCssVar, Stack } from './styles';

export type SliderRowProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  step?: number;
  color?: string;
};

export const SliderRow = ({
  className,
  label,
  value,
  onChange,
  max,
  min,
  step,
  color,
}: SliderRowProps & WithClassName) => {
  const id = useId();
  const theme = useTheme();

  return (
    <Stack className={className}>
      <Label id={id}>{label}</Label>
      <Row>
        <Slider
          value={value}
          onChange={(_, value) => (
            Array.isArray(value)
              ? console.error('Unexpected slider value type. |5ls0ra|')
              : onChange(value)
          )}
          min={min}
          max={max}
          step={step}
          aria-labelledby={id}
          style={setCssVarInline(sliderColorCssVar, color ?? theme.palette.secondary.main)}
        />

        <Input
          id={id}
          type='number'
          size='xxs'
          min={min}
          max={max}
          value={String(value)}
          onChange={e => onChange(Number(e))}
        />
      </Row>
    </Stack>
  );
};
