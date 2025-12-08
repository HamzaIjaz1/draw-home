import { BillingIsleTitle, FormButton } from '@draw-house/ui/dist/components/Hub';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import assert from 'assert';
import { Box } from '@draw-house/ui/dist/components';
import { lang } from '../../../lang';
import { openSnackbar, useUserResolved } from '../../../zustand';
import { PaymentMethod } from '../../../zod/PaymentMethods';

export type AddCardFormProps = {
  billingDetails: PaymentMethod['billingDetails'];
  onDone: (paymentMethodId: string | null) => void;
};

export const AddCardForm = ({ billingDetails, onDone }: AddCardFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { user } = useUserResolved();
  assert(user !== 'guest', 'Something went wrong. |k55fio|');

  const handleSubmit = async () => {
    if(isNull(stripe) || isNull(elements)) {
      return;
    }

    setLoading(true);

    try {
      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: window.location.href,
          payment_method_data: {
            billing_details: {
              address: isNull(billingDetails.address) ? undefined : {
                city: billingDetails.address.city,
                country: billingDetails.address.country,
                line1: billingDetails.address.line1,
                line2: billingDetails.address.line2,
                postal_code: billingDetails.address.postalCode,
                state: billingDetails.address.state,
              },
              email: user.email,
              name: billingDetails.name,
              phone: billingDetails.phone,
            },
          },
        },
        redirect: 'if_required',
      });

      if(!isUndefined(setupIntent)) {
        if(setupIntent.status === 'processing') {
          await openSnackbar({
            type: 'neutral',
            message: lang.billing.paymentStatusProcessing,
          });

          onDone(null);
          return;
        }

        if(setupIntent.status === 'succeeded') {
          assert(!isNull(setupIntent.payment_method), 'Something went wrong. |sxc459|');

          onDone(
            typeof setupIntent.payment_method === 'string'
              ? setupIntent.payment_method
              : setupIntent.payment_method.id,
          );
          return;
        }

        await openSnackbar({
          type: 'warning',
          message: lang.somethingWentWrong,
        });
        return;
      }

      if(!isUndefined(error)) {
        await openSnackbar({
          type: 'warning',
          message: (
            !isUndefined(error.message) && (error.type === 'card_error' || error.type === 'validation_error')
              ? error.message
              : lang.somethingWentWrong
          ),
        });
        return;
      }

      await openSnackbar({
        type: 'warning',
        message: lang.somethingWentWrong,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BillingIsleTitle>{lang.billing.enterCardDetails}</BillingIsleTitle>
      <Box column padding='20px 0'>
        <PaymentElement />
      </Box>
      <Box gap={10}>
        <FormButton
          type='button'
          size='small'
          text={lang.billing.cancel}
          onClick={() => onDone(null)}
        />
        <FormButton
          type='button'
          size='small'
          variant='contained'
          text={loading === true ? lang.billing.saving : lang.billing.saveCard}
          disabled={isNull(stripe) || loading === true}
          onClick={handleSubmit}
        />
      </Box>
    </>
  );
};
