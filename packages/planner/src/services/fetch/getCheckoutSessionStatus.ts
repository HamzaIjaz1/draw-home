import { stringifyUrl } from '@draw-house/common/dist/utils/stringifyUrl';
import { CheckoutSessionId } from '@draw-house/common/dist/brands';
import { apiUrls } from '../apiUrls';
import { fetchHelper } from './fetchHelper';
import { CheckoutSessionStatusResponse } from '../../zod/CheckoutSessionStatus';

export const getCheckoutSessionStatus = async (sessionId: CheckoutSessionId) => {
  const res = await fetchHelper.get(stringifyUrl(apiUrls.stripe.getCheckoutSessionStatus, { sessionId }));

  const { success, data, error } = CheckoutSessionStatusResponse.safeParse(res);
  if(success === false) {
    console.error('|9904ni|', error.issues);
    throw error;
  }

  return data;
};
