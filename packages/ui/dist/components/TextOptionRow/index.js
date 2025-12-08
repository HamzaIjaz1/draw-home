"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextOptionRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const BaseButton_1 = require("../BaseButton");
const styles_1 = require("./styles");
const TextOptionRow = ({ className, label, value, disabled = false, onClick, }) => {
    const theme = (0, material_1.useTheme)();
    const iconColor = disabled === true
        ? theme.palette.text.disabled
        : theme.palette.secondary.main;
    return ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, jsx_runtime_1.jsx)(styles_1.Label, { disabled: disabled, children: label }), (0, jsx_runtime_1.jsx)(BaseButton_1.BaseButton, { onClick: onClick, endIcon: (0, jsx_runtime_1.jsx)(styles_1.RightArrowIcon, { color: iconColor }), disabled: disabled, children: (0, jsx_runtime_1.jsx)(styles_1.Value, { disabled: disabled, children: value }) })] }));
};
exports.TextOptionRow = TextOptionRow;
//# sourceMappingURL=index.js.map