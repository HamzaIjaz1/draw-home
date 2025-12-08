import { isUndefined } from '@arthurka/ts-utils';
import { css } from 'styled-components';

export type CssVariable = `--${string}`;

export const setCssVar = (name: CssVariable, value: string) => css`
  ${`${name}: ${value}`};
`;

export const getCssVar = (name: CssVariable, fallback?: string) => (
  isUndefined(fallback)
    ? `var(${name})`
    : `var(${name}, ${fallback})`
);
