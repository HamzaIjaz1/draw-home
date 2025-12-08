"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputLabel = exports.Container = void 0;
const material_1 = require("@mui/material");
const InputLabel_1 = __importDefault(require("@mui/material/InputLabel"));
const styles_1 = require("../../utils/styles");
exports.Container = (0, material_1.styled)('div') `
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${(0, styles_1.menuRowPadding)()}
`;
exports.InputLabel = (0, material_1.styled)(InputLabel_1.default)(({ theme }) => (0, material_1.css) `
  flex: 1;
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${theme.palette.text.secondary};
  cursor: pointer;
`);
//# sourceMappingURL=styles.js.map