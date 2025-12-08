import { PaymentPlanAttributes } from '@draw-house/common/dist/zod';
import { z } from 'zod/v4';
import { zData } from './common';

export const PaymentPlan = (
  z
    .object({
      attributes: PaymentPlanAttributes,
    })
    .transform(e => e.attributes)
);
export type PaymentPlan = z.infer<typeof PaymentPlan>;

export const PaymentPlanRouteResponse = zData(
  z
    .array(PaymentPlan)
    .transform((plans): PaymentPlan[] => {
      const seen = new Map<PaymentPlan['type'], PaymentPlan>();

      for(const plan of plans) {
        if(!seen.has(plan.type)) {
          seen.set(plan.type, plan);
        }
      }

      return [...seen.values()];
    }),
);
export type PaymentPlanRouteResponse = z.infer<typeof PaymentPlanRouteResponse>;
