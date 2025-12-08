import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

export type BillingIsleProps = {
  children: React.ReactNode;
};

export const BillingIsle: React.FC<BillingIsleProps & WithClassName> = styled('div')`
  min-height: 175px;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 30px;
  padding: 30px;
`;
