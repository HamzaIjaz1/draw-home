"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const BaseButton_1 = require("../BaseButton");
const _props_1 = require("../../utils/$props");
const lookup_1 = require("../../utils/lookup");
const Button = (0, material_1.styled)(BaseButton_1.BaseButton, (0, _props_1.$props)())(({ theme, $state }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
  border-radius: 8px;

  ${(0, lookup_1.lookup)($state, {
    default: (0, material_1.css) `
      color: #727272;
    `,
    active: (0, material_1.css) `
      color: ${theme.palette.primary.main};
      background: #f9f9f9;
    `,
})}

  > * {
    flex: 0 0 auto;
  }
`);
const OptionButton = ({ className, children, state, onClick, }) => ((0, jsx_runtime_1.jsx)(Button, { className: className, variant: 'text', onClick: onClick, "$state": state, children: children }));
exports.OptionButton = OptionButton;
//# sourceMappingURL=index.js.map