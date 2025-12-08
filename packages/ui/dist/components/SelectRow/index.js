"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Select_1 = require("../Select");
const styles_1 = require("./styles");
const SelectRow = ({ className, label, value, options, onChange, }) => {
    const labelId = (0, react_1.useId)();
    return ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, jsx_runtime_1.jsx)(styles_1.InputLabel, { htmlFor: labelId, children: label }), (0, jsx_runtime_1.jsx)(Select_1.Select, { id: labelId, value: value, options: options, onChange: onChange })] }));
};
exports.SelectRow = SelectRow;
//# sourceMappingURL=index.js.map