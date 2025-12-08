"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeSvgAsDataUri = void 0;
const encodeSvgAsDataUri = (svg) => {
    const encoded = window.encodeURIComponent(svg);
    return `data:image/svg+xml;utf8,${encoded}`;
};
exports.encodeSvgAsDataUri = encodeSvgAsDataUri;
//# sourceMappingURL=encodeSvgAsDataUri.js.map