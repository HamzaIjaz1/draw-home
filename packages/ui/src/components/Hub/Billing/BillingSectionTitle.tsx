import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

export type BillingSectionTitleProps = {
  children: React.ReactNode;
};

export const BillingSectionTitle: React.FC<BillingSectionTitleProps & WithClassName> = styled('span')`
  font-weight: 500;
  font-size: 19px;
  line-height: 1;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #222733;
`;
