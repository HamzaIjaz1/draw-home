import { create } from 'zustand';
import { PaymentMethodsResponse } from '../../zod/PaymentMethods';

export type PaymentMethodsStore = {
  paymentMethods: 'idle' | 'loading' | 'skip' | PaymentMethodsResponse;
};

export const usePaymentMethods = create<PaymentMethodsStore>(() => ({
  paymentMethods: 'idle',
}));
