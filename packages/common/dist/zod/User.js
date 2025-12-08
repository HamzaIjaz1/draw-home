"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeNameRouteResponse = exports.UpdateAvatarRouteResponse = exports.DeleteAccountRouteResponse = exports.ChangeEmailRouteResponse = exports.ChangePasswordRouteResponse = exports.User = void 0;
const v4_1 = require("zod/v4");
const ts_utils_1 = require("@arthurka/ts-utils");
const PaymentPlanAttributes_1 = require("./PaymentPlanAttributes");
const strapiMedia_1 = require("./strapiMedia");
const common_1 = require("./common");
const mediaImageProps = {
    url: strapiMedia_1.strapiAbsoluteUrl,
};
exports.User = (v4_1.z
    .object({
    username: v4_1.z.string(),
    email: v4_1.z.email(),
    fullName: v4_1.z.string().nullable(),
    avatarExternal: v4_1.z.string().nullable(),
    avatar: v4_1.z.object({
        ...mediaImageProps,
        formats: v4_1.z.object({
            medium: v4_1.z.object(mediaImageProps).optional(),
        }).nullable(),
    }).nullable(),
    provider: v4_1.z.enum(['local', 'google']),
    paymentPlan: PaymentPlanAttributes_1.PaymentPlanAttributes.nullable(),
    isAdmin: v4_1.z.boolean().default(false),
    bypassPaywall: v4_1.z.boolean().default(false),
    stripeCancelAtPeriodEnd: v4_1.z.boolean().nullable().transform(e => e === true),
    stripeSubscribedFrom: common_1.dateOrDateLike.nullable(),
    stripeSubscribedTo: common_1.dateOrDateLike.nullable(),
})
    .transform(({ avatar, ...rest }) => ({
    ...rest,
    avatar: (0, ts_utils_1.isNull)(avatar) ? null : (!(0, ts_utils_1.isNull)(avatar.formats) && !(0, ts_utils_1.isUndefined)(avatar.formats.medium)
        ? avatar.formats.medium.url
        : avatar.url),
})));
exports.ChangePasswordRouteResponse = v4_1.z.union([
    v4_1.z.object({
        user: exports.User,
    }),
    v4_1.z.object({
        error: v4_1.z.object({
            message: v4_1.z.string(),
        }),
    }),
]);
exports.ChangeEmailRouteResponse = v4_1.z.union([
    v4_1.z.object({
        sent: v4_1.z.literal(true),
    }),
    v4_1.z.object({
        error: v4_1.z.object({
            message: v4_1.z.string(),
            details: v4_1.z.object({
                formField: v4_1.z.enum(['password', 'newEmail']).optional(),
            }),
        }),
    }),
]);
exports.DeleteAccountRouteResponse = v4_1.z.union([
    v4_1.z.object({
        ok: v4_1.z.literal(true),
    }),
    v4_1.z.object({
        error: v4_1.z.object({
            message: v4_1.z.string(),
            details: v4_1.z.object({
                formField: v4_1.z.enum(['password']).optional(),
            }),
        }),
    }),
]);
exports.UpdateAvatarRouteResponse = v4_1.z.union([
    v4_1.z.object({
        data: v4_1.z.literal('success'),
    }),
    v4_1.z.object({
        data: v4_1.z.null(),
        error: v4_1.z.object({
            message: v4_1.z.string(),
        }),
    }),
]);
exports.ChangeNameRouteResponse = v4_1.z.union([
    v4_1.z.object({
        data: v4_1.z.literal('success'),
    }),
    v4_1.z.object({
        data: v4_1.z.null(),
        error: v4_1.z.object({
            message: v4_1.z.string(),
        }),
    }),
]);
//# sourceMappingURL=User.js.map