"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptTextArea = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const TextField = (0, material_1.styled)(TextField_1.default) `
  width: 100%;
  & > div {
    padding: 6px 6.5px;
  }
`;
const PromptTextArea = ({ className, value, onChange, placeholder, }) => ((0, jsx_runtime_1.jsx)(TextField, { className: className, variant: 'filled', multiline: true, minRows: 3, maxRows: 5, placeholder: placeholder, value: value, onChange: e => onChange(e.target.value) }));
exports.PromptTextArea = PromptTextArea;
//# sourceMappingURL=index.js.map