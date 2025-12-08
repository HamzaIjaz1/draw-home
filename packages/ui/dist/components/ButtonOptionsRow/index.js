"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonOptionsRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ts_utils_1 = require("@arthurka/ts-utils");
const styles_1 = require("./styles");
const ButtonOptionsRow = ({ className, label, options, }) => ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, jsx_runtime_1.jsx)(styles_1.Label, { children: label }), (0, jsx_runtime_1.jsx)(styles_1.Options, { children: options.map(({ icon, text, onClick, state, selected }, i) => ((0, ts_utils_1.isUndefined)(icon) ? ((0, jsx_runtime_1.jsx)(styles_1.TextButton, { selected: selected, onClick: onClick, children: (0, jsx_runtime_1.jsx)(styles_1.Text, { children: text }) }, i)) : ((0, jsx_runtime_1.jsx)(styles_1.IconButton, { icon: icon, size: 'md', onClick: onClick, state: state ?? 'default', selected: selected, variant: 'text' }, i)))) })] }));
exports.ButtonOptionsRow = ButtonOptionsRow;
//# sourceMappingURL=index.js.map