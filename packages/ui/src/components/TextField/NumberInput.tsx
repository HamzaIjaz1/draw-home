import { clamp, pipe, WithClassName } from '@draw-house/common/dist/utils';
import { RefObject, useRef, useState } from 'react';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { usePrevious } from '../../hooks/usePrevious';
import { CommonInputProps, InputVariant } from './types';
import { StyledInput } from './styles';

const keepFirstOnly = (str: string, substring: string) => {
  const parts = str.split(substring);

  if(parts.length > 1) {
    return `${parts[0]}${substring}${parts.slice(1).join('')}`;
  }

  return str;
};

const minus = '-';
const dot = '.';

const countMinus = (str: string) => (
  str.split(minus).length - 1
);

const filterAllowed = (alphabet: string) => (value: string) => {
  const regex = new RegExp(`[${alphabet}]`, 'g');
  return (value.match(regex) ?? []).join('');
};

const handleMinusSign = (value: string) => {
  const minusCount = countMinus(value);

  const signPrefix = minusCount % 2 === 0 ? '' : minus;
  const minuslessValue = value.replace(new RegExp(minus, 'g'), '');
  const signedValue = `${signPrefix}${minuslessValue}`;

  return signedValue;
};

type HandleCursorArg = {
  originalValue: string;
  finalValue: string;
  inputRef: RefObject<HTMLInputElement>;
  selectionStart: number | null;
};

const handleCursor = ({
  originalValue,
  finalValue,
  inputRef,
  selectionStart,
}: HandleCursorArg) => {
  if(originalValue === finalValue) {
    return;
  }

  requestAnimationFrame(() => {
    if(isNull(inputRef.current) || isNull(selectionStart)) {
      return;
    }

    const delta = originalValue.length - finalValue.length;
    const pos = Math.max(0, selectionStart - delta);

    inputRef.current.setSelectionRange(pos, pos);
  });
};

export type NumberInputProps = {
  id: CommonInputProps['id'];
  name: CommonInputProps['name'];
  size: CommonInputProps['size'];
  onChange: CommonInputProps['onChange'];
  value: CommonInputProps['value'];
  disabled?: CommonInputProps['disabled'];
  min?: number;
  max?: number;
  allowNegative?: boolean;
  adornment?: JSX.Element;
  variant?: InputVariant;
};

export const NumberInput = ({
  className,
  value: externalValue,
  onChange,
  adornment,
  size,
  id,
  name,
  min,
  max,
  allowNegative = false,
  variant = 'dark',
  disabled = false,
}: NumberInputProps & WithClassName) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localValue, setLocalValue] = useState(externalValue);

  const prevValue = usePrevious(externalValue);
  const valueHasChanged = prevValue !== externalValue;
  const synced = externalValue === localValue;
  if(synced === false && valueHasChanged === true) {
    setLocalValue(externalValue);
  }

  const defaultValue = isUndefined(min) ? 0 : min;

  return (
    <StyledInput
      id={id}
      name={name}
      className={className}
      inputRef={inputRef}
      _size={size}
      _variant={variant}
      value={localValue}
      disabled={disabled}
      onChange={({ target: { value: originalValue, selectionStart } }) => {
        const alphabet = [
          '0123456789',
          dot,
          ...allowNegative === true ? [minus] : [],
        ].join('');

        const transform = pipe(
          filterAllowed(alphabet),
          handleMinusSign,
          value => keepFirstOnly(value, dot),
        );

        const finalValue = transform(originalValue);

        handleCursor({
          originalValue,
          finalValue,
          inputRef,
          selectionStart,
        });

        setLocalValue(finalValue);
      }}
      onBlur={({ target: { value } }) => {
        const transform = pipe(
          Number,
          num => Number.isFinite(num) ? num : defaultValue,
          num => clamp(
            min ?? Number.MIN_SAFE_INTEGER,
            num,
            max ?? Number.MAX_SAFE_INTEGER,
          ),
        );

        const result = transform(value);

        setLocalValue(externalValue);
        onChange(String(result));
      }}
      endAdornment={adornment}
      disableUnderline
      autoComplete='off'
    />
  );
};
