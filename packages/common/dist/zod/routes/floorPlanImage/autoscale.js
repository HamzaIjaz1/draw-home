"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteResponse = exports.ReqQuery = void 0;
const v4_1 = require("zod/v4");
const common_1 = require("../../common");
const apiResponseErrors_1 = require("../../apiResponseErrors");
exports.ReqQuery = v4_1.z.object({
    url: v4_1.z.url(),
    confidence: common_1.numberInString,
});
exports.RouteResponse = (0, common_1.makeRouteResponse)(v4_1.z.union([
    apiResponseErrors_1.UnexpectedServerError,
    apiResponseErrors_1.WrongQueryParams,
    apiResponseErrors_1.FileDownloadError,
    apiResponseErrors_1.ClassificationFailed,
    apiResponseErrors_1.ClassificationParsingFailed,
    apiResponseErrors_1.NoDoorsFound,
    apiResponseErrors_1.AutoscaleCalculationFail,
]), v4_1.z.object({
    scaleRatio: v4_1.z.number(),
    smallestDoorWidth: v4_1.z.number(),
    totalDoorsFound: v4_1.z.number(),
}));
//# sourceMappingURL=autoscale.js.map