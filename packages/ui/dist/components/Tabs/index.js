"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = exports.Tab = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Tabs_1 = __importStar(require("@mui/material/Tabs"));
const Tab_1 = __importStar(require("@mui/material/Tab"));
const react_1 = require("react");
const theme_1 = require("../../theme");
const _props_1 = require("../../utils/$props");
const styles_1 = require("../../utils/styles");
const tabHeight = '32px';
const TabGroup = (0, material_1.styled)(Tabs_1.default, (0, _props_1.$props)())(({ theme, $stretch }) => (0, material_1.css) `
  background-color: ${theme_1.backgroundSecondary};
  border-radius: 10px;
  min-height: ${tabHeight};
  height: ${tabHeight};
  margin-left: ${styles_1.menuHorizontalGutterWidth}px;
  margin-right: ${styles_1.menuHorizontalGutterWidth}px;
  overflow: visible;

  ${$stretch === true && (0, material_1.css) `
    flex: 1;

    .${Tab_1.tabClasses.root} {
      flex: 1;
    }
  `}
  ${$stretch === false && (0, material_1.css) `
    width: fit-content;
  `}

  .${Tabs_1.tabsClasses.flexContainer} {
    position: relative;
    padding: 0 3px;
    z-index: 1;
  }

  .${Tabs_1.tabsClasses.indicator} {
    top: 3px;
    bottom: 3px;
    right: 3px;
    height: auto;
    border-radius: 6px;
    background-color: ${theme.palette.background.paper};
  }

  .${Tabs_1.tabsClasses.scroller} {
    overflow: visible !important;
  }
`);
const TabStyled = (0, material_1.styled)(Tab_1.default)(({ theme }) => (0, material_1.css) `
  min-height: ${tabHeight};
  height: ${tabHeight};
  min-width: 56px;
  max-width: unset;
  padding: 4px 6px;

  ${theme.breakpoints.up('md')} {
    min-width: 68px;
  }

  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  opacity: 0.6;
  color: ${theme.palette.text.primary};
  text-transform: initial;

  :hover, :focus {
    opacity: 1;
  }

  &.${Tab_1.tabClasses.selected} {
    color: ${theme.palette.text.primary};
    opacity: 1;
  }
`);
const Tab = ({ className, label, Wrapper = react_1.Fragment, 
// MUI Tabs component passes props to its children
...rest }) => ((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)(TabStyled, { ...rest, className: className, label: label, disableTouchRipple: true, tabIndex: 0 }) }));
exports.Tab = Tab;
const Tabs = ({ className, children, chosenTab, onClick, stretch = false, }) => ((0, jsx_runtime_1.jsx)(TabGroup, { className: className, "$stretch": stretch, value: chosenTab, onChange: (_, index) => onClick(index), children: children }));
exports.Tabs = Tabs;
//# sourceMappingURL=index.js.map