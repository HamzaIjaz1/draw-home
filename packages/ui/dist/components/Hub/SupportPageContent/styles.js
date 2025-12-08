"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormButton = exports.FormInputControlled = exports.PencilIcon = exports.Form = void 0;
const material_1 = require("@mui/material");
const Icons_1 = require("../../Icons");
const Input_1 = require("../Form/Input");
const Button_1 = require("../Form/Button");
exports.Form = (0, material_1.styled)('form')(({ theme }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(10)};
`);
exports.PencilIcon = (0, material_1.styled)(Icons_1.PencilIcon) `
  width: 22px;
  height: 22px;
`;
exports.FormInputControlled = (0, material_1.styled)(Input_1.FormInputControlled) `
  max-width: 800px;
`;
exports.FormButton = (0, material_1.styled)(Button_1.FormButton)(({ theme }) => (0, material_1.css) `
  margin-top: ${theme.spacing(5)};
  margin-left: auto;
  margin-right: auto;

  ${theme.breakpoints.up('md')} {
    margin-left: unset;
    margin-right: unset;
  }
`);
//# sourceMappingURL=styles.js.map