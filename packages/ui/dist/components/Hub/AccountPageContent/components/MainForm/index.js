"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainForm = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styles_1 = require("./styles");
const Input_1 = require("../../../Form/Input");
const Icons_1 = require("../../../../Icons");
const Button_1 = require("../../../Form/Button");
const MainForm = ({ className, formFields, buttons, passwordLess, }) => ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, jsx_runtime_1.jsxs)(styles_1.FieldContainer, { children: [(0, jsx_runtime_1.jsx)(Input_1.FormInput, { startAdornment: (0, jsx_runtime_1.jsx)(Icons_1.InformationIcon, {}), text: formFields.fullName.text, disabled: true, value: formFields.fullName.value }), (0, jsx_runtime_1.jsx)(Input_1.FormInput, { startAdornment: (0, jsx_runtime_1.jsx)(Icons_1.EnvelopeIcon, {}), text: formFields.email.text, disabled: true, value: formFields.email.value })] }), (0, jsx_runtime_1.jsxs)(styles_1.ButtonsContainer, { children: [(0, jsx_runtime_1.jsx)(Button_1.FormButton, { text: buttons.changeName.text, size: 'large', onClick: buttons.changeName.handler }), passwordLess === false && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Button_1.FormButton, { text: buttons.changeEmail.text, size: 'large', onClick: buttons.changeEmail.handler }), (0, jsx_runtime_1.jsx)(Button_1.FormButton, { text: buttons.changePassword.text, size: 'large', onClick: buttons.changePassword.handler })] }))] })] }));
exports.MainForm = MainForm;
//# sourceMappingURL=index.js.map