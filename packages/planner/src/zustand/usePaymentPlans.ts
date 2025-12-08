import assert from 'assert';
import { create } from 'zustand';
import { PaymentPlanRouteResponse } from '../zod/PaymentPlan';
import { isResolved } from '../utils/isResolved';
import { getPaymentPlans } from '../services/fetch/getPaymentPlans';

export type PaymentPlansStore = {
  paymentPlans: 'idle' | 'loading' | PaymentPlanRouteResponse;
};

export const usePaymentPlans = create<PaymentPlansStore>(() => ({
  paymentPlans: 'idle',
}));

export const usePaymentPlansResolved = () => {
  const { paymentPlans } = usePaymentPlans();
  assert(isResolved(paymentPlans), 'Something went wrong. |803adv|');

  return { paymentPlans };
};
usePaymentPlansResolved.getState = () => {
  const { paymentPlans } = usePaymentPlans.getState();
  assert(isResolved(paymentPlans), 'Something went wrong. |8ml3fm|');

  return { paymentPlans };
};

export const requestToLoadPaymentPlans = async () => {
  const { paymentPlans } = usePaymentPlans.getState();
  if(paymentPlans !== 'idle') {
    return;
  }

  usePaymentPlans.setState({ paymentPlans: 'loading' });

  usePaymentPlans.setState({
    paymentPlans: await getPaymentPlans(),
  });
};
