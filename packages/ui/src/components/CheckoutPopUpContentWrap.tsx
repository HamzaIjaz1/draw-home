import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

export type CheckoutPopUpContentWrapProps = {
  children: React.ReactNode;
};

export const CheckoutPopUpContentWrap: React.FC<CheckoutPopUpContentWrapProps & WithClassName> = styled('div')`
  width: 100svw;
  overflow-y: auto;

  @media (min-width: 800px) {
    width: 80svw;
  }
`;
