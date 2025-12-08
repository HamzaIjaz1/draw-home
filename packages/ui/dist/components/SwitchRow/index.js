"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const BaseRow_1 = require("../BaseRow");
const Switch_1 = require("../Switch");
const styles_1 = require("./styles");
const SwitchRow = ({ className, title, checked, disabled = false, onClick, }) => ((0, jsx_runtime_1.jsxs)(BaseRow_1.BaseRow, { className: className, children: [(0, jsx_runtime_1.jsx)(styles_1.Title, { disabled: disabled, children: title }), (0, jsx_runtime_1.jsx)(Switch_1.Switch, { checked: checked, disabled: disabled, onClick: onClick })] }));
exports.SwitchRow = SwitchRow;
//# sourceMappingURL=index.js.map