"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCssVar = exports.setCssVar = exports.setCssVarInline = exports.menuContainerWidth = exports.scrollbarWidth = exports.absoluteDividerCss = exports.getAbsoluteDividerCss = exports.menuRowPadding = exports.menuRowHorizontalPadding = exports.menuHorizontalGutterWidth = exports.menuRowVerticalPadding = exports.VisuallyHiddenInput = exports.textOverflowEllipsis = void 0;
const ts_utils_1 = require("@arthurka/ts-utils");
const material_1 = require("@mui/material");
const theme_1 = require("../theme");
exports.textOverflowEllipsis = (0, material_1.css) `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
exports.VisuallyHiddenInput = (0, material_1.styled)('input') `
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
const menuRowVerticalPadding = () => (0, material_1.css) `
  padding-top: 0;
  padding-bottom: 0;
`;
exports.menuRowVerticalPadding = menuRowVerticalPadding;
exports.menuHorizontalGutterWidth = 16;
const menuRowHorizontalPadding = () => (0, material_1.css) `
  padding-left: ${exports.menuHorizontalGutterWidth}px;
  padding-right: ${exports.menuHorizontalGutterWidth}px;
`;
exports.menuRowHorizontalPadding = menuRowHorizontalPadding;
const menuRowPadding = () => (0, material_1.css) `
  ${(0, exports.menuRowVerticalPadding)()};
  ${(0, exports.menuRowHorizontalPadding)()};
`;
exports.menuRowPadding = menuRowPadding;
/** Requires "position: relative" from a parent container */
const getAbsoluteDividerCss = (styles) => (0, material_1.css) `
  ::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: ${exports.menuHorizontalGutterWidth}px;
    right: ${exports.menuHorizontalGutterWidth}px;
    height: 0.8px;
    background-color: ${theme_1.backgroundSecondary};
    ${styles}
  }
`;
exports.getAbsoluteDividerCss = getAbsoluteDividerCss;
exports.absoluteDividerCss = (0, exports.getAbsoluteDividerCss)();
exports.scrollbarWidth = 17;
exports.menuContainerWidth = 390;
const setCssVarInline = (name, value) => ({
    [name]: value,
});
exports.setCssVarInline = setCssVarInline;
const setCssVar = (name, value) => (0, material_1.css) `
  ${`${name}: ${value}`};
`;
exports.setCssVar = setCssVar;
const getCssVar = (name, fallback) => ((0, ts_utils_1.isUndefined)(fallback)
    ? `var(${name})`
    : `var(${name}, ${fallback})`);
exports.getCssVar = getCssVar;
//# sourceMappingURL=styles.js.map