import { isArrayLength } from '@arthurka/ts-utils';
import assert from 'assert';
import { z } from 'zod/v4';

const Address = z.object({
  city: z.string().nullable(),
  country: z.string().nullable(),
  line1: z.string().nullable(),
  line2: z.string().nullable(),
  postalCode: z.string().nullable(),
  state: z.string().nullable(),
});

export const PaymentMethod = z.object({
  id: z.string(),
  brand: z.string(),
  last4: z.string(),
  monthExpiry: z.number(),
  yearExpiry: z.number(),
  isDefault: z.boolean(),
  billingDetails: z.object({
    address: Address.nullable(),
    email: z.string().nullable(),
    name: z.string().nullable(),
    phone: z.string().nullable(),
  }),
});
export type PaymentMethod = z.infer<typeof PaymentMethod>;

export const PaymentMethodsResponse = (
  z
    .object({
      paymentMethods: z.array(PaymentMethod),
    })
    .transform(({ paymentMethods }) => {
      assert(isArrayLength(paymentMethods, '>=', 1), 'Something went wrong. |kq5fv2|');

      return paymentMethods;
    })
);
export type PaymentMethodsResponse = z.infer<typeof PaymentMethodsResponse>;
