import { z } from 'zod/v4';

export const CheckoutSessionStatusResponse = z.object({
  status: z.enum(['open', 'complete', 'expired']).nullable(),
});
export type CheckoutSessionStatusResponse = z.infer<typeof CheckoutSessionStatusResponse>;
