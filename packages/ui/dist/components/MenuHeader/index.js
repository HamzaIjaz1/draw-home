"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ts_utils_1 = require("@arthurka/ts-utils");
const styles_1 = require("./styles");
const MenuHeader = ({ className, text, onBack, onClose, noHeight = false, }) => ((0, jsx_runtime_1.jsxs)(styles_1.Header, { className: className, "$noHeight": noHeight, children: [!(0, ts_utils_1.isUndefined)(onBack) && ((0, jsx_runtime_1.jsx)(styles_1.BackButton, { icon: 'back', size: 'sm', variant: 'text', onClick: onBack })), (0, jsx_runtime_1.jsx)(styles_1.Text, { children: text }), !(0, ts_utils_1.isUndefined)(onClose) && ((0, jsx_runtime_1.jsx)(styles_1.CloseButton, { icon: 'close', size: 'sm', variant: 'text', onClick: onClose }))] }));
exports.MenuHeader = MenuHeader;
//# sourceMappingURL=index.js.map