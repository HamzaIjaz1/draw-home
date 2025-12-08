"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ts_utils_1 = require("@arthurka/ts-utils");
const styles_1 = require("../../utils/styles");
const _props_1 = require("../../utils/$props");
const cssVar = {
    gap: '--menu-item-gap',
};
const verticalPaddings = {
    md: '10px',
    ml: '16px',
    lg: '24px',
};
const minHeights = {
    unset: 'unset',
    'full-row': '48px',
    'half-row': '24px',
};
const paddingHorizontalCss = {
    false: '',
    true: (0, material_1.css) `
    padding-left: ${styles_1.menuHorizontalGutterWidth}px;
    padding-right: ${styles_1.menuHorizontalGutterWidth}px;
  `,
    sm: (0, material_1.css) `
    padding-left: ${styles_1.menuHorizontalGutterWidth / 2}px;
    padding-right: ${styles_1.menuHorizontalGutterWidth / 2}px;
  `,
    'row 3/4': (0, material_1.css) `
    padding-left: ${styles_1.menuHorizontalGutterWidth / 4 * 3}px;
    padding-right: ${styles_1.menuHorizontalGutterWidth / 4 * 3}px;
  `,
};
const paddingLeftCss = {
    false: '',
    true: (0, material_1.css) `
    padding-left: ${styles_1.menuHorizontalGutterWidth}px;
  `,
    'row 3/4': (0, material_1.css) `
    padding-left: ${styles_1.menuHorizontalGutterWidth / 4 * 3}px;
  `,
};
const paddingRightCss = {
    false: '',
    true: (0, material_1.css) `
    padding-right: ${styles_1.menuHorizontalGutterWidth}px;
  `,
    'row 3/4': (0, material_1.css) `
    padding-right: ${styles_1.menuHorizontalGutterWidth / 4 * 3}px;
  `,
};
const Item = (0, material_1.styled)('div', (0, _props_1.$props)())(({ $divider, $spaceBetween, $center, $paddingVertical, $paddingTop, $paddingBottom, $paddingHorizontal, $paddingLeft, $paddingRight, $grow, $minHeight, }) => (0, material_1.css) `
  display: flex;
  align-items: center;
  position: relative;
  min-height: ${minHeights[$minHeight]};
  gap: ${(0, styles_1.getCssVar)(cssVar.gap)};

  ${(0, ts_utils_1.isUndefined)($paddingVertical) ? '' : (0, material_1.css) `
    padding-top: ${verticalPaddings[$paddingVertical]};
    padding-bottom: ${verticalPaddings[$paddingVertical]};
  `}
  ${(0, ts_utils_1.isUndefined)($paddingTop) ? '' : (0, material_1.css) `
    padding-top: ${verticalPaddings[$paddingTop]};
  `}
  ${(0, ts_utils_1.isUndefined)($paddingBottom) ? '' : (0, material_1.css) `
    padding-bottom: ${verticalPaddings[$paddingBottom]};
  `}
  ${$grow === true && (0, material_1.css) `
    flex: 1;
  `}
  ${paddingHorizontalCss[String($paddingHorizontal)]}
  ${paddingLeftCss[String($paddingLeft)]}
  ${paddingRightCss[String($paddingRight)]}
  ${$spaceBetween === true && (0, material_1.css) `
    justify-content: space-between;
  `}
  ${$center === true && (0, material_1.css) `
    justify-content: center;
  `}
  ${$divider === true && styles_1.absoluteDividerCss}
`);
const MenuItem = ({ className, children, divider = false, spaceBetween = false, center = false, paddingVertical, paddingTop, paddingBottom, paddingHorizontal = false, paddingLeft = false, paddingRight = false, grow = false, minHeight = 'full-row', gap, }) => ((0, jsx_runtime_1.jsx)(Item, { className: className, style: {
        ...!(0, ts_utils_1.isUndefined)(gap) && (0, styles_1.setCssVarInline)(cssVar.gap, `${gap}px`),
    }, "$divider": divider, "$spaceBetween": spaceBetween, "$center": center, "$paddingVertical": paddingVertical, "$paddingTop": paddingTop, "$paddingBottom": paddingBottom, "$paddingHorizontal": paddingHorizontal, "$paddingLeft": paddingLeft, "$paddingRight": paddingRight, "$grow": grow, "$minHeight": minHeight, children: children }));
exports.MenuItem = MenuItem;
//# sourceMappingURL=index.js.map