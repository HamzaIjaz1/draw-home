"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionButtonTitle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Title = (0, material_1.styled)('span') `
  font-family: Inter;
  font-weight: 400;
  font-size: 8px;
  line-height: 1;
  letter-spacing: 0px;
  text-align: center;
  color: #727272;
`;
const OptionButtonTitle = ({ className, children }) => ((0, jsx_runtime_1.jsx)(Title, { className: className, children: children }));
exports.OptionButtonTitle = OptionButtonTitle;
//# sourceMappingURL=OptionButtonTitle.js.map