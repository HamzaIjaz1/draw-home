"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = __importDefault(require("@mui/material/Button"));
const material_1 = require("@mui/material");
const react_1 = require("react");
const StyledButton = (0, material_1.styled)(Button_1.default)(({ theme, variant }) => (0, material_1.css) `
  min-width: unset;
  text-transform: none;

  ${variant === 'contained' && (0, material_1.css) `
    :hover {
      background-color: ${theme.palette.action.hover};
    }
  `}
`);
exports.BaseButton = (0, react_1.forwardRef)(({ className, children, ...props }, ref) => ((0, jsx_runtime_1.jsx)(StyledButton, { className: className, ref: ref, ...props, children: children })));
//# sourceMappingURL=index.js.map