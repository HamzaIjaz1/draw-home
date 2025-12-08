import { WithClassName } from '@draw-house/common/dist/utils';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { styled } from '@mui/material';
import { CreditCardIcon, MastercardIcon, VisaIcon } from '../../Icons';
import { backgroundSecondary } from '../../../theme';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  border: 1px solid ${backgroundSecondary};
  border-radius: 16px;
`;

const Row = styled('div')`
  display: flex;
  justify-content: space-between;
  height: 44px;
`;

const CardInfoContainer = styled('div')`
  display: flex;
  gap: 24px;
`;

const BrandIconContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 76px;
`;

const ButtonContainer = styled('div')`
  align-self: center;
`;

const CardInfo = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BoldText = styled('span')`
  font-weight: 400;
  font-size: 18px;
  line-height: 1;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #222733;
`;

const RegularText = styled('span')`
  font-weight: 400;
  font-size: 16px;
  line-height: 1;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #7a7e83;
`;

const AddressContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Mastercard = styled(MastercardIcon)`
  width: 76px;
`;

const Visa = styled(VisaIcon)`
  width: 76px;
`;

const CreditCard = styled(CreditCardIcon)`
  width: 50px;
`;

const brandIcons: Record<string, JSX.Element> = {
  mastercard: <Mastercard />,
  visa: <Visa />,
};

export type BillingPaymentMethodProps = {
  last4: string;
  expiry: string;
  brand: string;
  Button: React.ReactNode;
  address: {
    line1: string | null;
    line2: string | null;
    city: string | null;
    postalCode: string | null;
    country: string | null;
  };
};

export const BillingPaymentMethod = ({
  className,
  last4,
  expiry,
  brand,
  Button,
  address,
}: WithClassName & BillingPaymentMethodProps) => {
  const knownBrandIcon = brandIcons[brand];
  const brandIcon = isUndefined(knownBrandIcon) ? <CreditCard /> : knownBrandIcon;

  return (
    <Container className={className}>
      <Row>
        <CardInfoContainer>
          <BrandIconContainer>
            {brandIcon}
          </BrandIconContainer>

          <CardInfo>
            <BoldText>**** **** **** {last4}</BoldText>
            <RegularText>{expiry}</RegularText>
          </CardInfo>
        </CardInfoContainer>

        <ButtonContainer>
          {Button}
        </ButtonContainer>
      </Row>

      {
        isNull(address.line1) && isNull(address.line2) && isNull(address.city) && isNull(address.postalCode) && isNull(address.country)
          ? null
          : (
            <AddressContainer>
              {!isNull(address.line1) && <BoldText>{address.line1}</BoldText>}
              {!isNull(address.line2) && <RegularText>{address.line2}</RegularText>}
              {!isNull(address.city) && <RegularText>{address.city}</RegularText>}
              {(() => {
                const text = [address.postalCode, address.country]
                  .filter(e => !isNull(e))
                  .join(', ');

                return text.length === 0 ? null : <RegularText>{text}</RegularText>;
              })()}

            </AddressContainer>
          )
      }
    </Container>
  );
};
