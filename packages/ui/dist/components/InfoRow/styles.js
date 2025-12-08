"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Value = exports.Title = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
const styles_1 = require("../../utils/styles");
const BaseText = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${theme.palette.text.secondary};
`);
exports.Title = BaseText;
exports.Value = (0, material_1.styled)(BaseText) `
  width: 150px;
  text-align: right;
  ${styles_1.textOverflowEllipsis}
`;
//# sourceMappingURL=styles.js.map