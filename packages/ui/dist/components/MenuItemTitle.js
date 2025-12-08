"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemTitle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Text = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  font-weight: 400;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
`);
const MenuItemTitle = ({ className, children }) => ((0, jsx_runtime_1.jsx)(Text, { className: className, children: children }));
exports.MenuItemTitle = MenuItemTitle;
//# sourceMappingURL=MenuItemTitle.js.map