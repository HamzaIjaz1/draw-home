"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.TextButton = exports.IconButton = exports.Options = exports.Label = exports.Container = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
const IconButton_1 = require("../IconButton");
const theme_1 = require("../../theme");
const BaseButton_1 = require("../BaseButton");
const BaseRow_1 = require("../BaseRow");
const createStyledOptions_1 = require("../../utils/createStyledOptions");
exports.Container = (0, material_1.styled)(BaseRow_1.BaseRow) `
  gap: 8px;
`;
exports.Label = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${theme.palette.text.secondary};

  max-width: 50%;
  overflow-wrap: break-word;
`);
exports.Options = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const buttonActiveStyle = (0, material_1.css) `
  background-color: ${theme_1.backgroundSecondary};
  :hover {
    background-color: ${theme_1.backgroundSecondary};
  }
`;
const ButtonOptions = (0, createStyledOptions_1.createStyledOptions)({
    selected: true,
});
exports.IconButton = (0, material_1.styled)(IconButton_1.IconButton, ButtonOptions)(({ selected }) => (0, material_1.css) `
  border-radius: 8px;
  ${selected === true && buttonActiveStyle}
`);
exports.TextButton = (0, material_1.styled)(BaseButton_1.BaseButton, ButtonOptions)(({ selected }) => (0, material_1.css) `
  border-radius: 8px;
  ${selected === true && buttonActiveStyle}
`);
exports.Text = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${theme.palette.text.primary};
`);
//# sourceMappingURL=styles.js.map