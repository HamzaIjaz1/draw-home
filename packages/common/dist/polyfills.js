"use strict";
/* eslint-disable no-extend-native */
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.toReversed ??= function (...params) {
    return [...this].reverse(...params);
};
Array.prototype.toSorted ??= function (...params) {
    return [...this].sort(...params);
};
Array.prototype.toSpliced ??= function (...params) {
    const arr = [...this];
    // @ts-expect-error
    arr.splice(...params);
    return arr;
};
//# sourceMappingURL=polyfills.js.map