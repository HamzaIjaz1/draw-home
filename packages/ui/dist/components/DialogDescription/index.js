"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogDescription = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Text = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  color: ${theme.palette.text.disabled};
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: center;
  margin-bottom: 16px;
  overflow-wrap: anywhere;
`);
const DialogDescription = ({ className, text, }) => ((0, jsx_runtime_1.jsx)(Text, { className: className, children: text }));
exports.DialogDescription = DialogDescription;
//# sourceMappingURL=index.js.map