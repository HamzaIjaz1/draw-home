"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllHotkeysLegend = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Box_1 = require("./Box");
const bottomPx = 150;
const paddingPx = 16;
const Container = (0, material_1.styled)('div') `
  display: inline-flex;
  align-items: flex-start;
  gap: 80px;
  overflow: auto;

  position: fixed;
  bottom: ${bottomPx}px;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 9999999999;

  max-width: 80svw;
  max-height: min(80svh, calc(100svh - ${bottomPx}px - ${2 * paddingPx}px));

  padding: ${paddingPx}px;
  border-radius: 20px;
  background: #0000000f;
  backdrop-filter: blur(10px);
`;
const Root = ({ className, children }) => ((0, jsx_runtime_1.jsx)(Container, { className: className, children: children }));
const StyledBlock = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const List = (0, material_1.styled)('ul') `
  all: unset;
  list-style: none;
  display: flex;
  flex-direction: column;
`;
const ListItem = (0, material_1.styled)('li') `
  font-weight: 400;
  font-size: 19px;
  line-height: 1.7;
  letter-spacing: 0px;
  white-space: nowrap;
`;
const TitleWithIcon = (0, material_1.styled)('span') `
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;
const Title = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  font-weight: 500;
  font-size: 17px;
  line-height: 1.5;
  letter-spacing: 0px;
  white-space: nowrap;
  color: ${theme.palette.text.secondary};
`);
const Block = ({ className, title, icon, lines }) => ((0, jsx_runtime_1.jsxs)(StyledBlock, { className: className, children: [(0, jsx_runtime_1.jsxs)(TitleWithIcon, { children: [icon, (0, jsx_runtime_1.jsx)(Title, { children: title })] }), (0, jsx_runtime_1.jsx)(List, { children: lines.map(e => (0, jsx_runtime_1.jsx)(ListItem, { children: e }, e)) })] }));
const Combine = ({ className, children }) => ((0, jsx_runtime_1.jsx)(Box_1.Box, { className: className, column: true, gap: 20, children: children }));
exports.AllHotkeysLegend = {
    Root,
    Block,
    Combine,
};
//# sourceMappingURL=AllHotkeysLegend.js.map