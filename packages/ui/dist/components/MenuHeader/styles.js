"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.CloseButton = exports.BackButton = exports.Header = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
const IconButton_1 = require("../IconButton");
const utils_1 = require("../../utils");
const _props_1 = require("../../utils/$props");
const styles_1 = require("../../utils/styles");
exports.Header = (0, material_1.styled)('div', (0, _props_1.$props)())(({ $noHeight }) => (0, material_1.css) `
  ${$noHeight === false && (0, material_1.css) `
    height: 40px;
  `}

  width: 100%;
  ${(0, styles_1.menuRowHorizontalPadding)()}

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`);
exports.BackButton = (0, material_1.styled)(IconButton_1.IconButton) `
  position: absolute;
  left: ${styles_1.menuHorizontalGutterWidth / 2}px;
`;
exports.CloseButton = (0, material_1.styled)(IconButton_1.IconButton) `
  position: absolute;
  right: ${styles_1.menuHorizontalGutterWidth / 2}px;
`;
exports.Text = (0, material_1.styled)(Typography_1.default) `
  font-size: 19px;
  font-weight: 600;
  line-height: 22px;
  text-align: center;

  width: 75%;
  ${utils_1.styles.textOverflowEllipsis}
`;
//# sourceMappingURL=styles.js.map