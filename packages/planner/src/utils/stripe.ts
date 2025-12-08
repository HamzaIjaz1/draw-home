import { isNull } from '@arthurka/ts-utils';
import { STRIPE_PUBLISHABLE_KEY } from '@draw-house/common/dist/envVariables/public';
import { loadStripe } from '@stripe/stripe-js';

let stripePromise = ((e: ReturnType<typeof loadStripe> | null) => e)(null);

export const getStripe = () => {
  if(isNull(stripePromise)) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
};
