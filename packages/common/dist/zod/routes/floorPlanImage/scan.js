"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteResponse = exports.ReqQuery = void 0;
const v4_1 = require("zod/v4");
const common_1 = require("../../common");
const apiResponseErrors_1 = require("../../apiResponseErrors");
exports.ReqQuery = v4_1.z.object({
    url: v4_1.z.url(),
    wallThreshold: v4_1.z.string().transform(e => +e).refine(e => v4_1.z.number().int().min(1).max(1000).parse(e)),
    wallFurnitureThreshold: v4_1.z.string().transform(e => +e).refine(e => v4_1.z.number().int().min(1).max(1000).parse(e)),
});
exports.RouteResponse = (0, common_1.makeRouteResponse)(v4_1.z.union([apiResponseErrors_1.UnexpectedServerError, apiResponseErrors_1.WrongQueryParams, apiResponseErrors_1.FileDownloadError, apiResponseErrors_1.FloorPlanRecognitionTimeoutReached, apiResponseErrors_1.FloorPlanRecognitionFail]), v4_1.z.object({
    aspectRatio: v4_1.z.number(),
    wallsData: v4_1.z.array(v4_1.z.object({
        position: v4_1.z.object({
            start: v4_1.z.object({
                x: v4_1.z.number(),
                y: v4_1.z.number(),
            }),
            end: v4_1.z.object({
                x: v4_1.z.number(),
                y: v4_1.z.number(),
            }),
        }),
        wallFurnitures: v4_1.z.array(v4_1.z.object({
            type: v4_1.z.enum(['door', 'window']),
            position: v4_1.z.number(),
            width: v4_1.z.number(),
        })),
    })),
}));
//# sourceMappingURL=scan.js.map