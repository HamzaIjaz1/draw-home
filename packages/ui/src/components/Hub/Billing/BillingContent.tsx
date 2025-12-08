import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

export type BillingContentProps = {
  children: React.ReactNode;
};

export const BillingContent: React.FC<BillingContentProps & WithClassName> = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 1300px;
`;
