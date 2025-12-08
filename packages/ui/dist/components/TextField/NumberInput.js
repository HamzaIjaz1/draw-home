"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("@draw-house/common/dist/utils");
const react_1 = require("react");
const ts_utils_1 = require("@arthurka/ts-utils");
const usePrevious_1 = require("../../hooks/usePrevious");
const styles_1 = require("./styles");
const keepFirstOnly = (str, substring) => {
    const parts = str.split(substring);
    if (parts.length > 1) {
        return `${parts[0]}${substring}${parts.slice(1).join('')}`;
    }
    return str;
};
const minus = '-';
const dot = '.';
const countMinus = (str) => (str.split(minus).length - 1);
const filterAllowed = (alphabet) => (value) => {
    const regex = new RegExp(`[${alphabet}]`, 'g');
    return (value.match(regex) ?? []).join('');
};
const handleMinusSign = (value) => {
    const minusCount = countMinus(value);
    const signPrefix = minusCount % 2 === 0 ? '' : minus;
    const minuslessValue = value.replace(new RegExp(minus, 'g'), '');
    const signedValue = `${signPrefix}${minuslessValue}`;
    return signedValue;
};
const handleCursor = ({ originalValue, finalValue, inputRef, selectionStart, }) => {
    if (originalValue === finalValue) {
        return;
    }
    requestAnimationFrame(() => {
        if ((0, ts_utils_1.isNull)(inputRef.current) || (0, ts_utils_1.isNull)(selectionStart)) {
            return;
        }
        const delta = originalValue.length - finalValue.length;
        const pos = Math.max(0, selectionStart - delta);
        inputRef.current.setSelectionRange(pos, pos);
    });
};
const NumberInput = ({ className, value: externalValue, onChange, adornment, size, id, name, min, max, allowNegative = false, variant = 'dark', disabled = false, }) => {
    const inputRef = (0, react_1.useRef)(null);
    const [localValue, setLocalValue] = (0, react_1.useState)(externalValue);
    const prevValue = (0, usePrevious_1.usePrevious)(externalValue);
    const valueHasChanged = prevValue !== externalValue;
    const synced = externalValue === localValue;
    if (synced === false && valueHasChanged === true) {
        setLocalValue(externalValue);
    }
    const defaultValue = (0, ts_utils_1.isUndefined)(min) ? 0 : min;
    return ((0, jsx_runtime_1.jsx)(styles_1.StyledInput, { id: id, name: name, className: className, inputRef: inputRef, _size: size, _variant: variant, value: localValue, disabled: disabled, onChange: ({ target: { value: originalValue, selectionStart } }) => {
            const alphabet = [
                '0123456789',
                dot,
                ...allowNegative === true ? [minus] : [],
            ].join('');
            const transform = (0, utils_1.pipe)(filterAllowed(alphabet), handleMinusSign, value => keepFirstOnly(value, dot));
            const finalValue = transform(originalValue);
            handleCursor({
                originalValue,
                finalValue,
                inputRef,
                selectionStart,
            });
            setLocalValue(finalValue);
        }, onBlur: ({ target: { value } }) => {
            const transform = (0, utils_1.pipe)(Number, num => Number.isFinite(num) ? num : defaultValue, num => (0, utils_1.clamp)(min ?? Number.MIN_SAFE_INTEGER, num, max ?? Number.MAX_SAFE_INTEGER));
            const result = transform(value);
            setLocalValue(externalValue);
            onChange(String(result));
        }, endAdornment: adornment, disableUnderline: true, autoComplete: 'off' }));
};
exports.NumberInput = NumberInput;
//# sourceMappingURL=NumberInput.js.map