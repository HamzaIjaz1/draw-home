"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooltipTitle = void 0;
const material_1 = require("@mui/material");
exports.TooltipTitle = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0px;
  color: #fff;
  white-space: nowrap;

  ${theme.breakpoints.up('md')} {
    font-size: 14px;
  }
`);
//# sourceMappingURL=TooltipTitle.js.map