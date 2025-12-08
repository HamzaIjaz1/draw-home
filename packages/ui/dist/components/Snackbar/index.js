"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snackbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const styles_1 = require("./styles");
const Icons_1 = require("../Icons");
const Snackbar = ({ className, text, open, handleClose, type, }) => {
    const action = ((0, jsx_runtime_1.jsx)(IconButton_1.default, { size: 'small', "aria-label": 'close', color: 'inherit', onClick: handleClose, children: (0, jsx_runtime_1.jsx)(Icons_1.CloseIconSmall, {}) }));
    return ((0, jsx_runtime_1.jsx)(styles_1.StyledSnackbar, { className: className, open: open, message: text, anchorOrigin: { vertical: 'top', horizontal: 'center' }, onClose: handleClose, action: action, type: type, ContentProps: {
            elevation: 3,
        } }));
};
exports.Snackbar = Snackbar;
//# sourceMappingURL=index.js.map