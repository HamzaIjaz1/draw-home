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
exports.Container = exports.cssVars = void 0;
const material_1 = require("@mui/material");
const Dialog_1 = __importStar(require("@mui/material/Dialog"));
const theme_1 = require("../../theme");
const styles_1 = require("../../utils/styles");
exports.cssVars = {
    padding: '--popup-base-paper-padding',
};
exports.Container = (0, material_1.styled)(Dialog_1.default)(({ open }) => (0, material_1.css) `
  backdrop-filter: blur(5px);

  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .${Dialog_1.dialogClasses.paper} {
    padding: ${(0, styles_1.getCssVar)(exports.cssVars.padding)};
    margin: 0;
    box-shadow: ${theme_1.accentShadow};
    border-radius: 20px;
    width: calc(100% - 24px);
    max-width: 450px;
    align-items: center;
  }

  ${open === false && (0, material_1.css) `
    * {
      pointer-events: none;
    }
  `}
`);
//# sourceMappingURL=styles.js.map