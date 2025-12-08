"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonsContainer = exports.FieldContainer = exports.Container = void 0;
const material_1 = require("@mui/material");
exports.Container = (0, material_1.styled)('div') `
  width: 100%;
`;
exports.FieldContainer = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 60px;

  ${theme.breakpoints.up('md')} {
    max-width: 410px;
  }
`);
exports.ButtonsContainer = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;

  ${theme.breakpoints.up('md')} {
    justify-content: flex-start;
  }
`);
//# sourceMappingURL=styles.js.map