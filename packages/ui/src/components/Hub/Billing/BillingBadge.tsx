import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

export type BillingBadgeProps = {
  children: React.ReactNode;
};

export const BillingBadge: React.FC<BillingBadgeProps & WithClassName> = styled('span')`
  border-radius: 100px;
  padding: 5px 10px;
  background: #31bcfd0d;

  font-weight: 500;
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0.01em;
  vertical-align: middle;
  color: #31bcfd;
`;
