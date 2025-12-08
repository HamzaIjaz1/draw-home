"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportTabGuestContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Container = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
`;
const Text = (0, material_1.styled)('span') `
  font-size: 24px;
  text-align: center;
  font-weight: 600;
`;
const ImportTabGuestContent = ({ className, text, children, }) => ((0, jsx_runtime_1.jsxs)(Container, { className: className, children: [(0, jsx_runtime_1.jsx)(Text, { children: text }), children] }));
exports.ImportTabGuestContent = ImportTabGuestContent;
//# sourceMappingURL=index.js.map