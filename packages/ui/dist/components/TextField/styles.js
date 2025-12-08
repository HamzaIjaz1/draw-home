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
exports.Label = exports.InputAdornment = exports.StyledInput = exports.FormControl = void 0;
const FormControl_1 = __importDefault(require("@mui/material/FormControl"));
const InputAdornment_1 = __importDefault(require("@mui/material/InputAdornment"));
const FilledInput_1 = __importStar(require("@mui/material/FilledInput"));
const material_1 = require("@mui/material");
const styles_1 = require("../../utils/styles");
const createStyledOptions_1 = require("../../utils/createStyledOptions");
const FormControlOptions = (0, createStyledOptions_1.createStyledOptions)({
    labeled: true,
});
exports.FormControl = (0, material_1.styled)(FormControl_1.default, FormControlOptions)(({ labeled, }) => (0, material_1.css) `
  width: ${labeled === true ? '100%' : 'fit-content'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${(0, styles_1.menuRowVerticalPadding)()}
`);
const textStyles = (0, material_1.css) `
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
`;
const InputOptions = (0, createStyledOptions_1.createStyledOptions)({
    _size: true,
    _variant: true,
});
const inputWidthCss = {
    xxs: 56,
    xs: 60,
    sm: 96,
    md: 164,
    lg: 232,
};
const getInputBackgroundColor = (theme, variant) => ({
    dark: '#f3f3f3',
    light: theme.palette.background.paper,
}[variant]);
exports.StyledInput = (0, material_1.styled)(FilledInput_1.default, InputOptions)(({ theme, _size, _variant }) => (0, material_1.css) `
  min-width: ${inputWidthCss[_size]}px;
  max-width: ${inputWidthCss[_size]}px;
  height: 32px;
  border-radius: 8px;
  background-color: ${getInputBackgroundColor(theme, _variant)};

  .MuiInputAdornment-root {
    pointer-events: none;
  }

  .${FilledInput_1.filledInputClasses.input} {
    padding: 6px;
    ${textStyles}
    text-align: right;
  }

  ${_variant === 'light' && (0, material_1.css) `
    :hover, &.${FilledInput_1.filledInputClasses.focused} {
      background-color: ${getInputBackgroundColor(theme, _variant)};
    }
  `}
`);
const AdornmentOpts = (0, createStyledOptions_1.createStyledOptions)({
    inputVariant: true,
});
const getAdornmentColor = (theme, iv) => ({
    dark: theme.palette.text.primary,
    light: theme.palette.text.disabled,
}[iv]);
exports.InputAdornment = (0, material_1.styled)(InputAdornment_1.default, AdornmentOpts)(({ theme, inputVariant }) => (0, material_1.css) `
  margin-left: -2px;

  .MuiTypography-root {
    ${textStyles}
    color: ${getAdornmentColor(theme, inputVariant)};
  }
`);
exports.Label = (0, material_1.styled)('label')(({ theme }) => (0, material_1.css) `
  display: inline-flex;
  align-items: center;
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${theme.palette.text.secondary};
  cursor: pointer;
  overflow-wrap: anywhere;
`);
//# sourceMappingURL=styles.js.map