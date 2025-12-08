"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$props = $props;
function $props(options) {
    return {
        shouldForwardProp: (e) => !e.startsWith('$'),
        ...options,
    };
}
//# sourceMappingURL=$props.js.map