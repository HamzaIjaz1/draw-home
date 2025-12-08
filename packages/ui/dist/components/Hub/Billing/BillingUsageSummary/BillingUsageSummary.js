"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingUsageSummary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Box_1 = require("../../../Box");
const BillingUsageSummaryProgress_1 = require("./BillingUsageSummaryProgress");
const Container = (0, material_1.styled)('div') `
  flex: 1;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Label = (0, material_1.styled)('span') `
  font-weight: 400;
  font-size: 16px;
  line-height: 1;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #7a7e83;

  strong {
    all: unset;
    font-size: 18px;
    color: #000;
  }
`;
const BillingUsageSummary = ({ className, used, total, percentage, label, }) => ((0, jsx_runtime_1.jsxs)(Container, { className: className, children: [(0, jsx_runtime_1.jsxs)(Label, { children: [(0, jsx_runtime_1.jsx)("strong", { children: used }), '  ', total] }), (0, jsx_runtime_1.jsx)(BillingUsageSummaryProgress_1.BillingUsageSummaryProgress, { value: Math.min(percentage, 100) }), (0, jsx_runtime_1.jsxs)(Box_1.Box, { justify: 'space-between', children: [(0, jsx_runtime_1.jsx)(Label, { children: label }), (0, jsx_runtime_1.jsxs)(Label, { children: [percentage, "%"] })] })] }));
exports.BillingUsageSummary = BillingUsageSummary;
//# sourceMappingURL=BillingUsageSummary.js.map