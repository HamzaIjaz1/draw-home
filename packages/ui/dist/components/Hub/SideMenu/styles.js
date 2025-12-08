"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileWrap = exports.IconButton = exports.VerticalBar = exports.MobileDrawer = exports.DesktopDrawer = exports.StyledMenuAccount = exports.Container = void 0;
const Drawer_1 = __importDefault(require("@mui/material/Drawer"));
const material_1 = require("@mui/material");
const MenuAccount_1 = require("../MenuAccount");
const IconButton_1 = require("../../IconButton");
const theme_1 = require("../../../theme");
exports.Container = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: var(--left-menu-width, 250px);
  flex-grow: 1;
`;
exports.StyledMenuAccount = (0, material_1.styled)(MenuAccount_1.MenuAccount) `
  border-top: 1px solid ${theme_1.backgroundSecondary};
`;
const commonDrawerStyles = (0, material_1.css) `
  --left-menu-width: 250px;
  --vertical-bar-width: 60px;
  flex-shrink: 0;
`;
exports.DesktopDrawer = (0, material_1.styled)(Drawer_1.default)(({ theme }) => (0, material_1.css) `
  ${commonDrawerStyles}
  width: var(--left-menu-width);

  display: none;
  ${theme.breakpoints.up('md')} {
    display: inherit;
  }
`);
exports.MobileDrawer = (0, material_1.styled)(Drawer_1.default)(({ theme }) => (0, material_1.css) `
  ${commonDrawerStyles}
  --left-menu-width: clamp(260px, 100vw - 60px, 330px);
  display: inherit;
  ${theme.breakpoints.up('md')} {
    display: none;
  }
`);
exports.VerticalBar = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  justify-content: center;
  width: var(--vertical-bar-width);
  height: 100%;
  background-color: #171a21;
  padding-top: ${theme.spacing(6)};
`);
exports.IconButton = (0, material_1.styled)(IconButton_1.IconButton)(({ theme }) => (0, material_1.css) `
  position: sticky;
  top: ${theme.spacing(6)};

  svg {
    width: 34px;
    height: 34px;
  }
`);
exports.MobileWrap = (0, material_1.styled)('div') `
  display: flex;
  flex-grow: 1;
`;
//# sourceMappingURL=styles.js.map