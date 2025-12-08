"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentColors = exports.Stack = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const color_1 = __importDefault(require("color"));
const ts_utils_1 = require("@arthurka/ts-utils");
const styles_1 = require("../SliderRow/styles");
const Palette_1 = require("../Palette");
const RecentColorsWrapper = (0, material_1.styled)('div') `
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;
exports.Stack = (0, material_1.styled)('div') `
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const RecentColors = ({ className, label, recentColors, applyHexFromPalette, activeHex, }) => {
    const normalizedActive = !(0, ts_utils_1.isNullish)(activeHex) ? new color_1.default(activeHex).hex().toLowerCase() : null;
    return ((0, jsx_runtime_1.jsxs)(exports.Stack, { className: className, children: [(0, jsx_runtime_1.jsx)(styles_1.Label, { children: label }), (0, jsx_runtime_1.jsx)(RecentColorsWrapper, { children: recentColors.map((hex, i) => {
                    const normalized = new color_1.default(hex).hex().toLowerCase();
                    const isActive = !(0, ts_utils_1.isNull)(normalizedActive) && normalized === normalizedActive;
                    return ((0, jsx_runtime_1.jsx)(Palette_1.PaletteColorButton, { onClick: () => applyHexFromPalette(hex), background: hex, active: isActive, highlightVariant: isActive === true ? 'outline' : 'none', "aria-label": hex, title: hex }, `${normalized}-${i}`));
                }) })] }));
};
exports.RecentColors = RecentColors;
//# sourceMappingURL=index.js.map