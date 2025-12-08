"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopeText = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const identity_1 = require("../../../utils/identity");
const common_1 = require("./common");
const StyledScopeText = (0, material_1.styled)(Typography_1.default) `
  ${common_1.textStyles}
  color: #888;
  flex: 1;
`;
StyledScopeText.defaultProps = (0, identity_1.identity)({ component: 'span' });
const ScopeText = ({ className, children }) => ((0, jsx_runtime_1.jsx)(StyledScopeText, { className: className, children: children }));
exports.ScopeText = ScopeText;
//# sourceMappingURL=ScopeText.js.map