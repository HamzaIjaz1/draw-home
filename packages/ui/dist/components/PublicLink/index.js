"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicLink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ts_utils_1 = require("@arthurka/ts-utils");
const react_1 = require("react");
const styles_1 = require("../../utils/styles");
const MainButton_1 = require("../MainButton");
const createStyledOptions_1 = require("../../utils/createStyledOptions");
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
const CopyArea = (0, material_1.styled)('div') `
  display: flex;
  gap: 10px;
  position: relative;
`;
const CopyableText = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  display: inline-block;
  width: 100%;
  height: 36px;
  padding: 8px;
  border-radius: 8px;
  background-color: #f3f3f3;

  font-weight: 400;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  user-select: all;
`);
const Button = (0, material_1.styled)(MainButton_1.MainButton) `
  width: 104px;
  height: 36px;
  flex-shrink: 0;

  gap: 6px;
  padding: 6px;
  border-radius: 10px;

  .MuiTypography-root {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0px;
    text-align: center;
  }
`;
const StatusOpts = (0, createStyledOptions_1.createStyledOptions)({
    visible: true,
});
const Status = (0, material_1.styled)('span', StatusOpts)(({ theme, visible }) => (0, material_1.css) `
  position: absolute;
  border-radius: 30px;
  padding: 6px 8px;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #5e5e5eea;

  font-size: 14px;
  color: ${theme.palette.background.default};
  opacity: ${visible === true ? 1 : 0};
  visibility: ${visible === true ? 'visible' : 'hidden'};
  transition: opacity 0.2s ease-in-out;
  user-select: none;
`);
let timeoutId = null;
const PublicLink = ({ className, title, url, buttonText, copySuccessStatusText, }) => {
    const [showStatus, setShowStatus] = (0, react_1.useState)(false);
    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            const selection = window.getSelection();
            if (!(0, ts_utils_1.isNull)(selection)) {
                selection.removeAllRanges();
            }
            if (!(0, ts_utils_1.isNull)(timeoutId)) {
                setShowStatus(false);
                window.clearTimeout(timeoutId);
                await (0, ts_utils_1.wait)(0.15);
            }
            setShowStatus(true);
            timeoutId = window.setTimeout(() => setShowStatus(false), 1000);
        }
        catch (error) {
            console.error('|c028kh|', error);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(Container, { className: className, children: [(0, jsx_runtime_1.jsx)(Title, { children: title }), (0, jsx_runtime_1.jsxs)(CopyArea, { children: [(0, jsx_runtime_1.jsx)(CopyableText, { onClick: onCopy, children: url }), (0, jsx_runtime_1.jsx)(Button, { icon: 'chain', text: buttonText, onClick: onCopy }), (0, jsx_runtime_1.jsx)(Status, { visible: showStatus, children: copySuccessStatusText })] })] }));
};
exports.PublicLink = PublicLink;
//# sourceMappingURL=index.js.map