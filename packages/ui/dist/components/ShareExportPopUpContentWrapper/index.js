"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareExportPopUpContentWrapper = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styles_1 = require("./styles");
const ShareExportPopUpContentWrapper = ({ className, title, children, onClose, }) => ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, jsx_runtime_1.jsxs)(styles_1.Header, { children: [(0, jsx_runtime_1.jsx)(styles_1.Title, { children: title }), (0, jsx_runtime_1.jsx)(styles_1.CloseButton, { icon: 'close', size: 'sm', variant: 'text', onClick: onClose })] }), (0, jsx_runtime_1.jsx)(styles_1.Content, { children: children })] }));
exports.ShareExportPopUpContentWrapper = ShareExportPopUpContentWrapper;
//# sourceMappingURL=index.js.map