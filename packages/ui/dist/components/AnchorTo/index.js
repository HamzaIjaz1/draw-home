"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnchorTo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Container = (0, material_1.styled)('div') `
  position: relative;
`;
const AnchorTo = ({ className, anchored, children, xDirection, yDirection, xOffset = '0px', yOffset = '0px', }) => ((0, jsx_runtime_1.jsxs)(Container, { className: className, children: [children, (0, jsx_runtime_1.jsx)("div", { style: {
                position: 'absolute',
                [xDirection === 'right' ? 'left' : 'right']: xOffset,
                [yDirection === 'bottom' ? 'top' : 'bottom']: yOffset,
            }, children: anchored })] }));
exports.AnchorTo = AnchorTo;
//# sourceMappingURL=index.js.map