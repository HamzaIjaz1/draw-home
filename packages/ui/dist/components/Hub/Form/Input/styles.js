"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledInput = exports.LabelHeading = exports.FormLabel = void 0;
const material_1 = require("@mui/material");
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const FormLabel_1 = __importDefault(require("@mui/material/FormLabel"));
const iconTitleGap = '14px';
const fontCss = (0, material_1.css) `
  font-size: 15px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0.5px;
`;
exports.FormLabel = (0, material_1.styled)(FormLabel_1.default)(({ theme }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`);
exports.LabelHeading = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  align-items: center;
  gap: ${iconTitleGap};
  ${fontCss};
  color: ${theme.palette.text.primary};
`);
exports.StyledInput = (0, material_1.styled)(TextField_1.default)(({ theme, multiline }) => (0, material_1.css) `
  width: 100%;
  & .MuiInput-root {
    font-size: 15px;
    ${multiline === true ? '' : (0, material_1.css) `
      height: 41px;
    `}
  }
  & .MuiInput-input, & .Mui-disabled {
    ${multiline === true ? '' : (0, material_1.css) `
      margin-left: ${iconTitleGap};
    `}

    ${fontCss};
    color: ${theme.palette.text.primary};
    -webkit-text-fill-color: ${theme.palette.text.primary} !important;
  }
  & .MuiInput-root::before {
    border-bottom: 1px solid ${theme.palette.form.inputBorder};
  }
  & input::placeholder {
    color: ${theme.palette.text.primary};
    opacity: 1;
  }

  .MuiInput-root > svg {
    pointer-events: none;
  }
`);
//# sourceMappingURL=styles.js.map