"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuCategories = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Stack_1 = __importDefault(require("@mui/material/Stack"));
const Link_1 = __importDefault(require("@mui/material/Link"));
const Icons_1 = require("../../Icons");
const MenuOptions_1 = require("../MenuOptions");
const styles_1 = require("./styles");
const MenuCategories = ({ className, appName, options, appLogoLink, closeMenu, }) => ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, jsx_runtime_1.jsx)(Link_1.default, { href: appLogoLink, underline: 'none', children: (0, jsx_runtime_1.jsxs)(Stack_1.default, { direction: 'row', alignItems: 'flex-end', gap: '0', children: [(0, jsx_runtime_1.jsx)(Icons_1.DrawHouseIcon, {}), (0, jsx_runtime_1.jsx)(styles_1.MainHeading, { children: appName })] }) }), (0, jsx_runtime_1.jsx)(MenuOptions_1.MenuOptions, { options: options, closeMenu: closeMenu })] }));
exports.MenuCategories = MenuCategories;
//# sourceMappingURL=index.js.map