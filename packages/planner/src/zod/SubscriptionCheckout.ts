import { z } from 'zod/v4';

export const SubscriptionCheckoutResponse = z.object({
  clientSecret: z.string(),
});
export type SubscriptionCheckoutResponse = z.infer<typeof SubscriptionCheckoutResponse>;
