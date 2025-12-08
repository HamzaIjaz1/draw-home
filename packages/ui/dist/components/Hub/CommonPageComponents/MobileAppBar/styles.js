"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileTitle = exports.IconButton = exports.AppBar = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const AppBar_1 = __importDefault(require("@mui/material/AppBar"));
const material_1 = require("@mui/material");
const IconButton_1 = require("../../../IconButton");
const theme_1 = require("../../../../theme");
exports.AppBar = (0, material_1.styled)(AppBar_1.default)(({ theme }) => (0, material_1.css) `
  position: sticky;
  display: inherit;

  ${theme.breakpoints.up('md')} {
    display: none;
  }

  padding: ${theme.spacing(0, 6)};
  background-color: ${theme.palette.background.paper};
  box-shadow: ${theme_1.accentShadow};
`);
exports.IconButton = (0, material_1.styled)(IconButton_1.IconButton) `
  svg {
    width: 34px;
    height: 34px;
  }
`;
exports.MobileTitle = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  color: ${theme.palette.text.primary};

  ${theme.breakpoints.up('md')} {
    display: none;
  }
`);
//# sourceMappingURL=styles.js.map