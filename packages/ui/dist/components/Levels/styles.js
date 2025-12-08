"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItem = void 0;
const material_1 = require("@mui/material");
const styles_1 = require("../../utils/styles");
const color = '#ffddd6';
const ListItemOptions = {
    shouldForwardProp: e => !['highlighted'].includes(e),
};
exports.ListItem = (0, material_1.styled)('li', ListItemOptions)(({ highlighted }) => (0, material_1.css) `
  list-style-type: none;
  cursor: pointer;
  border-radius: 8px;
  margin-left: ${styles_1.menuHorizontalGutterWidth}px;
  margin-right: ${styles_1.menuHorizontalGutterWidth}px;

  ${highlighted === true ? (0, material_1.css) `
    background-color: ${color};
  ` : (0, material_1.css) `
    :hover {
      background-color: ${(0, material_1.lighten)(color, 0.5)};
    }
  `}
`);
//# sourceMappingURL=styles.js.map