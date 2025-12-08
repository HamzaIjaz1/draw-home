import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

export type BillingIsleSubTitleProps = {
  children: React.ReactNode;
};

export const BillingIsleSubTitle: React.FC<BillingIsleSubTitleProps & WithClassName> = styled('span')`
  font-weight: 400;
  font-size: 13px;
  line-height: 1;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #7a7e83;
`;
