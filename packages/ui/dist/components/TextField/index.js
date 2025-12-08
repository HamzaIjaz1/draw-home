"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextField = exports.Input = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ts_utils_1 = require("@arthurka/ts-utils");
const react_1 = require("react");
const NumberInput_1 = require("./NumberInput");
const styles_1 = require("./styles");
const Input = ({ className, type, value, onChange, adornment, size, id, name, min, max, allowNegative, variant, disabled = false, }) => {
    switch (type) {
        case 'text': return ((0, jsx_runtime_1.jsx)(styles_1.StyledInput, { id: id, name: name, className: className, _size: size, _variant: 'dark', value: value, onChange: event => onChange(event.target.value), endAdornment: (0, ts_utils_1.isUndefined)(adornment)
                ? undefined
                : (0, jsx_runtime_1.jsx)(styles_1.InputAdornment, { inputVariant: 'dark', position: 'end', children: adornment }), disableUnderline: true, autoComplete: 'off', disabled: disabled }));
        case 'number': {
            const _variant = variant ?? 'dark';
            return ((0, jsx_runtime_1.jsx)(NumberInput_1.NumberInput, { className: className, id: id, name: name, size: size, value: value, onChange: onChange, min: min, max: max, allowNegative: allowNegative, variant: _variant, adornment: (0, ts_utils_1.isUndefined)(adornment)
                    ? undefined
                    : (0, jsx_runtime_1.jsx)(styles_1.InputAdornment, { inputVariant: _variant, position: 'end', children: adornment }), disabled: disabled }));
        }
        default:
            ((e) => e)(type);
            throw new Error('This should never happen. |1o9jgm|');
    }
};
exports.Input = Input;
const TextField = ({ className, label, ...rest }) => {
    const id = (0, react_1.useId)();
    return ((0, jsx_runtime_1.jsxs)(styles_1.FormControl, { className: className, variant: 'filled', labeled: !(0, ts_utils_1.isUndefined)(label), children: [(0, ts_utils_1.isUndefined)(label) ? null : ((0, jsx_runtime_1.jsx)(styles_1.Label, { htmlFor: id, children: label })), (0, jsx_runtime_1.jsx)(exports.Input, { ...rest, id: id })] }));
};
exports.TextField = TextField;
//# sourceMappingURL=index.js.map