import type { styled } from '@mui/material';

export type $Props<T extends Exclude<keyof T, `$${string}`> extends never ? Record<string, unknown> : never> = (
  T
);

type Options = NonNullable<Parameters<typeof styled>[1]>;

export function $props<T extends Options = Options>(options?: T) {
  return {
    shouldForwardProp: (e: string): boolean => !e.startsWith('$'),
    ...options,
  };
}
