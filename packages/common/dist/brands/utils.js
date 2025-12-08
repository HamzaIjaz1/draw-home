"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeByTypeGuard = void 0;
const assert_1 = __importDefault(require("assert"));
const initializeByTypeGuard = (e, typeGuard, typeName) => {
    (0, assert_1.default)(typeGuard(e), `${e} is not ${typeName}`);
    return e;
};
exports.initializeByTypeGuard = initializeByTypeGuard;
//# sourceMappingURL=utils.js.map