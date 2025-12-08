"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopUp = exports.PopUpCssVars = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styles_1 = require("./styles");
var styles_2 = require("./styles");
Object.defineProperty(exports, "PopUpCssVars", { enumerable: true, get: function () { return styles_2.cssVars; } });
const PopUp = ({ className, open, children, onClose, onCloseTransitionEnd, }) => ((0, jsx_runtime_1.jsx)(styles_1.Container, { className: className, open: open, onClose: onClose, TransitionProps: { onExited: onCloseTransitionEnd }, children: children }));
exports.PopUp = PopUp;
//# sourceMappingURL=index.js.map