"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clsx = void 0;
const ts_utils_1 = require("@arthurka/ts-utils");
const clsx = (classes) => {
    const arr = [];
    for (const name of classes) {
        if ((0, ts_utils_1.isUndefined)(name) || (0, ts_utils_1.isNull)(name) || name === '') {
            continue;
        }
        arr.push(name);
    }
    return arr.length === 0
        ? undefined
        : arr.join(' ');
};
exports.clsx = clsx;
//# sourceMappingURL=clsx.js.map