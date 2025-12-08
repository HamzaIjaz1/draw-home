"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesktopTitle = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
exports.DesktopTitle = (0, material_1.styled)(Typography_1.default) `
  font-size: 32px;
  font-weight: 600;
  line-height: 32px;
`;
//# sourceMappingURL=styles.js.map