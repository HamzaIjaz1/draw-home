"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = exports.Container = void 0;
const material_1 = require("@mui/material");
exports.Container = (0, material_1.styled)('div') `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
`;
exports.Label = (0, material_1.styled)('label')(({ theme }) => (0, material_1.css) `
  font-weight: 400;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
  overflow-wrap: anywhere;
`);
//# sourceMappingURL=styles.js.map