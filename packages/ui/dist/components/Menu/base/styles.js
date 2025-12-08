"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollableContent = exports.FixedContent = exports.headerSpacing = void 0;
const material_1 = require("@mui/material");
const ts_utils_1 = require("@arthurka/ts-utils");
const _props_1 = require("../../../utils/$props");
const styles_1 = require("../../../utils/styles");
exports.headerSpacing = {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
};
exports.FixedContent = (0, material_1.styled)('div', (0, _props_1.$props)())(({ $noDivider, $bottomSpacing, $noStableScrollbarGutter, }) => (0, material_1.css) `
  overflow-y: auto;
  flex: 0 0 auto;
  scrollbar-gutter: ${$noStableScrollbarGutter === true ? 'auto' : 'stable'};
  min-height: 48px;
  position: relative;

  ${$noDivider === true ? '' : styles_1.absoluteDividerCss}

  ${!(0, ts_utils_1.isUndefined)($bottomSpacing) && (0, material_1.css) `
    padding-bottom: ${exports.headerSpacing[$bottomSpacing]};
  `}
`);
exports.ScrollableContent = (0, material_1.styled)('div', (0, _props_1.$props)())(({ $noStableScrollbarGutter }) => (0, material_1.css) `
  flex: 1 1 auto;
  overflow-y: auto;
  scrollbar-gutter: ${$noStableScrollbarGutter === true ? 'auto' : 'stable'};
`);
//# sourceMappingURL=styles.js.map