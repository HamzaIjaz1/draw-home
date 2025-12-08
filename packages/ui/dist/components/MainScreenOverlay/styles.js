"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingMenuContainer = exports.IconMenuContainer = exports.BottomCenterPriority = exports.BottomRight = exports.BottomCenter = exports.BottomLeft = exports.TopRight = exports.mainScreenOverlayTopRightMenuGap = exports.TopCenter = exports.topCenterBreakpoint = exports.TopLeft = void 0;
const material_1 = require("@mui/material");
const constants_1 = require("@draw-house/common/dist/constants");
const styles_1 = require("../../utils/styles");
const createStyledOptions_1 = require("../../utils/createStyledOptions");
const styles_2 = require("../IconButton/styles");
const FloatingMenu_1 = require("../Menu/FloatingMenu");
const vars = {
    marginX: '--overlay-margin-x',
    marginY: '--overlay-margin-y',
    topRightRowGap: '--overlay-top-right-row-gap',
    iconContainerGap: '--overlay-icon-container-gap',
};
const commonCss = (0, material_1.css) `
  position: fixed;
  z-index: 2;

  ${(0, styles_1.setCssVar)(vars.marginX, '10px')}
  ${(0, styles_1.setCssVar)(vars.marginY, '10px')}

  @media (min-width: 1200px) {
    ${(0, styles_1.setCssVar)(vars.marginX, '12px')}
    ${(0, styles_1.setCssVar)(vars.marginY, '12px')}
  }
  @media (min-width: 1536px) {
    ${(0, styles_1.setCssVar)(vars.marginX, '14px')}
    ${(0, styles_1.setCssVar)(vars.marginY, '14px')}
  }
  @media (min-width: 1800px) {
    ${(0, styles_1.setCssVar)(vars.marginX, '26px')}
    ${(0, styles_1.setCssVar)(vars.marginY, '26px')}
  }
`;
exports.TopLeft = (0, material_1.styled)('div') `
  ${commonCss}
  top: ${(0, styles_1.getCssVar)(vars.marginY)};
  left: ${(0, styles_1.getCssVar)(vars.marginX)};

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;

  & > svg:last-of-type {
    margin-left: 12px;
  }
`;
exports.topCenterBreakpoint = 430;
exports.TopCenter = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  ${commonCss}
  top: ${(0, styles_1.getCssVar)(vars.marginY)};
  left: 47%;
  transform: translateX(-50%);
  margin-top: 5px;

  ${theme.breakpoints.up(exports.topCenterBreakpoint)} {
    left: 50%;
  }
`);
exports.mainScreenOverlayTopRightMenuGap = 16;
exports.TopRight = (0, material_1.styled)('div') `
  ${commonCss}
  ${(0, styles_1.setCssVar)(vars.topRightRowGap, '4px')}

  top: ${(0, styles_1.getCssVar)(vars.marginY)};
  right: ${(0, styles_1.getCssVar)(vars.marginX)};
  z-index: 3;

  display: flex;
  flex-direction: column;
  gap: ${(0, styles_1.getCssVar)(vars.topRightRowGap)};

  pointer-events: none;
  > * > * {
    pointer-events: auto;
  }

  @media (min-height: 500px) {
    ${(0, styles_1.setCssVar)(vars.topRightRowGap, '15px')}
  }
  @media (min-height: 600px) {
    ${(0, styles_1.setCssVar)(vars.topRightRowGap, '24px')}
  }
  @media (min-height: 700px) {
    ${(0, styles_1.setCssVar)(vars.topRightRowGap, '50px')}
  }
`;
const bottomRowOpts = (0, createStyledOptions_1.createStyledOptions)({
    hide: true,
});
exports.BottomLeft = (0, material_1.styled)('div', bottomRowOpts)(({ theme, hide }) => (0, material_1.css) `
  ${commonCss}
  bottom: ${(0, styles_1.getCssVar)(vars.marginY)};
  left: ${(0, styles_1.getCssVar)(vars.marginX)};

  display: flex;
  gap: 8px;

  ${hide === true && (0, material_1.css) `
    ${theme.breakpoints.down('md')} {
      display: none;
    }
  `}
`);
exports.BottomCenter = (0, material_1.styled)('div', bottomRowOpts)(({ hide }) => (0, material_1.css) `
  ${commonCss}
  bottom: ${(0, styles_1.getCssVar)(vars.marginY)};
  left: 50%;
  transform: translateX(-50%);

  ${hide === true && (0, material_1.css) `
    display: none;
  `}
`);
exports.BottomRight = (0, material_1.styled)('div', bottomRowOpts)(({ theme, hide }) => (0, material_1.css) `
  ${commonCss}
  bottom: ${(0, styles_1.getCssVar)(vars.marginY)};
  right: ${(0, styles_1.getCssVar)(vars.marginX)};

  z-index: ${constants_1.specialZIndexTop};

  ${hide === true && (0, material_1.css) `
    ${theme.breakpoints.down('md')} {
      display: none;
    }
  `}
`);
exports.BottomCenterPriority = (0, material_1.styled)('div') `
  ${commonCss}
  bottom: ${(0, styles_1.getCssVar)(vars.marginY)};
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: 390px;
`;
exports.IconMenuContainer = (0, material_1.styled)('div') `
  ${(0, styles_1.setCssVar)(vars.iconContainerGap, '4px')}
  display: flex;
  flex-direction: column;
  gap: ${(0, styles_1.getCssVar)(vars.iconContainerGap)};

  max-height: 62dvh;
  overflow: auto;
  scrollbar-width: thin;

  @media (min-height: 460px) {
    max-height: unset;
    overflow: visible;
  }
  @media (min-height: 600px) {
    ${(0, styles_1.setCssVar)(vars.iconContainerGap, '6px')}
  }
  @media (min-height: 700px) {
    ${(0, styles_1.setCssVar)(vars.iconContainerGap, '10px')}
  }

  & > button:last-of-type {
    margin-top: calc(${(0, styles_1.getCssVar)(vars.topRightRowGap)} - ${(0, styles_1.getCssVar)(vars.iconContainerGap)});
  }
`;
exports.FloatingMenuContainer = (0, material_1.styled)('div') `
  position: relative;
  top: calc(-1 * (${(0, styles_1.getCssVar)(vars.topRightRowGap)} + ${styles_2.sizeMdDesktop}px));

  .${FloatingMenu_1.floatingMenuClassName} {
    height: calc(100vh - (2 * ${(0, styles_1.getCssVar)(vars.marginY)}));
  }
`;
//# sourceMappingURL=styles.js.map