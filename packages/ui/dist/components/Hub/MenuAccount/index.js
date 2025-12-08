"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuAccount = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Stack_1 = __importDefault(require("@mui/material/Stack"));
const ts_utils_1 = require("@arthurka/ts-utils");
const MenuOptions_1 = require("../MenuOptions");
const styles_1 = require("./styles");
const MenuAccount = ({ className, user, options, planBadgeText, guestProfileText, closeMenu, }) => ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, ts_utils_1.isNull)(user) ? ((0, jsx_runtime_1.jsx)(styles_1.MainHeading, { children: guestProfileText })) : ((0, jsx_runtime_1.jsxs)(Stack_1.default, { gap: '16px', children: [(0, jsx_runtime_1.jsxs)(Stack_1.default, { direction: 'row', alignItems: 'center', gap: '16px', children: [(0, jsx_runtime_1.jsx)(styles_1.Avatar, { src: (0, ts_utils_1.isNull)(user.avatar) ? '' : user.avatar, alt: user.name }), (0, jsx_runtime_1.jsx)(styles_1.Chip, { label: (0, jsx_runtime_1.jsx)(styles_1.ChipText, { children: planBadgeText }), variant: 'outlined', color: 'primary' })] }), (0, jsx_runtime_1.jsxs)(Stack_1.default, { children: [(0, jsx_runtime_1.jsx)(styles_1.MainHeading, { children: user.name }), (0, jsx_runtime_1.jsx)(styles_1.SecondaryHeading, { children: user.email })] })] })), (0, jsx_runtime_1.jsx)(MenuOptions_1.MenuOptions, { options: options, closeMenu: closeMenu })] }));
exports.MenuAccount = MenuAccount;
//# sourceMappingURL=index.js.map