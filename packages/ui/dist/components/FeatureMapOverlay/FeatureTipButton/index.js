"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureTipButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const icons_1 = require("./icons");
const styles_1 = require("../styles");
const Text = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  ${(0, styles_1.textStyles)(theme)}

  position: absolute;
  bottom: 86px;
  right: 118px;
  width: 170px;

  ${theme.breakpoints.up('md')} {
    bottom: 60px;
    right: 175px;
    width: 260px;
  }
  ${theme.breakpoints.up(1800)} {
    right: 190px;
  }
`);
const ArrowMobile = (0, material_1.styled)(icons_1.ArrowMobileIcon) `
  position: absolute;
  bottom: 52px;
  right: 30px;
`;
const ArrowDesktop = (0, material_1.styled)(icons_1.ArrowDesktopIcon)(({ theme }) => (0, material_1.css) `
  position: absolute;
  bottom: 52px;
  right: 50px;
  ${theme.breakpoints.up(1800)} {
    bottom: 65px;
    right: 65px;
  }
`);
const FeatureTipButton = ({ text }) => {
    const theme = (0, material_1.useTheme)();
    const isDesktop = (0, material_1.useMediaQuery)(theme.breakpoints.up('md'));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Text, { children: text }), isDesktop === true ? (0, jsx_runtime_1.jsx)(ArrowDesktop, {}) : (0, jsx_runtime_1.jsx)(ArrowMobile, {})] }));
};
exports.FeatureTipButton = FeatureTipButton;
//# sourceMappingURL=index.js.map