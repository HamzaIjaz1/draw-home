"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PencilIcon = exports.BinIcon = exports.getIconCss = exports.iconCssVariable = exports.Text = exports.ListItemIcon = exports.MenuItem = exports.MenuList = exports.Container = void 0;
const material_1 = require("@mui/material");
const Paper_1 = __importDefault(require("@mui/material/Paper"));
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
const ListItemIcon_1 = __importDefault(require("@mui/material/ListItemIcon"));
const MenuList_1 = __importDefault(require("@mui/material/MenuList"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const constants_1 = require("../constants");
const styles_1 = require("../../../../utils/styles");
const Icons_1 = require("../../../Icons");
exports.Container = (0, material_1.styled)(Paper_1.default)(({ theme }) => (0, material_1.css) `
  position: absolute;
  top: calc(100% + ${theme.spacing(3)});
  z-index: 1;
  width: ${constants_1.CARD_WIDTH_MOBILE};
  border-radius: 5px;

  ${theme.breakpoints.up('md')} {
    width: ${constants_1.CARD_WIDTH_DESKTOP};
  }
`);
exports.MenuList = (0, material_1.styled)(MenuList_1.default) `
  padding: 0;
`;
exports.MenuItem = (0, material_1.styled)(MenuItem_1.default)(({ theme }) => (0, material_1.css) `
  padding: ${theme.spacing(0, 3, 0, 1)};
  height: 30px;
  min-height: unset;

  :hover {
    background-color: #ffefed;
  }
`);
exports.ListItemIcon = (0, material_1.styled)(ListItemIcon_1.default) `
  justify-content: center;
`;
exports.Text = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  color: ${theme.palette.general.purpleGray};

  li:hover &, li:focus & {
    color: ${theme.palette.primary.main};
  }
`);
exports.iconCssVariable = '--project-card-menu-option-icon';
const getIconCss = (theme) => (0, material_1.css) `
  ${(0, styles_1.setCssVar)(exports.iconCssVariable, theme.palette.general.purpleGray)}
  li:hover &, li:focus & {
    ${(0, styles_1.setCssVar)(exports.iconCssVariable, theme.palette.primary.main)}
  }
`;
exports.getIconCss = getIconCss;
exports.BinIcon = (0, material_1.styled)(Icons_1.BinIcon) `
   width: 20px;
   height: 20px;
`;
exports.PencilIcon = (0, material_1.styled)(Icons_1.PencilIcon) `
  width: 14px;
  height: 18px;
`;
//# sourceMappingURL=styles.js.map