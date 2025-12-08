"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrowIcon = exports.Option = exports.DropdownSelect = exports.Container = void 0;
const material_1 = require("@mui/material");
const Icons_1 = require("./Icons");
const gray = '#f3f3f3';
exports.Container = (0, material_1.styled)('div') `
  position: relative;
  background-color: ${gray};
  border-radius: 8px;
`;
exports.DropdownSelect = (0, material_1.styled)('select')(({ theme }) => (0, material_1.css) `
  width: 185px;
  height: 32px;

  padding: 6px 28px 6px 6px;

  appearance: none;
  user-select: none;
  cursor: pointer;
  border: 0;
  outline: 0;
  border-radius: 8px;

  font-weight: 400;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  text-align: right;
  color: ${theme.palette.text.primary};

  background-color: ${gray};
  :focus, :hover {
    background-color: ${(0, material_1.darken)(gray, 0.03)};
  }
`);
exports.Option = (0, material_1.styled)('option') `
  background-color: ${gray};
`;
exports.ArrowIcon = (0, material_1.styled)(Icons_1.Icon)(({ theme }) => (0, material_1.css) `
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  color: ${theme.palette.primary.main};
  pointer-events: none;
`);
//# sourceMappingURL=styles.js.map