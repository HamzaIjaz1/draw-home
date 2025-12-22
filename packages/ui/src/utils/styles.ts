import { isUndefined } from '@arthurka/ts-utils';
import { css, styled } from '@mui/material';
import { backgroundSecondary } from '../theme';

export const textOverflowEllipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
`;

export const menuRowVerticalPadding = () => css`
  padding-top: 0;
  padding-bottom: 0;
`;

export const menuHorizontalGutterWidth = 16;

export const menuRowHorizontalPadding = () => css`
  padding-left: ${menuHorizontalGutterWidth}px;
  padding-right: ${menuHorizontalGutterWidth}px;
`;

export const menuRowPadding = () => css`
  ${menuRowVerticalPadding()};
  ${menuRowHorizontalPadding()};
`;

/** Requires "position: relative" from a parent container */
export const getAbsoluteDividerCss = (styles?: ReturnType<typeof css>) => css`
  ::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: ${menuHorizontalGutterWidth}px;
    right: ${menuHorizontalGutterWidth}px;
    height: 0.8px;
    background-color: ${backgroundSecondary};
    ${styles}
  }
`;

export const absoluteDividerCss = getAbsoluteDividerCss();

export const scrollbarWidth = 17;
export const menuContainerWidth = 320;

export type CssVariable = `--${string}`;

export const setCssVarInline = (name: CssVariable, value: string) => ({
  [name]: value,
});

export const setCssVar = (name: CssVariable, value: string) => css`
  ${`${name}: ${value}`};
`;

export const getCssVar = (name: CssVariable, fallback?: string) => (
  isUndefined(fallback)
    ? `var(${name})`
    : `var(${name}, ${fallback})`
);
