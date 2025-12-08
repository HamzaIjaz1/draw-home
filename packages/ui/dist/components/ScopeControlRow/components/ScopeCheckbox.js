"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopeCheckbox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Checkbox_1 = require("../../Checkbox");
const styles_1 = require("../../../utils/styles");
const common_1 = require("./common");
const StyledCheckbox = (0, material_1.styled)(Checkbox_1.Checkbox)(({ theme }) => (0, material_1.css) `
  ${(0, styles_1.setCssVar)(Checkbox_1.CheckboxCssVars.checkboxSize, '12px')}
  ${(0, styles_1.setCssVar)(Checkbox_1.CheckboxCssVars.checkboxPadding, '6px')}
  ${common_1.textStyles}
  color: ${theme.palette.primary.main};
  max-width: 100px;
`);
const ScopeCheckbox = ({ className, checked, text, onClick, }) => ((0, jsx_runtime_1.jsx)(StyledCheckbox, { className: className, checked: checked, text: text, onClick: onClick }));
exports.ScopeCheckbox = ScopeCheckbox;
//# sourceMappingURL=ScopeCheckbox.js.map