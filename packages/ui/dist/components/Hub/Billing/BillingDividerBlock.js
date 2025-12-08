"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingDividerBlock = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Divider_1 = require("../../Divider");
const Container = (0, material_1.styled)('div') `
  padding: 12px 0 16px;
`;
const BillingDividerBlock = ({ className }) => ((0, jsx_runtime_1.jsx)(Container, { className: className, children: (0, jsx_runtime_1.jsx)(Divider_1.Divider, { fullWidth: true }) }));
exports.BillingDividerBlock = BillingDividerBlock;
//# sourceMappingURL=BillingDividerBlock.js.map