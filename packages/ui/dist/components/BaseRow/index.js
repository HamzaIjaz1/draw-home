"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const styles_1 = require("../../utils/styles");
const Container = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${(0, styles_1.menuRowPadding)()}
`;
const BaseRow = ({ className, children, }) => ((0, jsx_runtime_1.jsx)(Container, { className: className, children: children }));
exports.BaseRow = BaseRow;
//# sourceMappingURL=index.js.map