"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationButtonRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const BaseButton_1 = require("../BaseButton");
const Icons_1 = require("../Icons");
const styles_1 = require("./styles");
const icons = {
    background: Icons_1.BackgroundLocationIcon,
    foreground: Icons_1.ForegroundLocationIcon,
};
const transitions = {
    background: 'foreground',
    foreground: 'background',
};
const LocationButtonRow = ({ className, label, value, onChange, }) => {
    const id = (0, react_1.useId)();
    const Icon = icons[value];
    return ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, jsx_runtime_1.jsx)(styles_1.Label, { id: id, children: label }), (0, jsx_runtime_1.jsx)(BaseButton_1.BaseButton, { onClick: () => onChange(transitions[value]), children: (0, jsx_runtime_1.jsx)(Icon, {}) })] }));
};
exports.LocationButtonRow = LocationButtonRow;
//# sourceMappingURL=index.js.map