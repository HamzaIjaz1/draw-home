"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldContainer = void 0;
const material_1 = require("@mui/material");
exports.FieldContainer = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(7.5)};
  margin-bottom: ${theme.spacing(15)};
`);
//# sourceMappingURL=styles.js.map