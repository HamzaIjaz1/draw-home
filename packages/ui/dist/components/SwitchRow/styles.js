"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
const theme_1 = require("../../theme");
const TitleOptions = {
    shouldForwardProp: e => !['disabled'].includes(e),
};
exports.Title = (0, material_1.styled)(Typography_1.default, TitleOptions)(({ theme, disabled }) => (0, material_1.css) `
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${disabled === true ? theme_1.menuRowDisabled : theme.palette.text.secondary};
`);
//# sourceMappingURL=styles.js.map