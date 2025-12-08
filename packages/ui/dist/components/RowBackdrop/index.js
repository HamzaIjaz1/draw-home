"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowBackdrop = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const theme_1 = require("../../theme");
const Container = (0, material_1.styled)('div') `
  height: 44px;
  display: flex;
  width: 100%;
  align-items: center;
  background-color: ${theme_1.backgroundSecondary};
  border-radius: 10px;
  padding-right: 6px;
`;
const RowBackdrop = ({ className, children }) => ((0, jsx_runtime_1.jsx)(Container, { className: className, children: children }));
exports.RowBackdrop = RowBackdrop;
//# sourceMappingURL=index.js.map