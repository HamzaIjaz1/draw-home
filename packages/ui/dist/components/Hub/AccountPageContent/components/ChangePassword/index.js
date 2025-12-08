"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordForm = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const v4_1 = require("zod/v4");
const react_1 = require("react");
const styles_1 = require("./styles");
const Input_1 = require("../../../Form/Input");
const Icons_1 = require("../../../../Icons");
const DialogActions_1 = require("../../../DialogActions");
const defaultValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
};
const ChangePasswordForm = ({ formFields, buttons, handleCancel, commonErrorTexts, handleSubmit: handleSubmitProp, }) => {
    const [errors, setErrors] = (0, react_1.useState)({});
    const schema = v4_1.z.object({
        oldPassword: v4_1.z.string().min(1, commonErrorTexts.required),
        newPassword: v4_1.z.string().min(1, commonErrorTexts.required),
        newPasswordRepeat: v4_1.z.string().min(1, commonErrorTexts.required),
    }).refine(data => data.newPassword === data.newPasswordRepeat, {
        message: commonErrorTexts.passwordsMismatch,
        path: ['newPassword'],
    });
    const { control, handleSubmit } = (0, react_hook_form_1.useForm)({
        defaultValues,
        resolver: (0, zod_1.zodResolver)(schema),
    });
    const onSubmit = async (data) => {
        setErrors({});
        const errors = await handleSubmitProp(data);
        setErrors(errors);
    };
    return ((0, jsx_runtime_1.jsxs)("form", { className: 'Form', onSubmit: handleSubmit(onSubmit), noValidate: true, children: [(0, jsx_runtime_1.jsxs)(styles_1.FieldContainer, { children: [(0, jsx_runtime_1.jsx)(Input_1.FormInputControlled, { startAdornment: (0, jsx_runtime_1.jsx)(Icons_1.LockIcon, {}), text: formFields.oldPassword.text, name: 'oldPassword', control: control, serverError: errors?.oldPassword, type: 'password' }), (0, jsx_runtime_1.jsx)(Input_1.FormInputControlled, { startAdornment: (0, jsx_runtime_1.jsx)(Icons_1.LockIcon, {}), text: formFields.newPassword.text, name: 'newPassword', control: control, serverError: errors?.newPassword, type: 'password' }), (0, jsx_runtime_1.jsx)(Input_1.FormInputControlled, { startAdornment: (0, jsx_runtime_1.jsx)(Icons_1.LockIcon, {}), text: formFields.newPasswordRepeat.text, name: 'newPasswordRepeat', control: control, serverError: errors?.newPasswordRepeat, type: 'password' })] }), (0, jsx_runtime_1.jsx)(DialogActions_1.DialogActions, { primaryActionText: buttons.confirm.text, primaryButtonType: 'submit', secondaryActionText: buttons.cancel.text, onSecondaryAction: handleCancel })] }));
};
exports.ChangePasswordForm = ChangePasswordForm;
//# sourceMappingURL=index.js.map