"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ts_utils_1 = require("@arthurka/ts-utils");
const Icons_1 = require("../Icons");
const styles_1 = require("./styles");
const icons = {
    penAndWrenchCrossed: Icons_1.PenAndWrenchCrossedIcon,
    unlock: Icons_1.UnlockIcon,
};
const Dialog = ({ className, open, onClose, title, children, onCloseTransitionEnd, icon, }) => {
    const Icon = (0, ts_utils_1.isUndefined)(icon) ? undefined : icons[icon];
    return ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, open: open, onClose: onClose, onCloseTransitionEnd: onCloseTransitionEnd, children: [!(0, ts_utils_1.isUndefined)(Icon) && ((0, jsx_runtime_1.jsx)(styles_1.IconContainer, { children: (0, jsx_runtime_1.jsx)(Icon, {}) })), (0, jsx_runtime_1.jsx)(styles_1.CloseButton, { icon: 'close', size: 'sm', variant: 'text', onClick: onClose }), (0, jsx_runtime_1.jsx)(styles_1.Title, { withMarginTop: (0, ts_utils_1.isUndefined)(Icon), children: title }), (0, jsx_runtime_1.jsx)(styles_1.Content, { children: children })] }));
};
exports.Dialog = Dialog;
//# sourceMappingURL=index.js.map