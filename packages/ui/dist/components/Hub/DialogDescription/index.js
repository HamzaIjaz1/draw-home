"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogDescription = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ts_utils_1 = require("@arthurka/ts-utils");
const styles_1 = require("./styles");
const DialogDescription = ({ className, text, textHighlighted, }) => ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, jsx_runtime_1.jsx)(styles_1.Text, { children: text }), !(0, ts_utils_1.isUndefined)(textHighlighted) && ((0, jsx_runtime_1.jsxs)(styles_1.TextHighlighted, { children: [' ', textHighlighted] }))] }));
exports.DialogDescription = DialogDescription;
//# sourceMappingURL=index.js.map