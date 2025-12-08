"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.ArrowContainer = exports.ItemContainer = exports.Button = void 0;
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const BaseButton_1 = require("../BaseButton");
exports.Button = (0, material_1.styled)(BaseButton_1.BaseButton)(({ theme }) => (0, material_1.css) `
  align-items: flex-start;
  padding: ${theme.spacing(0.5, 0)};
  border-radius: ${theme.spacing(2)};
`);
exports.ItemContainer = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  width: 94px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing(2)};
`);
exports.ArrowContainer = (0, material_1.styled)('div') `
  width: 28px;
`;
exports.Text = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: ${theme.palette.text.secondary};
  overflow-wrap: anywhere;
`);
//# sourceMappingURL=styles.js.map