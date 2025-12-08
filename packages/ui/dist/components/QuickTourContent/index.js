"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickTourContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ts_utils_1 = require("@arthurka/ts-utils");
const IconButton_1 = require("../IconButton");
const contentWidth = 330;
const padding = 10;
const Container = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  width: ${contentWidth + 2 * padding}px;
  max-width: 100%;
`;
const Header = (0, material_1.styled)('div') `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: ${padding}px;
  max-height: 24px;
`;
const Content = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 4px ${padding}px ${padding}px;
`;
const TextContainer = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Badge = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
`);
const Title = (0, material_1.styled)('h3') `
  font-weight: 500;
  font-size: 19px;
  line-height: 100%;
  letter-spacing: 0px;
  overflow-wrap: break-word;
  margin: 0;
`;
const Description = (0, material_1.styled)('p')(({ theme }) => (0, material_1.css) `
  font-weight: 400;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
  overflow-wrap: break-word;
  margin: 0;
`);
const QuickTourContent = ({ className, badgeText, title, description, media, onClose, }) => ((0, jsx_runtime_1.jsxs)(Container, { className: className, children: [(0, jsx_runtime_1.jsxs)(Header, { children: [(0, jsx_runtime_1.jsx)(Badge, { children: badgeText }), (0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { icon: 'closeNoBackground', size: 'xs', variant: 'text', onClick: onClose })] }), (0, jsx_runtime_1.jsxs)(Content, { children: [(0, jsx_runtime_1.jsxs)(TextContainer, { children: [(0, jsx_runtime_1.jsx)(Title, { children: title }), (0, jsx_runtime_1.jsx)(Description, { children: description })] }), !(0, ts_utils_1.isNull)(media) && media.type === 'video' && ((0, jsx_runtime_1.jsx)("video", { src: media.src, width: contentWidth, height: 160, autoPlay: true, muted: true })), !(0, ts_utils_1.isNull)(media) && media.type === 'image' && ((0, jsx_runtime_1.jsx)("img", { src: media.src, width: contentWidth, height: 160, style: { objectFit: 'fill' } }))] })] }));
exports.QuickTourContent = QuickTourContent;
//# sourceMappingURL=index.js.map