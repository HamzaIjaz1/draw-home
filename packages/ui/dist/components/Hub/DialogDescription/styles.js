"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHighlighted = exports.Text = exports.Container = void 0;
const material_1 = require("@mui/material");
exports.Container = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  margin-bottom: ${theme.spacing(4)};
  font-weight: 300;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.5px;
`);
exports.Text = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  color: ${theme.palette.general.purpleGray};
`);
exports.TextHighlighted = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  color: ${theme.palette.primary.main};
`);
//# sourceMappingURL=styles.js.map