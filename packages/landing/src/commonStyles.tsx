import { css } from 'styled-components';
import { CssVariable, getCssVar, setCssVar } from './utils/cssVars';

export const primaryColor = '#ff5b4a';
export const backgroundColor = '#fcfcfc';

export const breakpointMdNumber = 900;
export const breakpointMd = `${breakpointMdNumber}px`;

export const MAX_PAGE_WIDTH = 1520;

export const cssVars = {
  scrollbarWidth: '--scrollbar-width',
  scrollbarHalfWidth: '--scrollbar-half-width',
  pageSidePaddingWoScrollbar: '--page-side-padding-wo-scrollbar',
  pageSidePadding: '--page-side-padding',
} as const satisfies Record<string, CssVariable>;

export const pagePaddingCss = css`
  ${setCssVar(cssVars.scrollbarWidth, 'calc(100vw - 100%)')}
  ${setCssVar(cssVars.scrollbarHalfWidth, `calc(${getCssVar(cssVars.scrollbarWidth)} / 2)`)}
  ${setCssVar(cssVars.pageSidePaddingWoScrollbar, 'clamp(16px, 4.2328vw - 0.5072px, 32px)')}
  ${setCssVar(
    cssVars.pageSidePadding,
    `calc(${getCssVar(cssVars.pageSidePaddingWoScrollbar)} - ${getCssVar(cssVars.scrollbarHalfWidth)})`,
  )}

  padding: 0 ${getCssVar(cssVars.pageSidePadding)};

  @media (min-width: 768px) {
    ${setCssVar(cssVars.pageSidePaddingWoScrollbar, 'clamp(32px, 6.25vw - 16px, 48px)')}
  }

  @media (min-width: 1024px) {
    ${setCssVar(cssVars.pageSidePaddingWoScrollbar, 'clamp(48px, 10.4839vw - 59.3552px, 100px)')}
  }

  @media (min-width: 1520px) {
    ${setCssVar(cssVars.pageSidePaddingWoScrollbar, '120px')}
  }
`;
