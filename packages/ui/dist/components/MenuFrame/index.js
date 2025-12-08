"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuFrame = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Paper_1 = __importDefault(require("@mui/material/Paper"));
const material_1 = require("@mui/material");
const react_1 = require("react");
const createStyledOptions_1 = require("../../utils/createStyledOptions");
const opts = (0, createStyledOptions_1.createStyledOptions)({
    corners: true,
});
const getBorderRadius = (corners) => {
    const top = corners.top === 'angular' ? '0 0' : '16px 16px';
    const down = corners.down === 'angular' ? '0 0' : '16px 16px';
    return `${top} ${down}`;
};
const Frame = (0, material_1.styled)(Paper_1.default, opts)(({ corners }) => (0, material_1.css) `
  width: fit-content;
  padding: 5px 0 10px 0;
  box-shadow: 0px 0px 5px 0px #0000004d;
  border-radius: ${getBorderRadius(corners)};
  z-index: 3;
`);
exports.MenuFrame = (0, react_1.forwardRef)(({ className, children, corners = {}, onPointerEnter, onPointerLeave, }, ref) => ((0, jsx_runtime_1.jsx)(Frame, { ref: ref, className: className, corners: corners, onPointerEnter: onPointerEnter, onPointerLeave: onPointerLeave, children: children })));
//# sourceMappingURL=index.js.map