import { WithClassName } from '@draw-house/common/dist/utils';
import FormGroup from '@mui/material/FormGroup';
import MuiRadioGroup from '@mui/material/RadioGroup';
import { useId } from 'react';
import { FormControlLabel, Label, Radio } from './styles';

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type RadioGroupProps = {
  name?: string;
  options: readonly Option[];
  value: string;
  onChange: (value: string) => void;
  direction: 'column' | 'row';
};

export const RadioGroup = ({
  className,
  name: _name,
  options,
  value,
  onChange,
  direction,
}: RadioGroupProps & WithClassName) => {
  const id = useId();
  const name = _name ?? id;

  return (
    <FormGroup className={className}>
      <MuiRadioGroup
        name={name}
        value={value}
        onChange={(_, value) => onChange(value)}
        row={direction === 'row'}
      >
        {options.map(({ value, label, disabled }) => (
          <FormControlLabel
            key={value}
            value={value}
            label={<Label>{label}</Label>}
            control={<Radio />}
            disabled={disabled}
          />
        ))}
      </MuiRadioGroup>
    </FormGroup>
  );
};
