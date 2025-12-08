"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const BaseButton_1 = require("../../BaseButton");
const StyledButton = (0, material_1.styled)(BaseButton_1.BaseButton)(({ theme, variant }) => (0, material_1.css) `
  padding: ${theme.spacing(2.5, 5)};
  border-radius: ${theme.spacing(2)};

  ${variant === 'contained' && (0, material_1.css) `
    :hover {
      background-color: ${theme.palette.secondary.main};
    }
  `}
`);
const Text = (0, material_1.styled)(Typography_1.default) `
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
`;
const TabButton = ({ className, onClick, text, state = 'default', }) => ((0, jsx_runtime_1.jsx)(StyledButton, { className: className, variant: state === 'active' ? 'contained' : 'outlined', color: 'secondary', disabled: state === 'disabled', onClick: onClick, children: (0, jsx_runtime_1.jsx)(Text, { children: text }) }));
exports.TabButton = TabButton;
//# sourceMappingURL=index.js.map