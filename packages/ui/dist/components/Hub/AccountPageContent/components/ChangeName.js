"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeNameForm = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const v4_1 = require("zod/v4");
const react_1 = require("react");
const material_1 = require("@mui/material");
const Input_1 = require("../../Form/Input");
const DialogActions_1 = require("../../DialogActions");
const FieldContainer = (0, material_1.styled)('div') `
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 60px;
`;
const defaultValues = {
    name: '',
};
const ChangeNameForm = ({ formFields, buttons, handleCancel, commonErrorTexts, handleSubmit: handleSubmitProp, }) => {
    const [errors, setErrors] = (0, react_1.useState)({});
    const schema = v4_1.z.object({
        name: v4_1.z.string().min(1, commonErrorTexts.required),
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
    return ((0, jsx_runtime_1.jsxs)("form", { className: 'Form', onSubmit: handleSubmit(onSubmit), noValidate: true, children: [(0, jsx_runtime_1.jsx)(FieldContainer, { children: (0, jsx_runtime_1.jsx)(Input_1.FormInputControlled, { text: formFields.name.text, name: 'name', control: control, serverError: errors?.name }) }), (0, jsx_runtime_1.jsx)(DialogActions_1.DialogActions, { primaryActionText: buttons.confirm.text, primaryButtonType: 'submit', secondaryActionText: buttons.cancel.text, onSecondaryAction: handleCancel })] }));
};
exports.ChangeNameForm = ChangeNameForm;
//# sourceMappingURL=ChangeName.js.map