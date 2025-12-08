"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = void 0;
const material_1 = require("@mui/material");
const createStyledOptions_1 = require("../../utils/createStyledOptions");
const styles_1 = require("../../utils/styles");
const options = (0, createStyledOptions_1.createStyledOptions)({
    onlyPrimary: true,
    paddingHorizontal: true,
});
exports.Actions = (0, material_1.styled)('div', options)(({ theme, onlyPrimary, paddingHorizontal }) => (0, material_1.css) `
  display: flex;
  flex-direction: row;
  justify-content: ${onlyPrimary === true ? 'center' : 'space-between'};
  padding: ${paddingHorizontal === false ? 0 : `0 ${styles_1.menuHorizontalGutterWidth}px`};

  ${theme.breakpoints.up(400)} {
    justify-content: center;
    gap: 20px;
  }
`);
//# sourceMappingURL=styles.js.map