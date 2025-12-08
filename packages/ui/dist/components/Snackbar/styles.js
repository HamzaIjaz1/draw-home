"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledSnackbar = void 0;
const Snackbar_1 = __importDefault(require("@mui/material/Snackbar"));
const material_1 = require("@mui/material");
const createStyledOptions_1 = require("../../utils/createStyledOptions");
const CommonOptions = (0, createStyledOptions_1.createStyledOptions)({
    type: true,
});
const getBorderColor = (theme, type) => {
    const colors = {
        success: theme.palette.general.successBorder,
        warning: theme.palette.primary.main,
        neutral: theme.palette.text.secondary,
    };
    return colors[type];
};
exports.StyledSnackbar = (0, material_1.styled)(Snackbar_1.default, CommonOptions)(({ theme, type }) => (0, material_1.css) `
  & .MuiSnackbarContent-root {
    background-color: ${theme.palette.background.paper};
    color: ${theme.palette.text.primary};
    font-size: 12px;
    font-weight: 400;
    width: 430px;
    ${theme.breakpoints.down('md')} {
      width: auto;
    }
    border: 1px solid ${getBorderColor(theme, type)};
  }
  & .MuiSnackbarContent-message {
    padding: 4px 0;
  }
`);
//# sourceMappingURL=styles.js.map