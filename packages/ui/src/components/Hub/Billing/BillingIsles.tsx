import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

export type BillingIslesProps = {
  children: React.ReactNode;
};

export const BillingIsles: React.FC<BillingIslesProps & WithClassName> = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @container (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;
