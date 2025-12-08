"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageCompareSlider = exports.ImgStyles = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_compare_slider_1 = require("react-compare-slider");
const material_1 = require("@mui/material");
const SliderHandle_1 = require("./SliderHandle");
exports.ImgStyles = (0, material_1.css) `
  width: 187px;
  height: 187px;
  border-radius: 50%;
`;
const ReactCompareSlider = (0, material_1.styled)(react_compare_slider_1.ReactCompareSlider) `
  ${exports.ImgStyles}
`;
const ImageCompareSlider = ({ className, imgOne, imgTwo, }) => ((0, jsx_runtime_1.jsx)(ReactCompareSlider, { className: className, itemOne: imgOne, itemTwo: imgTwo, handle: (0, jsx_runtime_1.jsx)(SliderHandle_1.SliderHandle, {}) }));
exports.ImageCompareSlider = ImageCompareSlider;
//# sourceMappingURL=index.js.map