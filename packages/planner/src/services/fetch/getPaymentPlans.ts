import { apiUrls } from '../apiUrls';
import { fetchHelper } from './fetchHelper';
import { PaymentPlanRouteResponse } from '../../zod/PaymentPlan';

export const getPaymentPlans = async () => {
  const res = await fetchHelper.get(apiUrls.paymentPlans);

  const { success, data, error } = PaymentPlanRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|jbq0xf|', error.issues);
    throw error;
  }

  return data;
};
