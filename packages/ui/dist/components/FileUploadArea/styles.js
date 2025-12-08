"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = exports.SecondaryText = exports.PrimaryText = exports.TextContainer = void 0;
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
exports.TextContainer = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;
exports.PrimaryText = (0, material_1.styled)(Typography_1.default) `
  font-size: 17px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
`;
exports.SecondaryText = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  text-align: center;
  color: ${theme.palette.text.disabled};
`);
const LabelOptions = {
    shouldForwardProp: e => !['isDraggingOver', 'reject'].includes(e),
};
exports.Label = (0, material_1.styled)('label', LabelOptions)(({ theme, isDraggingOver, reject, }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 10px;
  padding: 16px;
  cursor: pointer;

  border-radius: 10px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23FF5B4AFF' stroke-width='2' stroke-dasharray='6' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");

  :hover, :focus-within {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23fd4431' stroke-width='3' stroke-dasharray='6' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
  }

  transition: background-color 100ms ease-out;

  ${isDraggingOver === true && (0, material_1.css) `
    background-color: ${(0, material_1.lighten)(theme.palette.primary.main, 0.92)};
  `}

  ${reject === true && (0, material_1.css) `
    background-color: ${(0, material_1.alpha)(theme.palette.error.main, 0.6)};
  `}
`);
//# sourceMappingURL=styles.js.map