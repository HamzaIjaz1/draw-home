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
exports.IconButton = exports.iconCss = exports.Image = exports.Text = exports.AccordionDetails = exports.AccordionSummary = exports.Accordion = exports.cssVars = void 0;
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Accordion_1 = __importDefault(require("@mui/material/Accordion"));
const AccordionSummary_1 = __importStar(require("@mui/material/AccordionSummary"));
const AccordionDetails_1 = __importDefault(require("@mui/material/AccordionDetails"));
const material_1 = require("@mui/material");
const IconButton_1 = require("../IconButton");
const styles_1 = require("../../utils/styles");
const _props_1 = require("../../utils/$props");
const lookup_1 = require("../../utils/lookup");
exports.cssVars = {
    rootPaddingBottom: '--menu-section-root-padding-bottom',
};
exports.Accordion = (0, material_1.styled)(Accordion_1.default, (0, _props_1.$props)())(({ $divider }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  ::before {
    display: none;
  }

  ${$divider === true && styles_1.absoluteDividerCss}

  padding-bottom: ${(0, styles_1.getCssVar)(exports.cssVars.rootPaddingBottom)};
`);
const typeToPointerEvents = {
    buttonlike: 'auto',
    collapsible: 'auto',
    static: 'none',
};
exports.AccordionSummary = (0, material_1.styled)(AccordionSummary_1.default, (0, _props_1.$props)())(({ theme, $type, $divider, $withIconButton, }) => (0, material_1.css) `
  border-radius: 4px;
  pointer-events: ${typeToPointerEvents[$type]};
  ${(0, styles_1.menuRowHorizontalPadding)()}

  ${$type === 'buttonlike' && (0, material_1.css) `
    :hover {
      background-color: ${(0, material_1.alpha)(theme.palette.action.hover, theme.palette.action.hoverOpacity)};
    }
  `}

  ${$divider === true && (0, styles_1.getAbsoluteDividerCss)((0, material_1.css) `
    bottom: 1px;
  `)}

  .${AccordionSummary_1.accordionSummaryClasses.content} {
    align-items: center;
    gap: ${$withIconButton === true ? '4px' : '8px'};
    margin: 0;
  }
`);
exports.AccordionDetails = (0, material_1.styled)(AccordionDetails_1.default) `
  padding: 0;
`;
exports.Text = (0, material_1.styled)(Typography_1.default, (0, _props_1.$props)())(({ theme, $titleVariant, $titleSize = '17px', }) => (0, material_1.css) `
  font-size: ${$titleSize};
  line-height: 1;
  white-space: normal;

  ${(0, lookup_1.lookup)($titleVariant, {
    'primary-600': (0, material_1.css) `
      font-weight: 600;
      color: ${theme.palette.text.primary};
    `,
    'primary-500': (0, material_1.css) `
      font-weight: 500;
      color: ${theme.palette.text.primary};
    `,
    'primary-400': (0, material_1.css) `
      font-weight: 400;
      color: ${theme.palette.text.primary};
    `,
    pale: (0, material_1.css) `
      font-weight: 400;
      color: ${theme.palette.text.secondary};
    `,
})}
`);
exports.Image = (0, material_1.styled)('img') `
  object-fit: contain;
`;
exports.iconCss = (0, material_1.css) `
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
`;
exports.IconButton = (0, material_1.styled)(IconButton_1.IconButton) `
  pointer-events: auto;
`;
//# sourceMappingURL=styles.js.map