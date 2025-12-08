"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = exports.Text = exports.MenuItem = void 0;
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
const material_1 = require("@mui/material");
const styles_1 = require("../../utils/styles");
exports.MenuItem = (0, material_1.styled)(MenuItem_1.default)(({ theme }) => (0, material_1.css) `
  height: 48px;
  justify-content: space-between;

  ul > &:first-of-type {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }

  ul > &:last-of-type {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  :hover {
    background-color: ${(0, material_1.alpha)(theme.palette.action.hover, theme.palette.action.hoverOpacity)};
  }
`);
exports.Text = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  font-weight: 400;
  font-size: 17px;
  line-height: 1;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};

  ${styles_1.textOverflowEllipsis}
`);
exports.Image = (0, material_1.styled)('img') `
  width: 24px;
  aspect-ratio: 1 / 1;
`;
//# sourceMappingURL=styles.js.map