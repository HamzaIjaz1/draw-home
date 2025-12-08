import { isNull } from '@arthurka/ts-utils';
import { z } from 'zod/v4';

export const PaymentPlanAttributes = (
  z
    .object({
      type: z.enum(['professional', 'team']),
      label: z.string(),
      monthlyPriceInCents: z.number(),
      yearlyPriceInCents: z.number(),
      monthlyProductId: z.string().nullable(),
      yearlyProductId: z.string().nullable(),
    })
    .transform(e => ({
      ...e,
      monthlyProductId: isNull(e.monthlyProductId) || e.monthlyProductId === '' ? null : e.monthlyProductId,
      yearlyProductId: isNull(e.yearlyProductId) || e.yearlyProductId === '' ? null : e.yearlyProductId,
    }))
);
