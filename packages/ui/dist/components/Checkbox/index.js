"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = exports.CheckboxCssVars = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styles_1 = require("./styles");
var styles_2 = require("./styles");
Object.defineProperty(exports, "CheckboxCssVars", { enumerable: true, get: function () { return styles_2.cssVars; } });
const iconJSX = (0, jsx_runtime_1.jsx)(styles_1.Icon, {});
const checkedIconJSX = (0, jsx_runtime_1.jsx)(styles_1.CheckedIcon, {});
const Checkbox = ({ className, text, checked, onClick, }) => ((0, jsx_runtime_1.jsxs)(styles_1.Label, { className: className, children: [(0, jsx_runtime_1.jsx)(styles_1.StyledCheckbox, { checked: checked, onChange: onClick, icon: iconJSX, checkedIcon: checkedIconJSX }), text] }));
exports.Checkbox = Checkbox;
//# sourceMappingURL=index.js.map