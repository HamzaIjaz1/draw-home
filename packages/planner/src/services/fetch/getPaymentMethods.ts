import { apiUrls } from '../apiUrls';
import { fetchHelper } from './fetchHelper';
import { PaymentMethodsResponse } from '../../zod/PaymentMethods';

export const getPaymentMethods = async () => {
  const res = await fetchHelper.get(apiUrls.stripe.getPaymentMethods);

  const { success, data, error } = PaymentMethodsResponse.safeParse(res);
  if(success === false) {
    console.error('|iq9bvk|', error.issues);
    throw error;
  }

  return data;
};
