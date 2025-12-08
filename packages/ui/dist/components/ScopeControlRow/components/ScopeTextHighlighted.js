"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopeTextHighlighted = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const common_1 = require("./common");
const identity_1 = require("../../../utils/identity");
const StyledScopeTextHighlighted = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  ${common_1.textStyles}
  font-style: normal;
  color: ${theme.palette.primary.main};
`);
StyledScopeTextHighlighted.defaultProps = (0, identity_1.identity)({ component: 'em' });
const ScopeTextHighlighted = ({ className, children }) => ((0, jsx_runtime_1.jsx)(StyledScopeTextHighlighted, { className: className, children: children }));
exports.ScopeTextHighlighted = ScopeTextHighlighted;
//# sourceMappingURL=ScopeTextHighlighted.js.map