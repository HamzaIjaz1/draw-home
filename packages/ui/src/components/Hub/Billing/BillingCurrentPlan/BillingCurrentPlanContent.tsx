import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';
import { Union } from '@arthurka/ts-utils';
import { Box } from '../../../Box';
import { FormButton } from '../../Form/Button';

const Container = styled('div')`
  flex: 1;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const ButtonsWrapper = styled('div')`
  display: flex;
  gap: 10px;
`;
const Label = styled('span')`
  font-weight: 400;
  font-size: 16px;
  line-height: 1;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #7a7e83;

  strong {
    all: unset;
    font-size: 30px;
    color: #000;
  }
`;

export type BillingCurrentPlanContentProps = Union<
  & {
    period: string;
    price: number;
    cancelButtonLabel: string;
    planButtonLabel: string;
    stripeCancelAtPeriodEnd: boolean;
    handleCancelSubscription: () => void;
    handleChangePlan: () => void;
  }
  & (
    | {
      isFreePlan: true;
    }
    | {
      isFreePlan: false;
      label: string;
    }
  )
>;

export const BillingCurrentPlanContent: React.FC<BillingCurrentPlanContentProps & WithClassName> = ({
  className,
  price,
  period,
  label,
  cancelButtonLabel,
  planButtonLabel,
  isFreePlan,
  stripeCancelAtPeriodEnd,
  handleCancelSubscription,
  handleChangePlan,
}) => (
  <Container className={className}>
    {
      isFreePlan === false && (
        <Label>{label}</Label>
      )
    }
    <Box justify='space-between' align='center' marginTop='auto'>
      <Label>
        <strong>${price}</strong>
        {'  /'}
        {period}
      </Label>
      <ButtonsWrapper>
        {
          isFreePlan === false && stripeCancelAtPeriodEnd === false && (
            <FormButton
              text={cancelButtonLabel}
              size='medium'
              variant='outlined'
              isBilling
              onClick={handleCancelSubscription}
            />
          )
        }
        {
          isFreePlan === true && (
            <FormButton
              text={planButtonLabel}
              size='medium'
              variant='contained'
              isBilling
              onClick={handleChangePlan}
            />
          )
        }
      </ButtonsWrapper>
    </Box>
  </Container>
);
