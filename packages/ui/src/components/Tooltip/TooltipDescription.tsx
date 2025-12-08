import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';

export type TooltipDescriptionProps = {
  children: React.ReactNode;
};

export const TooltipDescription: React.FC<TooltipDescriptionProps & WithClassName> = styled('p')(({ theme }) => css`
  all: unset;

  font-weight: 500;
  font-size: 10px;
  line-height: 1;
  letter-spacing: 0px;
  color: #fffc;

  ${theme.breakpoints.up('md')} {
    font-size: 12px;
  }
`);
