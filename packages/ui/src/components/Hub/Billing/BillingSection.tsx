import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

export type BillingSectionProps = {
  children: React.ReactNode;
};

export const BillingSection: React.FC<BillingSectionProps & WithClassName> = styled('section')`
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
