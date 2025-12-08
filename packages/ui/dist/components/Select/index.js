"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = Select;
const jsx_runtime_1 = require("react/jsx-runtime");
const styles_1 = require("./styles");
function Select({ className, id, value, options, onChange, }) {
    return ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, jsx_runtime_1.jsx)(styles_1.DropdownSelect, { className: className, id: id, value: value, onChange: e => onChange(e.target.value), children: options.map(({ label, value }) => ((0, jsx_runtime_1.jsx)(styles_1.Option, { value: value, children: label }, value))) }), (0, jsx_runtime_1.jsx)(styles_1.ArrowIcon, {})] }));
}
//# sourceMappingURL=index.js.map