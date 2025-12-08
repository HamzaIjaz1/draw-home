"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingUsageSummaryProgress = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const LinearProgress_1 = __importStar(require("@mui/material/LinearProgress"));
const ProgressBar = (0, material_1.styled)(LinearProgress_1.default)(`
  height: 8px;
  border-radius: 100px;

  &.${LinearProgress_1.linearProgressClasses.colorPrimary} {
    background-color: #fafafa;
  }

  & .${LinearProgress_1.linearProgressClasses.bar} {
    background-color: #ff5b4a80;
  }
`);
const BillingUsageSummaryProgress = ({ className, value }) => ((0, jsx_runtime_1.jsx)(ProgressBar, { className: className, variant: 'determinate', value: value }));
exports.BillingUsageSummaryProgress = BillingUsageSummaryProgress;
//# sourceMappingURL=BillingUsageSummaryProgress.js.map