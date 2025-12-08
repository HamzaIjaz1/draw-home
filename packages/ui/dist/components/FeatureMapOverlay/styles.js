"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textStyles = void 0;
const material_1 = require("@mui/material");
const textStyles = (theme, opts) => (0, material_1.css) `
  font-family: Caveat;
  font-weight: 700;
  line-height: 1em;
  letter-spacing: 0.5px;
  text-align: center;
  color: #999;
  user-select: none;

  ${opts === 'omitSize' ? '' : (0, material_1.css) `
    font-size: 15px;
    ${theme.breakpoints.up('md')} {
      font-size: 24px;
    }
  `}
`;
exports.textStyles = textStyles;
//# sourceMappingURL=styles.js.map