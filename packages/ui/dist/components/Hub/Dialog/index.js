"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styles_1 = require("./styles");
const Dialog = ({ className, open, onClose, title, children, onCloseTransitionEnd, }) => ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, open: open, onClose: onClose, "aria-modal": 'true', TransitionProps: { onExited: onCloseTransitionEnd }, children: [(0, jsx_runtime_1.jsx)(styles_1.IconButton, { icon: 'close', size: 'md', variant: 'text', onClick: onClose }), (0, jsx_runtime_1.jsx)(styles_1.Title, { children: title }), (0, jsx_runtime_1.jsx)(styles_1.Content, { children: children })] }));
exports.Dialog = Dialog;
//# sourceMappingURL=index.js.map