"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const InputBase_1 = __importDefault(require("@mui/material/InputBase"));
const Icons_1 = require("../Icons");
const StyledInput = (0, material_1.styled)(InputBase_1.default)(({ theme }) => (0, material_1.css) `
  & .MuiInputBase-input {
    border-radius: 10px;
    background-color: #f3f3f3;
    border: none;
    font-size: 16px;
    height: 40px;
    padding: 0 0 0 40px;
  }
  & ::placeholder {
    color: ${theme.palette.text.disabled};
    opacity: 1;
    font-weight: 400;
  }
`);
const StyledAdornment = (0, material_1.styled)('div') `
  position: absolute;
  width: 40px;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;
const SearchInput = ({ className, placeholder, value, setValue, }) => ((0, jsx_runtime_1.jsx)(StyledInput, { className: className, placeholder: placeholder, fullWidth: true, startAdornment: (0, jsx_runtime_1.jsx)(StyledAdornment, { children: (0, jsx_runtime_1.jsx)(Icons_1.SearchInputIcon, {}) }), value: value, onChange: e => setValue(e.target.value) }));
exports.SearchInput = SearchInput;
//# sourceMappingURL=index.js.map