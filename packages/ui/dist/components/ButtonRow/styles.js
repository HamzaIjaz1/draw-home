"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightArrowIcon = exports.Label = exports.StyledBaseButton = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
const BaseButton_1 = require("../BaseButton");
const styles_1 = require("../../utils/styles");
const Icons_1 = require("../Icons");
const theme_1 = require("../../theme");
exports.StyledBaseButton = (0, material_1.styled)(BaseButton_1.BaseButton) `
  flex: 1;
  display: grid;
  grid-template-columns: auto 1fr auto;
  ${(0, styles_1.menuRowHorizontalPadding)()}
`;
const TextOptions = {
    shouldForwardProp: e => !['disabled'].includes(e),
};
exports.Label = (0, material_1.styled)(Typography_1.default, TextOptions)(({ theme, disabled }) => (0, material_1.css) `
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: ${disabled === true ? theme_1.menuRowDisabled : theme.palette.text.secondary};
  word-break: break-word;
`);
exports.RightArrowIcon = (0, material_1.styled)(Icons_1.DownArrowIcon) `
  transform: rotate(-90deg);
`;
//# sourceMappingURL=styles.js.map