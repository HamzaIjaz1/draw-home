"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingCurrentPlanContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Box_1 = require("../../../Box");
const Button_1 = require("../../Form/Button");
const Container = (0, material_1.styled)('div') `
  flex: 1;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const ButtonsWrapper = (0, material_1.styled)('div') `
  display: flex;
  gap: 10px;
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
    font-size: 30px;
    color: #000;
  }
`;
const BillingCurrentPlanContent = ({ className, price, period, label, cancelButtonLabel, planButtonLabel, isFreePlan, stripeCancelAtPeriodEnd, handleCancelSubscription, handleChangePlan, }) => ((0, jsx_runtime_1.jsxs)(Container, { className: className, children: [isFreePlan === false && ((0, jsx_runtime_1.jsx)(Label, { children: label })), (0, jsx_runtime_1.jsxs)(Box_1.Box, { justify: 'space-between', align: 'center', marginTop: 'auto', children: [(0, jsx_runtime_1.jsxs)(Label, { children: [(0, jsx_runtime_1.jsxs)("strong", { children: ["$", price] }), '  /', period] }), (0, jsx_runtime_1.jsxs)(ButtonsWrapper, { children: [isFreePlan === false && stripeCancelAtPeriodEnd === false && ((0, jsx_runtime_1.jsx)(Button_1.FormButton, { text: cancelButtonLabel, size: 'medium', variant: 'outlined', isBilling: true, onClick: handleCancelSubscription })), isFreePlan === true && ((0, jsx_runtime_1.jsx)(Button_1.FormButton, { text: planButtonLabel, size: 'medium', variant: 'contained', isBilling: true, onClick: handleChangePlan }))] })] })] }));
exports.BillingCurrentPlanContent = BillingCurrentPlanContent;
//# sourceMappingURL=BillingCurrentPlanContent.js.map