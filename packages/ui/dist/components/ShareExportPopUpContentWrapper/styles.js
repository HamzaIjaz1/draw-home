"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseButton = exports.Content = exports.Title = exports.Header = exports.Container = void 0;
const material_1 = require("@mui/material");
const IconButton_1 = require("../IconButton");
const styles_1 = require("../../utils/styles");
exports.Container = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 0;
`;
exports.Header = (0, material_1.styled)('div') `
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-bottom: 16px;
`;
exports.Title = (0, material_1.styled)(material_1.Typography) `
  font-weight: 500;
  font-size: 19px;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: center;
  max-width: 75%;
  overflow-wrap: anywhere;
`;
exports.Content = (0, material_1.styled)('div') `
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;
exports.CloseButton = (0, material_1.styled)(IconButton_1.IconButton) `
  position: absolute;
  right: ${styles_1.menuHorizontalGutterWidth}px;
`;
//# sourceMappingURL=styles.js.map