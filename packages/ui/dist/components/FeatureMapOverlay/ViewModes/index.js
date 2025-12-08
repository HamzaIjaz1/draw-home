"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewModes = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const icons_1 = require("./icons");
const styles_1 = require("../styles");
const styles_2 = require("../../MainScreenOverlay/styles");
const createStyledOptions_1 = require("../../../utils/createStyledOptions");
const Text = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  ${(0, styles_1.textStyles)(theme)}

  position: absolute;
  top: 110px;
  left: clamp(10px, -158.2352px + 43.1373vw, 230px);
  width: 200px;

  ${theme.breakpoints.up('md')} {
    top: 130px;
    left: clamp(110px, -322.5808px + 48.0645vw, 1600px);
    width: 530px;
  }
`);
const options = (0, createStyledOptions_1.createStyledOptions)({
    isTouchScreen: true,
});
const Arrow = (0, material_1.styled)(icons_1.ArrowIcon, options)(({ theme, isTouchScreen }) => (0, material_1.css) `
  position: absolute;
  left: 70px;

  ${theme.breakpoints.up(styles_2.topCenterBreakpoint)} {
    left: clamp(96px, -104.3616px + 46.5957vw, 315px);
  }

  ${theme.breakpoints.up('md')} {
    left: clamp(280px, -172.904px + 50.3226vw, 1840px);

    width: 58px;
    height: 53px;
  }

  ${isTouchScreen === false && (0, material_1.css) `
    top: 67px;
    ${theme.breakpoints.up(styles_2.topCenterBreakpoint)} {
      top: 60px;
    }
    ${theme.breakpoints.up('md')} {
      top: 68px;
    }
  `}

  ${isTouchScreen === true && (0, material_1.css) `
    top: 58px;
    ${theme.breakpoints.up('md')} {
      top: 64px;
      width: 62px;
      height: 57px;
    }
  `}
`);
const CircleMobile = (0, material_1.styled)(icons_1.CircleMobileIcon, options)(({ theme, isTouchScreen }) => (0, material_1.css) `
  position: absolute;
  top: 0;

  width: 120px;
  height: 62px;

  ${isTouchScreen === false && (0, material_1.css) `
    left: clamp(88px, 40vw - 68px, 104px);
    ${theme.breakpoints.up(styles_2.topCenterBreakpoint)} {
      left: clamp(118px, 49.7872vw - 96.0848px, 352px);
    }
  `}

  ${isTouchScreen === true && (0, material_1.css) `
    left: clamp(120px, -45.7504px + 42.5vw, 137px);
    ${theme.breakpoints.up(styles_2.topCenterBreakpoint)} {
      left: clamp(150px, -65.9152px + 50.2128vw, 386px);
    }
  `}
`);
const CircleDesktop = (0, material_1.styled)(icons_1.CircleDesktopIcon, options)(({ theme, isTouchScreen }) => (0, material_1.css) `
  position: absolute;
  top: clamp(1px, 1vw - 8px, 4px);

  width: 150px;
  height: 57px;

  ${theme.breakpoints.up(1800)} {
    top: 16px;
  }

  ${isTouchScreen === false && (0, material_1.css) `
    left: clamp(332px, 49.6667vw - 115px, 481px);
    ${theme.breakpoints.up(1200)} {
      left: clamp(481px, 49.9643vw - 118.5712px, 1880px);
    }
  `}

  ${isTouchScreen === true && (0, material_1.css) `
    left: clamp(23.125rem, -5rem + 50vw, 120rem);
  `}
`);
const ViewModes = ({ isTouchScreen, text }) => {
    const theme = (0, material_1.useTheme)();
    const isDesktop = (0, material_1.useMediaQuery)(theme.breakpoints.up('md'));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Text, { children: text }), (0, jsx_runtime_1.jsx)(Arrow, { isTouchScreen: isTouchScreen }), isDesktop === true
                ? (0, jsx_runtime_1.jsx)(CircleDesktop, { isTouchScreen: isTouchScreen })
                : (0, jsx_runtime_1.jsx)(CircleMobile, { isTouchScreen: isTouchScreen })] }));
};
exports.ViewModes = ViewModes;
//# sourceMappingURL=index.js.map