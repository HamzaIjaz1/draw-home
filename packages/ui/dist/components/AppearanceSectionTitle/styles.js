"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = void 0;
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const identity_1 = require("../../utils/identity");
exports.Title = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-weight: 700;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};

  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`);
exports.Title.defaultProps = (0, identity_1.identity)({ component: 'span' });
//# sourceMappingURL=styles.js.map