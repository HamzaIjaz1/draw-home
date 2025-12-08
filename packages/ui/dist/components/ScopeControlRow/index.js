"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopeControlRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const styles_1 = require("../../utils/styles");
const Icons_1 = require("../Icons");
const Container = (0, material_1.styled)('div') `
  display: flex;
  align-items: center;
  gap: 4px;
  ${(0, styles_1.menuRowPadding)()}
`;
const InformationFilledIcon = (0, material_1.styled)(Icons_1.InformationFilledIcon) `
  color: #fbc53c;
`;
const ScopeControlRow = ({ className, children, }) => ((0, jsx_runtime_1.jsxs)(Container, { className: className, children: [(0, jsx_runtime_1.jsx)(InformationFilledIcon, {}), children] }));
exports.ScopeControlRow = ScopeControlRow;
//# sourceMappingURL=index.js.map