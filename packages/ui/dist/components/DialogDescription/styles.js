"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
exports.Text = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  color: ${theme.palette.text.disabled};
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: center;
  margin-bottom: 16px;
`);
//# sourceMappingURL=styles.js.map