"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogActions = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ts_utils_1 = require("@arthurka/ts-utils");
const MainButton_1 = require("../MainButton");
const styles_1 = require("./styles");
const DialogActions = ({ className, primaryActionText, onPrimaryAction, primaryActionState, secondaryActionText, onSecondaryAction, secondaryActionDisabled = false, paddingHorizontal = false, }) => {
    const onlyPrimary = (0, ts_utils_1.isUndefined)(secondaryActionText) || (0, ts_utils_1.isUndefined)(onSecondaryAction);
    return ((0, jsx_runtime_1.jsxs)(styles_1.Actions, { className: className, onlyPrimary: onlyPrimary, paddingHorizontal: paddingHorizontal, children: [onlyPrimary === true ? null : ((0, jsx_runtime_1.jsx)(MainButton_1.MainButton, { text: secondaryActionText, onClick: onSecondaryAction, state: secondaryActionDisabled === true ? 'disabled' : 'default', variant: 'text', width: 'md', height: 'md', padding: 'sm' })), (0, jsx_runtime_1.jsx)(MainButton_1.MainButton, { text: primaryActionText, onClick: onPrimaryAction, state: primaryActionState, variant: 'contained', width: onlyPrimary === true ? 'xl' : 'md', height: 'md', padding: 'sm' })] }));
};
exports.DialogActions = DialogActions;
//# sourceMappingURL=index.js.map