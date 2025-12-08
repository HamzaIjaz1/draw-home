"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.Image = exports.MaterialButton = exports.Container = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
const BaseButton_1 = require("../BaseButton");
const styles_1 = require("../../utils/styles");
const createStyledOptions_1 = require("../../utils/createStyledOptions");
const ContainerOptions = (0, createStyledOptions_1.createStyledOptions)({
    wrap: true,
});
exports.Container = (0, material_1.styled)('div', ContainerOptions)(({ wrap }) => (0, material_1.css) `
  margin: 0 ${styles_1.menuHorizontalGutterWidth}px;

  ${wrap === true && (0, material_1.css) `
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    justify-items: center;
    gap: 2px 8px;
  `}

  ${wrap === false && (0, material_1.css) `
    display: flex;
    gap: 8px;
    overflow-x: auto;
  `}
`);
const MaterialButtonOptions = (0, createStyledOptions_1.createStyledOptions)({
    size: true,
});
exports.MaterialButton = (0, material_1.styled)(BaseButton_1.BaseButton, MaterialButtonOptions)(({ size }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 8px;
  height: min-content;
  gap: 4px;
  padding: 4px 2px;
  ${size === 'sm' && (0, material_1.css) `
    width: 60px;
  `}
  ${size === 'md' && (0, material_1.css) `
    width: 68px;
  `}
`);
const ImageOptions = (0, createStyledOptions_1.createStyledOptions)({
    active: true,
    squareImages: true,
    highlightVariant: true,
    size: true,
});
exports.Image = (0, material_1.styled)('img', ImageOptions)(({ theme, active, squareImages, highlightVariant, size, }) => (0, material_1.css) `
  ${size === 'sm' && (0, material_1.css) `
    width: 48px;
    height: 48px;
  `}
  ${size === 'md' && (0, material_1.css) `
    width: 56px;
    height: 56px;
  `}

  box-sizing: content-box;
  object-fit: cover;
  border-radius: ${squareImages === true ? '8px' : '50%'};

  ${highlightVariant === 'outline' && (0, material_1.css) `
    border: 1px solid transparent;
    ${active === true && (0, material_1.css) `
      outline: 2px solid ${theme.palette.primary.main};
    `}
  `}

  ${highlightVariant === 'background' && (0, material_1.css) `
    ${active === false && (0, material_1.css) `
      filter: grayscale(1);
    `}
    ${active === true && (0, material_1.css) `
      background-color: #fd563112;
    `}
  `}
`);
exports.Text = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
  text-align: center;
  color: ${theme.palette.text.secondary};
  width: calc(100% + 2px);
  overflow-wrap: break-word;
`);
//# sourceMappingURL=styles.js.map