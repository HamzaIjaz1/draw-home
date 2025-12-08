"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooltipDescription = void 0;
const material_1 = require("@mui/material");
exports.TooltipDescription = (0, material_1.styled)('p')(({ theme }) => (0, material_1.css) `
  all: unset;

  font-weight: 500;
  font-size: 10px;
  line-height: 1;
  letter-spacing: 0px;
  color: #fffc;

  ${theme.breakpoints.up('md')} {
    font-size: 12px;
  }
`);
//# sourceMappingURL=TooltipDescription.js.map