"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.Container = void 0;
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
exports.Container = (0, material_1.styled)('div') `
  padding: 2px;
  cursor: pointer;
  overflow-wrap: anywhere;
`;
exports.Text = (0, material_1.styled)(Typography_1.default) `
  width: 80px;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  text-align: center;
  white-space: normal;
`;
//# sourceMappingURL=styles.js.map