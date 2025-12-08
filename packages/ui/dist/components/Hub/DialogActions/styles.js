"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = void 0;
const material_1 = require("@mui/material");
const DialogActions_1 = __importDefault(require("@mui/material/DialogActions"));
const options = {
    shouldForwardProp: e => !['onlyPrimary'].includes(e),
};
exports.Actions = (0, material_1.styled)(DialogActions_1.default, options)(({ theme, onlyPrimary }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
  gap: ${theme.spacing(4)};

  ${theme.breakpoints.up(470)} {
    flex-direction: row;
    justify-content: ${onlyPrimary ? 'center' : 'space-between'};
  }

  && button {
    margin: 0;
  }
`);
//# sourceMappingURL=styles.js.map