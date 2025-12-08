"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAccountForm = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const v4_1 = require("zod/v4");
const react_1 = require("react");
const styles_1 = require("./styles");
const Input_1 = require("../../../Form/Input");
const Icons_1 = require("../../../../Icons");
const DialogActions_1 = require("../../../DialogActions");
const DialogDescription_1 = require("../../../DialogDescription");
const defaultValues = {
    password: '',
};
const DeleteAccountForm = ({ formFields, buttons, commonErrorTexts, handleSubmit: handleSubmitProp, handleCancel, description, passwordLess, }) => {
    const [errors, setErrors] = (0, react_1.useState)({});
    const schema = v4_1.z.object({
        password: passwordLess === false ? v4_1.z.string().min(1, commonErrorTexts.required) : v4_1.z.string(),
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(DialogDescription_1.DialogDescription, { text: `${description.text} ${passwordLess === false ? description.text2 : ''}` }), (0, jsx_runtime_1.jsxs)("form", { className: 'Form', onSubmit: handleSubmit(onSubmit), noValidate: true, children: [passwordLess === false && ((0, jsx_runtime_1.jsx)(styles_1.FieldContainer, { children: (0, jsx_runtime_1.jsx)(Input_1.FormInputControlled, { startAdornment: (0, jsx_runtime_1.jsx)(Icons_1.LockIcon, {}), text: formFields.password.text, name: 'password', type: 'password', control: control, serverError: errors?.password }) })), (0, jsx_runtime_1.jsx)(DialogActions_1.DialogActions, { primaryActionText: buttons.confirm.text, primaryButtonType: 'submit', secondaryActionText: buttons.cancel.text, onSecondaryAction: handleCancel })] })] }));
};
exports.DeleteAccountForm = DeleteAccountForm;
//# sourceMappingURL=index.js.map