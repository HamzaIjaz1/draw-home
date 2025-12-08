"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineAction = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Button = (0, material_1.styled)('button') `
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  cursor: pointer;
  text-decoration: none;
  display: inline;
`;
const InlineAction = (props) => ((0, jsx_runtime_1.jsx)(Button, { ...props }));
exports.InlineAction = InlineAction;
//# sourceMappingURL=InlineAction.js.map