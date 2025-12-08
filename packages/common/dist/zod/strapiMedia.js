"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strapiAbsoluteUrl = void 0;
const v4_1 = require("zod/v4");
const public_1 = require("../envVariables/public");
exports.strapiAbsoluteUrl = v4_1.z.union([
    v4_1.z.url(),
    v4_1.z.string().startsWith('/').min(2).transform(e => `${public_1.API_URL}${e}`),
]);
//# sourceMappingURL=strapiMedia.js.map