"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Level = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const IconButton_1 = require("../IconButton");
const styles_1 = require("./styles");
const Level = ({ className, title, subtitle, visible, showTransparencyOption, transparent, onVisibilityChange, onSettingsClick, onTransparencyClick, onDuplicationClick, }) => {
    const theme = (0, material_1.useTheme)();
    return ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { icon: visible === true ? 'eye' : 'eyeClosed', state: visible === true ? 'active' : 'default', size: 'sm', iconColors: { default: theme.palette.text.disabled }, variant: 'text', onClick: e => {
                    e.stopPropagation();
                    onVisibilityChange();
                } }), (0, jsx_runtime_1.jsxs)(styles_1.Titles, { children: [(0, jsx_runtime_1.jsx)(styles_1.Title, { noWrap: true, children: title }), (0, jsx_runtime_1.jsx)(styles_1.SubTitle, { noWrap: true, children: subtitle })] }), (0, jsx_runtime_1.jsxs)(styles_1.RightControls, { children: [showTransparencyOption === true && ((0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { icon: transparent === true ? 'transparency' : 'noTransparency', state: transparent === true ? 'active' : 'default', size: 'sm', variant: 'text', iconColors: { default: theme.palette.text.disabled }, onClick: e => {
                            e.stopPropagation();
                            onTransparencyClick();
                        } })), (0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { icon: 'gear', state: 'active', size: 'sm', variant: 'text', onClick: e => {
                            e.stopPropagation();
                            onSettingsClick();
                        } }), (0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { icon: 'duplicate', state: 'active', size: 'sm', variant: 'text', onClick: e => {
                            e.stopPropagation();
                            onDuplicationClick();
                        } })] })] }));
};
exports.Level = Level;
//# sourceMappingURL=index.js.map