"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areTheSameContentArrays = exports.isSubset = exports.letIn = exports.isPromiseSettled = exports.escapeRegExp = exports.cutOffLastLetter = exports.fixIEEE = exports.capitalize = exports.generateUUID = exports.clamp = exports.checkIsNotNever = void 0;
exports.castTo = castTo;
const uuid_1 = require("uuid");
const ts_utils_1 = require("@arthurka/ts-utils");
const brands_1 = require("../brands");
function castTo(e) { }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkIsNotNever = (...e) => { };
exports.checkIsNotNever = checkIsNotNever;
const clamp = (min, val, max) => (Math.max(min, Math.min(val, max)));
exports.clamp = clamp;
const generateUUID = () => (0, brands_1.UUID)((0, uuid_1.v4)());
exports.generateUUID = generateUUID;
const capitalize = (s) => s.replace(/^./, e => e.toUpperCase());
exports.capitalize = capitalize;
const fixIEEE = (e) => (0, ts_utils_1.round)(e, 6);
exports.fixIEEE = fixIEEE;
const cutOffLastLetter = (e) => e.slice(0, -1);
exports.cutOffLastLetter = cutOffLastLetter;
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
exports.escapeRegExp = escapeRegExp;
const isPromiseSettled = async (promise) => {
    const uniqueValue = Symbol('unique');
    const result = await Promise.race([promise, Promise.resolve(uniqueValue)]);
    return result !== uniqueValue;
};
exports.isPromiseSettled = isPromiseSettled;
const letIn = (e, fn) => fn(e);
exports.letIn = letIn;
const isSubset = (set, subset) => {
    const _set = new Set(set);
    return subset.every(e => _set.has(e));
};
exports.isSubset = isSubset;
const areTheSameContentArrays = (_arr1, _arr2) => {
    const set1 = new Set(_arr1);
    const set2 = new Set(_arr2);
    return set1.size === set2.size && [...set1].every(e => set2.has(e));
};
exports.areTheSameContentArrays = areTheSameContentArrays;
//# sourceMappingURL=helpers.js.map