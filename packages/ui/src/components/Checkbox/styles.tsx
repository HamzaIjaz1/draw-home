import { css, styled } from '@mui/material';
import MuiCheckbox, { checkboxClasses } from '@mui/material/Checkbox';
import { CssVariable, getCssVar } from '../../utils/styles';

export const cssVars = {
  iconColor: '--checkbox-icon-color',
  checkboxPadding: '--checkbox-root-padding',
  checkboxSize: '--checkbox-svg-size',
} satisfies Record<string, CssVariable>;

export const Label = styled('label')`
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  cursor: pointer;
  user-select: none;
`;

export const StyledCheckbox = styled(MuiCheckbox)(({ theme }) => css`
  color: ${getCssVar(cssVars.iconColor, theme.palette.primary.main)};
  &.${checkboxClasses.checked} {
    color: ${getCssVar(cssVars.iconColor, theme.palette.primary.main)};
  }

  &.${checkboxClasses.root} {
    padding: ${getCssVar(cssVars.checkboxPadding, '8px')};
  }

  svg {
    width: ${getCssVar(cssVars.checkboxSize, '18px')};
    height: ${getCssVar(cssVars.checkboxSize, '18px')};
  }
`);

export const Icon = () => (
  <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='.65' y='.65' width='16.7' height='16.7' rx='3.35' stroke='currentColor' strokeWidth='1.3' />
  </svg>
);

export const CheckedIcon = () => (
  <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect width='18' height='18' rx='4' fill='currentColor' />
    <path d='m13.199 6.117-5.775 5.775-2.625-2.625' stroke='#fff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);
