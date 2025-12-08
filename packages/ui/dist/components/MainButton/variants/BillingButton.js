"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingButton = exports.billingButtonCurrentPlanDefaultBackgroundColor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Typography_1 = require("@mui/material/Typography");
const __1 = require("..");
exports.billingButtonCurrentPlanDefaultBackgroundColor = '#fd563133';
const Button = (0, material_1.styled)(__1.MainButton) `
  .${Typography_1.typographyClasses.root} {
    font-family: DM Sans;
    font-weight: 600;
    font-size: 17px;
    line-height: 1;
    letter-spacing: 0px;
    vertical-align: middle;
  }
`;
const BillingButton = (props) => ((0, jsx_runtime_1.jsx)(Button, { ...props }));
exports.BillingButton = BillingButton;
//# sourceMappingURL=BillingButton.js.map