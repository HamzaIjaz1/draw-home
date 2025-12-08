"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRouteResponse = exports.dateOrDateLike = exports.numberInString = exports.noTrailingSlashUrl = void 0;
const v4_1 = require("zod/v4");
exports.noTrailingSlashUrl = v4_1.z.url().refine(e => !e.endsWith('/'), {
    message: 'Should not end with trailing slash',
});
exports.numberInString = v4_1.z.preprocess(Number, v4_1.z.number());
exports.dateOrDateLike = v4_1.z.union([
    v4_1.z.date(),
    v4_1.z
        .string()
        .transform(e => new Date(e))
        .refine(e => v4_1.z.date().safeParse(e).success),
]);
const makeRouteResponse = (error, data) => (v4_1.z.union([
    v4_1.z.object({
        success: v4_1.z.literal(false),
        data: v4_1.z.undefined().optional(),
        error,
    }),
    v4_1.z.object({
        success: v4_1.z.literal(true),
        error: v4_1.z.undefined().optional(),
        data,
    }),
]));
exports.makeRouteResponse = makeRouteResponse;
//# sourceMappingURL=common.js.map