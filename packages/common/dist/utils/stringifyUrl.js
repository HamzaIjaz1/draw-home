"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyUrl = void 0;
const query_string_1 = __importDefault(require("query-string"));
const stringifyUrl = (url, query) => (query_string_1.default.stringifyUrl({ url, query }, {
    sort: () => 0,
}));
exports.stringifyUrl = stringifyUrl;
//# sourceMappingURL=stringifyUrl.js.map