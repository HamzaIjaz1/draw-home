"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportPageContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const v4_1 = require("zod/v4");
const CommonPageComponents_1 = require("../CommonPageComponents");
const Icons_1 = require("../../Icons");
const LogInSuggestion_1 = require("../LogInSuggestion");
const styles_1 = require("./styles");
const defaultValues = {
    subject: '',
    request: '',
};
const SupportPageContent = ({ className, mainSectionTitle, requiredErrorText, subjectFieldLabel, requestFieldLabel, submitButtonText, onSubmit, isGuestUser, logInButtonText, logInSuggestionText, onLoginButtonClick, }) => {
    const theme = (0, material_1.useTheme)();
    const resolver = (0, react_1.useMemo)(() => {
        const schema = v4_1.z.object({
            subject: v4_1.z.string().min(1, requiredErrorText),
            request: v4_1.z.string().min(1, requiredErrorText),
        });
        return (0, zod_1.zodResolver)(schema);
    }, [requiredErrorText]);
    const { control, handleSubmit, reset } = (0, react_hook_form_1.useForm)({
        defaultValues,
        resolver,
    });
    const iconColor = theme.palette.common.black;
    return ((0, jsx_runtime_1.jsx)(CommonPageComponents_1.TitledIsle, { className: className, type: 'always-static', title: mainSectionTitle, children: isGuestUser === true ? ((0, jsx_runtime_1.jsx)(LogInSuggestion_1.LogInSuggestion, { text: logInSuggestionText, buttonText: logInButtonText, onClick: onLoginButtonClick })) : ((0, jsx_runtime_1.jsxs)(styles_1.Form, { onSubmit: handleSubmit(data => onSubmit(data, reset)), children: [(0, jsx_runtime_1.jsx)(styles_1.FormInputControlled, { type: 'text', text: subjectFieldLabel, name: 'subject', startAdornment: (0, jsx_runtime_1.jsx)(Icons_1.InformationIcon, { color: iconColor }), control: control }), (0, jsx_runtime_1.jsx)(styles_1.FormInputControlled, { type: 'text', multiline: true, text: requestFieldLabel, name: 'request', startAdornment: (0, jsx_runtime_1.jsx)(styles_1.PencilIcon, { color: iconColor }), control: control }), (0, jsx_runtime_1.jsx)(styles_1.FormButton, { type: 'submit', variant: 'contained', size: 'small', text: submitButtonText, startIcon: (0, jsx_runtime_1.jsx)(Icons_1.PaperPlaneIcon, {}) })] })) }));
};
exports.SupportPageContent = SupportPageContent;
//# sourceMappingURL=index.js.map