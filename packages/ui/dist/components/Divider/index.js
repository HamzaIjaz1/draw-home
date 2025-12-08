"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Divider_1 = __importDefault(require("@mui/material/Divider"));
const styles_1 = require("../../utils/styles");
const _props_1 = require("../../utils/$props");
const StyledDivider = (0, material_1.styled)(Divider_1.default, (0, _props_1.$props)())(({ $fullWidth }) => (0, material_1.css) `
  ${$fullWidth === false && (0, material_1.css) `
    width: calc(100% - ${2 * styles_1.menuHorizontalGutterWidth}px);
  `};

  && {
    margin: 0 auto;
  }
`);
const Divider = ({ className, fullWidth = false }) => ((0, jsx_runtime_1.jsx)(StyledDivider, { className: className, "$fullWidth": fullWidth, "aria-hidden": 'true' }));
exports.Divider = Divider;
//# sourceMappingURL=index.js.map