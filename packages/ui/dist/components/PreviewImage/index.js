"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewImage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ImageCompareSlider_1 = require("../ImageCompareSlider");
const Img = (0, material_1.styled)('img') `
  ${ImageCompareSlider_1.ImgStyles}
`;
const PreviewImage = ({ className, src, alt, }) => ((0, jsx_runtime_1.jsx)(Img, { className: className, src: src, alt: alt }));
exports.PreviewImage = PreviewImage;
//# sourceMappingURL=index.js.map