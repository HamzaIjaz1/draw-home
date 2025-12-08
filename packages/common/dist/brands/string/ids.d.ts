import { Brand, WITNESS } from '@arthurka/ts-utils';
import { NonEmptyString } from './common';
export type CheckoutSessionId = Brand<NonEmptyString, 'CheckoutSessionId'>;
export declare const isCheckoutSessionId: (e: unknown) => e is CheckoutSessionId;
export declare const CheckoutSessionId: (e: CheckoutSessionId[WITNESS]) => CheckoutSessionId;
//# sourceMappingURL=ids.d.ts.map