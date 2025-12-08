"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMenuWrapper = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Container = (0, material_1.styled)('div') `
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  height: 100vh;
  margin: 0 auto;
  z-index: 9999999999;
`;
const InitialMenuWrapper = ({ className, children, }) => ((0, jsx_runtime_1.jsx)(Container, { className: className, children: children }));
exports.InitialMenuWrapper = InitialMenuWrapper;
//# sourceMappingURL=index.js.map