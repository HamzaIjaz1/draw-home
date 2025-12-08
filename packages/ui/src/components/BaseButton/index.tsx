import { WithClassName } from '@draw-house/common/dist/utils';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import { css, styled } from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';

const StyledButton = styled(MuiButton)(({ theme, variant }) => css`
  min-width: unset;
  text-transform: none;

  ${variant === 'contained' && css`
    :hover {
      background-color: ${theme.palette.action.hover};
    }
  `}
`);

type AllowedMuiButtonProps = Pick<
  ButtonProps,
  | 'children'
  | 'variant'
  | 'onClick'
  | 'type'
  | 'style'
  | 'disabled'
  | 'color'
  | 'title'
  | 'startIcon'
  | 'endIcon'
  | 'disableTouchRipple'
  | 'disableRipple'
  | 'component'
  | 'role'
  | 'tabIndex'
>;

export type BaseButtonProps = AllowedMuiButtonProps;

export const BaseButton = forwardRef(({
  className,
  children,
  ...props
}: BaseButtonProps & WithClassName, ref: ForwardedRef<HTMLButtonElement>) => (
  <StyledButton
    className={className}
    ref={ref}
    {...props}
  >
    {children}
  </StyledButton>
));
