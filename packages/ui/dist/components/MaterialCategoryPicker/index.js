"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialCategoryPicker = MaterialCategoryPicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const styles_1 = require("./styles");
function MaterialCategoryPicker({ className, options, onClick, chosenOption, squareImages = false, wrap = false, highlightVariant = 'outline', size = 'md', }) {
    return ((0, jsx_runtime_1.jsx)(styles_1.Container, { className: className, wrap: wrap, children: options.map(({ id, image, name }) => ((0, jsx_runtime_1.jsxs)(styles_1.MaterialButton, { onClick: () => onClick(id), size: size, children: [(0, jsx_runtime_1.jsx)(styles_1.Image, { src: image, active: id === chosenOption, squareImages: squareImages, highlightVariant: highlightVariant, size: size, draggable: false }), (0, jsx_runtime_1.jsx)(styles_1.Text, { children: name })] }, id))) }));
}
//# sourceMappingURL=index.js.map