"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.WithText = exports.IconButton = exports.Container = void 0;
const material_1 = require("@mui/material");
const styles_1 = require("../../utils/styles");
const BaseButton_1 = require("../BaseButton");
const createStyledOptions_1 = require("../../utils/createStyledOptions");
exports.Container = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
  ${(0, styles_1.menuRowPadding)()}
  padding-bottom: 8px;
`;
const ButtonOptions = (0, createStyledOptions_1.createStyledOptions)({
    state: true,
});
exports.IconButton = (0, material_1.styled)(BaseButton_1.BaseButton, ButtonOptions)(({ theme, state }) => (0, material_1.css) `
  min-width: 48px;
  min-height: 48px;
  border-radius: 8px;
  background: none;
  box-shadow: none;
  border: 1px solid ${theme.palette.background.paper};
  padding: 0;

  ${state === 'active' && (0, material_1.css) `
    border: 1px solid #d7d7d7;
    && {
      background-color: #efecf3;
    }
  `}

  ${state === 'disabled' && (0, material_1.css) `
    filter: grayscale(100%);
  `}
`);
exports.WithText = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
exports.Text = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: ${theme.palette.text.secondary};
`);
//# sourceMappingURL=styles.js.map