"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTitle = exports.Title = exports.Titles = exports.RightControls = exports.Container = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
exports.Container = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  align-items: center;
  gap: ${theme.spacing(2)};
  height: 50px;
  padding: ${theme.spacing(0, 1)};
`);
exports.RightControls = (0, material_1.styled)('div') `
  display: flex;
  align-items: center;
  width: fit-content;
  height: 24px;
`;
exports.Titles = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
  flex: 1;
`);
exports.Title = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  text-align: left;
  color: ${theme.palette.text.primary};

  max-width: 155px;
  ${theme.breakpoints.up(390)} {
    max-width: 220px;
  }
  ${theme.breakpoints.up('sm')} {
    max-width: 230px;
  }
`);
exports.SubTitle = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  text-align: left;
  color: #777;

  max-width: 155px;
  ${theme.breakpoints.up(390)} {
    max-width: 220px;
  }
  ${theme.breakpoints.up('sm')} {
    max-width: 230px;
  }
`);
//# sourceMappingURL=styles.js.map