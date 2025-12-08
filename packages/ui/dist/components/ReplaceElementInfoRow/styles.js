"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightedText = exports.Text = exports.Image = exports.Container = void 0;
const material_1 = require("@mui/material");
exports.Container = (0, material_1.styled)('div') `
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  column-gap: 10px;
`;
exports.Image = (0, material_1.styled)('img') `
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
exports.Text = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  font-weight: 400;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.primary};
  overflow-wrap: anywhere;
`);
exports.HighlightedText = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  max-width: 100px;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.primary.main};
  overflow-wrap: anywhere;
`);
//# sourceMappingURL=styles.js.map