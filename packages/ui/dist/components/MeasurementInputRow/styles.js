"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelTypography = exports.FloorHeightHintIcon = exports.LevelElevationHintIcon = exports.Label = exports.Inputs = exports.Container = void 0;
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Icons_1 = require("../Icons");
const BaseRow_1 = require("../BaseRow");
exports.Container = (0, material_1.styled)(BaseRow_1.BaseRow) `
  gap: 10px;
  width: unset;
  flex: 1;
`;
exports.Inputs = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
exports.Label = (0, material_1.styled)('label') `
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;
exports.LevelElevationHintIcon = (0, material_1.styled)(Icons_1.LevelElevationHintIcon) `
  min-width: 24px;
  min-height: 24px;
`;
exports.FloorHeightHintIcon = (0, material_1.styled)(Icons_1.FloorHeightHintIcon) `
  min-width: 24px;
  min-height: 24px;
`;
exports.LabelTypography = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${theme.palette.text.secondary};
  word-break: break-word;
`);
//# sourceMappingURL=styles.js.map