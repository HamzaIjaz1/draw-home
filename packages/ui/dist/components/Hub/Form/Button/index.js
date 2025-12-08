"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styles_1 = require("./styles");
const sizeToPx = {
    small: 130,
    medium: 160,
    large: 185,
    extraLarge: 200,
};
const FormButton = ({ className, onClick, text, disabled = false, size, variant = 'outlined', type, startIcon, isBilling = false, }) => ((0, jsx_runtime_1.jsx)(styles_1.StyledButton, { className: className, variant: variant, onClick: onClick, disabled: disabled, style: isBilling === true ? { width: sizeToPx[size], height: 40 } : { width: sizeToPx[size] }, type: type, startIcon: startIcon, children: text }));
exports.FormButton = FormButton;
//# sourceMappingURL=index.js.map