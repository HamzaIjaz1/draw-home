"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.StyledLink = exports.iconColorCssVariable = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Link_1 = __importDefault(require("@mui/material/Link"));
const material_1 = require("@mui/material");
const styles_1 = require("../../../utils/styles");
exports.iconColorCssVariable = '--icon-color';
const CommonOptions = {
    shouldForwardProp: e => !['active'].includes(e),
};
exports.StyledLink = (0, material_1.styled)(Link_1.default, CommonOptions)(({ theme, active }) => (0, material_1.css) `
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${theme.spacing(5)};
  text-decoration: none;
  height: 24px;

  svg {
    min-width: 18px;
    min-height: 18px;
  }

  ${(0, styles_1.setCssVar)(exports.iconColorCssVariable, theme.palette.text.secondary)}
  :hover, :focus {
    ${(0, styles_1.setCssVar)(exports.iconColorCssVariable, theme.palette.primary.main)}
  }

  ${active === true && (0, material_1.css) `
    ${(0, styles_1.setCssVar)(exports.iconColorCssVariable, theme.palette.primary.main)}
  `}
`);
exports.Text = (0, material_1.styled)(Typography_1.default, CommonOptions)(({ theme, active }) => (0, material_1.css) `
  font-size: 20px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  color: ${theme.palette.text.secondary};
  overflow-wrap: break-word;
  width: 130px;
  height: 22px;

  ${active === true && (0, material_1.css) `
    color: ${theme.palette.text.primary};
  `}

  a:hover &, a:focus & {
    color: ${theme.palette.text.primary};
  }
`);
//# sourceMappingURL=styles.js.map