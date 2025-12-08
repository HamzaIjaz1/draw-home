"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledButton = void 0;
const material_1 = require("@mui/material");
const Button_1 = require("@mui/material/Button");
const BaseButton_1 = require("../../../BaseButton");
exports.StyledButton = (0, material_1.styled)(BaseButton_1.BaseButton)(({ theme }) => (0, material_1.css) `
  height: 55px;
  border-radius: 63px;
  font-size: 17px;
  font-weight: 500;
  line-height: 25.5px;
  &.${Button_1.buttonClasses.disabled} {
    color: ${theme.palette.form.disabled};
    border-color: ${theme.palette.form.disabled};
  }
`);
//# sourceMappingURL=styles.js.map