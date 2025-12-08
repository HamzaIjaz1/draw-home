"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooltipButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const material_1 = require("@mui/material");
const Button = (0, material_1.styled)(IconButton_1.default) `
  padding: 4px;

  svg {
    width: 20px;
    height: 20px;
  }
`;
const TooltipButton = ({ className, children, onClick }) => ((0, jsx_runtime_1.jsx)(Button, { className: className, onClick: onClick, children: children }));
exports.TooltipButton = TooltipButton;
//# sourceMappingURL=TooltipButton.js.map