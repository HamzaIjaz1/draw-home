"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const BaseButton_1 = require("../BaseButton");
const Icons_1 = require("../Icons");
const theme_1 = require("../../theme");
const StyledButton = (0, material_1.styled)(BaseButton_1.BaseButton) `
  width: 174px;
  height: 32px;
  padding: 4px 8px;
  border-radius: 8px;
  gap: 6px;
  background-color: ${theme_1.backgroundSecondary};

  :hover {
    background-color: ${theme_1.backgroundSecondary};
    box-shadow: 0px 1px 1px 0px #00000040;
  }
`;
const Text = (0, material_1.styled)(Typography_1.default) `
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.palette.secondary.main};
`;
const icons = {
    rotate: Icons_1.RotateIcon,
    flipHorizontal: Icons_1.FlipHorizontalIcon,
    flipVertical: Icons_1.FlipVerticalIcon,
    arrowRotateLeft: Icons_1.ArrowRotateLeftIcon,
    arrowRotateRight: Icons_1.ArrowRotateRightIcon,
};
const FieldButton = ({ className, onClick, text, icon, state = 'default', }) => {
    const theme = (0, material_1.useTheme)();
    const Icon = icons[icon];
    return ((0, jsx_runtime_1.jsxs)(StyledButton, { className: className, variant: 'text', disabled: state === 'disabled', onClick: onClick, children: [(0, jsx_runtime_1.jsx)(Text, { children: text }), (0, jsx_runtime_1.jsx)(Icon, { color: theme.palette.secondary.main })] }));
};
exports.FieldButton = FieldButton;
//# sourceMappingURL=index.js.map