"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingIsles = void 0;
const material_1 = require("@mui/material");
exports.BillingIsles = (0, material_1.styled)('div') `
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @container (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;
//# sourceMappingURL=BillingIsles.js.map