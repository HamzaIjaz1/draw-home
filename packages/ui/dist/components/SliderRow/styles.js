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
exports.Slider = exports.sliderColorCssVar = exports.Label = exports.Row = exports.Stack = void 0;
const material_1 = require("@mui/material");
const Slider_1 = __importStar(require("@mui/material/Slider"));
const theme_1 = require("../../theme");
const styles_1 = require("../../utils/styles");
exports.Stack = (0, material_1.styled)('div') `
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
exports.Row = (0, material_1.styled)('div') `
  display: flex;
  align-items: center;
  gap: 16px;
`;
exports.Label = (0, material_1.styled)('label')(({ theme }) => (0, material_1.css) `
  font-weight: 400;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
  overflow-wrap: break-word;
`);
exports.sliderColorCssVar = '--ui-slider-color';
exports.Slider = (0, material_1.styled)(Slider_1.default)(({ theme }) => (0, material_1.css) `
  height: 8px;

  .${Slider_1.sliderClasses.track} {
    display: none;
  }
  .${Slider_1.sliderClasses.rail} {
    opacity: 1;
    border: 1.5px solid ${theme_1.backgroundSecondary};
    background: linear-gradient(to right, ${theme.palette.background.paper}, ${(0, styles_1.getCssVar)(exports.sliderColorCssVar)});
  }

  .${Slider_1.sliderClasses.thumb} {
    width: 22px;
    height: 22px;
    border: 3.5px solid ${theme.palette.background.paper};
    box-shadow: 0px 0px 8px 0px #00000040;
    background-color: ${(0, styles_1.getCssVar)(exports.sliderColorCssVar)};

    &:focus, &:hover, &.Mui-active, &.Mui-focusVisible {
      box-shadow: 0px 0px 8px 0px #00000040;
    }
  }
`);
//# sourceMappingURL=styles.js.map