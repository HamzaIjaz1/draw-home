"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageWithMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ts_utils_1 = require("@arthurka/ts-utils");
const SideMenu_1 = require("../SideMenu");
const CommonPageComponents_1 = require("../CommonPageComponents");
const styles_1 = require("./styles");
const PageWithMenu = ({ className, pageTitle, pageSubTitle, appName, appLogoLink, menuOptions, planBadgeText, guestProfileText, user, children, }) => {
    const [openMobile, setOpenMobile] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, jsx_runtime_1.jsx)(SideMenu_1.SideMenu, { openMobile: openMobile, setOpenMobile: setOpenMobile, user: user, accountOptions: menuOptions.accountOptions, categoryOptions: menuOptions.categoryOptions, appName: appName, appLogoLink: appLogoLink, planBadgeText: planBadgeText, guestProfileText: guestProfileText }), (0, jsx_runtime_1.jsxs)(CommonPageComponents_1.PageBody, { children: [(0, jsx_runtime_1.jsx)(CommonPageComponents_1.MobileAppBar, { pageTitle: pageTitle, onOpenSideMenu: () => setOpenMobile(true) }), (0, jsx_runtime_1.jsxs)(CommonPageComponents_1.Content, { children: [(0, jsx_runtime_1.jsxs)(styles_1.DesktopTitles, { children: [(0, jsx_runtime_1.jsx)(CommonPageComponents_1.DesktopPageTitle, { children: pageTitle }), !(0, ts_utils_1.isNull)(pageSubTitle) && ((0, jsx_runtime_1.jsx)(styles_1.DesktopPageSubTitle, { children: pageSubTitle }))] }), children] })] })] }));
};
exports.PageWithMenu = PageWithMenu;
//# sourceMappingURL=index.js.map