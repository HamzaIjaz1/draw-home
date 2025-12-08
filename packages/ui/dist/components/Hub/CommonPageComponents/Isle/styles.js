"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const material_1 = require("@mui/material");
const theme_1 = require("../../../../theme");
exports.Container = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  background-color: ${theme.palette.background.paper};
  box-shadow: ${theme_1.slightShadow};
  border-radius: 10px;
  padding: ${theme.spacing(5, 3)};

  ${theme.breakpoints.up('sm')} {
    padding: ${theme.spacing(5, 3)};
  }
  ${theme.breakpoints.up('md')} {
    padding: ${theme.spacing(7.5)};
  }
`);
//# sourceMappingURL=styles.js.map