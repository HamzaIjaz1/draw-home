"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconContainer = exports.CloseButton = exports.Content = exports.Title = exports.Container = void 0;
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const IconButton_1 = require("../IconButton");
const createStyledOptions_1 = require("../../utils/createStyledOptions");
const PopUp_1 = require("../PopUp");
const styles_1 = require("../../utils/styles");
exports.Container = (0, material_1.styled)(PopUp_1.PopUp)(({ theme }) => (0, material_1.css) `
  ${(0, styles_1.setCssVar)(PopUp_1.PopUpCssVars.padding, '30px 16px 20px')}

  ${theme.breakpoints.up('md')} {
    ${(0, styles_1.setCssVar)(PopUp_1.PopUpCssVars.padding, '30px 20px 20px')}
  }
`);
const TitleOptions = (0, createStyledOptions_1.createStyledOptions)({
    withMarginTop: true,
});
exports.Title = (0, material_1.styled)(Typography_1.default, TitleOptions)(({ theme, withMarginTop }) => (0, material_1.css) `
  font-weight: 500;
  font-size: 19px;
  line-height: 22px;
  text-align: center;
  overflow-wrap: anywhere;
  margin-bottom: 16px;

  ${withMarginTop === true && (0, material_1.css) `
    margin-top: 10px;
  `}

  ${theme.breakpoints.up('md')} {
    font-size: 22px;
    line-height: 26px;
  }
`);
exports.Content = (0, material_1.styled)('div') `
  padding: 0;
  display: flex;
  flex-direction: column;
`;
exports.CloseButton = (0, material_1.styled)(IconButton_1.IconButton) `
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
`;
exports.IconContainer = (0, material_1.styled)('div') `
  display: flex;
  margin-bottom: 30px;
`;
//# sourceMappingURL=styles.js.map