"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaywallMenuContent = exports.PaywallMenuHeader = exports.PaywallMenuAlert = exports.PaywallMenuDescription = exports.PaywallMenuCards = void 0;
const material_1 = require("@mui/material");
const styles_1 = require("../utils/styles");
exports.PaywallMenuCards = (0, material_1.styled)('div') `
  display: flex;
  align-items: stretch;
  gap: 16px;
  height: 100%;
  padding: 20px 16px 20px;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scroll-behavior: smooth;
`;
exports.PaywallMenuDescription = (0, material_1.styled)('p')(({ theme }) => (0, material_1.css) `
  all: unset;
  display: flex;
  flex-direction: column;

  ${(0, styles_1.menuRowHorizontalPadding)()}

  font-family: DM Sans;
  font-weight: 400;
  font-size: 17px;
  line-height: 1.1;
  letter-spacing: 0px;
  text-align: center;
  color: ${theme.palette.text.secondary};
`);
exports.PaywallMenuAlert = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  ${(0, styles_1.menuRowHorizontalPadding)()}

  font-family: DM Sans;
  font-weight: 400;
  font-size: 17px;
  line-height: 1.1;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
`);
exports.PaywallMenuHeader = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  gap: 16px;
  padding-top: 16px;
  position: relative;
`;
exports.PaywallMenuContent = (0, material_1.styled)('div') `
  flex: 1 1 auto;
  overflow-y: auto;
`;
//# sourceMappingURL=PaywallMenuMisc.js.map