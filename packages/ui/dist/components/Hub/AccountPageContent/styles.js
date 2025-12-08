"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomLinksContainer = exports.MainFormContainer = exports.AvatarButton = exports.AvatarContainer = exports.Avatar = exports.AvatarAndFormContainer = exports.PaddedTitledIsle = void 0;
const material_1 = require("@mui/material");
const Avatar_1 = __importDefault(require("@mui/material/Avatar"));
const CommonPageComponents_1 = require("../CommonPageComponents");
exports.PaddedTitledIsle = (0, material_1.styled)(CommonPageComponents_1.TitledIsle) `
  .MuiAccordionDetails-root {
    padding-left: 12px;
    padding-right: 12px;
  }
`;
exports.AvatarAndFormContainer = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  width: 100%;
  margin-bottom: 62px;

  ${theme.breakpoints.down('md')} {
    flex-direction: column;
  }
`);
exports.Avatar = (0, material_1.styled)(Avatar_1.default)(({ theme }) => (0, material_1.css) `
  width: 100px;
  height: 100px;
  outline: 1px solid ${theme.palette.primary.main};
`);
exports.AvatarContainer = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  padding-right: 40px;
  margin-bottom: 40px;

  ${theme.breakpoints.down('md')} {
    padding-right: 0;
    display: flex;
    justify-content: center;
  }
`);
exports.AvatarButton = (0, material_1.styled)('button') `
  all: unset;
  border-radius: 50%;
  cursor: pointer;
`;
exports.MainFormContainer = (0, material_1.styled)('div') `
  width: 100%;
`;
exports.BottomLinksContainer = (0, material_1.styled)('div') `
  display: flex;
  justify-content: space-between;
`;
//# sourceMappingURL=styles.js.map