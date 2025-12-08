"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChipText = exports.Chip = exports.Avatar = exports.SecondaryHeading = exports.MainHeading = exports.Container = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Chip_1 = __importDefault(require("@mui/material/Chip"));
const Avatar_1 = __importDefault(require("@mui/material/Avatar"));
const material_1 = require("@mui/material");
const styles_1 = require("../../../utils/styles");
exports.Container = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  width: var(--left-menu-width, 250px);
  gap: ${theme.spacing(15)};
  padding: ${theme.spacing(7.5, 9, 15)};
`);
exports.MainHeading = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 20px;
  font-weight: 500;
  line-height: 25.5px;
  text-align: left;
  overflow-wrap: break-word;
  color: ${theme.palette.text.primary};
`);
exports.SecondaryHeading = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 15px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0.5px;
  text-align: left;
  overflow-wrap: break-word;
  color: ${theme.palette.text.primary};
`);
exports.Avatar = (0, material_1.styled)(Avatar_1.default) `
  width: 50px;
  height: 50px;
`;
exports.Chip = (0, material_1.styled)(Chip_1.default) `
  height: 30px;
`;
exports.ChipText = (0, material_1.styled)(Typography_1.default) `
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  text-align: left;

  max-width: 80px;
  ${styles_1.textOverflowEllipsis}
`;
//# sourceMappingURL=styles.js.map