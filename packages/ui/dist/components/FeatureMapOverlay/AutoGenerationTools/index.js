"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoGenerationTools = void 0;
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
  right: 150px;
  width: 205px;

  ${theme.breakpoints.up('md')} {
    right: 170px;
    width: 345px;
  }
  ${theme.breakpoints.up(1800)} {
    right: 180px;
  }

  ${isTouchScreen === false && (0, material_1.css) `
    top: 378px;
    ${theme.breakpoints.up('md')} {
      top: 400px;
    }
    ${theme.breakpoints.up(1800)} {
      top: 415px;
    }
  `}

  ${isTouchScreen === true && (0, material_1.css) `
    top: 350px;
    ${theme.breakpoints.up('md')} {
      top: 370px;
    }
    ${theme.breakpoints.up(1800)} {
      top: 385px;
    }
  `}
`);
const Bracket = (0, material_1.styled)(icons_1.BracketIcon, options)(({ theme, isTouchScreen }) => (0, material_1.css) `
  position: absolute;
  right: 111px;

  ${theme.breakpoints.up('md')} {
    right: 125px;
  }

  ${theme.breakpoints.up(1800)} {
    right: 135px;
  }

  ${isTouchScreen === false && (0, material_1.css) `
    top: 325px;
    ${theme.breakpoints.up('md')} {
      top: 360px;
    }
    ${theme.breakpoints.up(1800)} {
      top: 376px;
    }
  `}

  ${isTouchScreen === true && (0, material_1.css) `
    top: 292px;
    ${theme.breakpoints.up('md')} {
      top: 325px;
    }
    ${theme.breakpoints.up(1800)} {
      top: 340px;
    }
  `}
`);
const AutoGenerationTools = ({ isTouchScreen, text }) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Text, { isTouchScreen: isTouchScreen, children: text }), (0, jsx_runtime_1.jsx)(Bracket, { isTouchScreen: isTouchScreen })] }));
exports.AutoGenerationTools = AutoGenerationTools;
//# sourceMappingURL=index.js.map