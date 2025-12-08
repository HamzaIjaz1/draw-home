import { css, styled } from '@mui/material';
import { specialZIndexTop } from '@draw-house/common/dist/constants';
import { CssVariable, getCssVar, setCssVar } from '../../utils/styles';
import { createStyledOptions } from '../../utils/createStyledOptions';
import { sizeMdDesktop as IconButtonSizeMdDesktop } from '../IconButton/styles';
import { floatingMenuClassName } from '../Menu/FloatingMenu';

const vars = {
  marginX: '--overlay-margin-x',
  marginY: '--overlay-margin-y',
  topRightRowGap: '--overlay-top-right-row-gap',
  iconContainerGap: '--overlay-icon-container-gap',
} satisfies Record<string, CssVariable>;

const commonCss = css`
  position: fixed;
  z-index: 2;

  ${setCssVar(vars.marginX, '10px')}
  ${setCssVar(vars.marginY, '10px')}

  @media (min-width: 1200px) {
    ${setCssVar(vars.marginX, '12px')}
    ${setCssVar(vars.marginY, '12px')}
  }
  @media (min-width: 1536px) {
    ${setCssVar(vars.marginX, '14px')}
    ${setCssVar(vars.marginY, '14px')}
  }
  @media (min-width: 1800px) {
    ${setCssVar(vars.marginX, '26px')}
    ${setCssVar(vars.marginY, '26px')}
  }
`;

export const TopLeft = styled('div')`
  ${commonCss}
  top: ${getCssVar(vars.marginY)};
  left: ${getCssVar(vars.marginX)};

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;

  & > svg:last-of-type {
    margin-left: 12px;
  }
`;

export const topCenterBreakpoint = 430;

export const TopCenter = styled('div')(({ theme }) => css`
  ${commonCss}
  top: ${getCssVar(vars.marginY)};
  left: 47%;
  transform: translateX(-50%);
  margin-top: 5px;

  ${theme.breakpoints.up(topCenterBreakpoint)} {
    left: 50%;
  }
`);

export const mainScreenOverlayTopRightMenuGap = 16;

export const TopRight = styled('div')`
  ${commonCss}
  ${setCssVar(vars.topRightRowGap, '4px')}

  top: ${getCssVar(vars.marginY)};
  right: ${getCssVar(vars.marginX)};
  z-index: 3;

  display: flex;
  flex-direction: column;
  gap: ${getCssVar(vars.topRightRowGap)};

  pointer-events: none;
  > * > * {
    pointer-events: auto;
  }

  @media (min-height: 500px) {
    ${setCssVar(vars.topRightRowGap, '15px')}
  }
  @media (min-height: 600px) {
    ${setCssVar(vars.topRightRowGap, '24px')}
  }
  @media (min-height: 700px) {
    ${setCssVar(vars.topRightRowGap, '50px')}
  }
`;

type BottomRowOpts = {
  hide: boolean;
};

const bottomRowOpts = createStyledOptions<BottomRowOpts>({
  hide: true,
});

export const BottomLeft = styled('div', bottomRowOpts)<BottomRowOpts>(({ theme, hide }) => css`
  ${commonCss}
  bottom: ${getCssVar(vars.marginY)};
  left: ${getCssVar(vars.marginX)};

  display: flex;
  gap: 8px;

  ${hide === true && css`
    ${theme.breakpoints.down('md')} {
      display: none;
    }
  `}
`);

export const BottomCenter = styled('div', bottomRowOpts)<BottomRowOpts>(({ hide }) => css`
  ${commonCss}
  bottom: ${getCssVar(vars.marginY)};
  left: 50%;
  transform: translateX(-50%);

  ${hide === true && css`
    display: none;
  `}
`);

export const BottomRight = styled('div', bottomRowOpts)<BottomRowOpts>(({ theme, hide }) => css`
  ${commonCss}
  bottom: ${getCssVar(vars.marginY)};
  right: ${getCssVar(vars.marginX)};

  z-index: ${specialZIndexTop};

  ${hide === true && css`
    ${theme.breakpoints.down('md')} {
      display: none;
    }
  `}
`);

export const BottomCenterPriority = styled('div')`
  ${commonCss}
  bottom: ${getCssVar(vars.marginY)};
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: 390px;
`;

export const IconMenuContainer = styled('div')`
  ${setCssVar(vars.iconContainerGap, '4px')}
  display: flex;
  flex-direction: column;
  gap: ${getCssVar(vars.iconContainerGap)};

  max-height: 62dvh;
  overflow: auto;
  scrollbar-width: thin;

  @media (min-height: 460px) {
    max-height: unset;
    overflow: visible;
  }
  @media (min-height: 600px) {
    ${setCssVar(vars.iconContainerGap, '6px')}
  }
  @media (min-height: 700px) {
    ${setCssVar(vars.iconContainerGap, '10px')}
  }

  & > button:last-of-type {
    margin-top: calc(${getCssVar(vars.topRightRowGap)} - ${getCssVar(vars.iconContainerGap)});
  }
`;

export const FloatingMenuContainer = styled('div')`
  position: relative;
  top: calc(-1 * (${getCssVar(vars.topRightRowGap)} + ${IconButtonSizeMdDesktop}px));

  .${floatingMenuClassName} {
    height: calc(100vh - (2 * ${getCssVar(vars.marginY)}));
  }
`;
