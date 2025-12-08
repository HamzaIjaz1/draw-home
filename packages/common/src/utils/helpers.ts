import { v4 as uuidv4 } from 'uuid';
import { round } from '@arthurka/ts-utils';
import { UUID } from '../brands';

export function castTo<T = never>(e: [T] extends [never] ? never : unknown): asserts e is typeof e & T {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const checkIsNotNever = <T>(...e: [T] extends [never] ? [] : [T]) => {};

export const clamp = <T1 extends number, T2 extends number, T3 extends number>(min: T1, val: T2, max: T3) => (
  Math.max(min, Math.min(val, max))
);

export const generateUUID = () => UUID(uuidv4());

export const capitalize = <T extends string>(s: T) => s.replace(/^./, e => e.toUpperCase()) as Capitalize<T>;

export type SafeOmit<T, U extends keyof T> = Omit<T, U>;
export type StrictExtract<T, U extends T> = Extract<T, U>;
export type StrictExclude<T, U extends T> = Exclude<T, U>;
export type DistributivePick<T, K extends keyof T> = T extends T ? Pick<T, K> : never;
export type DistributiveSafeOmit<T, U extends keyof T> = T extends T ? SafeOmit<T, U> : never;

export const fixIEEE = (e: number) => round(e, 6);

type CutOffLastLetter<T extends string, Result extends string = ''> = (
  T extends `${infer First}${infer Rest}`
    ? Rest extends ''
      ? Result
      : CutOffLastLetter<Rest, `${Result}${First}`>
    : Result
);
export const cutOffLastLetter = <T extends string>(e: T) => e.slice(0, -1) as CutOffLastLetter<T>;

export const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const isPromiseSettled = async (promise: Promise<unknown>) => {
  const uniqueValue = Symbol('unique');

  const result = await Promise.race([promise, Promise.resolve(uniqueValue)]);

  return result !== uniqueValue;
};

export const letIn = <T, R>(e: T, fn: (e: T) => R): R => fn(e);

export const isSubset = <T>(set: T[], subset: Array<NoInfer<T>>): boolean => {
  const _set = new Set(set);

  return subset.every(e => _set.has(e));
};

export const areTheSameContentArrays = <T extends string | number>(_arr1: T[], _arr2: Array<NoInfer<T>>) => {
  const set1 = new Set(_arr1);
  const set2 = new Set(_arr2);

  return set1.size === set2.size && [...set1].every(e => set2.has(e));
};
