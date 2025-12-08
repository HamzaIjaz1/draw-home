import { z } from 'zod/v4';

export const CancelSubscriptionResponse = z.object({
  cancelAtPeriodEnd: z.boolean().nullable().transform(e => e === true),
});
export type CancelSubscriptionResponse = z.infer<typeof CancelSubscriptionResponse>;
