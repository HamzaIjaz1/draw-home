import {
  ChangeEventHandler,
  FocusEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';
import { WithClassName } from '@draw-house/common/dist/utils';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Union } from '@arthurka/ts-utils';
import { FormLabel, LabelHeading, StyledInput } from './styles';
import { EyeClosedIcon, EyeIcon } from '../../../Icons';
import { usePrevious } from '../../../../hooks/usePrevious';

export type FormInputProps = Union<(
  & {
    onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    disabled?: boolean;
    text?: string;
    startAdornment?: JSX.Element;
    value?: string | null;
    helperText?: string | null;
    error?: boolean;
  }
  & (
    | {
      multiline?: true;
      type?: 'text';
    }
    | {
      multiline?: false;
      type?: 'password' | 'text';
    }
  )
)>;


export const FormInput = ({
  className,
  onFocus,
  onChange,
  onBlur,
  disabled = false,
  text,
  startAdornment,
  value: predefinedValue = '',
  type: predefinedType = 'text',
  helperText,
  error,
  multiline = false,
}: FormInputProps & WithClassName) => {
  const [value, setValue] = useState(predefinedValue);
  const [type, setType] = useState(predefinedType);

  const theme = useTheme();

  const inputRef = useRef<HTMLInputElement>();

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(e => {
    if(onChange) {
      onChange(e);
    }
    setValue(e.target.value);
  }, [onChange]);

  const prevExternalValue = usePrevious(predefinedValue);
  const externalValueHasChanged = prevExternalValue !== predefinedValue;
  const localValueOutOfSync = value !== predefinedValue;
  if(externalValueHasChanged && localValueOutOfSync) {
    setValue(predefinedValue);
  }

  const endAdornment = predefinedType === 'password' ? (
    <IconButton
      style={{ width: 21, height: 21, padding: 0 }}
      onClick={() => setType(type => type === 'password' ? 'text' : 'password')}
    >
      {type === 'text'
        ? <EyeIcon color={theme.palette.text.primary} />
        : <EyeClosedIcon color={theme.palette.text.primary} />}
    </IconButton>
  ) : undefined;

  const InputJSX = (
    <StyledInput
      className={className}
      onFocus={onFocus}
      onChange={handleChange}
      onBlur={e => {
        const val = e.target.value.trim();
        setValue(val);
        if(onBlur) {
          onBlur(e);
        }
      }}
      disabled={disabled}
      inputRef={inputRef}
      variant='standard'
      value={value}
      type={type}
      helperText={helperText}
      error={error}
      {
        ...multiline === true && {
          multiline: true,
          minRows: 3,
          maxRows: 7,
        }
      }
      {
        ...multiline === false && {
          multiline: false,
          placeholder: text,
          InputProps: {
            startAdornment,
            endAdornment,
          },
        }
      }
    />
  );

  if(multiline === false) {
    return InputJSX;
  }

  return (
    <FormLabel>
      <LabelHeading>
        {startAdornment}
        {text}
      </LabelHeading>
      {InputJSX}
    </FormLabel>
  );
};

type FormInputControlledProps<T extends FieldValues> = (
  & FormInputProps
  & {
    name: Path<T>;
    control: Control<T>;
    serverError?: string;
  }
);

export function FormInputControlled<T extends FieldValues>({
  name,
  control,
  serverError,
  ...props
}: FormInputControlledProps<T> & WithClassName) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => (
        <FormInput
          helperText={error ? error.message : serverError || null}
          error={!!error || serverError !== undefined}
          onChange={onChange}
          onBlur={e => {
            const val = e.target.value.trim();
            onChange(val);
            onBlur();
          }}
          value={value}
          {...props}
        />
      )}
    />
  );
}
