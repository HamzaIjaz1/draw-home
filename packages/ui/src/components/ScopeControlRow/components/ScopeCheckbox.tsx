import { css, styled } from '@mui/material';
import { WithClassName } from '@draw-house/common/dist/utils';
import { Checkbox, CheckboxCssVars, CheckboxProps } from '../../Checkbox';
import { setCssVar } from '../../../utils/styles';
import { textStyles } from './common';

const StyledCheckbox = styled(Checkbox)(({ theme }) => css`
  ${setCssVar(CheckboxCssVars.checkboxSize, '12px')}
  ${setCssVar(CheckboxCssVars.checkboxPadding, '6px')}
  ${textStyles}
  color: ${theme.palette.primary.main};
  max-width: 100px;
`);

export type ScopeCheckboxProps = CheckboxProps;

export const ScopeCheckbox = ({
  className,
  checked,
  text,
  onClick,
}: ScopeCheckboxProps & WithClassName) => (
  <StyledCheckbox
    className={className}
    checked={checked}
    text={text}
    onClick={onClick}
  />
);
