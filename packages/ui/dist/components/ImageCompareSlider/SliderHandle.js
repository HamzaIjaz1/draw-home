"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderHandle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Container = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  pointer-events: none;
  cursor: ew-resize;
`;
const Separator = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  width: 2px;
  height: 100%;
  background-color: ${theme.palette.primary.main};
  pointer-events: auto;
`);
const Handle = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;
  background-color: ${theme.palette.primary.main};
  border-radius: 50%;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  pointer-events: auto;
`);
const ArrowIcon = () => ((0, jsx_runtime_1.jsx)("svg", { width: '20', height: '8', viewBox: '0 0 20 8', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', children: (0, jsx_runtime_1.jsx)("path", { d: 'M16.03 5.03H3.97v2.91L0 3.97 3.97 0v2.912h12.06V0L20 3.97l-3.97 3.972V5.029Z', fill: '#fff' }) }));
const SliderHandle = ({ className }) => ((0, jsx_runtime_1.jsxs)(Container, { className: className, children: [(0, jsx_runtime_1.jsx)(Separator, {}), (0, jsx_runtime_1.jsx)(Handle, { children: (0, jsx_runtime_1.jsx)(ArrowIcon, {}) })] }));
exports.SliderHandle = SliderHandle;
//# sourceMappingURL=SliderHandle.js.map