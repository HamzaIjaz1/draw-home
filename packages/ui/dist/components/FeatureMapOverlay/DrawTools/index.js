"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawTools = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const icons_1 = require("./icons");
const styles_1 = require("../styles");
const createStyledOptions_1 = require("../../../utils/createStyledOptions");
const Text = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  ${(0, styles_1.textStyles)(theme)}

  position: absolute;
  top: 178px;
  right: 150px;
  width: 210px;

  ${theme.breakpoints.up('md')} {
    top: 195px;
    right: 160px;
    width: 280px;
  }
  ${theme.breakpoints.up(1800)} {
    top: 205px;
    right: 170px;
  }
`);
const options = (0, createStyledOptions_1.createStyledOptions)({
    isTouchScreen: true,
});
const Bracket = (0, material_1.styled)(icons_1.BracketIcon, options)(({ theme, isTouchScreen }) => (0, material_1.css) `
  position: absolute;
  top: 82px;
  right: 110px;

  ${theme.breakpoints.up('md')} {
    top: 115px;
    right: 125px;
  }

  ${theme.breakpoints.up(1800)} {
    top: 127px;
    right: 135px;
  }

  ${isTouchScreen === true && (0, material_1.css) `
    height: 185px;
  `}
`);
const DrawTools = ({ isTouchScreen, text }) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Text, { children: text }), (0, jsx_runtime_1.jsx)(Bracket, { isTouchScreen: isTouchScreen })] }));
exports.DrawTools = DrawTools;
//# sourceMappingURL=index.js.map