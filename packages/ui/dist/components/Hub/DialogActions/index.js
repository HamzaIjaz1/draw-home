"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogActions = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ts_utils_1 = require("@arthurka/ts-utils");
const Button_1 = require("../Form/Button");
const styles_1 = require("./styles");
const DialogActions = ({ className, primaryActionText, onPrimaryAction, primaryButtonType, secondaryActionText, onSecondaryAction, secondaryActionDisabled = false, }) => {
    const onlyPrimary = (0, ts_utils_1.isUndefined)(secondaryActionText) || (0, ts_utils_1.isUndefined)(onSecondaryAction);
    return ((0, jsx_runtime_1.jsxs)(styles_1.Actions, { className: className, onlyPrimary: onlyPrimary, children: [primaryButtonType === 'submit' ? ((0, jsx_runtime_1.jsx)(Button_1.FormButton, { text: primaryActionText, size: 'medium', variant: 'contained', type: 'submit', onClick: onPrimaryAction })) : ((0, jsx_runtime_1.jsx)(Button_1.FormButton, { text: primaryActionText, size: 'medium', variant: 'contained', type: primaryButtonType ?? 'button', onClick: onPrimaryAction })), onlyPrimary ? null : ((0, jsx_runtime_1.jsx)(Button_1.FormButton, { text: secondaryActionText, size: 'medium', variant: 'outlined', onClick: onSecondaryAction, disabled: secondaryActionDisabled }))] }));
};
exports.DialogActions = DialogActions;
//# sourceMappingURL=index.js.map