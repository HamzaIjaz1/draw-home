"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotkeyLegend = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Container = (0, material_1.styled)('div') `
  position: relative;
  display: inline-block;
`;
const commonFrameCss = (0, material_1.css) `
  border: 1px solid #999;
  border-radius: 6px;
  background: #fff;
`;
const FrontFrame = (0, material_1.styled)('div') `
  ${commonFrameCss}
  padding: 6px 7px;
  min-width: 26px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: 1;
`;
const BackFrame = (0, material_1.styled)('div') `
  ${commonFrameCss}
  position: absolute;
  top: 5px;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
`;
const Label = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  font-size: 13px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0px;
  color: ${theme.palette.primary.main};
  user-select: none;
`);
const HotkeyLegend = ({ className, label }) => ((0, jsx_runtime_1.jsxs)(Container, { className: className, children: [(0, jsx_runtime_1.jsx)(BackFrame, {}), (0, jsx_runtime_1.jsx)(FrontFrame, { children: (0, jsx_runtime_1.jsx)(Label, { children: label }) })] }));
exports.HotkeyLegend = HotkeyLegend;
//# sourceMappingURL=HotkeyLegend.js.map