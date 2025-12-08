"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonNegativeInteger = exports.isNonNegativeInteger = exports.PositiveInteger = exports.isPositiveInteger = exports.Integer = exports.isInteger = exports.Positive = exports.isPositive = exports.NonNegative = exports.isNonNegative = void 0;
const utils_1 = require("../utils");
const isNonNegative = (e) => (true
    && typeof e === 'number'
    && e >= 0);
exports.isNonNegative = isNonNegative;
const NonNegative = (e) => ((0, utils_1.initializeByTypeGuard)(e, exports.isNonNegative, 'NonNegative'));
exports.NonNegative = NonNegative;
const isPositive = (e) => (true
    && (0, exports.isNonNegative)(e)
    && e > 0);
exports.isPositive = isPositive;
const Positive = (e) => ((0, utils_1.initializeByTypeGuard)(e, exports.isPositive, 'Positive'));
exports.Positive = Positive;
const isInteger = (e) => Number.isInteger(e);
exports.isInteger = isInteger;
const Integer = (e) => ((0, utils_1.initializeByTypeGuard)(e, exports.isInteger, 'Integer'));
exports.Integer = Integer;
const isPositiveInteger = (e) => (0, exports.isPositive)(e) && (0, exports.isInteger)(e);
exports.isPositiveInteger = isPositiveInteger;
const PositiveInteger = (e) => ((0, utils_1.initializeByTypeGuard)(e, exports.isPositiveInteger, 'PositiveInteger'));
exports.PositiveInteger = PositiveInteger;
const isNonNegativeInteger = (e) => (0, exports.isNonNegative)(e) && (0, exports.isInteger)(e);
exports.isNonNegativeInteger = isNonNegativeInteger;
const NonNegativeInteger = (e) => ((0, utils_1.initializeByTypeGuard)(e, exports.isNonNegativeInteger, 'NonNegativeInteger'));
exports.NonNegativeInteger = NonNegativeInteger;
//# sourceMappingURL=common.js.map