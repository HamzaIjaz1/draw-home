"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckedIcon = exports.Icon = exports.StyledCheckbox = exports.Label = exports.cssVars = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Checkbox_1 = __importStar(require("@mui/material/Checkbox"));
const styles_1 = require("../../utils/styles");
exports.cssVars = {
    iconColor: '--checkbox-icon-color',
    checkboxPadding: '--checkbox-root-padding',
    checkboxSize: '--checkbox-svg-size',
};
exports.Label = (0, material_1.styled)('label') `
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  cursor: pointer;
  user-select: none;
`;
exports.StyledCheckbox = (0, material_1.styled)(Checkbox_1.default)(({ theme }) => (0, material_1.css) `
  color: ${(0, styles_1.getCssVar)(exports.cssVars.iconColor, theme.palette.primary.main)};
  &.${Checkbox_1.checkboxClasses.checked} {
    color: ${(0, styles_1.getCssVar)(exports.cssVars.iconColor, theme.palette.primary.main)};
  }

  &.${Checkbox_1.checkboxClasses.root} {
    padding: ${(0, styles_1.getCssVar)(exports.cssVars.checkboxPadding, '8px')};
  }

  svg {
    width: ${(0, styles_1.getCssVar)(exports.cssVars.checkboxSize, '18px')};
    height: ${(0, styles_1.getCssVar)(exports.cssVars.checkboxSize, '18px')};
  }
`);
const Icon = () => ((0, jsx_runtime_1.jsx)("svg", { width: '18', height: '18', viewBox: '0 0 18 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', children: (0, jsx_runtime_1.jsx)("rect", { x: '.65', y: '.65', width: '16.7', height: '16.7', rx: '3.35', stroke: 'currentColor', strokeWidth: '1.3' }) }));
exports.Icon = Icon;
const CheckedIcon = () => ((0, jsx_runtime_1.jsxs)("svg", { width: '18', height: '18', viewBox: '0 0 18 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', children: [(0, jsx_runtime_1.jsx)("rect", { width: '18', height: '18', rx: '4', fill: 'currentColor' }), (0, jsx_runtime_1.jsx)("path", { d: 'm13.199 6.117-5.775 5.775-2.625-2.625', stroke: '#fff', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' })] }));
exports.CheckedIcon = CheckedIcon;
//# sourceMappingURL=styles.js.map