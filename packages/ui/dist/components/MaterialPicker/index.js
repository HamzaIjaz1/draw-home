"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialPicker = MaterialPicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const styles_1 = require("./styles");
function MaterialPicker({ className, options, onClick, chosenOption, shape, }) {
    return ((0, jsx_runtime_1.jsx)(styles_1.Container, { className: className, children: options.map(({ id, image, name, noBorder = false, textColor }) => ((0, jsx_runtime_1.jsxs)(styles_1.Material, { onClick: () => onClick(id), children: [(0, jsx_runtime_1.jsx)(styles_1.Image, { src: image, "$active": id === chosenOption, "$shape": shape, "$showBorder": noBorder === false, draggable: false }), (0, jsx_runtime_1.jsx)(styles_1.Text, { style: { color: textColor }, children: name })] }, id))) }));
}
//# sourceMappingURL=index.js.map