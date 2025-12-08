"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesktopPageSubTitle = exports.DesktopTitles = exports.Container = void 0;
const material_1 = require("@mui/material");
exports.Container = (0, material_1.styled)('div') `
  display: flex;
  width: 100%;
`;
exports.DesktopTitles = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: none;
  ${theme.breakpoints.up('md')} {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`);
exports.DesktopPageSubTitle = (0, material_1.styled)('h4') `
  all: unset;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.01em;
  vertical-align: middle;
  color: #7a7e83;
  overflow-wrap: anywhere;
`;
//# sourceMappingURL=styles.js.map