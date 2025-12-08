"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const TextField_1 = require("../TextField");
const styles_1 = require("../../utils/styles");
const styles_2 = require("./styles");
const SliderRow = ({ className, label, value, onChange, max, min, step, color, }) => {
    const id = (0, react_1.useId)();
    const theme = (0, material_1.useTheme)();
    return ((0, jsx_runtime_1.jsxs)(styles_2.Stack, { className: className, children: [(0, jsx_runtime_1.jsx)(styles_2.Label, { id: id, children: label }), (0, jsx_runtime_1.jsxs)(styles_2.Row, { children: [(0, jsx_runtime_1.jsx)(styles_2.Slider, { value: value, onChange: (_, value) => (Array.isArray(value)
                            ? console.error('Unexpected slider value type. |5ls0ra|')
                            : onChange(value)), min: min, max: max, step: step, "aria-labelledby": id, style: (0, styles_1.setCssVarInline)(styles_2.sliderColorCssVar, color ?? theme.palette.secondary.main) }), (0, jsx_runtime_1.jsx)(TextField_1.Input, { id: id, type: 'number', size: 'xxs', min: min, max: max, value: String(value), onChange: e => onChange(Number(e)) })] })] }));
};
exports.SliderRow = SliderRow;
//# sourceMappingURL=index.js.map