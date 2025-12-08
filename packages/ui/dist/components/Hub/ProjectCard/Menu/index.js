"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@emotion/react");
const material_1 = require("@mui/material");
const ClickAwayListener_1 = require("@mui/base/ClickAwayListener");
const styles_1 = require("../../../../utils/styles");
const styles_2 = require("./styles");
const icons = {
    pencil: styles_2.PencilIcon,
    bin: styles_2.BinIcon,
};
const Icon = ({ name }) => {
    const Icon = icons[name];
    const theme = (0, material_1.useTheme)();
    const style = (0, styles_2.getIconCss)(theme);
    return ((0, jsx_runtime_1.jsx)(react_1.ClassNames, { children: ({ css }) => ((0, jsx_runtime_1.jsx)(Icon, { className: css(style), color: (0, styles_1.getCssVar)(styles_2.iconCssVariable) })) }));
};
const Menu = ({ className, items, onClose, }) => ((0, jsx_runtime_1.jsx)(ClickAwayListener_1.ClickAwayListener, { onClickAway: onClose, children: (0, jsx_runtime_1.jsx)(styles_2.Container, { className: className, children: (0, jsx_runtime_1.jsx)(styles_2.MenuList, { children: items.map(({ icon, title, onClick }) => ((0, jsx_runtime_1.jsxs)(styles_2.MenuItem, { tabIndex: 0, onClick: () => {
                    onClose();
                    onClick();
                }, children: [(0, jsx_runtime_1.jsx)(styles_2.ListItemIcon, { children: (0, jsx_runtime_1.jsx)(Icon, { name: icon }) }), (0, jsx_runtime_1.jsx)(styles_2.Text, { noWrap: true, children: title })] }, `${icon}${title}`))) }) }) }));
exports.Menu = Menu;
//# sourceMappingURL=index.js.map