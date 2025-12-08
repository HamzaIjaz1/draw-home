"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormInput = void 0;
exports.FormInputControlled = FormInputControlled;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const styles_1 = require("@mui/material/styles");
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const react_hook_form_1 = require("react-hook-form");
const styles_2 = require("./styles");
const Icons_1 = require("../../../Icons");
const usePrevious_1 = require("../../../../hooks/usePrevious");
const FormInput = ({ className, onFocus, onChange, onBlur, disabled = false, text, startAdornment, value: predefinedValue = '', type: predefinedType = 'text', helperText, error, multiline = false, }) => {
    const [value, setValue] = (0, react_1.useState)(predefinedValue);
    const [type, setType] = (0, react_1.useState)(predefinedType);
    const theme = (0, styles_1.useTheme)();
    const inputRef = (0, react_1.useRef)();
    const handleChange = (0, react_1.useCallback)(e => {
        if (onChange) {
            onChange(e);
        }
        setValue(e.target.value);
    }, [onChange]);
    const prevExternalValue = (0, usePrevious_1.usePrevious)(predefinedValue);
    const externalValueHasChanged = prevExternalValue !== predefinedValue;
    const localValueOutOfSync = value !== predefinedValue;
    if (externalValueHasChanged && localValueOutOfSync) {
        setValue(predefinedValue);
    }
    const endAdornment = predefinedType === 'password' ? ((0, jsx_runtime_1.jsx)(IconButton_1.default, { style: { width: 21, height: 21, padding: 0 }, onClick: () => setType(type => type === 'password' ? 'text' : 'password'), children: type === 'text'
            ? (0, jsx_runtime_1.jsx)(Icons_1.EyeIcon, { color: theme.palette.text.primary })
            : (0, jsx_runtime_1.jsx)(Icons_1.EyeClosedIcon, { color: theme.palette.text.primary }) })) : undefined;
    const InputJSX = ((0, jsx_runtime_1.jsx)(styles_2.StyledInput, { className: className, onFocus: onFocus, onChange: handleChange, onBlur: e => {
            const val = e.target.value.trim();
            setValue(val);
            if (onBlur) {
                onBlur(e);
            }
        }, disabled: disabled, inputRef: inputRef, variant: 'standard', value: value, type: type, helperText: helperText, error: error, ...multiline === true && {
            multiline: true,
            minRows: 3,
            maxRows: 7,
        }, ...multiline === false && {
            multiline: false,
            placeholder: text,
            InputProps: {
                startAdornment,
                endAdornment,
            },
        } }));
    if (multiline === false) {
        return InputJSX;
    }
    return ((0, jsx_runtime_1.jsxs)(styles_2.FormLabel, { children: [(0, jsx_runtime_1.jsxs)(styles_2.LabelHeading, { children: [startAdornment, text] }), InputJSX] }));
};
exports.FormInput = FormInput;
function FormInputControlled({ name, control, serverError, ...props }) {
    return ((0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: name, control: control, render: ({ field: { onChange, value, onBlur }, fieldState: { error }, }) => ((0, jsx_runtime_1.jsx)(exports.FormInput, { helperText: error ? error.message : serverError || null, error: !!error || serverError !== undefined, onChange: onChange, onBlur: e => {
                const val = e.target.value.trim();
                onChange(val);
                onBlur();
            }, value: value, ...props })) }));
}
//# sourceMappingURL=index.js.map