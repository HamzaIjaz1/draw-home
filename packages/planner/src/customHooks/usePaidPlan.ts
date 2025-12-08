import { isNull } from '@arthurka/ts-utils';
import { User } from '@draw-house/common/dist/zod';
import { useUser } from '../zustand';

export const usePaidPlan = () => {
  const { user } = useUser();

  const plan: User['paymentPlan'] = isNull(user) || user === 'guest' ? null : user.paymentPlan;

  return {
    plan,
  };
};
