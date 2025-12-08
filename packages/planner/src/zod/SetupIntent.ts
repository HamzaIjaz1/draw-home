import { z } from 'zod/v4';

export const SetupIntentResponse = z.object({
  clientSecret: z.string(),
});
export type SetupIntentResponse = z.infer<typeof SetupIntentResponse>;
