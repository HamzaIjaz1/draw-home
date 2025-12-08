import MuiFormControl from '@mui/material/FormControl';
import MuiInputAdornment from '@mui/material/InputAdornment';
import FilledInput, { filledInputClasses } from '@mui/material/FilledInput';
import { css, styled, Theme } from '@mui/material';
import type { TextFieldProps } from '.';
import { menuRowVerticalPadding } from '../../utils/styles';
import { createStyledOptions } from '../../utils/createStyledOptions';
import { InputVariant } from './types';

type FormControlProps = {
  labeled: boolean;
};
const FormControlOptions = createStyledOptions<FormControlProps>({
  labeled: true,
});
export const FormControl = styled(MuiFormControl, FormControlOptions)<FormControlProps>(({
  labeled,
}) => css`
  width: ${labeled === true ? '100%' : 'fit-content'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${menuRowVerticalPadding()}
`);

const textStyles = css`
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
`;

type InputProps = {
  _size: TextFieldProps['size'];
  _variant: InputVariant;
};
const InputOptions = createStyledOptions<InputProps>({
  _size: true,
  _variant: true,
});

const inputWidthCss: Record<InputProps['_size'], number> = {
  xxs: 56,
  xs: 60,
  sm: 96,
  md: 164,
  lg: 232,
};

const getInputBackgroundColor = (theme: Theme, variant: InputProps['_variant']) => ({
  dark: '#f3f3f3',
  light: theme.palette.background.paper,
} satisfies Record<typeof variant, string>)[variant];

export const StyledInput = styled(FilledInput, InputOptions)<InputProps>(({ theme, _size, _variant }) => css`
  min-width: ${inputWidthCss[_size]}px;
  max-width: ${inputWidthCss[_size]}px;
  height: 32px;
  border-radius: 8px;
  background-color: ${getInputBackgroundColor(theme, _variant)};

  .MuiInputAdornment-root {
    pointer-events: none;
  }

  .${filledInputClasses.input} {
    padding: 6px;
    ${textStyles}
    text-align: right;
  }

  ${_variant === 'light' && css`
    :hover, &.${filledInputClasses.focused} {
      background-color: ${getInputBackgroundColor(theme, _variant)};
    }
  `}
`);

type AdornmentProps = {
  inputVariant: 'dark' | 'light';
};
const AdornmentOpts = createStyledOptions<AdornmentProps>({
  inputVariant: true,
});

const getAdornmentColor = (theme: Theme, iv: AdornmentProps['inputVariant']) => ({
  dark: theme.palette.text.primary,
  light: theme.palette.text.disabled,
} satisfies Record<typeof iv, string>)[iv];

export const InputAdornment = styled(
  MuiInputAdornment,
  AdornmentOpts,
)<AdornmentProps>(({ theme, inputVariant }) => css`
  margin-left: -2px;

  .MuiTypography-root {
    ${textStyles}
    color: ${getAdornmentColor(theme, inputVariant)};
  }
`);

export const Label = styled('label')(({ theme }) => css`
  display: inline-flex;
  align-items: center;
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${theme.palette.text.secondary};
  cursor: pointer;
  overflow-wrap: anywhere;
`);
