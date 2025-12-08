"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipe = pipe;
function pipe(...operation) {
    return (value) => operation.reduce((acc, op) => op(acc), value);
}
//# sourceMappingURL=pipe.js.map