"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplaceElementInfoRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styles_1 = require("./styles");
const ReplaceElementInfoRow = ({ className, img, text, highlightedText, }) => ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, jsx_runtime_1.jsx)(styles_1.Image, { src: img }), (0, jsx_runtime_1.jsx)(styles_1.Text, { children: text }), (0, jsx_runtime_1.jsx)(styles_1.HighlightedText, { children: highlightedText })] }));
exports.ReplaceElementInfoRow = ReplaceElementInfoRow;
//# sourceMappingURL=index.js.map