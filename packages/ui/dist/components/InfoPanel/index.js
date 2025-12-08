"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoPanel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ts_utils_1 = require("@arthurka/ts-utils");
const IconButton_1 = require("../IconButton");
const createStyledOptions_1 = require("../../utils/createStyledOptions");
const opts = (0, createStyledOptions_1.createStyledOptions)({
    biggerBottomPadding: true,
});
const Container = (0, material_1.styled)('div', opts)(({ biggerBottomPadding }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 358px;
  max-width: calc(100vw - 10px);
  ${biggerBottomPadding === true
    ? (0, material_1.css) `padding: 10px 10px 15px;`
    : (0, material_1.css) `padding: 10px;`}
  border-radius: 16px;

  background-color: #f1f1f1;
  box-shadow: 0 0 1px 1px rgba(200, 200, 200, 0.5);
`);
const TitleRow = (0, material_1.styled)('div') `
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  align-items: center;
`;
const TitleText = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.primary};
  overflow-wrap: anywhere;
  padding-right: 4px;
`);
const ControlRow = (0, material_1.styled)('div') `
  display: flex;
  justify-content: flex-end;
`;
const DescriptionText = (0, material_1.styled)('p')(({ theme }) => (0, material_1.css) `
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
  overflow-wrap: anywhere;
  margin: 0;
`);
const InfoPanel = ({ className, title, description, onClose, onStartQuickTour, onOpenTutorials, onPrevious, onNext, }) => ((0, jsx_runtime_1.jsxs)(Container, { className: className, biggerBottomPadding: (0, ts_utils_1.isUndefined)(onPrevious) && (0, ts_utils_1.isUndefined)(onNext), children: [(0, jsx_runtime_1.jsxs)(TitleRow, { children: [(0, jsx_runtime_1.jsx)(TitleText, { children: title }), !(0, ts_utils_1.isUndefined)(onStartQuickTour) && ((0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { icon: 'playCircled', variant: 'text', state: 'active', size: 'xs', onClick: onStartQuickTour })), !(0, ts_utils_1.isUndefined)(onOpenTutorials) && ((0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { icon: 'infoBook', variant: 'text', state: 'active', size: 'xs', onClick: onOpenTutorials })), (0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { icon: 'closeNoBackground', variant: 'text', size: 'xs', onClick: onClose })] }), (0, jsx_runtime_1.jsx)(DescriptionText, { children: description }), (0, ts_utils_1.isUndefined)(onPrevious) && (0, ts_utils_1.isUndefined)(onNext) ? null : ((0, jsx_runtime_1.jsxs)(ControlRow, { children: [(0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { icon: 'downArrow', rotate: 90, variant: 'text', size: 'xs-mobile', ...(0, ts_utils_1.isUndefined)(onPrevious)
                        ? { state: 'disabled', onClick: () => { } }
                        : { state: 'active', onClick: onPrevious } }), (0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { icon: 'downArrow', rotate: -90, variant: 'text', size: 'xs-mobile', ...(0, ts_utils_1.isUndefined)(onNext)
                        ? { state: 'disabled', onClick: () => { } }
                        : { state: 'active', onClick: onNext } })] }))] }));
exports.InfoPanel = InfoPanel;
//# sourceMappingURL=index.js.map