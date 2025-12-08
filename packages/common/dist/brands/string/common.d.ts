import { Brand, WITNESS } from '@arthurka/ts-utils';
export type NonEmptyString = Brand<string, 'NonEmptyString'>;
export declare const isNonEmptyString: (e: unknown) => e is NonEmptyString;
export declare const NonEmptyString: (e: NonEmptyString[WITNESS]) => NonEmptyString;
//# sourceMappingURL=common.d.ts.map