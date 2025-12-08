import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

export type BillingIsleTitleProps = {
  children: React.ReactNode;
};

export const BillingIsleTitle: React.FC<BillingIsleTitleProps & WithClassName> = styled('span')`
  font-weight: 500;
  font-size: 16px;
  line-height: 1;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #222733;
`;
