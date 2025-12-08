"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileAppBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
const styles_1 = require("./styles");
const MobileAppBar = ({ className, pageTitle, onOpenSideMenu, }) => {
    const theme = (0, material_1.useTheme)();
    return ((0, jsx_runtime_1.jsx)(styles_1.AppBar, { className: className, children: (0, jsx_runtime_1.jsxs)(Toolbar_1.default, { children: [(0, jsx_runtime_1.jsx)(styles_1.IconButton, { icon: 'hamburger', size: 'md', variant: 'text', iconColors: {
                        default: theme.palette.text.primary,
                    }, onClick: onOpenSideMenu }), (0, jsx_runtime_1.jsx)(styles_1.MobileTitle, { variant: 'h1', children: pageTitle })] }) }));
};
exports.MobileAppBar = MobileAppBar;
//# sourceMappingURL=index.js.map