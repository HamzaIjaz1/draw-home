"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.Container = void 0;
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const styles_1 = require("../../utils/styles");
exports.Container = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${(0, styles_1.menuRowPadding)()}
`;
exports.Text = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: ${theme.palette.text.disabled};
  overflow-wrap: anywhere;

  margin-top: 4px;
  margin-bottom: 12px;
`);
//# sourceMappingURL=styles.js.map