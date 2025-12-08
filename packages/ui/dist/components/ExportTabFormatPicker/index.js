"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportTabFormatPicker = ExportTabFormatPicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const RadioGroup_1 = require("../RadioGroup");
const styles_1 = require("../../utils/styles");
const Container = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 ${styles_1.menuHorizontalGutterWidth}px;
`;
const Title = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
`);
function ExportTabFormatPicker({ className, title, formats, chosenFormat, onChange, }) {
    return ((0, jsx_runtime_1.jsxs)(Container, { className: className, children: [(0, jsx_runtime_1.jsx)(Title, { children: title }), (0, jsx_runtime_1.jsx)(RadioGroup_1.RadioGroup, { direction: 'column', value: chosenFormat, options: formats.map(e => ({ label: e, value: e })), onChange: e => onChange(e) })] }));
}
//# sourceMappingURL=index.js.map