"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload2DAssetsMenuContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const styles_1 = require("../../utils/styles");
const Container = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
`;
const Description = (0, material_1.styled)('p')(({ theme }) => (0, material_1.css) `
  all: unset;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0px;
  color: ${theme.palette.text.disabled};
  ${(0, styles_1.menuRowHorizontalPadding)()}
`);
const Title = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  margin: 15px 0 10px;
  font-weight: 500;
  font-size: 17px;
  line-height: 1;
  letter-spacing: 0px;
  color: ${theme.palette.text.primary};
  ${(0, styles_1.menuRowHorizontalPadding)()}
`);
const Upload2DAssetsMenuContent = ({ className, description, title, children, }) => ((0, jsx_runtime_1.jsxs)(Container, { className: className, children: [(0, jsx_runtime_1.jsx)(Description, { children: description }), (0, jsx_runtime_1.jsx)(Title, { children: title }), children] }));
exports.Upload2DAssetsMenuContent = Upload2DAssetsMenuContent;
//# sourceMappingURL=index.js.map