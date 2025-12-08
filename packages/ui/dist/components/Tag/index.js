"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styles_1 = require("./styles");
const Tag = ({ className, lines, onClick, }) => ((0, jsx_runtime_1.jsx)(styles_1.Container, { className: className, onClick: onClick, children: lines.map((line, i) => ((0, jsx_runtime_1.jsx)(styles_1.Text, { children: line }, i))) }));
exports.Tag = Tag;
//# sourceMappingURL=index.js.map