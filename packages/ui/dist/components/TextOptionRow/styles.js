"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightArrowIcon = exports.Value = exports.Label = exports.Container = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
const styles_1 = require("../../utils/styles");
const Icons_1 = require("../Icons");
const theme_1 = require("../../theme");
exports.Container = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8px;
  ${(0, styles_1.menuRowPadding)()}
`;
const TextOptions = {
    shouldForwardProp: e => !['disabled'].includes(e),
};
const BaseText = (0, material_1.styled)(Typography_1.default, TextOptions)(({ theme, disabled }) => (0, material_1.css) `
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${disabled === true ? theme_1.menuRowDisabled : theme.palette.text.secondary};
`);
exports.Label = BaseText;
exports.Value = (0, material_1.styled)(BaseText) `
  max-width: 160px;
  text-align: right;
  ${styles_1.textOverflowEllipsis}
`;
exports.RightArrowIcon = (0, material_1.styled)(Icons_1.DownArrowIcon) `
  transform: rotate(-90deg);
`;
//# sourceMappingURL=styles.js.map