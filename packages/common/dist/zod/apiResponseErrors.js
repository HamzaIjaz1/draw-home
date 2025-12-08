"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoscaleCalculationFail = exports.NoDoorsFound = exports.ClassificationParsingFailed = exports.ClassificationFailed = exports.FloorPlanRecognitionFail = exports.FloorPlanRecognitionTimeoutReached = exports.FileDownloadError = exports.WrongQueryParams = exports.UnexpectedServerError = void 0;
const v4_1 = require("zod/v4");
exports.UnexpectedServerError = v4_1.z.object({
    type: v4_1.z.literal('UnexpectedServerError'),
});
exports.WrongQueryParams = v4_1.z.object({
    type: v4_1.z.literal('WrongQueryParams'),
    __WARNING_DO_NOT_USE__zodIssues: v4_1.z.custom((e) => true),
});
exports.FileDownloadError = v4_1.z.object({
    type: v4_1.z.literal('FileDownloadError'),
});
exports.FloorPlanRecognitionTimeoutReached = v4_1.z.object({
    type: v4_1.z.literal('FloorPlanRecognitionTimeoutReached'),
});
exports.FloorPlanRecognitionFail = v4_1.z.object({
    type: v4_1.z.literal('FloorPlanRecognitionFail'),
});
exports.ClassificationFailed = v4_1.z.object({
    type: v4_1.z.literal('ClassificationFailed'),
});
exports.ClassificationParsingFailed = v4_1.z.object({
    type: v4_1.z.literal('ClassificationParsingFailed'),
});
exports.NoDoorsFound = v4_1.z.object({
    type: v4_1.z.literal('NoDoorsFound'),
});
exports.AutoscaleCalculationFail = v4_1.z.object({
    type: v4_1.z.literal('AutoscaleCalculationFail'),
});
//# sourceMappingURL=apiResponseErrors.js.map