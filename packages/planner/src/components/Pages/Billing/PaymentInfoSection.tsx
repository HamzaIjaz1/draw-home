import { BillingBadge, BillingDividerBlock, BillingIsle, BillingIsles, BillingIsleSubTitle, BillingIsleTitle, BillingPaymentMethod, BillingSection, BillingSectionTitle, BillingWithBadgeContainer, FormButton } from '@draw-house/ui/dist/components/Hub';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { Box, CenterWrapper } from '@draw-house/ui/dist/components';
import CircularProgress from '@mui/material/CircularProgress';
import { lang } from '../../../lang';
import { openSnackbar } from '../../../zustand';
import { requestToLoadPaymentMethods, usePaymentMethodsResolved } from '../../../zustand/usePaymentMethods';
import { apiUrls } from '../../../services';
import { fetchHelper } from '../../../services/fetch/fetchHelper';
import { getStripe } from '../../../utils/stripe';
import { SetupIntentResponse } from '../../../zod/SetupIntent';
import { AddCardForm } from './AddCardForm';

export const PaymentInfoSection = () => {
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { paymentMethods } = usePaymentMethodsResolved();

  const defaultCard = paymentMethods.find(e => e.isDefault);
  const card = !isUndefined(defaultCard) ? defaultCard : paymentMethods[0];

  return (
    <BillingSection>
      <BillingSectionTitle>{lang.billing.paymentInfo}</BillingSectionTitle>
      <BillingIsles>
        <BillingIsle>
          {
            showAddCardForm === false && (
              <>
                <Box column gap={6}>
                  <BillingWithBadgeContainer>
                    <BillingIsleTitle>{lang.billing.paymentMethod}</BillingIsleTitle>
                    {
                      card.isDefault === true && (
                        <BillingBadge>{lang.billing.primary}</BillingBadge>
                      )
                    }
                  </BillingWithBadgeContainer>
                  <BillingIsleSubTitle>{lang.billing.paymentMethodSubtitle}</BillingIsleSubTitle>
                </Box>
                <BillingDividerBlock />

                <BillingPaymentMethod
                  last4={card.last4}
                  brand={card.brand}
                  expiry={`${lang.billing.expiry} ${String(card.monthExpiry).padStart(2, '0')}/${card.yearExpiry}`}
                  Button={
                    <FormButton
                      type='button'
                      size='small'
                      text={lang.billing.change}
                      onClick={async () => {
                        setShowAddCardForm(true);

                        try {
                          const res = await fetchHelper.post(apiUrls.stripe.createSetupIntent, {});
                          const { clientSecret } = SetupIntentResponse.parse(res);

                          setClientSecret(clientSecret);
                        } catch(e) {
                          setShowAddCardForm(false);
                          await openSnackbar({
                            type: 'warning',
                            message: lang.somethingWentWrong,
                          });

                          throw e;
                        }
                      }}
                    />
                  }
                  address={{
                    line1: isNull(card.billingDetails.address) ? null : card.billingDetails.address.line1,
                    line2: isNull(card.billingDetails.address) ? null : card.billingDetails.address.line2,
                    city: isNull(card.billingDetails.address) ? null : card.billingDetails.address.city,
                    postalCode: isNull(card.billingDetails.address) ? null : card.billingDetails.address.postalCode,
                    country: isNull(card.billingDetails.address) ? null : card.billingDetails.address.country,
                  }}
                />
              </>
            )
          }
          {
            showAddCardForm === true && (
              isNull(clientSecret)
                ? (
                  <CenterWrapper>
                    <CircularProgress />
                  </CenterWrapper>
                )
                : (
                  <Elements
                    stripe={getStripe()}
                    options={{ clientSecret }}
                  >
                    <AddCardForm
                      billingDetails={card.billingDetails}
                      onDone={async paymentMethodId => {
                        setClientSecret(null);

                        if(!isNull(paymentMethodId)) {
                          await fetchHelper.post(apiUrls.stripe.setDefaultPaymentMethod, {
                            paymentMethodId,
                          });

                          await requestToLoadPaymentMethods(true);
                        }

                        setShowAddCardForm(false);
                      }}
                    />
                  </Elements>
                )
            )
          }
        </BillingIsle>
      </BillingIsles>
    </BillingSection>
  );
};
