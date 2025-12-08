"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentPlanAttributes = void 0;
const ts_utils_1 = require("@arthurka/ts-utils");
const v4_1 = require("zod/v4");
exports.PaymentPlanAttributes = (v4_1.z
    .object({
    type: v4_1.z.enum(['professional', 'team']),
    label: v4_1.z.string(),
    monthlyPriceInCents: v4_1.z.number(),
    yearlyPriceInCents: v4_1.z.number(),
    monthlyProductId: v4_1.z.string().nullable(),
    yearlyProductId: v4_1.z.string().nullable(),
})
    .transform(e => ({
    ...e,
    monthlyProductId: (0, ts_utils_1.isNull)(e.monthlyProductId) || e.monthlyProductId === '' ? null : e.monthlyProductId,
    yearlyProductId: (0, ts_utils_1.isNull)(e.yearlyProductId) || e.yearlyProductId === '' ? null : e.yearlyProductId,
})));
//# sourceMappingURL=PaymentPlanAttributes.js.map