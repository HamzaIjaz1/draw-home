"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = exports.MoreIcon = exports.moreIconCssVariable = exports.TitleButton = exports.Input = exports.InputContainer = exports.Link = exports.Image = exports.Card = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
const InputBase_1 = __importDefault(require("@mui/material/InputBase"));
const theme_1 = require("../../../theme");
const BaseButton_1 = require("../../BaseButton");
const Icons_1 = require("../../Icons");
const styles_1 = require("../../../utils/styles");
const constants_1 = require("./constants");
exports.Card = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${constants_1.CARD_WIDTH_MOBILE};
  height: 200px;
  border-radius: 6px;
  box-shadow: ${theme_1.slightShadow};
  background-color: ${theme.palette.background.paper};

  position: relative;

  ${theme.breakpoints.up('md')} {
    width: ${constants_1.CARD_WIDTH_DESKTOP};
    height: 248px;
  }
`);
exports.Image = (0, material_1.styled)('img')(({ theme }) => (0, material_1.css) `
  width: 100%;
  padding: ${theme.spacing(3)};
  object-fit: contain;
`);
exports.Link = (0, material_1.styled)('a') `
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  height: 100%;
`;
exports.InputContainer = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  width: 100%;
  // I use this oddly precise padding-top to keep the image above
  // from moving when the button turns into an input
  padding: ${theme.spacing(1.25, 3, 2.5)};
`);
exports.Input = (0, material_1.styled)(InputBase_1.default)(({ theme }) => (0, material_1.css) `
  width: 100%;
  border-radius: 5px;
  background-color: #f3f3f3;

  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  color: ${theme.palette.common.black};

  input {
    padding-left: ${theme.spacing(2)};
    padding-right: ${theme.spacing(2)};
  }
`);
exports.TitleButton = (0, material_1.styled)(BaseButton_1.BaseButton)(({ theme }) => (0, material_1.css) `
  padding: ${theme.spacing(3)};
  justify-content: space-between;

  :hover {
    background-color: transparent;
  }
`);
exports.moreIconCssVariable = '--project-card-title-more-icon';
exports.MoreIcon = (0, material_1.styled)(Icons_1.ThreeDotsIcon)(({ theme }) => (0, material_1.css) `
  ${(0, styles_1.setCssVar)(exports.moreIconCssVariable, theme.palette.common.black)};

  button:hover &, button:focus & {
    ${(0, styles_1.setCssVar)(exports.moreIconCssVariable, theme.palette.primary.main)};
  }
`);
exports.Title = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  color: ${theme.palette.common.black};

  button:hover &, button:focus & {
    color: ${theme.palette.primary.main};
  }
`);
//# sourceMappingURL=styles.js.map