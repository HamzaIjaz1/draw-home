"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuOptions = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Stack_1 = __importDefault(require("@mui/material/Stack"));
const Link_1 = require("../Link");
const ButtonLinkLike_1 = require("../ButtonLinkLike");
const MenuOptions = ({ className, options, closeMenu, }) => ((0, jsx_runtime_1.jsx)(Stack_1.default, { className: className, gap: 7, children: options.map(({ title, icon, href, onClick, state }) => {
        const key = `${icon}${href}${title}`;
        if (onClick === undefined) {
            return ((0, jsx_runtime_1.jsx)(Link_1.Link, { href: href, text: title, icon: icon, state: state }, key));
        }
        return ((0, jsx_runtime_1.jsx)(ButtonLinkLike_1.ButtonLinkLike, { text: title, icon: icon, onClick: () => {
                onClick();
                closeMenu();
            }, state: state }, key));
    }) }));
exports.MenuOptions = MenuOptions;
//# sourceMappingURL=index.js.map