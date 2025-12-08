"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = exports.AccordionDetails = exports.AccordionSummary = exports.MobileAccordion = exports.DesktopContent = void 0;
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Accordion_1 = __importDefault(require("@mui/material/Accordion"));
const AccordionSummary_1 = __importStar(require("@mui/material/AccordionSummary"));
const AccordionDetails_1 = __importDefault(require("@mui/material/AccordionDetails"));
const desktopGapBetweenTitleAndChildren = 7.5;
exports.DesktopContent = (0, material_1.styled)('div')(({ theme }) => (0, material_1.css) `
  width: 100%;
  display: none;

  ${theme.breakpoints.up('md')} {
    display: flex;
    flex-direction: column;
  }
`);
exports.MobileAccordion = (0, material_1.styled)(Accordion_1.default)(({ theme }) => (0, material_1.css) `
  ${theme.breakpoints.up('md')} {
    display: none;
  }
`);
const TypeOptions = {
    shouldForwardProp: e => !['type'].includes(e),
};
exports.AccordionSummary = (0, material_1.styled)(AccordionSummary_1.default, TypeOptions)(({ type }) => (0, material_1.css) `
  border-radius: 4px;
  padding: 0;
  min-height: 24px;
  pointer-events: ${type === 'always-static' ? 'none' : 'auto'};

  .${AccordionSummary_1.accordionSummaryClasses.content} {
    margin: 0;
  }
`);
exports.AccordionDetails = (0, material_1.styled)(AccordionDetails_1.default)(({ theme }) => (0, material_1.css) `
  padding: ${theme.spacing(5, 0, 0, 0)};

  ${theme.breakpoints.up('md')} {
    padding: ${theme.spacing(desktopGapBetweenTitleAndChildren, 0, 0, 0)};
  }
`);
exports.Title = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  font-size: 15px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${theme.palette.general.purpleGray};

  ${theme.breakpoints.up('md')} {
    margin-bottom: ${theme.spacing(desktopGapBetweenTitleAndChildren)};
  }
`);
//# sourceMappingURL=styles.js.map