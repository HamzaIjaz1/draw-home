"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonEmptyString = exports.isNonEmptyString = void 0;
const utils_1 = require("../utils");
const isNonEmptyString = (e) => (true
    && typeof e === 'string'
    && e !== '');
exports.isNonEmptyString = isNonEmptyString;
const NonEmptyString = (e) => ((0, utils_1.initializeByTypeGuard)(e, exports.isNonEmptyString, 'NonEmptyString'));
exports.NonEmptyString = NonEmptyString;
//# sourceMappingURL=common.js.map