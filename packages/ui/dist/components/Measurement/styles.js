"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.Container = void 0;
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const MenuFrame_1 = require("../MenuFrame");
exports.Container = (0, material_1.styled)(MenuFrame_1.MenuFrame)(() => (0, material_1.css) `
  padding: 1px 3px;
  border-radius: 100px;
  box-shadow: none;
  background: none;
`);
exports.Text = (0, material_1.styled)(Typography_1.default) `
  font-size: 10px;
  font-weight: 400;
  line-height: 10px;
  text-align: center;
  white-space: nowrap;
  color: #a0a0a0;
`;
//# sourceMappingURL=styles.js.map