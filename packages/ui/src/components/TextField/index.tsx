import { DistributiveSafeOmit, WithClassName } from '@draw-house/common/dist/utils';
import { isUndefined, Union } from '@arthurka/ts-utils';
import { useId } from 'react';
import { CommonInputProps, InputVariant } from './types';
import { NumberInput } from './NumberInput';
import {
  FormControl,
  InputAdornment,
  Label,
  StyledInput,
} from './styles';

export type InputProps = Union<
  & CommonInputProps
  & (
    | { type: 'text' }
    | {
      type: 'number';
      min?: number;
      max?: number;
      allowNegative?: boolean;
      variant?: InputVariant;
    }
  )
>;
export const Input = ({
  className,
  type,
  value,
  onChange,
  adornment,
  size,
  id,
  name,
  min,
  max,
  allowNegative,
  variant,
  disabled = false,
}: InputProps & WithClassName) => {
  switch(type) {
    case 'text': return (
      <StyledInput
        id={id}
        name={name}
        className={className}
        _size={size}
        _variant='dark'
        value={value}
        onChange={event => onChange(event.target.value)}
        endAdornment={
          isUndefined(adornment)
            ? undefined
            : <InputAdornment inputVariant='dark' position='end'>{adornment}</InputAdornment>
        }
        disableUnderline
        autoComplete='off'
        disabled={disabled}
      />
    );

    case 'number': {
      const _variant: NonNullable<typeof variant> = variant ?? 'dark';

      return (
        <NumberInput
          className={className}
          id={id}
          name={name}
          size={size}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          allowNegative={allowNegative}
          variant={_variant}
          adornment={
            isUndefined(adornment)
              ? undefined
              : <InputAdornment inputVariant={_variant} position='end'>{adornment}</InputAdornment>
          }
          disabled={disabled}
        />
      );
    }

    default:
      ((e: never) => e)(type);
      throw new Error('This should never happen. |1o9jgm|');
  }
};

export type TextFieldProps = (
  & DistributiveSafeOmit<InputProps, 'id'>
  & {
    label?: string | React.ReactElement;
  }
);

export const TextField = ({
  className,
  label,
  ...rest
}: TextFieldProps & WithClassName) => {
  const id = useId();

  return (
    <FormControl
      className={className}
      variant='filled'
      labeled={!isUndefined(label)}
    >
      {isUndefined(label) ? null : (
        <Label htmlFor={id}>{label}</Label>
      )}

      <Input {...rest} id={id} />
    </FormControl>
  );
};
