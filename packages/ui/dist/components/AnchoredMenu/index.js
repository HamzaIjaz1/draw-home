"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnchoredMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ClickAwayListener_1 = require("@mui/base/ClickAwayListener");
const material_1 = require("@mui/material");
const List_1 = __importDefault(require("@mui/material/List"));
const MenuFrame_1 = require("../MenuFrame");
const Container = (0, material_1.styled)('div') `
  position: relative;
`;
const Menu = (0, material_1.styled)(MenuFrame_1.MenuFrame)(({ theme }) => (0, material_1.css) `
  width: 280px;
  padding: 0;

  position: absolute;
  top: 50%;
  right: 60px;
  transform: translateY(-50%);

  ${theme.breakpoints.up('md')} {
    right: 68px;
  }
`);
const List = (0, material_1.styled)(List_1.default) `
  padding: 0;
`;
const AnchoredMenu = ({ className, TriggerComp, open, onClose, children, }) => ((0, jsx_runtime_1.jsx)(ClickAwayListener_1.ClickAwayListener, { onClickAway: onClose, children: (0, jsx_runtime_1.jsxs)(Container, { className: className, children: [TriggerComp, open === true && ((0, jsx_runtime_1.jsx)(Menu, { children: (0, jsx_runtime_1.jsx)(List, { children: children }) }))] }) }));
exports.AnchoredMenu = AnchoredMenu;
//# sourceMappingURL=index.js.map