"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = require("react");
const ClickAwayListener_1 = require("@mui/base/ClickAwayListener");
const MenuCategories_1 = require("../MenuCategories");
const styles_1 = require("./styles");
const SideMenu = ({ appName, categoryOptions, accountOptions, planBadgeText, user, guestProfileText, openMobile, appLogoLink, setOpenMobile, }) => {
    const theme = (0, material_1.useTheme)();
    const isDesktop = (0, material_1.useMediaQuery)(theme.breakpoints.up('md'));
    (0, react_1.useEffect)(() => {
        if (isDesktop === true && openMobile === true) {
            setOpenMobile(false);
        }
    }, [isDesktop, openMobile, setOpenMobile]);
    const closeMobileDrawer = () => setOpenMobile(false);
    const menuJsx = ((0, jsx_runtime_1.jsxs)(styles_1.Container, { children: [(0, jsx_runtime_1.jsx)(MenuCategories_1.MenuCategories, { appName: appName, options: categoryOptions, appLogoLink: appLogoLink, closeMenu: closeMobileDrawer }), (0, jsx_runtime_1.jsx)(styles_1.StyledMenuAccount, { user: user, planBadgeText: planBadgeText, options: accountOptions, guestProfileText: guestProfileText, closeMenu: closeMobileDrawer })] }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(styles_1.DesktopDrawer, { variant: 'permanent', anchor: 'left', children: menuJsx }), (0, jsx_runtime_1.jsx)(styles_1.MobileDrawer, { variant: 'temporary', anchor: 'left', open: openMobile, children: (0, jsx_runtime_1.jsx)(ClickAwayListener_1.ClickAwayListener, { onClickAway: closeMobileDrawer, children: (0, jsx_runtime_1.jsxs)(styles_1.MobileWrap, { children: [menuJsx, (0, jsx_runtime_1.jsx)(styles_1.VerticalBar, { children: (0, jsx_runtime_1.jsx)(styles_1.IconButton, { icon: 'close', size: 'md', variant: 'text', onClick: closeMobileDrawer }) })] }) }) })] }));
};
exports.SideMenu = SideMenu;
//# sourceMappingURL=index.js.map