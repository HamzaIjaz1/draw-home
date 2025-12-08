"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.Image = exports.Material = exports.Container = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
const BaseButton_1 = require("../BaseButton");
const styles_1 = require("../../utils/styles");
const _props_1 = require("../../utils/$props");
const lookup_1 = require("../../utils/lookup");
const columnsCssVar = '--material-picker-columns';
exports.Container = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  ${(0, styles_1.setCssVar)(columnsCssVar, '3')}
  display: grid;
  grid-template-columns: repeat(${(0, styles_1.getCssVar)(columnsCssVar)}, 1fr);
  justify-items: center;

  ${theme.breakpoints.up(390)} {
    ${(0, styles_1.setCssVar)(columnsCssVar, '4')}
  }

  ${(0, styles_1.menuRowHorizontalPadding)()}
`);
exports.Material = (0, material_1.styled)(BaseButton_1.BaseButton)(({ theme }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 10px;
  gap: 4px;
  width: 85px;
  height: min-content;
  ${theme.breakpoints.up('md')} {
    width: 78px;
  }
`);
exports.Image = (0, material_1.styled)('img', (0, _props_1.$props)())(({ theme, $active, $shape, $showBorder }) => (0, material_1.css) `
  width: 82px;
  height: 82px;
  border-radius: ${(0, lookup_1.lookup)($shape, { round: '50%', square: '0' })};
  object-fit: ${$shape === 'round' ? 'cover' : 'contain'};

  ${$showBorder === true && (0, material_1.css) `
    border: 2px solid ${$active ? theme.palette.primary.main : theme.palette.text.disabled};
  `}

  ${theme.breakpoints.up('md')} {
    width: 66px;
    height: 66px;
  }
`);
exports.Text = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  text-align: center;
  color: ${theme.palette.text.secondary};
  overflow-wrap: anywhere;
`);
//# sourceMappingURL=styles.js.map