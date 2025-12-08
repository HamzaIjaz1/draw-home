"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Icons_1 = require("../Icons");
const styles_1 = require("./styles");
const Material = ({ className, image, text, onClick, disabled = false, withCheckmark = false, withArrow = false, }) => ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, jsx_runtime_1.jsx)(styles_1.Text, { disabled: disabled, children: text }), (0, jsx_runtime_1.jsxs)(styles_1.ButtonWrap, { children: [withCheckmark === true && (0, jsx_runtime_1.jsx)(Icons_1.CheckMarkIcon, {}), (0, jsx_runtime_1.jsxs)(styles_1.Button, { onClick: onClick, disabled: disabled, children: [disabled === true
                            ? (0, jsx_runtime_1.jsx)(Icons_1.DisabledMaterialIcon, {})
                            : ((0, jsx_runtime_1.jsx)(styles_1.Image, { src: image, draggable: false })), withArrow === true && (0, jsx_runtime_1.jsx)(Icons_1.DownArrowIcon, { rotate: -90 })] })] })] }));
exports.Material = Material;
//# sourceMappingURL=index.js.map