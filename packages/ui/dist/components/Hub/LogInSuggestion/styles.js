"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionText = exports.Container = void 0;
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
exports.Container = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing(4)};

  ${theme.breakpoints.up(1000)} {
    flex-direction: row;
    justify-content: space-evenly;
    gap: 0;

    width: 100%;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
`);
exports.SuggestionText = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  color: ${theme.palette.common.black};
`);
//# sourceMappingURL=styles.js.map