"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionWrap = exports.SuggestionText = exports.ProjectsLayout = exports.TemplatesLayout = void 0;
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const constants_1 = require("../ProjectCard/constants");
const styles_1 = require("../TemplateButton/styles");
exports.TemplatesLayout = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${styles_1.TEMPLATE_BUTTON_WIDTH}, 1fr));
  justify-items: center;
  gap: ${theme.spacing(5, 3)};

  ${theme.breakpoints.up('md')} {
    gap: ${theme.spacing(7, 5)};
  }
`);
exports.ProjectsLayout = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  --project-card-width: ${constants_1.CARD_WIDTH_MOBILE};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--project-card-width), 1fr));
  justify-items: center;
  gap: ${theme.spacing(3)};

  ${theme.breakpoints.up('md')} {
    --project-card-width: ${constants_1.CARD_WIDTH_DESKTOP};
  }
`);
exports.SuggestionText = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  color: ${theme.palette.common.black};
`);
exports.SuggestionWrap = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing(4)};

  ${theme.breakpoints.up('md')} {
    flex-direction: row;
    justify-content: space-evenly;
    gap: 0;
  }
`);
//# sourceMappingURL=styles.js.map