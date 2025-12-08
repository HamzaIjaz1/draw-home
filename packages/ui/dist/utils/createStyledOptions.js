"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStyledOptions = createStyledOptions;
function createStyledOptions(props, options) {
    return {
        shouldForwardProp: (e) => (!Object.prototype.hasOwnProperty.call(props, e)),
        ...options,
    };
}
//# sourceMappingURL=createStyledOptions.js.map