"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainHeading = exports.Container = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
exports.Container = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  width: var(--left-menu-width, 250px);
  gap: ${theme.spacing(15)};
  padding: ${theme.spacing(10, 9, 15)};
`);
exports.MainHeading = (0, material_1.styled)(Typography_1.default) `
  font-size: 23px;
  font-weight: 500;
  line-height: 1em;
  text-align: left;
  vertical-align: middle;
  color: #222733;
  position: relative;
  top: -1.5px;
`;
//# sourceMappingURL=styles.js.map