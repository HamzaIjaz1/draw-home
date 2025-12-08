import { Brand, WITNESS } from '@arthurka/ts-utils';
import { initializeByTypeGuard } from '../utils';
import { isNonEmptyString, NonEmptyString } from './common';

export type CheckoutSessionId = Brand<NonEmptyString, 'CheckoutSessionId'>;
export const isCheckoutSessionId = (e: unknown): e is CheckoutSessionId => isNonEmptyString(e);
export const CheckoutSessionId = (e: CheckoutSessionId[WITNESS]): CheckoutSessionId => (
  initializeByTypeGuard(e, isCheckoutSessionId, 'CheckoutSessionId')
);
