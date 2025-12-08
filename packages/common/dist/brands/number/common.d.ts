import { Brand, WITNESS } from '@arthurka/ts-utils';
/**
  Non-negative number.

  @example
  0, 1.2345, 100500.
*/
export type NonNegative = Brand<number, '>= 0'>;
export declare const isNonNegative: (e: unknown) => e is NonNegative;
export declare const NonNegative: (e: NonNegative[WITNESS]) => NonNegative;
/**
  Positive number.

  @example
  1, 1.2345, 100500.
*/
export type Positive = Brand<NonNegative, '> 0'>;
export declare const isPositive: (e: unknown) => e is Positive;
export declare const Positive: (e: Positive[WITNESS]) => Positive;
/**
  Integer number.

  @example
  -5, 0, 1, -100500.
*/
export type Integer = Brand<number, 'Integer'>;
export declare const isInteger: (e: unknown) => e is Integer;
export declare const Integer: (e: Integer[WITNESS]) => Integer;
/**
  Positive integer number.

  @example
  5, 10, 1, 100500.
*/
export type PositiveInteger = Brand<Positive, Integer>;
export declare const isPositiveInteger: (e: unknown) => e is PositiveInteger;
export declare const PositiveInteger: (e: PositiveInteger[WITNESS]) => PositiveInteger;
/**
  Non-negative integer number.

  @example
  0, 1, 48, 132, 100500.
*/
export type NonNegativeInteger = Brand<NonNegative, Integer>;
export declare const isNonNegativeInteger: (e: unknown) => e is NonNegativeInteger;
export declare const NonNegativeInteger: (e: NonNegativeInteger[WITNESS]) => NonNegativeInteger;
//# sourceMappingURL=common.d.ts.map