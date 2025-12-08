"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.Button = exports.iconColorCssVariable = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
const BaseButton_1 = require("../../BaseButton");
const styles_1 = require("../../../utils/styles");
exports.iconColorCssVariable = '--icon-color';
const CommonOptions = {
    shouldForwardProp: e => !['active', 'version'].includes(e),
};
exports.Button = (0, material_1.styled)(BaseButton_1.BaseButton, CommonOptions)(({ theme, active, version }) => (0, material_1.css) `
  display: flex;
  width: fit-content;
  gap: ${version === 'normal' ? theme.spacing(5) : theme.spacing(2.5)};
  padding: ${theme.spacing(0)};
  height: 24px;

  ${(0, styles_1.setCssVar)(exports.iconColorCssVariable, theme.palette.text.secondary)}
  :hover, :focus {
    ${(0, styles_1.setCssVar)(exports.iconColorCssVariable, theme.palette.primary.main)}
    background-color: transparent;
  }

  ${active === true && (0, material_1.css) `
    ${(0, styles_1.setCssVar)(exports.iconColorCssVariable, theme.palette.primary.main)}
  `}

  svg {
    min-width: 18px;
    min-height: 18px;
  }
`);
exports.Text = (0, material_1.styled)(Typography_1.default, CommonOptions)(({ theme, active, version }) => (0, material_1.css) `
  font-size: ${version === 'normal' ? '20px' : '17px'};
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  color: ${theme.palette.text.secondary};
  overflow-wrap: break-word;
  max-width: 130px;
  height: 22px;

  ${active === true && (0, material_1.css) `
    color: ${theme.palette.text.primary};
  `}

  button:hover &, button:focus & {
    color: ${version === 'smaller' ? theme.palette.primary.main : theme.palette.text.primary};
  }
`);
//# sourceMappingURL=styles.js.map