"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WallModes = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const icons_1 = require("./icons");
const styles_1 = require("../styles");
const createStyledOptions_1 = require("../../../utils/createStyledOptions");
const options = (0, createStyledOptions_1.createStyledOptions)({
    isTouchScreen: true,
});
const Text = (0, material_1.styled)('span', options)(({ theme, isTouchScreen }) => (0, material_1.css) `
  ${(0, styles_1.textStyles)(theme)}

  position: absolute;
  top: 302px;
  right: 155px;
  width: 172px;

  ${theme.breakpoints.up('md')} {
    top: 82px;
    right: 210px;
    width: 340px;
  }
  ${theme.breakpoints.up(1800)} {
    top: 90px;
    right: 220px;
  }

  ${isTouchScreen === true && (0, material_1.css) `
    top: 280px;
  `}
`);
const ArrowMobile = (0, material_1.styled)(icons_1.ArrowMobileIcon, options)(({ isTouchScreen }) => (0, material_1.css) `
  position: absolute;
  top: 185px;
  right: 50px;

  ${isTouchScreen === true && (0, material_1.css) `
    top: 175px;
    height: 118px;
  `}
`);
const ArrowDesktop = (0, material_1.styled)(icons_1.ArrowDesktopIcon)(({ theme }) => (0, material_1.css) `
  position: absolute;
  top: 70px;
  right: 70px;

  ${theme.breakpoints.up(1800)} {
    top: 83px;
    right: 78px;
  }
`);
const CircleMobile = (0, material_1.styled)(icons_1.CircleMobileIcon) `
  position: absolute;
  top: 66px;
  right: -6px;
`;
const CircleDesktop = (0, material_1.styled)(icons_1.CircleDesktopIcon)(({ theme }) => (0, material_1.css) `
  position: absolute;
  top: 97px;
  right: -3px;

  ${theme.breakpoints.up(1800)} {
    top: 112px;
    right: 7px;
  }
`);
const WallModes = ({ isTouchScreen, text }) => {
    const theme = (0, material_1.useTheme)();
    const isDesktop = (0, material_1.useMediaQuery)(theme.breakpoints.up('md'));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Text, { isTouchScreen: isTouchScreen, children: text }), isDesktop === true
                ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ArrowDesktop, {}), (0, jsx_runtime_1.jsx)(CircleDesktop, {})] }))
                : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ArrowMobile, { isTouchScreen: isTouchScreen }), (0, jsx_runtime_1.jsx)(CircleMobile, {})] }))] }));
};
exports.WallModes = WallModes;
//# sourceMappingURL=index.js.map