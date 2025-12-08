"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const BaseRow_1 = require("../BaseRow");
const styles_1 = require("./styles");
const InfoRow = ({ className, title, value, }) => ((0, jsx_runtime_1.jsxs)(BaseRow_1.BaseRow, { className: className, children: [(0, jsx_runtime_1.jsx)(styles_1.Title, { children: title }), (0, jsx_runtime_1.jsx)(styles_1.Value, { children: value })] }));
exports.InfoRow = InfoRow;
//# sourceMappingURL=index.js.map