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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButton = exports.Content = exports.Title = exports.Container = void 0;
const material_1 = require("@mui/material");
const Dialog_1 = __importStar(require("@mui/material/Dialog"));
const DialogTitle_1 = __importDefault(require("@mui/material/DialogTitle"));
const DialogContent_1 = __importDefault(require("@mui/material/DialogContent"));
const IconButton_1 = require("../../IconButton");
const theme_1 = require("../../../theme");
exports.Container = (0, material_1.styled)(Dialog_1.default)(({ theme, open }) => (0, material_1.css) `
  --dialog-paper-padding-inline:
    clamp(${theme.spacing(6)}, 21.1765vw - ${theme.spacing(14.6472)}, ${theme.spacing(33)});

  backdrop-filter: blur(5px);

  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .${Dialog_1.dialogClasses.paper} {
    padding-top: ${theme.spacing(15)};
    padding-bottom: ${theme.spacing(10)};
    padding-left: var(--dialog-paper-padding-inline);
    padding-right: var(--dialog-paper-padding-inline);

    margin: 0;
    box-shadow: ${theme_1.accentShadow};
    border-radius: 15px;
    width: calc(100% - ${theme.spacing(2 * 3)});
    max-width: 600px;

    /* unset value allows CloseButton to be seen outside of a paper box */
    overflow-y: unset;
  }

  ${open === false && (0, material_1.css) `
    * {
      pointer-events: none;
    }
  `}

  ${theme.breakpoints.up('md')} {
    --dialog-paper-padding-inline: ${theme.spacing(33)};
  }
`);
exports.Title = (0, material_1.styled)(DialogTitle_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  padding: ${theme.spacing(0, 0, 7.5)};
`);
exports.Content = (0, material_1.styled)(DialogContent_1.default)(({ theme }) => (0, material_1.css) `
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(7.5)};
`);
exports.IconButton = (0, material_1.styled)(IconButton_1.IconButton)(({ theme }) => (0, material_1.css) `
  position: absolute;
  top: -54px;
  right: -10px;
  z-index: 1;

  width: 52px;
  height: 52px;

  ${theme.breakpoints.up('md')} {
    top: -10px;
    right: -54px;
  }

  svg {
    width: 34px;
    height: 34px;
  }
`);
//# sourceMappingURL=styles.js.map