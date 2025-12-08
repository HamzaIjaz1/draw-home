import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

export type BillingWithBadgeContainerProps = {
  children: React.ReactNode;
};

export const BillingWithBadgeContainer: React.FC<BillingWithBadgeContainerProps & WithClassName> = styled('span')`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 22px;
`;
