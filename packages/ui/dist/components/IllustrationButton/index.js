"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IllustrationButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Icons_1 = require("../Icons");
const styles_1 = require("./styles");
const IllustrationButton = ({ className, state, generalLabel, uniqueLabel, onClick, }) => {
    const theme = (0, material_1.useTheme)();
    const arrows = {
        general: Icons_1.ArrowArchingRightIcon,
        unique: Icons_1.ArrowArchingLeftIcon,
    };
    const ArrowIcon = arrows[state];
    const activeColor = theme.palette.primary.main;
    const inactiveColor = theme.palette.action.disabled;
    const colors = {
        general: state === 'general' ? activeColor : inactiveColor,
        unique: state === 'unique' ? activeColor : inactiveColor,
    };
    return ((0, jsx_runtime_1.jsxs)(styles_1.Button, { className: className, variant: 'text', onClick: onClick, children: [(0, jsx_runtime_1.jsxs)(styles_1.ItemContainer, { children: [(0, jsx_runtime_1.jsx)(Icons_1.GeneralItemIcon, { color: colors.general }), (0, jsx_runtime_1.jsx)(styles_1.Text, { children: generalLabel })] }), (0, jsx_runtime_1.jsx)(styles_1.ArrowContainer, { children: (0, jsx_runtime_1.jsx)(ArrowIcon, {}) }), (0, jsx_runtime_1.jsxs)(styles_1.ItemContainer, { children: [(0, jsx_runtime_1.jsx)(Icons_1.UniqueItemIcon, { color: colors.unique }), (0, jsx_runtime_1.jsx)(styles_1.Text, { children: uniqueLabel })] })] }));
};
exports.IllustrationButton = IllustrationButton;
//# sourceMappingURL=index.js.map