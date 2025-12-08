"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HexRgbColorInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const color_1 = __importDefault(require("color"));
const material_1 = require("@mui/material");
const react_1 = require("react");
const ts_utils_1 = require("@arthurka/ts-utils");
const theme_1 = require("../../theme");
const TextField_1 = require("../TextField");
const HexRgbColorInputWrapper = (0, material_1.styled)('div') `
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const ModeSwitch = (0, material_1.styled)('div') `
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;
const ModeButton = (0, material_1.styled)('button') `
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font-weight: 700;
  line-height: 1;
  color: ${({ $active }) => ($active ? theme_1.theme.palette.primary.main : 'inherit')};
  opacity: ${({ $active }) => ($active ? 1 : 0.75)};
`;
const Slash = (0, material_1.styled)('span') `
  user-select: none;
  pointer-events: none;
  opacity: 0.5;
`;
const HexRgbColorInput = ({ className, value, alpha, setErrorMsg, onChange, }) => {
    const [mode, setMode] = (0, react_1.useState)('HEX');
    const [inputValue, setInputValue] = (0, react_1.useState)('');
    const formatHex = (c) => c.hex().toUpperCase();
    const formatRgb = (c) => `${c.red()}, ${c.green()}, ${c.blue()}`;
    const syncInputFromColor = (0, react_1.useCallback)((m, c) => {
        setInputValue(m === 'HEX' ? formatHex(c) : formatRgb(c));
        setErrorMsg('');
    }, [setErrorMsg]);
    (0, react_1.useEffect)(() => {
        syncInputFromColor(mode, value);
    }, [value, mode, syncInputFromColor]);
    const applyHexMasked = (raw) => {
        const cleaned = raw
            .replace(/[^#0-9a-f]/gi, '')
            .replace(/^([^#])/, '#$1')
            .slice(0, 7);
        setInputValue(cleaned);
        const hexNoHash = cleaned.replace('#', '');
        if (hexNoHash.length === 0) {
            setErrorMsg('');
            return;
        }
        if (!/^[0-9a-fA-F]*$/.test(hexNoHash)) {
            setErrorMsg('Only hex digits 0–9 and A–F are allowed.');
            return;
        }
        if (hexNoHash.length !== 6) {
            setErrorMsg('Enter exactly 6 hex digits (e.g., #a1b2c3).');
            return;
        }
        try {
            setErrorMsg('');
            onChange((0, color_1.default)(`#${hexNoHash}`).alpha(alpha));
        }
        catch (e) {
            setErrorMsg('Invalid hex color.');
        }
    };
    const applyRgbMasked = (raw) => {
        const cleaned = raw.replace(/[^0-9,\s]/g, '');
        setInputValue(cleaned);
        if (cleaned.trim().length === 0) {
            setErrorMsg('');
            return;
        }
        if (!/^[0-9,\s]*$/.test(cleaned)) {
            setErrorMsg('Only numbers, commas, and spaces are allowed.');
            return;
        }
        const match = cleaned.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/);
        if ((0, ts_utils_1.isNull)(match)) {
            setErrorMsg('Use the format: r, g, b (e.g., 12, 128, 255).');
            return;
        }
        const [r, g, b] = [match[1], match[2], match[3]].map(e => Number(e));
        const isInRange = [r, g, b].every(e => e >= 0 && e <= 255);
        if (isInRange === false) {
            setErrorMsg('Each RGB value must be between 0 and 255.');
            return;
        }
        setErrorMsg('');
        onChange((0, color_1.default)({ r, g, b }).alpha(alpha));
    };
    const onInputChange = (e) => {
        if (mode === 'HEX') {
            applyHexMasked(e);
        }
        else {
            applyRgbMasked(e);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(HexRgbColorInputWrapper, { className: className, children: [(0, jsx_runtime_1.jsxs)(ModeSwitch, { role: 'tablist', "aria-label": 'Color input mode', children: [(0, jsx_runtime_1.jsx)(ModeButton, { type: 'button', role: 'tab', "aria-selected": mode === 'HEX', "$active": mode === 'HEX', onClick: () => {
                            setMode('HEX');
                        }, children: "HEX" }), (0, jsx_runtime_1.jsx)(Slash, { children: "/" }), (0, jsx_runtime_1.jsx)(ModeButton, { type: 'button', role: 'tab', "aria-selected": mode === 'RGB', "$active": mode === 'RGB', onClick: () => {
                            setMode('RGB');
                        }, children: "RGB" })] }), (0, jsx_runtime_1.jsx)(TextField_1.TextField, { type: 'text', size: 'lg', value: inputValue, onChange: onInputChange })] }));
};
exports.HexRgbColorInput = HexRgbColorInput;
//# sourceMappingURL=index.js.map