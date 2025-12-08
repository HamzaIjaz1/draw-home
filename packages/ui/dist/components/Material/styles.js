"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.Image = exports.Button = exports.ButtonWrap = exports.Container = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
const styles_1 = require("../../utils/styles");
const theme_1 = require("../../theme");
const BaseButton_1 = require("../BaseButton");
exports.Container = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  ${(0, styles_1.menuRowPadding)()}
`;
exports.ButtonWrap = (0, material_1.styled)('div') `
  display: flex;
  align-items: center;
  gap: 10px;
`;
exports.Button = (0, material_1.styled)(BaseButton_1.BaseButton) `
  display: flex;
  gap: 6px;
  padding: 2px;
  border-radius: 6px;
`;
exports.Image = (0, material_1.styled)('img')(({ theme }) => (0, material_1.css) `
  min-width: 80px;
  max-width: 80px;
  height: 28px;
  border-radius: 6px;
  object-fit: cover;
  border: 1px solid ${theme.palette.text.disabled};
`);
const TextOptions = {
    shouldForwardProp: e => !['disabled'].includes(e),
};
exports.Text = (0, material_1.styled)(Typography_1.default, TextOptions)(({ theme, disabled }) => (0, material_1.css) `
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${disabled === true ? theme_1.menuRowDisabled : theme.palette.text.secondary};
`);
//# sourceMappingURL=styles.js.map