"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSolidColorImageUri = void 0;
const ts_utils_1 = require("@arthurka/ts-utils");
const encodeSvgAsDataUri_1 = require("./encodeSvgAsDataUri");
const makeSolidColorImageUri = (color, { width, height } = {}) => {
    const w = (0, ts_utils_1.isUndefined)(width) ? '' : `width="${width}"`;
    const h = (0, ts_utils_1.isUndefined)(height) ? '' : `height="${height}"`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" ${w} ${h}><rect width="100%" height="100%" fill="${color}" /></svg>`;
    return (0, encodeSvgAsDataUri_1.encodeSvgAsDataUri)(svg);
};
exports.makeSolidColorImageUri = makeSolidColorImageUri;
//# sourceMappingURL=makeSolidColorImageUri.js.map