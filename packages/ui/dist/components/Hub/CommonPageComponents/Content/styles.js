"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const material_1 = require("@mui/material");
exports.Container = (0, material_1.styled)('main')(({ theme }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(7.5)};
  padding: ${theme.spacing(7.5, 3)};
  min-height: 100vh;
  flex-grow: 1;
  background-color: #f8f8f8;

  ${theme.breakpoints.up('sm')} {
    padding: ${theme.spacing(8, 5)};
  }

  ${theme.breakpoints.up('md')} {
    padding: ${theme.spacing(10)};
  }
`);
//# sourceMappingURL=styles.js.map