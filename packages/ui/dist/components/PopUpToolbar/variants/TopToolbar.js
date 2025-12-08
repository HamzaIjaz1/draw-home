"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopToolbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const __1 = require("..");
const MobileTopToolbar = (0, material_1.styled)(__1.PopUpToolbar) `
  border-radius: 10px;
  box-shadow: 2px 2px 10px 0px #0003;
  height: 44px;
`;
const DesktopTopToolbarWrap = (0, material_1.styled)('div') `
  display: flex;
  gap: 10px;
`;
const TopToolbar = ({ children }) => {
    const theme = (0, material_1.useTheme)();
    const isDesktop = (0, material_1.useMediaQuery)(theme.breakpoints.up('md'));
    const mode = isDesktop === true ? 'desktop' : 'mobile';
    const items = children(mode);
    if (mode === 'mobile') {
        return ((0, jsx_runtime_1.jsx)(MobileTopToolbar, { mode: 'static', items: items }));
    }
    if (mode === 'desktop') {
        return ((0, jsx_runtime_1.jsx)(DesktopTopToolbarWrap, { children: items }));
    }
    return mode;
};
exports.TopToolbar = TopToolbar;
//# sourceMappingURL=TopToolbar.js.map