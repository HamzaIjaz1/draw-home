import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';

export type TooltipTitleProps = {
  children: React.ReactNode;
};

export const TooltipTitle: React.FC<TooltipTitleProps & WithClassName> = styled('span')(({ theme }) => css`
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0px;
  color: #fff;
  white-space: nowrap;

  ${theme.breakpoints.up('md')} {
    font-size: 14px;
  }
`);
