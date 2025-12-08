import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';
import { typographyClasses } from '@mui/material/Typography';
import { MainButton, MainButtonProps } from '..';

export const billingButtonCurrentPlanDefaultBackgroundColor = '#fd563133';

const Button = styled(MainButton)`
  .${typographyClasses.root} {
    font-family: DM Sans;
    font-weight: 600;
    font-size: 17px;
    line-height: 1;
    letter-spacing: 0px;
    vertical-align: middle;
  }
`;

export type BillingButtonProps = MainButtonProps;

export const BillingButton = (props: BillingButtonProps & WithClassName) => (
  <Button {...props} />
);
