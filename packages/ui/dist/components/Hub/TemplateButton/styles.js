"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = exports.Text = exports.Button = exports.TEMPLATE_BUTTON_WIDTH = void 0;
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const BaseButton_1 = require("../../BaseButton");
const utils_1 = require("../../../utils");
const theme_1 = require("../../../theme");
exports.TEMPLATE_BUTTON_WIDTH = '100px';
exports.Button = (0, material_1.styled)(BaseButton_1.BaseButton)(({ theme }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
  width: ${exports.TEMPLATE_BUTTON_WIDTH};
  height: 120px;
  border-radius: 4px;
  box-shadow: ${theme_1.slightShadow};
  background-color: ${theme.palette.background.paper};
`);
const TextOptions = {
    shouldForwardProp: e => !['accent'].includes(e),
};
exports.Text = (0, material_1.styled)(Typography_1.default, TextOptions)(({ theme, accent }) => (0, material_1.css) `
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  text-align: center;
  color: ${accent === true ? theme.palette.primary.main : theme.palette.text.primary};

  width: 95%;
  ${utils_1.styles.textOverflowEllipsis};
`);
exports.Image = (0, material_1.styled)('img') `
  object-fit: contain;
`;
//# sourceMappingURL=styles.js.map