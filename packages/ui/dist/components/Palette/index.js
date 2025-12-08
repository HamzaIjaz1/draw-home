"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Palette = exports.PaletteColorButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const color_1 = __importDefault(require("color"));
const material_1 = require("@mui/material");
const ts_utils_1 = require("@arthurka/ts-utils");
const createStyledOptions_1 = require("../../utils/createStyledOptions");
const opts = (0, createStyledOptions_1.createStyledOptions)({
    paletteColumns: true,
});
const PaletteWrapper = (0, material_1.styled)('div', opts)(({ paletteColumns }) => (0, material_1.css) `
  display: grid;
  grid-template-columns: repeat(${paletteColumns}, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
`);
const ALL_COLORS_MATRIX = [
    ['#fff', '#f8f8f6', '#f5f3f0', '#f0ede8', '#ebe8e1', '#e8e6e4', '#e5e2de', '#d0ccc8', '#c0bab4'],
    ['#b8b2ac', '#a09890', '#908078', '#887e74', '#706458', '#584a3c', '#504540', '#483f38', '#403830', '#383028'],
    ['#fdf5e6', '#f8eaba', '#f5e6a3', '#e6d080', '#d4b86a', '#c2a050', '#b08840', '#9e7030', '#8c5820', '#7a4018'],
    ['#f8e8e0', '#f4ddd4', '#e8c4b0', '#d4a081', '#c08060', '#b07050', '#a66840', '#965a35', '#864c2a', '#763e20'],
    ['#f0d8d0', '#e6b8a8', '#d29580', '#c07860', '#b87060', '#a05040', '#883020', '#702818', '#5c2010', '#481808'],
    ['#f0f8ff', '#e8f4f8', '#e0f0f5', '#d0e3ea', '#b8d5e0', '#a0c7d5', '#88b9ca', '#70abbf', '#5a9db4', '#448fa9'],
    ['#7ab8ca', '#5ba0b8', '#4088a0', '#307088', '#285870', '#204058', '#182840', '#101828', '#0c1420', '#081018'],
    ['#d0e8e0', '#a8d1c8', '#80b8a8', '#60a088', '#408868', '#207048', '#185838', '#104028', '#0c3020', '#082018'],
    ['#f0f5e8', '#e8f0d6', '#d8e6c4', '#c8dca8', '#b8d18c', '#a8c670', '#9bb88a', '#8baa6f', '#7a986a', '#6a8860'],
    ['#f2f4f0', '#e8eae0', '#d8dac8', '#c8cab0', '#b8ba98', '#a8aa80', '#989a68', '#888a50', '#787a40', '#686a30'],
];
const btnOpts = (0, createStyledOptions_1.createStyledOptions)({
    background: true,
    active: true,
    highlightVariant: true,
});
exports.PaletteColorButton = (0, material_1.styled)('button', btnOpts)(({ theme, background, active, highlightVariant = 'outline', }) => (0, material_1.css) `
  width: 30px;
  height: 30px;
  border: 0.5px solid ${theme.palette.text.secondary};
  border-radius: 50%;
  background: ${background};
  background-size: cover;
  cursor: pointer;

  ${highlightVariant === 'outline' && (0, material_1.css) `
    border: 1px solid transparent;
    ${active && (0, material_1.css) `
      outline: 2px solid ${theme.palette.primary.main};
      outline-offset: 2px;
    `}
  `}
`);
const Palette = ({ className, value, noneOptionImage, onChange, noneOptionClick }) => {
    const palette = ALL_COLORS_MATRIX.flat().map(e => new color_1.default(e).hex());
    const paletteColumns = ALL_COLORS_MATRIX.reduce((acc, cur) => Math.max(acc, cur.length), 0);
    const normalizedActive = (0, ts_utils_1.isNull)(value) ? null : new color_1.default(value).hex().toLowerCase();
    return ((0, jsx_runtime_1.jsxs)(PaletteWrapper, { className: className, paletteColumns: paletteColumns, children: [(0, jsx_runtime_1.jsx)(exports.PaletteColorButton, { background: `url(${noneOptionImage})`, active: (0, ts_utils_1.isNull)(value), highlightVariant: (0, ts_utils_1.isNull)(value) ? 'outline' : 'none', title: 'none', onClick: noneOptionClick }), palette.map((hex, i) => {
                const normalized = new color_1.default(hex).hex().toLowerCase();
                const isActive = normalized === normalizedActive;
                return ((0, jsx_runtime_1.jsx)(exports.PaletteColorButton, { background: hex, active: normalized === normalizedActive, highlightVariant: isActive === true ? 'outline' : 'none', title: hex, onClick: () => {
                        onChange(hex);
                    } }, `${normalized}-${i}`));
            })] }));
};
exports.Palette = Palette;
//# sourceMappingURL=index.js.map