"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Size = exports.Name = exports.TextContainer = exports.Container = void 0;
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const styles_1 = require("../../utils/styles");
exports.Container = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  gap: 12px;
  padding: 12px;
  margin: 0 ${styles_1.menuHorizontalGutterWidth}px;
  min-height: 64px;
  border: 1px solid ${theme.palette.primary.main};
  border-radius: 10px;
`);
exports.TextContainer = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
`;
exports.Name = (0, material_1.styled)(Typography_1.default) `
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  max-width: 260px;
  ${styles_1.textOverflowEllipsis}
`;
exports.Size = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  text-align: left;
  color: ${theme.palette.text.disabled};
`);
//# sourceMappingURL=styles.js.map