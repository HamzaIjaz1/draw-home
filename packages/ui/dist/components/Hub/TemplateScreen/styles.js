"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buttons = exports.Tabs = exports.Title = exports.Container = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
exports.Container = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(5)};

  width: 100%;
  height: 100%;
  padding: ${theme.spacing(4)};

  ${theme.breakpoints.up(640)} {
    padding: ${theme.spacing(5)};
  }
  ${theme.breakpoints.up(1024)} {
    padding: ${theme.spacing(7)};
  }
  ${theme.breakpoints.up(1440)} {
    gap: ${theme.spacing(7)};
  }
  ${theme.breakpoints.up(1920)} {
    padding: ${theme.spacing(10)};
  }
`);
exports.Title = (0, material_1.styled)(Typography_1.default) `
  font-size: 32px;
  font-weight: 600;
  line-height: 37.5px;
`;
exports.Tabs = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing(2.5)};

  ${theme.breakpoints.up(1440)} {
    gap: ${theme.spacing(4)};
  }
`);
exports.Buttons = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing(5)};
  justify-items: center;
`);
//# sourceMappingURL=styles.js.map