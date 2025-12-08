import { z } from 'zod/v4';
export declare const User: z.ZodPipe<z.ZodObject<{
    username: z.ZodString;
    email: z.ZodEmail;
    fullName: z.ZodNullable<z.ZodString>;
    avatarExternal: z.ZodNullable<z.ZodString>;
    avatar: z.ZodNullable<z.ZodObject<{
        formats: z.ZodNullable<z.ZodObject<{
            medium: z.ZodOptional<z.ZodObject<{
                url: z.ZodUnion<readonly [z.ZodURL, z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>]>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        url: z.ZodUnion<readonly [z.ZodURL, z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>]>;
    }, z.core.$strip>>;
    provider: z.ZodEnum<{
        local: "local";
        google: "google";
    }>;
    paymentPlan: z.ZodNullable<z.ZodPipe<z.ZodObject<{
        type: z.ZodEnum<{
            professional: "professional";
            team: "team";
        }>;
        label: z.ZodString;
        monthlyPriceInCents: z.ZodNumber;
        yearlyPriceInCents: z.ZodNumber;
        monthlyProductId: z.ZodNullable<z.ZodString>;
        yearlyProductId: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>, z.ZodTransform<{
        monthlyProductId: string | null;
        yearlyProductId: string | null;
        type: "professional" | "team";
        label: string;
        monthlyPriceInCents: number;
        yearlyPriceInCents: number;
    }, {
        type: "professional" | "team";
        label: string;
        monthlyPriceInCents: number;
        yearlyPriceInCents: number;
        monthlyProductId: string | null;
        yearlyProductId: string | null;
    }>>>;
    isAdmin: z.ZodDefault<z.ZodBoolean>;
    bypassPaywall: z.ZodDefault<z.ZodBoolean>;
    stripeCancelAtPeriodEnd: z.ZodPipe<z.ZodNullable<z.ZodBoolean>, z.ZodTransform<boolean, boolean | null>>;
    stripeSubscribedFrom: z.ZodNullable<z.ZodUnion<readonly [z.ZodDate, z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>]>>;
    stripeSubscribedTo: z.ZodNullable<z.ZodUnion<readonly [z.ZodDate, z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>]>>;
}, z.core.$strip>, z.ZodTransform<{
    avatar: string | null;
    username: string;
    email: string;
    fullName: string | null;
    avatarExternal: string | null;
    provider: "local" | "google";
    paymentPlan: {
        monthlyProductId: string | null;
        yearlyProductId: string | null;
        type: "professional" | "team";
        label: string;
        monthlyPriceInCents: number;
        yearlyPriceInCents: number;
    } | null;
    isAdmin: boolean;
    bypassPaywall: boolean;
    stripeCancelAtPeriodEnd: boolean;
    stripeSubscribedFrom: Date | null;
    stripeSubscribedTo: Date | null;
}, {
    username: string;
    email: string;
    fullName: string | null;
    avatarExternal: string | null;
    avatar: {
        formats: {
            medium?: {
                url: string;
            } | undefined;
        } | null;
        url: string;
    } | null;
    provider: "local" | "google";
    paymentPlan: {
        monthlyProductId: string | null;
        yearlyProductId: string | null;
        type: "professional" | "team";
        label: string;
        monthlyPriceInCents: number;
        yearlyPriceInCents: number;
    } | null;
    isAdmin: boolean;
    bypassPaywall: boolean;
    stripeCancelAtPeriodEnd: boolean;
    stripeSubscribedFrom: Date | null;
    stripeSubscribedTo: Date | null;
}>>;
export type User = z.infer<typeof User>;
export declare const ChangePasswordRouteResponse: z.ZodUnion<readonly [z.ZodObject<{
    user: z.ZodPipe<z.ZodObject<{
        username: z.ZodString;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodString>;
        avatarExternal: z.ZodNullable<z.ZodString>;
        avatar: z.ZodNullable<z.ZodObject<{
            formats: z.ZodNullable<z.ZodObject<{
                medium: z.ZodOptional<z.ZodObject<{
                    url: z.ZodUnion<readonly [z.ZodURL, z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>]>;
                }, z.core.$strip>>;
            }, z.core.$strip>>;
            url: z.ZodUnion<readonly [z.ZodURL, z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>]>;
        }, z.core.$strip>>;
        provider: z.ZodEnum<{
            local: "local";
            google: "google";
        }>;
        paymentPlan: z.ZodNullable<z.ZodPipe<z.ZodObject<{
            type: z.ZodEnum<{
                professional: "professional";
                team: "team";
            }>;
            label: z.ZodString;
            monthlyPriceInCents: z.ZodNumber;
            yearlyPriceInCents: z.ZodNumber;
            monthlyProductId: z.ZodNullable<z.ZodString>;
            yearlyProductId: z.ZodNullable<z.ZodString>;
        }, z.core.$strip>, z.ZodTransform<{
            monthlyProductId: string | null;
            yearlyProductId: string | null;
            type: "professional" | "team";
            label: string;
            monthlyPriceInCents: number;
            yearlyPriceInCents: number;
        }, {
            type: "professional" | "team";
            label: string;
            monthlyPriceInCents: number;
            yearlyPriceInCents: number;
            monthlyProductId: string | null;
            yearlyProductId: string | null;
        }>>>;
        isAdmin: z.ZodDefault<z.ZodBoolean>;
        bypassPaywall: z.ZodDefault<z.ZodBoolean>;
        stripeCancelAtPeriodEnd: z.ZodPipe<z.ZodNullable<z.ZodBoolean>, z.ZodTransform<boolean, boolean | null>>;
        stripeSubscribedFrom: z.ZodNullable<z.ZodUnion<readonly [z.ZodDate, z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>]>>;
        stripeSubscribedTo: z.ZodNullable<z.ZodUnion<readonly [z.ZodDate, z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>]>>;
    }, z.core.$strip>, z.ZodTransform<{
        avatar: string | null;
        username: string;
        email: string;
        fullName: string | null;
        avatarExternal: string | null;
        provider: "local" | "google";
        paymentPlan: {
            monthlyProductId: string | null;
            yearlyProductId: string | null;
            type: "professional" | "team";
            label: string;
            monthlyPriceInCents: number;
            yearlyPriceInCents: number;
        } | null;
        isAdmin: boolean;
        bypassPaywall: boolean;
        stripeCancelAtPeriodEnd: boolean;
        stripeSubscribedFrom: Date | null;
        stripeSubscribedTo: Date | null;
    }, {
        username: string;
        email: string;
        fullName: string | null;
        avatarExternal: string | null;
        avatar: {
            formats: {
                medium?: {
                    url: string;
                } | undefined;
            } | null;
            url: string;
        } | null;
        provider: "local" | "google";
        paymentPlan: {
            monthlyProductId: string | null;
            yearlyProductId: string | null;
            type: "professional" | "team";
            label: string;
            monthlyPriceInCents: number;
            yearlyPriceInCents: number;
        } | null;
        isAdmin: boolean;
        bypassPaywall: boolean;
        stripeCancelAtPeriodEnd: boolean;
        stripeSubscribedFrom: Date | null;
        stripeSubscribedTo: Date | null;
    }>>;
}, z.core.$strip>, z.ZodObject<{
    error: z.ZodObject<{
        message: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>]>;
export declare const ChangeEmailRouteResponse: z.ZodUnion<readonly [z.ZodObject<{
    sent: z.ZodLiteral<true>;
}, z.core.$strip>, z.ZodObject<{
    error: z.ZodObject<{
        message: z.ZodString;
        details: z.ZodObject<{
            formField: z.ZodOptional<z.ZodEnum<{
                password: "password";
                newEmail: "newEmail";
            }>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
}, z.core.$strip>]>;
export declare const DeleteAccountRouteResponse: z.ZodUnion<readonly [z.ZodObject<{
    ok: z.ZodLiteral<true>;
}, z.core.$strip>, z.ZodObject<{
    error: z.ZodObject<{
        message: z.ZodString;
        details: z.ZodObject<{
            formField: z.ZodOptional<z.ZodEnum<{
                password: "password";
            }>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
}, z.core.$strip>]>;
export declare const UpdateAvatarRouteResponse: z.ZodUnion<readonly [z.ZodObject<{
    data: z.ZodLiteral<"success">;
}, z.core.$strip>, z.ZodObject<{
    data: z.ZodNull;
    error: z.ZodObject<{
        message: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>]>;
export declare const ChangeNameRouteResponse: z.ZodUnion<readonly [z.ZodObject<{
    data: z.ZodLiteral<"success">;
}, z.core.$strip>, z.ZodObject<{
    data: z.ZodNull;
    error: z.ZodObject<{
        message: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>]>;
//# sourceMappingURL=User.d.ts.map