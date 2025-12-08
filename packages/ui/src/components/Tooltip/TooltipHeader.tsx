import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

export type TooltipHeaderProps = {
  children: React.ReactNode;
};

export const TooltipHeader: React.FC<TooltipHeaderProps & WithClassName> = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;
