"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Box = ({ className, children, row: _row, column, justify, align, gap, wrap = false, ...rest }) => ((0, jsx_runtime_1.jsx)("div", { className: className, style: {
        display: 'flex',
        flexDirection: column === true ? 'column' : 'row',
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap === true ? 'wrap' : 'nowrap',
        gap,
        ...rest,
    }, children: children }));
exports.Box = Box;
//# sourceMappingURL=index.js.map