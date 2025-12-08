import { isNull } from '@arthurka/ts-utils';
import { User } from '@draw-house/common/dist/zod';

export const isPrivilegedUser = (user: User) => (
  !isNull(user.paymentPlan) || user.isAdmin === true || user.bypassPaywall === true
);
