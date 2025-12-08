import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { useCallback } from 'react';
import { fetchHelper } from '../services/fetch/fetchHelper';
import { apiUrls } from '../services';
import { SubscriptionCheckoutResponse } from '../zod/SubscriptionCheckout';
import { getStripe } from '../utils/stripe';

export const SubscriptionCheckout: React.FC<{ priceId: string }> = ({ priceId }) => {
  const fetchClientSecret = useCallback(async () => {
    const res = await fetchHelper.post(apiUrls.stripe.createCheckoutSession, { priceId });
    const { clientSecret } = SubscriptionCheckoutResponse.parse(res);

    return clientSecret;
  }, [priceId]);

  return (
    <EmbeddedCheckoutProvider
      stripe={getStripe()}
      options={{ fetchClientSecret }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
};
