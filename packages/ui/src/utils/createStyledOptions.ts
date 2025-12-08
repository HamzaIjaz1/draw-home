import type { styled } from '@mui/material';

type Options = NonNullable<Parameters<typeof styled>[1]>;

export function createStyledOptions<
  T extends Record<string, unknown>,
  O extends Options = Options,
>(
  props: Record<keyof T, true>,
  options?: O,
) {
  return {
    shouldForwardProp: (e: string): boolean => (
      !Object.prototype.hasOwnProperty.call(props, e)
    ),
    ...options,
  };
}
