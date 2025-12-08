"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const styles_1 = require("./styles");
const Icons_1 = require("../Icons");
const icons = {
    replace: Icons_1.ReplaceIcon,
    railings: Icons_1.RailingsIcon,
};
const ButtonRow = ({ className, label, disabled = false, onClick, startIcon, }) => {
    const theme = (0, material_1.useTheme)();
    const StartIcon = icons[startIcon];
    const startIconColor = disabled === true
        ? theme.palette.text.disabled
        : theme.palette.primary.main;
    const endIconColor = disabled === true
        ? theme.palette.text.disabled
        : theme.palette.secondary.main;
    return ((0, jsx_runtime_1.jsx)(styles_1.StyledBaseButton, { className: className, onClick: onClick, startIcon: (0, jsx_runtime_1.jsx)(StartIcon, { color: startIconColor }), endIcon: (0, jsx_runtime_1.jsx)(styles_1.RightArrowIcon, { color: endIconColor }), disabled: disabled, children: (0, jsx_runtime_1.jsx)(styles_1.Label, { disabled: disabled, children: label }) }));
};
exports.ButtonRow = ButtonRow;
//# sourceMappingURL=index.js.map