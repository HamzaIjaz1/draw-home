"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsSpaceTitle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Text = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  font-size: 17px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
  overflow-wrap: anywhere;
`);
const SettingsSpaceTitle = ({ className, children }) => ((0, jsx_runtime_1.jsx)(Text, { className: className, children: children }));
exports.SettingsSpaceTitle = SettingsSpaceTitle;
//# sourceMappingURL=SettingsSpaceTitle.js.map